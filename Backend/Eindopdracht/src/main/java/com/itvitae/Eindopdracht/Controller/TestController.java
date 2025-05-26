package com.itvitae.Eindopdracht.Controller;

import com.itvitae.Eindopdracht.Annotation.Auth;
import com.itvitae.Eindopdracht.DTO.TransactionDTO;
import com.itvitae.Eindopdracht.DTO.TransactionMinimalDTO;
import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Repository.TransactionRepository;
import com.itvitae.Eindopdracht.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = {"http://localhost:5173"}, methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
public class TestController {
    private final TransactionRepository transactionRepository;

    @Autowired
    private TransactionService transactionService;

    TestController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // USER role needs to be able to acces it, without USER access denied
    @GetMapping("/home")
    @Auth
    public ResponseEntity<String> handleWelcomeUser() {
        System.out.println("/Home");
        return new ResponseEntity<>("Hello World!", HttpStatus.CREATED);
    }

    // ADMIN role can access this role
    @GetMapping("/admin")
    @Auth(admin = true)
    public ResponseEntity<String> handleWelcomeAdmin() {
        System.out.println("/admin");
        return new ResponseEntity<>("Welcome, admin!", HttpStatus.OK);
    }

    // Any user can access this
    @GetMapping("/ping")
    public String pingPong() {
        return "Pong!";
    }


    // Admin can find all transactions for a specific item including more information about the rentinguser
    // Searching based on itemId
    @GetMapping("/admin/transactions/item/{itemId}")
    List<TransactionDTO> getAllByItemId(@PathVariable long itemId) {
        List<Transaction> transactions = transactionRepository.findAllByItemId(itemId);
        return this.transactionService.generateTransactionDTOList(transactions);
    }


    // Users get less information about other users (UserMinimalDTO) when searching for transactions
    // searching based on itemId
    @GetMapping("/user/transactions/item/{itemId}")
    List<TransactionMinimalDTO> getAllByItemIdMinimal(@PathVariable long itemId) {
        List<Transaction> transactions = transactionRepository.findAllByItemId(itemId);
        return this.transactionService.generateTransactionMinimalDTOList(transactions);
    }
}
