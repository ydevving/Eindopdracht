package com.itvitae.Eindopdracht.Model;

import com.itvitae.Eindopdracht.Enum.ItemType;
import jakarta.persistence.*;
import lombok.*;
import com.itvitae.Eindopdracht.Enum.Status;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column
    private long id;

    @Column(nullable = false)
    private String name;

    @Column (nullable = false)
    private double price;

    @OneToOne
    @JoinColumn(nullable = true)
    private Car car;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemType type;

    @Column(nullable = false)
    private String description;

    @Column(nullable = true)
    private short storageSpace;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

}
