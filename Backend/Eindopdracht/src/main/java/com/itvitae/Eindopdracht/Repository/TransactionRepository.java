package com.itvitae.Eindopdracht.Repository;

import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByRentingUserUsername(String username);
    List<Transaction> findAllByItemId(long itemId);
}
