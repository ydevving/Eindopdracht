package com.itvitae.Eindopdracht.Repository;

import com.itvitae.Eindopdracht.Enum.Status;
import com.itvitae.Eindopdracht.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByType(String type);


    List<Item> findByStatus(Status status);
}
