package com.itvitae.Eindopdracht.Repository;

import com.itvitae.Eindopdracht.Model.Car;
import com.itvitae.Eindopdracht.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, String> {
    List<Item> findAllByBrand(String brand);
}
