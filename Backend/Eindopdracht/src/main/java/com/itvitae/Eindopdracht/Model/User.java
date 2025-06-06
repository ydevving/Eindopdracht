package com.itvitae.Eindopdracht.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.itvitae.Eindopdracht.Generic.Entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements Entities {

    @Id
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String address;

    @Column (nullable = false)
    private String city;

    @OneToMany(mappedBy = "rentingUser")
    @JsonBackReference
    private List<Transaction> transactions;

    @OneToOne(mappedBy = "rentingUser", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonBackReference
    private Item rentingItem;
}
