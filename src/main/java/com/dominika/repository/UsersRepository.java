package com.dominika.repository;

import com.dominika.model.Uzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Uzytkownik, Long> {
    Uzytkownik findByEmail(String email);
    Uzytkownik save(Uzytkownik u);
//
//    void updateRelation(Long id, Uzytkownik uzytkownik);
}
