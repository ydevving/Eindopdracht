 package com.itvitae.Eindopdracht.Seeder;

import com.itvitae.Eindopdracht.Enum.FuelType;
import com.itvitae.Eindopdracht.Enum.ItemType;
import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Enum.TransmissionTypes;
import com.itvitae.Eindopdracht.Generic.Entities;
import com.itvitae.Eindopdracht.Model.Car;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.CarRepository;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import com.itvitae.Eindopdracht.Repository.TransactionRepository;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import com.itvitae.Eindopdracht.Service.CarService;
import com.itvitae.Eindopdracht.Service.ItemService;
import com.itvitae.Eindopdracht.Service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Date;
import java.util.*;

@Component
public class Seeder implements CommandLineRunner {

    public class BadCSVFormatException extends Exception {
        public BadCSVFormatException(String errorMessage, int lineNumber) {
            super(String.format("CSV Format error on line %d: %s", lineNumber, errorMessage));
        }

        public BadCSVFormatException(String errorMessage) {
            super(String.format("CSV Format error: %s", errorMessage));
        }
    }

    enum ModelType {
        USER,
        ITEM,
        CAR,
        TRANSACTION
    };

    Map<ModelType, Integer> modelValues;

    static HashMap<Integer, Item> REF_ID = new HashMap<>();

    @Autowired
    UserRepository userRepo;

    @Autowired
    ItemRepository itemRepo;

    @Autowired
    CarRepository carRepo;

    @Autowired
    TransactionRepository transactionRepo;

    @Autowired
    CarService carService;

    @Autowired
    ItemService itemService;

    @Autowired
    UserService userService;

    public Seeder() {
        modelValues = new HashMap<>(ModelType.values().length);

        // Denotes how many fields the Model has
        modelValues.put(ModelType.USER, 5);
        modelValues.put(ModelType.ITEM, 7);
        modelValues.put(ModelType.CAR, 8);
        modelValues.put(ModelType.TRANSACTION, 4);
    }

    @SuppressWarnings("unchecked")
    private <T extends Entities> List<T> readAndSaveModelCSV(String filePath, ModelType modelType) throws IOException, BadCSVFormatException {

        String path = String.format("%s/src/main/java/com/itvitae/Eindopdracht/Seeder/%s", System.getProperty("user.dir"), filePath);

        try (BufferedReader br = new BufferedReader(new FileReader(path))) {

            List<T> resultList = new ArrayList<>();

            // Skip first info comment line
            br.readLine();

            String line;
            int lineCount = 1;

            while ((line = br.readLine()) != null) {
                lineCount++;

                if (line.isBlank())
                    continue;

                // Uses '|' as a separator
                List<String> values = List.of(line.split("\\|"));

                int totalValues = modelValues.get(modelType);
                if (values.size() != totalValues)
                    throw new BadCSVFormatException(String.format("Amount of values on this line is not correct, put %s values in", totalValues), lineCount);

                switch (modelType) {
                    case USER: {
                        User user = User.builder()
                                .username(values.get(0))
                                .password(values.get(1))
                                .email(values.get(2))
                                .city(values.get(3))
                                .address(values.get(4))
                                .build();

                        user = userRepo.save(user);

                        resultList.add((T)user);
                        break;
                    }
                    case ITEM: {
                        String value = values.get(2);

                        boolean isNull = value.equals("NULL");

                        // If value is not null (so there is a value written) then try to get car by license plate
                        Optional<Car> car = (!isNull) ? this.carService.getCarByLicenseplate(value) : Optional.empty();

                        if (car.isEmpty() && !isNull)
                            throw new BadCSVFormatException("Car (3th column) does not exist in the Database!");

                        Short storageSpace = (value.equals("NULL")) ? null : Short.valueOf(values.get(5));

                        Item item = Item.builder()
                                .name(values.get(0))
                                .price(Double.parseDouble(values.get(1)))
                                .car(car.orElse(null))
                                .type(ItemType.valueOf(values.get(3).toUpperCase()))
                                .description(values.get(4))
                                .storageSpace(storageSpace)
                                .status(Status.OPERABLE)
                                .build();

                        Integer item_ref;

                        try {
                            item_ref = (!values.get(6).equals("NULL")) ? Integer.valueOf(values.get(6)) : null;
                        } catch (NumberFormatException e) {
                            throw new BadCSVFormatException("ITEM_UNIQUE_REF (7th column) is not a valid Integer!");
                        }

                        if (item_ref != null)
                            REF_ID.put(item_ref, item);

                        item = itemRepo.save(item);

                        resultList.add((T)item);

                        break;
                    }
                    case CAR: {
                        Car car = Car.builder()
                                .licenseplate(values.get(0))
                                .brand(values.get(1))
                                .isAutomatic(true)
                                .seats(Short.valueOf(values.get(3)))
                                .towWeight(Short.valueOf(values.get(4)))
                                .kilometerCounter(Integer.valueOf(values.get(5)))
                                .modelYear(Short.valueOf(values.get(6)))
                                .fuelType(FuelType.valueOf(values.get(7).toUpperCase()))
                                .build();

                        car = carRepo.save(car);

                        resultList.add((T)car);
                        break;
                    }
                    case TRANSACTION: {

                        Optional<User> user = this.userService.exists(values.get(2));

                        if (user.isEmpty())
                            throw new BadCSVFormatException("Renting User ID (3th column) does not exist in Database!");

                        Integer item_ref;

                        try {
                            item_ref = Integer.valueOf(values.get(3));
                        } catch (NumberFormatException e) {
                            throw new BadCSVFormatException("Item ID (4th column) must be a valid number");
                        }

                        Item item = REF_ID.get(item_ref);

                        if (item == null)
                            throw new BadCSVFormatException("Item ID (4th column) is not present in the REF_ID array");

                        Transaction transaction = Transaction.builder()
                                .rentedAt(Date.valueOf(values.get(0)))
                                .rentedUntil(Date.valueOf(values.get(1)))
                                .rentingUser(user.get())
                                .item(item)
                                .build();

                        transaction = transactionRepo.save(transaction);

                        resultList.add((T)transaction);

                        break;
                    }
                }
            }

            return resultList;

        } catch (IOException | BadCSVFormatException e) {
            System.err.println(e.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    @Transactional
    public void run(String... args) throws IOException, BadCSVFormatException {

        this.userRepo.deleteAll();
//        this.carRepo.deleteAll();
//        this.itemRepo.deleteAll();

        readAndSaveModelCSV("users.csv", ModelType.USER);
        readAndSaveModelCSV("cars.csv", ModelType.CAR);
        readAndSaveModelCSV("items.csv", ModelType.ITEM);
        readAndSaveModelCSV("transactions.csv", ModelType.TRANSACTION);

//        Car car = Car.builder()
//                .licenseplate("4-YZT-01")
//                .brand("Toyota")
//                .transmission(TransmissionTypes.AUTOMATIC)
//                .seats((short)4)
//                .towWeight((short)45)
//                .kilometerCounter(200_000)
//                .modelYear((short)2020)
//                .fuelType(FuelType.DIESEL)
//                .build();
//
//        car = carRepo.save(car);
//
//        Item item = Item.builder()
//                .name("Mini-TV")
//                .price(110.0)
//                .type(ItemType.TV)
//                .description("Een Mini-TV handig voor de kids voor op reis!")
//                .storageSpace(null)
//                .car(car)
//                .status(Status.OPERABLE)
//                .build();
//
//        itemRepo.save(item);

    }
}
