package com.itvitae.Eindopdracht.DTO;

import com.itvitae.Eindopdracht.Enum.ItemType;
import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Model.Car;

public record ItemDTO(
        Long id,
        String imageURL,
        String name,
        Double price,
        String description,
        Short storageSpace,
        ItemType type,
        Status status,
        Car car) {}
