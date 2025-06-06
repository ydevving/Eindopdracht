package com.itvitae.Eindopdracht.Repository;

import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByRentingUserUsername(String username);
    List<Transaction> findAllByItemId(long itemId);

    @Query("SELECT t FROM Transaction t WHERE t.rentedUntil < :currentDate AND t.item.status = RENTED")
    List<Transaction> findLateRentals(LocalDate currentDate);

    @Query("SELECT t FROM Transaction t WHERE t.rentedUntil >= :currentDate AND t.item.status = RENTED")
    List<Transaction> findRentals(LocalDate currentDate);

    @Query("SELECT t FROM Transaction t WHERE t.item.status = BROKEN")
    List<Transaction> findDamagedRentals();
}
