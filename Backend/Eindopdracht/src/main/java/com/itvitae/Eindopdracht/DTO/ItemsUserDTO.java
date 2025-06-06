package com.itvitae.Eindopdracht.DTO;

import com.itvitae.Eindopdracht.Model.Item;

import java.util.List;

public record ItemsUserDTO(
        List<Item> item,
        UserDTO username
) {}
