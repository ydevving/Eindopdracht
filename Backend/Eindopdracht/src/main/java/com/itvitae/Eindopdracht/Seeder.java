package com.itvitae.Eindopdracht;

import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class Seeder implements CommandLineRunner {

    @Autowired
    UserRepository userRepo;

    private List<User> addUsers() {
        return userRepo.saveAll(
                Set.of(
                        User.builder()
                            .username("admin")
                            .password("admin")
                            .email("admin@logistica.nl")
                            .address("Diggity Doggity Street 420")
                            .city("Happyland")
                            .build(),

                        User.builder()
                                .username("henkie_penkie")
                                .password("1234")
                                .email("henkiepenkie@logistica.nl")
                                .address("Based Street 4000")
                                .city("Wasteland")
                                .build()
                )
        );
    }

    @Override
    @Transactional
    public void run(String... args) {
        addUsers();
    }
}
