package com.itvitae.Eindopdracht.Controller;
import com.itvitae.Eindopdracht.Annotation.Auth;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import com.itvitae.Eindopdracht.Service.ItemService;
import com.itvitae.Eindopdracht.DTO.ItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemService itemService;

    @GetMapping
    @Auth
    List<ItemDTO> getAllItems() {
        return itemService.generateItemDTOList(itemRepository.findAll());
   }

   @GetMapping("/{itemId}")
   ResponseEntity<Item> getItem(@PathVariable long itemId) {
        Optional<Item> itemOptional = itemRepository.findById(itemId);
        return (itemOptional.isEmpty()) ?
                ResponseEntity.notFound().build()
                : ResponseEntity.ok().body(itemOptional.get());
    }
}
