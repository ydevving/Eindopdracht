package com.itvitae.Eindopdracht.DTO;

import com.itvitae.Eindopdracht.Model.Item;

import java.sql.Date;

public record TransactionMinimalDTO(long id, Item item, Date rentedAt, Date rentedUntil, UserMinimalDTO rentingUser) {
}
