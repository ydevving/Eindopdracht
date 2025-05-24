package com.itvitae.Eindopdracht.Seeder;

import com.itvitae.Eindopdracht.Enum.FuelType;
import com.itvitae.Eindopdracht.Enum.ItemType;
import com.itvitae.Eindopdracht.Enum.Status;
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
import com.itvitae.Eindopdracht.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URL;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
class BuildService {

    private final UserRepository userRepo;
    private final CarRepository carRepo;
    private final ItemRepository itemRepo;
    private final TransactionRepository transactionRepo;

    private final CarService carService;
    private final UserService userService;

    private static HashMap<Integer, Item> REF_ID = new HashMap<>();
    private static String EMAIL_REGEX = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";

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

    public static boolean isValidEmail(String email) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);

        return matcher.find();
    }

    @Autowired
    BuildService(
            UserRepository userRepo,
            CarRepository carRepo,
            ItemRepository itemRepo,
            TransactionRepository transactionRepo,

            CarService carService,
            UserService userService
    ) {
        this.userRepo = userRepo;
        this.carRepo = carRepo;
        this.itemRepo = itemRepo;
        this.transactionRepo = transactionRepo;
        this.carService = carService;
        this.userService = userService;
    }

    @SuppressWarnings("unchecked")
    public <T extends Entities> T buildUser(List<String> values) throws Seeder.BadCSVFormatException {
        String username = values.get(0);

        if (username.equals("NULL"))
            throw new Seeder.BadCSVFormatException("USERNAME (1st column) cannot be null!");

        String password = values.get(1);

        if (password.equals("NULL"))
            throw new Seeder.BadCSVFormatException("PASSWORD (2nd column) cannot be null!");

        String email = values.get(2);

        if (email.equals("NULL"))
            throw new Seeder.BadCSVFormatException("EMAIL (3rd column) cannot be null!");

        if (!isValidEmail(email))
            throw new Seeder.BadCSVFormatException("EMAIL (3rd column) is not a valid email!");

        User user = User.builder()
                .username(username)
                .password(password)
                .email(email)
                .city(values.get(3))
                .address(values.get(4))
                .build();

        return (T)userRepo.save(user);
    }

    @SuppressWarnings("unchecked")
    public <T extends Entities> T buildCar(List<String> values) throws Seeder.BadCSVFormatException {
        String licensePlate = values.get(0);

        if (!carService.isValidFormat(licensePlate))
            throw new Seeder.BadCSVFormatException("LICENSE_PLATE (1st column) is not in a valid format!");

        String brand = values.get(1);

        if (brand.equals("NULL"))
            throw new Seeder.BadCSVFormatException("BRAND (2nd column) cannot be null!");

        String _transmission = values.get(2);
        boolean transmission;

        if (_transmission.equalsIgnoreCase("automatic"))
            transmission = true;
        else if (_transmission.equalsIgnoreCase("manual"))
            transmission = false;
        else
            throw new Seeder.BadCSVFormatException("TRANSMISSION (3rd column) is not in a valid format! Let it either be 'AUTOMATIC' or 'MANUAL'");

        Short seats;

        try {
            seats = Short.valueOf(values.get(3));
        } catch (NumberFormatException e) {
            throw new Seeder.BadCSVFormatException("SEATS (4th column) must be a valid 'short' type number");
        }

        Short towWeight;

        try {
            towWeight = Short.valueOf(values.get(4));
        } catch (NumberFormatException e) {
            throw new Seeder.BadCSVFormatException("TOW_WEIGHT (5th column) must be a valid 'short' type number");
        }

        Integer kilometerCounter;

        try {
            kilometerCounter = Integer.valueOf(values.get(5));
        } catch (NumberFormatException e) {
            throw new Seeder.BadCSVFormatException("KM_COUNTER (6th column) must be a valid 'integer' type number");
        }

        Short modelYear;

        try {
            modelYear = Short.valueOf(values.get(6));
        } catch (NumberFormatException e) {
            throw new Seeder.BadCSVFormatException("MODEL_YEAR (7th column) must be a valid 'short' type number");
        }

        FuelType fuelType;

        try {
            fuelType = FuelType.valueOf(values.get(7).toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new Seeder.BadCSVFormatException("FUEL_TYPE (8th column) must be a valid 'FuelType' enum constant");
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

        return (T)carRepo.save(car);
    }

    @SuppressWarnings("unchecked")
    public <T extends Entities> T buildItem(List<String> values) throws Seeder.BadCSVFormatException {
        String name = values.get(0);

        if (name.equals("NULL"))
            throw new Seeder.BadCSVFormatException("NAME (1st column) cannot be null!");

        Double price;

        try {
            price = Double.valueOf(values.get(1));
        } catch (NumberFormatException e) {
            throw new Seeder.BadCSVFormatException("PRICE (2nd column) must be a valid 'double' type number");
        }

        String value = values.get(2);
        boolean isNull = value.equals("NULL");

        // If value is not null (so there is a value written) then try to get car by license plate
        Optional<Car> car = (!isNull) ? this.carService.getCarByLicenseplate(value) : Optional.empty();

        if (car.isEmpty() && !isNull)
            throw new Seeder.BadCSVFormatException("CAR (3th column) does not exist in the Database!");

        ItemType type;

        try {
            type = ItemType.valueOf(values.get(3).toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new Seeder.BadCSVFormatException("TYPE (4th column) must be a valid 'ItemType' enum constant");
        }

        String imgURL = (values.get(4).equals("NULL")) ? null : values.get(4);

        if (!isValidURL(imgURL))
            throw new Seeder.BadCSVFormatException("IMAGE_URL (5th column) is an invalid URL, note: must be in HTTP(S) format");

        String description = values.get(5);

        if (description.equals("NULL"))
            throw new Seeder.BadCSVFormatException("DESCRIPTION (6th column) cannot be null!");

        Short storageSpace = null;

        try {
            if (!values.get(6).equals("NULL"))
                storageSpace = Short.valueOf(values.get(6));
        } catch (NumberFormatException e) {
            throw new Seeder.BadCSVFormatException("STORAGE_SPACE (7th column) must be a valid 'short' type number");
        }

        Item item = Item.builder()
                .name(name)
                .price(price)
                .car(car.orElse(null))
                .type(type)
                .description(description)
                .storageSpace(storageSpace)
                .status(Status.OPERABLE)
                .imgUrl(imgURL)
                .build();

        Integer item_ref;

        try {
            item_ref = (!values.get(7).equals("NULL")) ? Integer.valueOf(values.get(7)) : null;
        } catch (NumberFormatException e) {
            throw new Seeder.BadCSVFormatException("ITEM_UNIQUE_REF (8th column) is not a valid Integer!");
        }

        if (item_ref != null)
            REF_ID.put(item_ref, item);

        return (T)itemRepo.save(item);
    }

    @SuppressWarnings("unchecked")
    public <T extends Entities> T buildTransaction(List<String> values) throws Seeder.BadCSVFormatException, IOException {
        if (values.get(2).equals("NULL"))
            throw new Seeder.BadCSVFormatException("USER (1st column) cannot be null!");

        Optional<User> user = this.userService.exists(values.get(2));

        if (user.isEmpty())
            throw new Seeder.BadCSVFormatException("USER (1st column) does not exist in Database!");

        Integer item_ref;

        try {
            item_ref = Integer.valueOf(values.get(3));
        } catch (NumberFormatException e) {
            throw new Seeder.BadCSVFormatException("ITEM_UNIQUE_REF (4th column) must be a valid number");
        }

        Item item = REF_ID.get(item_ref);

        if (item == null)
            throw new Seeder.BadCSVFormatException("ITEM_UNIQUE_REF (4th column) is not present in the REF_ID array");

        Transaction transaction = Transaction.builder()
                .rentedAt(Date.valueOf(values.get(0)))
                .rentedUntil(Date.valueOf(values.get(1)))
                .rentingUser(user.get())
                .item(item)
                .build();

        transaction = transactionRepo.save(transaction);

        REF_ID.clear(); // Clear linking relationship list so it can be prepared for future iterations

        return (T)transaction;
    }

}
