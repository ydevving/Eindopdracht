package com.itvitae.Eindopdracht.Controller;
import com.itvitae.Eindopdracht.Annotation.Auth;
import com.itvitae.Eindopdracht.DTO.ItemsUserDTO;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import com.itvitae.Eindopdracht.Service.ItemService;
import com.itvitae.Eindopdracht.DTO.ItemDTO;
import org.apache.coyote.Response;
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
    ResponseEntity<List<ItemDTO>> getAllItems() {
        return ResponseEntity.ok(itemService.generateItemDTOList(itemRepository.findAll()));
   }

   @GetMapping("/{itemId}")
   @Auth
   ResponseEntity<ItemDTO> getItem(@PathVariable long itemId) {
        Optional<Item> _item = itemRepository.findById(itemId);

        if (_item.isEmpty())
            ResponseEntity.notFound().build();

        Item item = _item.get();

        return ResponseEntity.ok(this.itemService.mapToItemDTO(item));
    }

    @PatchMapping("/user/{itemId}")
    @Auth
    ResponseEntity<ItemDTO> modifyStatusUser(@PathVariable long itemId){

        if(itemRepository.existsById(itemId)) {

            ItemDTO updatedDTO = itemService.setStatusUser(itemId);

            return ResponseEntity.ok(updatedDTO);

        }else{

            return ResponseEntity.notFound().build();
        }

        //Parts needed: itemDTO, ItemService(function to set status and map to DTO)

    }

    @PatchMapping("/admin/{itemId}")
    @Auth(requiresAdmin = true)
    ResponseEntity<ItemDTO> modifyStatusAdmin(@PathVariable long itemId){

        if(itemRepository.existsById(itemId)) {

            ItemDTO updatedDTO = itemService.setStatusAdmin(itemId);

            return ResponseEntity.ok(updatedDTO);

        }else{

            return ResponseEntity.notFound().build();
        }

        //Parts needed: itemDTO, ItemService(function to set status and map to DTO)

    }

    @GetMapping("/available")
    ResponseEntity<List<ItemDTO>> getAvailableItems() {
        return ResponseEntity.ok(itemService.getAvailableItems());
    }

    @GetMapping("/rentals")
    ResponseEntity<List<ItemsUserDTO>> getRentals() {
        return ResponseEntity.ok(itemService.getRentedItems());
    }

    @GetMapping("/late")
    ResponseEntity<List<ItemsUserDTO>> getLateRentals() {
        return ResponseEntity.ok(itemService.getLateRentals());
    }

    @GetMapping("/damaged")
    ResponseEntity<List<ItemsUserDTO>> getDamagedRentals() {
        return ResponseEntity.ok(itemService.getDamagedRentals());
    }

}
