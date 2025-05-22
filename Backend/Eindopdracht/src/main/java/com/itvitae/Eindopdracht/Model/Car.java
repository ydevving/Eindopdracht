package com.itvitae.Eindopdracht.Model;

import jakarta.persistence.*;
import lombok.*;
import com.itvitae.Eindopdracht.Enum.FuelType;
import com.itvitae.Eindopdracht.Enum.TransmissionTypes;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Car {

    @Id
    @Column
    private String licenseplate;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private Boolean isAutomatic;

    @Column(nullable = false)
    private Short Seats;

    @Column(nullable = false)
    private Short towWeight;

    @Column(nullable = false)
    private Integer kilometerCounter;

    @Column(nullable = false)
    private Short modelYear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fuelType;

    @OneToOne(mappedBy = "car")
    private Item item;

}
