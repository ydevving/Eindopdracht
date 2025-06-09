package com.itvitae.Eindopdracht.DTO;

import com.itvitae.Eindopdracht.Model.Transaction;

import java.util.List;

public record TransactionsUserDTO(
        List<Transaction> transactions,
        UserDTO user
) {}
