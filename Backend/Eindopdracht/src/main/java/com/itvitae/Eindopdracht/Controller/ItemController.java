package com.itvitae.Eindopdracht.Controller;
import com.itvitae.Eindopdracht.Model.Item;
import jakarta.persistence.*;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import com.itvitae.Eindopdracht.Service.ItemService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item")
public class ItemController {
    private final ItemRepository itemRepository;
    private final ItemService itemService;

    ItemController(ItemRepository itemRepository, ItemService itemService) {
        this.itemRepository = itemRepository;
        this.itemService = itemService;
    }

    // search or filter specific products | returns array of products | if OK else return []
//    @GetMapping("/search")
//    Item[] getItems(@RequestParam String query, @RequestParam String filters) {
//
//    }


}
