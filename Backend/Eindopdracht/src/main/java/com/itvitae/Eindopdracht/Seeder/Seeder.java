package com.itvitae.Eindopdracht.Seeder;

import com.itvitae.Eindopdracht.Generic.Entities;
import com.itvitae.Eindopdracht.Model.Car;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.CarRepository;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import com.itvitae.Eindopdracht.Repository.TransactionRepository;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.SneakyThrows;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Component
public class Seeder implements CommandLineRunner, Entities {

    public static class BadCSVFormatException extends Exception {

        public static String filePath;
        public static int lineNumber;

        public BadCSVFormatException(String errorMessage) {
            super(String.format("[%s] CSV Format error on line %d: %s", filePath ,lineNumber, errorMessage));
        }
    }

    enum ModelType {
        USER,
        ITEM,
        CAR,
        TRANSACTION
    };

     @FunctionalInterface
     public interface ThrowingFunction<T, R> {
         R apply(T t) throws Exception;
     }

    private record ModelInfo<T>(Integer columnFieldCount, ThrowingFunction<List<String>, T> buildFunction) {}

    private Map<ModelType, ModelInfo> modelValues;

    UserRepository userRepo;
    ItemRepository itemRepo;
    CarRepository carRepo;
    TransactionRepository transactionRepo;
    BuildService buildService;

    public Seeder(
        UserRepository userRepo,
        ItemRepository itemRepo,
        CarRepository carRepo,
        TransactionRepository transactionRepo,
        BuildService buildService
    ) {
        this.userRepo = userRepo;
        this.itemRepo = itemRepo;
        this.carRepo = carRepo;
        this.transactionRepo = transactionRepo;
        this.buildService = buildService;
    }

    @PostConstruct
    void init() {
        modelValues = new HashMap<>(ModelType.values().length);

        // Denotes how many fields the Model has
        modelValues.put(ModelType.USER, new ModelInfo<User>(5, buildService::buildUser));
        modelValues.put(ModelType.ITEM, new ModelInfo<Item>(8, buildService::buildItem));
        modelValues.put(ModelType.CAR, new ModelInfo<Car>(8, buildService::buildCar));
        modelValues.put(ModelType.TRANSACTION, new ModelInfo<Transaction>(5, buildService::buildTransaction));
    }

    @SuppressWarnings("unchecked")
    @SneakyThrows
    private <T extends Entities> List<T> readAndSaveModelCSV(String filePath, ModelType modelType) throws IOException, BadCSVFormatException {

        String path = String.format("%s/Backend/Eindopdracht/src/main/java/com/itvitae/Eindopdracht/Seeder/%s", System.getProperty("user.dir"), filePath);
        BadCSVFormatException.filePath = path;

        try (BufferedReader br = new BufferedReader(new FileReader(path))) {

            List<T> resultList = new ArrayList<>();
            String line;
            int lineCount = 1;

            // Skip first info comment line
            br.readLine();

            while ((line = br.readLine()) != null) {
                lineCount++;
                BadCSVFormatException.lineNumber = lineCount;

                if (line.isBlank())
                    continue;

                // Uses '|' as a separator
                List<String> values = List.of(line.split("\\|"));

                int totalValues = modelValues.get(modelType).columnFieldCount();
                if (values.size() != totalValues)
                    throw new BadCSVFormatException(String.format("Amount of values on this line is not correct, put %s values in", totalValues));


                resultList.add((T)modelValues.get(modelType).buildFunction.apply(values));
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

        // Saving items must come before saving the transactions, because a transaction depends on an item already existing
        this.userRepo.saveAll(this.readAndSaveModelCSV("users.csv", ModelType.USER));
        this.carRepo.saveAll(this.readAndSaveModelCSV("cars.csv", ModelType.CAR));
        this.itemRepo.saveAll(this.readAndSaveModelCSV("items.csv", ModelType.ITEM));
        this.transactionRepo.saveAll(this.readAndSaveModelCSV("transactions.csv", ModelType.TRANSACTION));
        this.buildService.clearReferenceIDs();
    }
}
