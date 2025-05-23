package com.itvitae.Eindopdracht.Model;

import com.itvitae.Eindopdracht.Generic.Entities;
import jakarta.persistence.*;
import lombok.*;
import java.sql.Date;

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
    private Date rentedAt;

    @Column(nullable = false)
    private Date rentedUntil;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User rentingUser;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Item item;
}
