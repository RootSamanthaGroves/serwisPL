package com.dominika.repository;

import com.dominika.model.BadanieTechniczne;
import com.dominika.model.Polisa;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

/**
 * Created by Dominika on 2017-04-18.
 */
@Repository
public class DatyRepository {


    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public BadanieTechniczne save(BadanieTechniczne a) {
        entityManager.persist(a);
        return(a);

    }

    @Transactional
    public Polisa save(Polisa a) {
        entityManager.persist(a);
        return(a);

    }

//
//    public List<Auto> findAll() {
//        TypedQuery<Auto> query = entityManager.createQuery("select a from Auto a", Auto.class);
//        return query.getResultList();
//    }
//
//
//    @Transactional
//    public ResponseEntity removeOne(long id) {
//
//        Auto a = entityManager.find(Auto.class, id);
//        if (a == null) {
//            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
//        } else {
//            entityManager.remove(a);
//            return new ResponseEntity(a, new HttpHeaders(), HttpStatus.BAD_REQUEST);
//        }
//
//    }
//
//    @Transactional
//    public Auto findOne(long id) {
//        Auto a = entityManager.find(Auto.class, id);
//        return a;
//    }
//
//    @Transactional //to moze byc zle
//    public Auto update(long id, Auto auto) {
//        Auto a = entityManager.find(Auto.class, id);
//        return a;
//    }

}
