package com.itvitae.Eindopdracht.DTO;

import java.util.List;

public record OverviewDTO(
        List<ItemDTO> available,
        List<ItemsUserDTO> late,
        List<ItemsUserDTO> damaged,
        List<ItemsUserDTO> rentals
) {}
