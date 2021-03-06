package com.dominika.repository;

import com.dominika.model.BadanieTechniczne;
import com.dominika.model.Polisa;
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
 * Created by Dominika on 2017-04-18.
 */
@Repository
public class DatyRepository {


    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public BadanieTechniczne saveBadanie(BadanieTechniczne b) {
        System.out.println(b.toString());
        entityManager.persist(b);
        return(b);

    }

    @Transactional
    public Polisa savePolisa(Polisa a) {
        entityManager.persist(a);
        return(a);
    }


    public List<Polisa> findAllPolisa() {
        TypedQuery<Polisa> query = entityManager.createQuery("select p from Polisa p", Polisa.class);
        return query.getResultList();
    }

    public List<BadanieTechniczne> findAllBadanieTechniczne() {
        TypedQuery<BadanieTechniczne> query = entityManager.createQuery("select b from BadanieTechniczne b", BadanieTechniczne.class);
        return query.getResultList();
    }


    @Transactional
    public ResponseEntity removeOnePolicy(long id) {

        Polisa p = entityManager.find(Polisa.class, id);
        if (p == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(p);
            return new ResponseEntity(p, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

    }

    @Transactional
    public ResponseEntity removeOneTechnical(long id) {

       BadanieTechniczne bd  = entityManager.find(BadanieTechniczne.class, id);
        if (bd == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(bd);
            return new ResponseEntity(bd, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

    }


    @Transactional
    public Polisa findOnePolicy(long id) {
        Polisa p = entityManager.find(Polisa.class, id);
        return p;
    }
    @Transactional
    public BadanieTechniczne findOneBadanie(long id) {
        BadanieTechniczne b = entityManager.find(BadanieTechniczne.class, id);
        return b;
    }

    @Transactional
    public Polisa update(long id, Polisa polisa) {
        Polisa p = entityManager.find(Polisa.class, id);
        entityManager.merge(polisa);
        return polisa;
    }

    @Transactional
    public BadanieTechniczne updateT(long id, BadanieTechniczne bd) {
          BadanieTechniczne b = entityManager.find(BadanieTechniczne.class, id);
        entityManager.merge(bd);
        return bd;
    }

}
