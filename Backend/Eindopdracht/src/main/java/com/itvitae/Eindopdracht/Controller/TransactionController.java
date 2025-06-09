package com.itvitae.Eindopdracht.Controller;

import com.itvitae.Eindopdracht.Annotation.Auth;
import com.itvitae.Eindopdracht.DTO.TransactionDTO;
import com.itvitae.Eindopdracht.DTO.TransactionMinimalDTO;
import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Repository.TransactionRepository;
import com.itvitae.Eindopdracht.Service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = {"*"}, methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
public class TransactionController {
    TransactionRepository transactionRepository;
    TransactionService transactionService;

    public TransactionController(TransactionRepository TR, TransactionService TS) {
        this.transactionRepository = TR;
        this.transactionService = TS;
    }

    // Users get less information about other users (UserMinimalDTO) when searching for transactions
    // searching based on itemId
    @Auth
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