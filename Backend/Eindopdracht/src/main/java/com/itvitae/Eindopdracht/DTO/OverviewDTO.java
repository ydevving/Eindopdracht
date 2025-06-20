package com.itvitae.Eindopdracht.DTO;

import com.itvitae.Eindopdracht.Model.Transaction;

import java.util.List;

public record OverviewDTO(
        List<ItemDTO> available,
        List<TransactionDTO> late,
        List<TransactionDTO> damaged,
        List<TransactionDTO> rentals
) {}
