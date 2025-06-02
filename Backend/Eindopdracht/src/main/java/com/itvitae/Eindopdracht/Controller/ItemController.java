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

        return ResponseEntity.ok(new ItemDTO(
                item.getId(),
                item.getImgUrl(),
                item.getName(),
                item.getPrice(),
                item.getDescription(),
                item.getStorageSpace(),
                item.getType(),
                item.getStatus(),
                item.getCar()
        ));
    }

    @PatchMapping("/{itemId}")
    @Auth
    ResponseEntity<ItemDTO> modifyStatus(@PathVariable long itemId){

        if(itemRepository.existsById(itemId)) {

            ItemDTO updatedDTO = itemService.setStatus(itemId);

            return ResponseEntity.ok(updatedDTO);

        }else{

            return ResponseEntity.notFound().build();
        }

        //Parts needed: itemDTO, ItemService(function to set status and map to DTO)

    }

}
