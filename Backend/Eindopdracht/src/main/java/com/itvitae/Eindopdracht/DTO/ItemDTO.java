package com.itvitae.Eindopdracht.DTO;

import com.itvitae.Eindopdracht.Enum.ItemType;
import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Model.Car;

public record ItemDTO(
        Long id,
        String name,
        Double price,
        Car car,
        ItemType type,
        String description,
        Short storageSpace,
        Status status,
        String imgUrl
) {}
