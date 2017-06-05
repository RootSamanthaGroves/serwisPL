package com.dominika.repository;

import com.dominika.model.Auto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarsRepository extends JpaRepository<Auto, Long> {
    Auto findOne(long id);
    Auto save(Auto u);
    List<Auto> findAll();
    void deleteAutoById (long id);
//
//    void updateRelation(Long id, Uzytkownik uzytkownik);
}
