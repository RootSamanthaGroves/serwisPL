package com.dominika.repository;

import com.dominika.model.Naprawa;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.print.attribute.standard.MediaSize;
import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by Dominika on 2017-04-07.
 */
@Repository
public class NaprawaRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Naprawa save(Naprawa n) {
        entityManager.persist(n);
        return(n);

    }

    public List<Naprawa> findAll() {
        TypedQuery<Naprawa> query = entityManager.createQuery("select n from Naprawa n", Naprawa.class);
        return query.getResultList();
    }


    @Transactional
    public ResponseEntity removeOne(long id) {

        Naprawa n = entityManager.find(Naprawa.class, id);
        if (n == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(n);
            return new ResponseEntity(n, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

    }

    @Transactional
    public Naprawa findOne(long id) {
        Naprawa n = entityManager.find(Naprawa.class, id);
        return n;
    }

    @Transactional //to moze byc zle
    public Naprawa update(long id, Naprawa naprawa) {
        Naprawa n = entityManager.find(Naprawa.class, id);
        return n;
    }

}
