package com.dominika.repository;

import com.dominika.model.Auto;
import com.dominika.model.Logowanie;
import com.dominika.model.Uzytkownik;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by Dominika on 2017-04-12.
 */
@Repository
public class LogowanieRepository {
    @PersistenceContext
    private EntityManager entityManager;


    @Transactional
    public Uzytkownik save(Uzytkownik u) {
        entityManager.persist(u);
        return u;
    }

    @Transactional
    public Logowanie save(Logowanie l) {
        entityManager.persist(l);
        return(l);
    }

    public List<Logowanie> findAll() {
        TypedQuery<Logowanie> query = entityManager.createQuery("select l from Logowanie l", Logowanie.class);
        return query.getResultList();
    }

    @Transactional
    public ResponseEntity removeOne(long id) {
        Logowanie l = entityManager.find(Logowanie.class, id);
        if (l == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(l);
            return new ResponseEntity(l, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public Logowanie findOne(long id) {
        Logowanie l = entityManager.find(Logowanie.class, id);
        return l;
    }

    @Transactional //to moze byc zle
    public Logowanie update(long id, Logowanie logowanie) {
        Logowanie l = entityManager.find(Logowanie.class, id);
        return l;
    }

}
