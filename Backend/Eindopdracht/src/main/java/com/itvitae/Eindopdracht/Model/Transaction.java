package com.itvitae.Eindopdracht.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.itvitae.Eindopdracht.Generic.Entities;
import jakarta.persistence.*;
import lombok.*;
import java.sql.Date;
import java.time.LocalDate;

@Entity
@Table(name = "_transaction")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction implements Entities {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column
    private Long id;

    @Column(nullable = false)
    private LocalDate rentedAt;

    @Column(nullable = false)
    private LocalDate rentedUntil;

    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonManagedReference
    private User rentingUser;

    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonManagedReference
    private Item item;
}
