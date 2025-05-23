package com.itvitae.Eindopdracht.Service;

import com.itvitae.Eindopdracht.Model.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itvitae.Eindopdracht.Repository.CarRepository;

import java.util.Optional;
import java.util.Random;

@Service
public class CarService {

    @Autowired
    CarRepository carRepo;

    public final String[] LICENSE_FORMATS = {"99-XX-XX", "99-XXX-9", "9-XXX-99",
                                         "XX-999-X", "XX-999-X", "XXX-99-X"};

    private static final String LETTERS = "ABCDEFGHJKLMNOPRSTUVWXYZ"; // Q and I usually excluded
    private static final Random RANDOM = new Random();

    public String generatePlate() {
        String format = LICENSE_FORMATS[RANDOM.nextInt(LICENSE_FORMATS.length)];
        StringBuilder plate = new StringBuilder();

        for (char ch : format.toCharArray()) {
            switch (ch) {
                case 'X':
                    plate.append(randomLetter());
                    break;
                case '9':
                    plate.append(randomDigit());
                    break;
                case '-':
                    plate.append('-');
                    break;
            }
        }

        return plate.toString();
    }

    private char randomLetter() {
        return LETTERS.charAt(RANDOM.nextInt(LETTERS.length()));
    }

    private char randomDigit() {
        return (char) ('0' + RANDOM.nextInt(10));
    }

    public Optional<Car> getCarByLicenseplate(String licensePlate) {
        return carRepo.findById(licensePlate);
    }
}
