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
import org.springframework.ui.Model;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Date;
import java.util.*;
import java.net.URL;

@Component
public class Seeder implements CommandLineRunner {

    public class BadCSVFormatException extends Exception {
        public BadCSVFormatException(String errorMessage, String filepath, int lineNumber) {
            super(String.format("[%s] CSV Format error on line %d: %s", filepath,lineNumber, errorMessage));
        }

        public BadCSVFormatException(String errorMessage, String filePath) {
            super(String.format("[%s] CSV Format error: %s", filePath, errorMessage));
        }
    }

    enum ModelType {
        USER,
        ITEM,
        CAR,
        TRANSACTION
    };

    Map<ModelType, Integer> modelValues;

    private static HashMap<Integer, Item> REF_ID = new HashMap<>();

    private static String EMAIL_REGEX = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";

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
        modelValues.put(ModelType.ITEM, 8);
        modelValues.put(ModelType.CAR, 8);
        modelValues.put(ModelType.TRANSACTION, 4);
    }

    public static boolean isValidURL(String url)
    {
        try {
            new URL(url).toURI();
            return true;
        }

        catch (Exception e) {
            return false;
        }
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
                    throw new BadCSVFormatException(String.format("Amount of values on this line is not correct, put %s values in", totalValues), filePath, lineCount);

                switch (modelType) {
                    case USER: {
                        String username = values.get(0);

                        if (username.equals("NULL"))
                            throw new BadCSVFormatException("USERNAME (1st column) cannot be null!", filePath, lineCount);

                        String password = values.get(1);

                        if (password.equals("NULL"))
                            throw new BadCSVFormatException("PASSWORD (2nd column) cannot be null!", filePath, lineCount);

                        String email = values.get(2);

                        if (email.equals("NULL"))
                            throw new BadCSVFormatException("EMAIL (3rd column) cannot be null!", filePath, lineCount);

                        User user = User.builder()
                                .username(username)
                                .password(password)
                                .email(email)
                                .city(values.get(3))
                                .address(values.get(4))
                                .build();

                        user = userRepo.save(user);

                        resultList.add((T)user);
                        break;
                    }
                    case ITEM: {
                        String name = values.get(0);

                        if (name.equals("NULL"))
                            throw new BadCSVFormatException("NAME (1st column) cannot be null!", filePath, lineCount);

                        Double price;

                        try {
                            price = Double.valueOf(values.get(1));
                        } catch (NumberFormatException e) {
                            throw new BadCSVFormatException("PRICE (2nd column) must be a valid 'double' type number", filePath, lineCount);
                        }

                        String value = values.get(2);
                        boolean isNull = value.equals("NULL");

                        // If value is not null (so there is a value written) then try to get car by license plate
                        Optional<Car> car = (!isNull) ? this.carService.getCarByLicenseplate(value) : Optional.empty();

                        if (car.isEmpty() && !isNull)
                            throw new BadCSVFormatException("CAR (3th column) does not exist in the Database!", filePath, lineCount);

                        ItemType type;

                        try {
                            type = ItemType.valueOf(values.get(3).toUpperCase());
                        } catch (IllegalArgumentException e) {
                            throw new BadCSVFormatException("TYPE (4th column) must be a valid 'ItemType' enum constant", filePath, lineCount);
                        }

                        String imgURL = values.get(4);

                        if (!imgURL.equals("NULL") && !isValidURL(imgURL))
                            throw new BadCSVFormatException("IMAGE_URL (5th column) is an invalid URL, note: must be in HTTP(S) format", filePath, lineCount);

                        String description = values.get(5);

                        if (description.equals("NULL"))
                            throw new BadCSVFormatException("DESCRIPTION (5th column) cannot be null!", filePath, lineCount);

                        Short storageSpace = (value.equals("NULL")) ? null : Short.valueOf(values.get(6));

                        Item item = Item.builder()
                                .name(name)
                                .price(price)
                                .car(car.orElse(null))
                                .type(type)
                                .description(description)
                                .storageSpace(storageSpace)
                                .status(Status.OPERABLE)
                                .imgURL(imgURL)
                                .build();

                        Integer item_ref;

                        try {
                            item_ref = (!values.get(7).equals("NULL")) ? Integer.valueOf(values.get(7)) : null;
                        } catch (NumberFormatException e) {
                            throw new BadCSVFormatException("ITEM_UNIQUE_REF (8th column) is not a valid Integer!", filePath, lineCount);
                        }

                        if (item_ref != null)
                            REF_ID.put(item_ref, item);

                        item = itemRepo.save(item);

                        resultList.add((T)item);

                        break;
                    }
                    case CAR: {

                        String licensePlate = values.get(0);

                        if (!carService.isValidFormat(licensePlate))
                            throw new BadCSVFormatException("LICENSE_PLATE (1st column) is not in a valid format!", filePath, lineCount);

                        String brand = values.get(1);

                        if (brand.equalsIgnoreCase("NULL"))
                            throw new BadCSVFormatException("BRAND (2nd column) cannot be null!", filePath, lineCount);

                        String _transmission = values.get(2);
                        boolean transmission;

                        if (_transmission.equalsIgnoreCase("automatic"))
                            transmission = true;
                        else if (_transmission.equalsIgnoreCase("manual"))
                            transmission = false;
                        else
                            throw new BadCSVFormatException("TRANSMISSION (3rd column) is not in a valid format! Let it either be 'AUTOMATIC' or 'MANUAL'", filePath, lineCount);

                        Short seats;

                        try {
                            seats = Short.valueOf(values.get(3));
                        } catch (NumberFormatException e) {
                            throw new BadCSVFormatException("SEATS (4th column) must be a valid 'short' type number", filePath, lineCount);
                        }

                        Short towWeight;

                        try {
                            towWeight = Short.valueOf(values.get(4));
                        } catch (NumberFormatException e) {
                            throw new BadCSVFormatException("TOW_WEIGHT (5th column) must be a valid 'short' type number", filePath, lineCount);
                        }

                        Integer kilometerCounter;

                        try {
                            kilometerCounter = Integer.valueOf(values.get(5));
                        } catch (NumberFormatException e) {
                            throw new BadCSVFormatException("KM_COUNTER (6th column) must be a valid 'integer' type number", filePath, lineCount);
                        }

                        Short modelYear;

                        try {
                            modelYear = Short.valueOf(values.get(6));
                        } catch (NumberFormatException e) {
                            throw new BadCSVFormatException("MODEL_YEAR (7th column) must be a valid 'short' type number", filePath, lineCount);
                        }

                        FuelType fuelType;

                        try {
                            fuelType = FuelType.valueOf(values.get(7).toUpperCase());
                        } catch (IllegalArgumentException e) {
                            throw new BadCSVFormatException("FUEL_TYPE (8th column) must be a valid 'FuelType' enum constant", filePath, lineCount);
                        }

                        Car car = Car.builder()
                                .licenseplate(licensePlate)
                                .brand(brand)
                                .isAutomatic(transmission)
                                .seats(seats)
                                .towWeight(towWeight)
                                .kilometerCounter(kilometerCounter)
                                .modelYear(modelYear)
                                .fuelType(fuelType)
                                .build();

                        car = carRepo.save(car);

                        resultList.add((T)car);
                        break;
                    }
                    case TRANSACTION: {

                        Optional<User> user = this.userService.exists(values.get(2));

                        if (user.isEmpty())
                            throw new BadCSVFormatException("Renting User ID (3th column) does not exist in Database!", filePath, lineCount);

                        Integer item_ref;

                        try {
                            item_ref = Integer.valueOf(values.get(3));
                        } catch (NumberFormatException e) {
                            throw new BadCSVFormatException("Item ID (4th column) must be a valid number", filePath, lineCount);
                        }

                        Item item = REF_ID.get(item_ref);

                        if (item == null)
                            throw new BadCSVFormatException("Item ID (4th column) is not present in the REF_ID array", filePath, lineCount);

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

        // Delete most dependent to least dependent entities
        this.transactionRepo.deleteAll();
        this.carRepo.deleteAll();
        this.itemRepo.deleteAll();
        this.userRepo.deleteAll();

        readAndSaveModelCSV("users.csv", ModelType.USER);
        readAndSaveModelCSV("cars.csv", ModelType.CAR);
        readAndSaveModelCSV("items.csv", ModelType.ITEM);
        readAndSaveModelCSV("transactions.csv", ModelType.TRANSACTION);

        // Clear linking relationship list so it can be prepared for future iterations
        REF_ID.clear();
    }
}
