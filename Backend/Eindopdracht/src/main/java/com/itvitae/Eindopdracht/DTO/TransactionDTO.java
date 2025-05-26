package com.itvitae.Eindopdracht.DTO;

import java.sql.Date;
import com.itvitae.Eindopdracht.Model.Item;

public record TransactionDTO(long id, Item item, Date rentedAt, Date rentedUntil, UserDTO rentingUser) {
}
