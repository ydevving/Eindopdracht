package com.itvitae.Eindopdracht.Controller;

import com.itvitae.Eindopdracht.Annotation.Auth;
import com.itvitae.Eindopdracht.DTO.ItemDTO;
import com.itvitae.Eindopdracht.DTO.TransactionDTO;
import com.itvitae.Eindopdracht.DTO.TransactionMinimalDTO;
import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.TransactionRepository;
import com.itvitae.Eindopdracht.Service.AuthenticationService;
import com.itvitae.Eindopdracht.Service.ItemService;
import com.itvitae.Eindopdracht.Service.TransactionService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = {"*"}, methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
public class TransactionController {
    TransactionRepository transactionRepository;
    TransactionService transactionService;
    ItemService itemService;
    AuthenticationService authService;

    public TransactionController(TransactionRepository TR, TransactionService TS, ItemService IS, AuthenticationService AS) {
        this.transactionRepository = TR;
        this.transactionService = TS;
        this.itemService = IS;
        this.authService = AS;
    }

    @PostMapping("/rent/{itemid}")
    @Auth
    ResponseEntity<Transaction> rentItem(
            @RequestHeader("Authorization") String token,
            @PathVariable                   Long itemid,
            @RequestBody(required = true)   String dateuntil
    ) {

        Optional<User> _user = this.authService.retrieveUserFromToken(token);

        if (_user.isEmpty())
            return ResponseEntity.notFound().build();

        User user = _user.get();

        Optional<Item> _item = this.itemService.getItemFromId(itemid);

        if (_item.isEmpty())
            ResponseEntity.notFound().build();

        Item item = _item.get();

        LocalDate dateUntil;

        try {
            dateUntil = LocalDate.parse(dateuntil);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }

        try {

            if (this.itemService.isItemRented(itemid)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } else {

                item.setStatus(Status.RENTED);

                Transaction transaction = Transaction.builder()
                        .rentedAt(LocalDate.now())
                        .rentedUntil(dateUntil)
                        .rentingUser(user)
                        .item(item)
                        .build();

                transaction = transactionRepository.save(transaction);

                return ResponseEntity.ok(transaction);
            }
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Users get less information about other users (UserMinimalDTO) when searching for transactions
    // searching based on itemId
//    @Auth
    @GetMapping("/user/{username}")
    ResponseEntity<List<TransactionMinimalDTO>> getAllByUsernameMinimal(@PathVariable String username) {
        List<Transaction> transactions = transactionRepository.findAllByRentingUserUsername(username);
        if (transactions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(this.transactionService.generateTransactionMinimalDTOList(transactions));
    }

    // Admin can find all transactions for a specific item including more information about the renting user
    // Searching based on Username
    @Auth(requiresAdmin = true)
    @GetMapping("/admin/{username}")
    ResponseEntity<List<TransactionDTO>> getAllByUsername(@PathVariable String username) {
        List<Transaction> transactions = transactionRepository.findAllByRentingUserUsername(username);
        if (transactions.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(this.transactionService.generateTransactionDTOList(transactions));
    }
}