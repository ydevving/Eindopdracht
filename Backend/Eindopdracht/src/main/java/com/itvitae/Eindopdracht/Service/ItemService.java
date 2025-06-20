package com.itvitae.Eindopdracht.Service;

import com.itvitae.Eindopdracht.DTO.*;
import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import com.itvitae.Eindopdracht.Repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    public boolean isItemRented(long id) throws SQLException {
        Optional<Item> item = itemRepo.findById(id);

        if (item.isEmpty())
            throw new SQLException("Item could not be fetched or found");

        if (item.get().getStatus().equals(Status.RENTED))
            return true;
        else if (item.get().getStatus().equals(Status.AVAILABLE))
            return false;

        throw new RuntimeException("Status is not either 'RENTED' or 'AVAILABLE");
    }

    public List<ItemDTO> getAvailableItems() {
        return itemRepo.findByStatus(Status.AVAILABLE).stream().map(this::mapToItemDTO).toList();
    }

    public List<TransactionDTO> getLateRentals() {
        LocalDate currentDate = LocalDate.now();

        return transactionRepo.findLateRentals(currentDate)
                .stream()
                .map((t) -> (new TransactionDTO(t.getId(),
                        t.getRentedAt(),
                        t.getRentedUntil(),
                        new UserDTO(t.getRentingUser().getUsername(), t.getRentingUser().getEmail(), t.getRentingUser().getAddress(), t.getRentingUser().getCity()),
                        t.getItem()
                )
                )).toList();
    }

    public List<TransactionDTO> getDamagedRentals() {
        LocalDate currentDate = LocalDate.now();

        return transactionRepo.findDamagedRentals()
                .stream()
                .map((t) -> (new TransactionDTO(t.getId(),
                        t.getRentedAt(),
                        t.getRentedUntil(),
                        new UserDTO(t.getRentingUser().getUsername(), t.getRentingUser().getEmail(), t.getRentingUser().getAddress(), t.getRentingUser().getCity()),
                        t.getItem()
                        )
                )).toList();
    }

    public List<TransactionDTO> getRentedItems() {
        LocalDate currentDate = LocalDate.now();

        return transactionRepo.findRentals(currentDate)
                .stream()
                .map((t) -> (new TransactionDTO(t.getId(),
                        t.getRentedAt(),
                        t.getRentedUntil(),
                        new UserDTO(t.getRentingUser().getUsername(), t.getRentingUser().getEmail(), t.getRentingUser().getAddress(), t.getRentingUser().getCity()),
                        t.getItem()
                )
                )).toList();
    }

    public OverviewDTO getOverview() {
        return new OverviewDTO(getAvailableItems(), getLateRentals(), getDamagedRentals(), getRentedItems());
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

    public ItemDTO setStatusToAvailableAdmin(Long id){

        Item item = itemRepo.findById(id).orElseThrow();

        if (item.getStatus().equals(Status.RENTED)){
            item.setStatus(Status.AVAILABLE);

            item = itemRepo.save(item);

            return mapToItemDTO(item);
        }

        if (item.getStatus().equals(Status.BROKEN)) {
            item.setStatus(Status.AVAILABLE);

            item = itemRepo.save(item);

            return mapToItemDTO(item);
        }

        return mapToItemDTO(null);
    }

    public ItemDTO setStatusToBrokenUser(Long id){
        Item item = itemRepo.findById(id).orElseThrow();

        if(item.getStatus().equals(Status.RENTED)){
            item.setStatus(Status.BROKEN);

            item = itemRepo.save(item);

            return mapToItemDTO(item);
        }

        return null;
    }

    public boolean deleteItem(long itemID) {
        Optional<Item> item = itemRepo.findById(itemID);

        try {
            item.ifPresent(value -> itemRepo.delete(value));
            return true;
        } catch(Exception e) {
            return false;
        }
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
