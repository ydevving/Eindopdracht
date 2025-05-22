package com.itvitae.Eindopdracht.Repository;

import com.itvitae.Eindopdracht.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByType(String type);


}
