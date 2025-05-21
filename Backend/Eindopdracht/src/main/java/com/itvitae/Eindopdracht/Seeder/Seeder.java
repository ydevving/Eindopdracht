package com.itvitae.Eindopdracht.Seeder;

import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class Seeder implements CommandLineRunner {

    public class BadCSVFormatException extends Exception {
        public BadCSVFormatException(String errorMessage, int lineNumber) {
            super(String.format("CSV Format error on line %d: %s", lineNumber, errorMessage));
        }
    }

    @Autowired
    UserRepository userRepo;

    private List<User> readCSV(String filePath) throws IOException, BadCSVFormatException {

        String path = String.format("%s/src/main/java/com/itvitae/Eindopdracht/Seeder/%s", System.getProperty("user.dir"), filePath);

        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            List<User> listOfUsers = new ArrayList<>();

            // Skip first comment line
            br.readLine();

            String line;
            int lineCount = 1;

            while((line = br.readLine()) != null) {
                lineCount++;

                List<String> values = List.of(line.split(","));

                if (values.size() != 5)
                    throw new BadCSVFormatException("Amount of values on this line is not correct, put 5 values in", lineCount);

                User user = User.builder()
                        .username(values.get(0))
                        .password(values.get(1))
                        .email(values.get(2))
                        .city(values.get(3))
                        .address(values.get(4))
                        .build();

                listOfUsers.add(user);

                for (String value : values) {
                    System.out.print(value + " ");
                }

                System.out.println();
            }

            return listOfUsers;
        } catch (IOException | BadCSVFormatException e) {
            System.err.println(e.getMessage());
            return new ArrayList<>();
        }
    }

    private List<User> addUsers() throws IOException, BadCSVFormatException {
        System.out.println(System.getProperty("user.dir"));
        return userRepo.saveAll(
                this.readCSV("users.csv")
        );
    }

    @Override
    @Transactional
    public void run(String... args) throws IOException, BadCSVFormatException {

        userRepo.deleteAll();

        addUsers();
    }
}
