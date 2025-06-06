package com.itvitae.Eindopdracht.Service;

import com.itvitae.Eindopdracht.DTO.TransactionDTO;
import com.itvitae.Eindopdracht.DTO.TransactionMinimalDTO;
import com.itvitae.Eindopdracht.DTO.UserDTO;
import com.itvitae.Eindopdracht.DTO.UserMinimalDTO;
import com.itvitae.Eindopdracht.Model.Transaction;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {

    public TransactionService() {
    }

    public List<TransactionDTO> generateTransactionDTOList(List<Transaction> transactions) {
        List<TransactionDTO> transactionDTOList = new ArrayList<>();
        for (int i = 0; i < transactions.size(); i++) {
            UserDTO userDTO = new UserDTO(transactions.get(i).getRentingUser().getUsername(),
                    transactions.get(i).getRentingUser().getEmail(),
                    transactions.get(i).getRentingUser().getAddress(),
                    transactions.get(i).getRentingUser().getCity()
            );
            TransactionDTO transactionDTO = new TransactionDTO(
                    transactions.get(i).getId(),
                    transactions.get(i).getRentedAt(),
                    transactions.get(i).getRentedUntil(),
                    userDTO,
                    transactions.get(i).getItem()
            );
            transactionDTOList.add(transactionDTO);

        }
        return transactionDTOList;
    }


    public List<TransactionMinimalDTO> generateTransactionMinimalDTOList(List<Transaction> transactions) {
        List<TransactionMinimalDTO> transactionMinimalDTOList = new ArrayList<>();
        for (int i = 0; i < transactions.size(); i++) {
            UserMinimalDTO userDTO = new UserMinimalDTO(transactions.get(i).getRentingUser().getUsername()
            );

            TransactionMinimalDTO transactionDTO = new TransactionMinimalDTO(
                    transactions.get(i).getId(),
                    transactions.get(i).getItem(),
                    transactions.get(i).getRentedAt(),
                    transactions.get(i).getRentedUntil(),
                    userDTO);

            transactionMinimalDTOList.add(transactionDTO);

        }
        return transactionMinimalDTOList;
    }
}

