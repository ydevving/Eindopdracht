package com.itvitae.Eindopdracht.Controller;
import com.itvitae.Eindopdracht.Annotation.Auth;
import com.itvitae.Eindopdracht.DTO.TransactionDTO;
import com.itvitae.Eindopdracht.DTO.TransactionsUserDTO;
import com.itvitae.Eindopdracht.DTO.OverviewDTO;
import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.ItemRepository;
import com.itvitae.Eindopdracht.Service.AuthenticationService;
import com.itvitae.Eindopdracht.Service.ItemService;
import com.itvitae.Eindopdracht.DTO.ItemDTO;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/item")
@CrossOrigin(origins = {"*"}, methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH
})
public class ItemController {
    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemService itemService;

    @Autowired
    AuthenticationService authService;

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

        return ResponseEntity.ok(itemService.mapToItemDTO(item));
    }

    @DeleteMapping("/{itemId}")
    @Auth
    ResponseEntity deleteItem(@PathVariable long itemId) {

        Optional<Item> _item = this.itemService.getItemFromId(itemId);

        try {
            if (_item.isPresent()) {
                Item item = _item.get();

                if (item.getStatus().equals(Status.AVAILABLE))
                    this.itemService.deleteItem(itemId);
                else
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

                return ResponseEntity.ok().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("itemId should be a long value");
        } catch (OptimisticLockingFailureException e) {
            return ResponseEntity.badRequest().body("itemId OptimisticLockingFailureException exception");
        }

        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/user/broken/{itemId}")
    @Auth
    ResponseEntity<ItemDTO> modifyStatusUser(@RequestHeader("Authorization") String token, @PathVariable long itemId){

        Optional<User> _user = this.authService.retrieveUserFromToken(token);

        if (_user.isEmpty())
            return ResponseEntity.notFound().build();

        User user = _user.get();

        if (!this.authService.itemBelongsToUser(itemId, user.getUsername()) && !this.authService.isAdmin(user))
            return ResponseEntity.notFound().build();

        if(itemRepository.existsById(itemId)) {

            ItemDTO updatedDTO = itemService.setStatusToBrokenUser(itemId);

            if (updatedDTO != null)
                return ResponseEntity.ok(updatedDTO);

            return ResponseEntity.badRequest().build();

        }else{

            return ResponseEntity.notFound().build();
        }

        //Parts needed: itemDTO, ItemService(function to set status and map to DTO)

    }

    @PatchMapping("/admin/fixed/{itemId}")
    @Auth(requiresAdmin = true)
    ResponseEntity<ItemDTO> modifyStatusToBrokenAdmin(@PathVariable long itemId){

        if(itemRepository.existsById(itemId)) {

            ItemDTO updatedDTO = itemService.setStatusToAvailableAdmin(itemId);

            if (updatedDTO != null)
                return ResponseEntity.ok(updatedDTO);

            return ResponseEntity.badRequest().build();
        }else{

            return ResponseEntity.notFound().build();
        }

        //Parts needed: itemDTO, ItemService(function to set status and map to DTO)

    }

    @GetMapping("/available")
    ResponseEntity<List<ItemDTO>> getAvailableItems() {
        return ResponseEntity.ok(itemService.getAvailableItems());
    }

    @GetMapping("/late")
    ResponseEntity<List<TransactionDTO>> getLateRentals() {
        return ResponseEntity.ok(itemService.getLateRentals());
    }

    @GetMapping("/damaged")
    ResponseEntity<List<TransactionDTO>> getDamagedRentals() {
        return ResponseEntity.ok(itemService.getDamagedRentals());
    }

    @GetMapping("/rentals")
    ResponseEntity<List<TransactionDTO>> getRentals() {
        return ResponseEntity.ok(itemService.getRentedItems());
    }

    @GetMapping("/overview")
    ResponseEntity<OverviewDTO> getOverviewOfItems() {
        return ResponseEntity.ok(itemService.getOverview());
    }

}
