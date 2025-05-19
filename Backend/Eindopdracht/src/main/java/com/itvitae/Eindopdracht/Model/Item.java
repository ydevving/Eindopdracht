package com.itvitae.Eindopdracht.Model;

import com.itvitae.Eindopdracht.Enum.itemType;
import jakarta.persistence.*;
import lombok.*;
import com.itvitae.Eindopdracht.Enum.status;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {
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
    private itemType type;

    @Column(nullable = false)
    private String description;

    @Column(nullable = true)
    private short storageSpace;

    @Column(nullable = false)
    private status status;

}
