package com.itvitae.Eindopdracht.Service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AuthenticationService {
    static List<String> userList = new ArrayList<>();
    static List<String> adminList = new ArrayList<>();


    AuthenticationService() {
        // Access control list
        adminList.add("admin");
    }

    public boolean authenticateUser(String token) {
        if (userList.contains(token))
            return true;

        return false;
    }

    public boolean authenticateAdmin(String token) {
        if (adminList.contains(token))
            return true;

        return false;
    }

    public String addUser() {
        String token = UUID.randomUUID().toString();

        userList.add(token);

        return token;
    }

    public String addAdmin() {
        String token = UUID.randomUUID().toString();

        userList.add(token);
        adminList.add(token);

        return token;
    }
}
