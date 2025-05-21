package com.itvitae.Eindopdracht.Service;

import java.util.Optional;

import com.itvitae.Eindopdracht.DTO.RegisterForm;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    public Optional<User> exists(String username) {
        return userRepo.findByUsername(username);
    }

    public Optional<User> emailExists(String email) { return userRepo.findByEmail(email); }

    public User createUser(RegisterForm registerForm) {
        return userRepo.save(
                User.builder()
                        .username(registerForm.username())
                        .password(registerForm.password())
                        .email(registerForm.email())
                        .city(registerForm.city())
                        .address(registerForm.address())
                        .build()
        );
    }
}
