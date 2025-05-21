package com.itvitae.Eindopdracht.Repository;

import com.itvitae.Eindopdracht.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
