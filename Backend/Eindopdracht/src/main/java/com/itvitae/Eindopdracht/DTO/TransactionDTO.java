package com.itvitae.Eindopdracht.DTO;

import java.sql.Date;
import java.time.LocalDate;

import com.itvitae.Eindopdracht.Model.Item;

public record TransactionDTO(long id, Item item, LocalDate rentedAt, LocalDate rentedUntil, UserDTO rentingUser) {
}
