package com.itvitae.Eindopdracht.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.itvitae.Eindopdracht.Generic.Entities;
import jakarta.persistence.*;
import lombok.*;
import com.itvitae.Eindopdracht.Enum.FuelType;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Car implements Entities {

    @Id
    @Column
    private String licenseplate;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private Boolean isAutomatic;

    @Column(nullable = false)
    private Short seats;

    @Column(nullable = false)
    private Short towWeight;

    @Column(nullable = false)
    private Integer kilometerCounter;

    @Column(nullable = false)
    private Short modelYear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fuelType;

    @OneToOne(mappedBy = "car", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonBackReference
    private Item item;


}
