package com.itvitae.Eindopdracht.Service;

import java.util.Optional;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserService {

    @Autowired
    UserRepository userRepo;

    public Optional<User> exists(String username) {
        return userRepo.findByUsername(username);
    }
}
