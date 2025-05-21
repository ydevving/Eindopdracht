package com.itvitae.Eindopdracht.Seeder;

import com.itvitae.Eindopdracht.Enum.itemType;
import com.itvitae.Eindopdracht.Model.Car;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Component
public class Seeder implements CommandLineRunner {

    public class BadCSVFormatException extends Exception {
        public BadCSVFormatException(String errorMessage, int lineNumber) {
            super(String.format("CSV Format error on line %d: %s", lineNumber, errorMessage));
        }
    }

    enum ModelType {
        USER,
        ITEM,
        CAR,
        TRANSACTION
    };

    Map<ModelType, Integer> modelValues;

    @Autowired
    UserRepository userRepo;

    public Seeder() {
        modelValues = new HashMap<>(ModelType.values().length);

        // Denotes how many fields the Model has
        modelValues.put(ModelType.USER, 5);
        modelValues.put(ModelType.ITEM, 7);
        modelValues.put(ModelType.CAR, 9);
        modelValues.put(ModelType.TRANSACTION, 4);
    }

    private <T> List<T> readModelCSV(String filePath, ModelType modelType) throws IOException, BadCSVFormatException {

        String path = String.format("%s/src/main/java/com/itvitae/Eindopdracht/Seeder/%s", System.getProperty("user.dir"), filePath);

        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            List<T> resultList = new ArrayList<>();

            // Skip first info comment line
            br.readLine();

            String line;
            int lineCount = 1;

            while ((line = br.readLine()) != null) {
                lineCount++;

                List<String> values = List.of(line.split(","));

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
                        resultList.add((T) user);
                        break;
                    }
                    case ITEM: {
                        Item item = Item.builder()
                                .name(values.get(0))
                                .price(Double.parseDouble(values.get(1)))
                                .car(null)
                                .type(itemType.SUV)
                                .description(values.get(4))
                                .storageSpace(null)
                                .build();
                        resultList.add((T) item);
                        break;
                    }
                    case CAR: {
                        Car car = Car.builder()
                                .licenseplate(values.get(0))
                                .build();
                        resultList.add((T) car);
                        break;
                    }
                    case TRANSACTION: {
                        Transaction transaction = Transaction.builder()
                                .build();
                        resultList.add((T) transaction);
                        break;
                    }
                }

                values.stream().peek(System.out::println);

                System.out.println();
            }

            return resultList;
        } catch (IOException | BadCSVFormatException e) {
            System.err.println(e.getMessage());
            return new ArrayList<>();
        }
    }

    private List<User> addUsers() throws IOException, BadCSVFormatException {
        return userRepo.saveAll(
                this.readModelCSV("users.csv", ModelType.USER)
        );
    }

    private List<Item> addItems() throws IOException, BadCSVFormatException {

    }

    @Override
    @Transactional
    public void run(String... args) throws IOException, BadCSVFormatException {

        this.userRepo.deleteAll();

        this.addUsers();
    }
}
