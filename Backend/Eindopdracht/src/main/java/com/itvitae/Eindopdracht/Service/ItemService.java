package com.itvitae.Eindopdracht.Service;

import com.itvitae.Eindopdracht.DTO.ItemDTO;
import com.itvitae.Eindopdracht.DTO.ItemsUserDTO;
import com.itvitae.Eindopdracht.DTO.UserDTO;
import com.itvitae.Eindopdracht.DTO.UserMinimalDTO;
import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import com.itvitae.Eindopdracht.Repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemService {

    ItemRepository itemRepo;
    TransactionRepository transactionRepo;

    public ItemService(
            ItemRepository itemRepo,
            TransactionRepository transactionRepo
    ) {
        this.itemRepo = itemRepo;
        this.transactionRepo = transactionRepo;
    };

    public Optional<Item> getItemFromId(Long id) {
        return itemRepo.findById(id);
    }

    public List<ItemDTO> getAvailableItems() {
        return itemRepo.findByStatus(Status.AVAILABLE).stream().map(this::mapToItemDTO).toList();
    }

    public List<ItemsUserDTO> getRentedItems() {
        LocalDate currentDate = LocalDate.now();

        return transactionRepo.findRentals(currentDate).stream()
                .map(transaction -> {
                    User user = transaction.getRentingUser();

                    return new ItemsUserDTO(
                        List.of(transaction.getItem()),
                        new UserDTO(user.getUsername(), user.getEmail(), user.getAddress(), user.getCity())
                    );
                })
                .collect(Collectors.toList());
    }

    public List<ItemsUserDTO> getLateRentals() {
        LocalDate currentDate = LocalDate.now();

        return transactionRepo.findLateRentals(currentDate).stream()
                .map(transaction -> {
                            User user = transaction.getRentingUser();

                            return new ItemsUserDTO(
                                    List.of(transaction.getItem()),
                                    new UserDTO(user.getUsername(), user.getEmail(), user.getAddress(), user.getCity())
                            );
                })
                .collect(Collectors.toList());
    }

    public List<ItemsUserDTO> getDamagedRentals() {
        LocalDate currentDate = LocalDate.now();

        return transactionRepo.findDamagedRentals().stream()
                .map(transaction -> {
                    User user = transaction.getRentingUser();

                    return new ItemsUserDTO(
                            List.of(transaction.getItem()),
                            new UserDTO(user.getUsername(), user.getEmail(), user.getAddress(), user.getCity())
                    );
                })
                .collect(Collectors.toList());
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
