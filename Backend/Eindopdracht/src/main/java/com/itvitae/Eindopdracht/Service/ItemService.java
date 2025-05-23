package com.itvitae.Eindopdracht.Service;

import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemService {
    @Autowired
    ItemRepository itemRepo;

    public Optional<Item> getItemFromId(Long id) {
        return itemRepo.findById(id);
    }
}
