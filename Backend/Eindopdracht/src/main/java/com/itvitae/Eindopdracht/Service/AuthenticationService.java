package com.itvitae.Eindopdracht.Service;

import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import javax.swing.text.html.Option;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Stream;

@Service
public class AuthenticationService {
    static HashMap<User, String> userList = new HashMap<>();
    static HashMap<User, String> adminList = new HashMap<>();

    static private boolean initialized = false;

    @Autowired
    UserRepository userRepo;

    AuthenticationService() throws SQLException {
        // Access control list

        if (initialized || userRepo == null)
            return;

        Optional<User> admin = userRepo.findByUsername("admin");

        if (!(admin.isPresent()))
            throw new SQLException("User 'admin' has not been found in the Database!");

        this.adminList.put(admin.get(), generateToken());

        initialized = true;
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    public boolean authenticateUser(User user) {
        return (this.userList.get(user) != null);
    }

    public boolean authenticateAdmin(User user) {
        return (this.adminList.get(user) != null);
    }

    public String add(User user) {
        if (user.getUsername().equals("admin"))
            return this.addAdmin(user);

        return this.addUser(user);
    }

    public String addUser(User user) {
        String token = this.generateToken();

        this.userList.put(user, token);

        return token;
    }

    public String addAdmin(User user) {
        String token = generateToken();

        this.userList.put(user, token);
        this.adminList.put(user, token);

        return token;
    }

    public Boolean isAdmin(User user) {
        return user.getUsername().equals("admin");
    }

    public Optional<User> retrieveUserFromToken(String token) {
        return Stream.concat(adminList.entrySet().stream(), userList.entrySet().stream())
                .filter(entry -> entry.getValue().equals(token))
                .map(Map.Entry::getKey)
                .findFirst();
    }
}
