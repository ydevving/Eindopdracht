package com.itvitae.Eindopdracht.DTO;

import com.itvitae.Eindopdracht.Model.Item;

import java.sql.Date;
import java.time.LocalDate;

public record TransactionMinimalDTO(long id, Item item, LocalDate rentedAt, LocalDate rentedUntil, UserMinimalDTO rentingUser) {
}
