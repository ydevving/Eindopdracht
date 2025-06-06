package com.itvitae.Eindopdracht.Service;

import com.itvitae.Eindopdracht.DTO.ItemDTO;
import com.itvitae.Eindopdracht.Enum.ItemType;
import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Model.Car;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    public ItemService() {};
    @Autowired
    ItemRepository itemRepo;

    public Optional<Item> getItemFromId(Long id) {
        return itemRepo.findById(id);
    }

    public List<ItemDTO> generateItemDTOList(List<Item> itemList) {
        return itemList.stream().map((v) -> new ItemDTO(
                v.getId(),
                v.getName(),
                v.getPrice(),
                v.getCar(),
                v.getType(),
                v.getDescription(),
                v.getStorageSpace(),
                v.getStatus(),
                v.getImgUrl()
        )
        ).toList();
    }

    public ItemDTO setStatusAdmin(Long id){

        Item item = itemRepo.findById(id).orElseThrow();

        item.setStatus(
                (item.getStatus().equals(Status.BROKEN)) ? null : Status.BROKEN
        );

        item = itemRepo.save(item);

        return mapToItemDTO(item);
    }

    public ItemDTO setStatusUser(Long id){
        Item item = itemRepo.findById(id).orElseThrow();

        if(item.getStatus() == null){
            item.setStatus(Status.BROKEN);

            item = itemRepo.save(item);

            return mapToItemDTO(item);
        }

        return mapToItemDTO(item);
    }

    public ItemDTO mapToItemDTO(Item item){

        return new ItemDTO(
                item.getId(),
                item.getName(),
                item.getPrice(),
                item.getCar(),
                item.getType(),
                item.getDescription(),
                item.getStorageSpace(),
                item.getStatus(),
                item.getImgUrl()
        );

    }
}
