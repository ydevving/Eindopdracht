package com.itvitae.Eindopdracht.Service;

import com.itvitae.Eindopdracht.DTO.ItemDTO;
import com.itvitae.Eindopdracht.Enum.ItemType;
import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Model.Car;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
                v.getImgUrl(),
                v.getName(),
                v.getPrice(),
                v.getDescription(),
                v.getStorageSpace(),
                v.getType(),
                v.getStatus(),
                v.getCar())).toList();
    }

    public ItemDTO setStatus(Long id){

        Item item = itemRepo.findById(id).orElseThrow();

        if(item.getStatus() == Status.OPERABLE){
            item.setStatus(Status.BROKEN);
        }else{
            item.setStatus(Status.OPERABLE);
        }

        Item updatedItem = itemRepo.save(item);

        return mapToItem(updatedItem);
    }

    private ItemDTO mapToItem(Item item){

        return new ItemDTO(
                item.getId(),
                item.getImgUrl(),
                item.getName(),
                item.getPrice(),
                item.getDescription(),
                item.getStorageSpace(),
                item.getType(),
                item.getStatus(),
                item.getCar());

    }
}
