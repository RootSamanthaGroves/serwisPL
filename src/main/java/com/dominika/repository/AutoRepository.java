package com.dominika.repository;

import com.dominika.model.Auto;
import com.sun.media.sound.AiffFileReader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by Dominika on 2017-04-07.
 */
@Repository
public class AutoRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Auto save(Auto a) {
        entityManager.persist(a);
//        System.out.println(a.getId());
        return(a);



    }

    public List<Auto> getAll() {
        TypedQuery<Auto> query = entityManager.createQuery("select a from Auto a", Auto.class);
        return query.getResultList();
    }


    @Transactional
    public ResponseEntity removeOne(long id) {

        Auto a = entityManager.find(Auto.class, id);
        if (a == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(a);
            return new ResponseEntity(a, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

    }

    @Transactional
    public Auto findOne(long id) {
        Auto a = entityManager.find(Auto.class, id);
        return a;
    }

    @Transactional //to moze byc zle
    public Auto update(long id, Auto auto) {
        Auto a = entityManager.find(Auto.class, id);
        return a;
    }


}
