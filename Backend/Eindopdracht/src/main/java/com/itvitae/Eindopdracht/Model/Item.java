package com.itvitae.Eindopdracht.Model;

import com.itvitae.Eindopdracht.Enum.ItemType;
import com.itvitae.Eindopdracht.Generic.Entities;
import jakarta.persistence.*;
import lombok.*;
import com.itvitae.Eindopdracht.Enum.Status;

import java.util.Set;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item implements Entities {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column (nullable = false)
    private Double price;

    @OneToOne
    @JoinColumn(nullable = true)
    private Car car;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemType type;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = true)
    private Short storageSpace;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @OneToMany(mappedBy = "item")
    private Set<Transaction> transactions;

}
