package com.dominika.repository;

import com.dominika.model.Auto;
import com.dominika.model.Naprawa;
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
 * Created by Dominika on 2017-05-03.
 */
@Repository
public class AutoRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Auto save(Auto a) {
        entityManager.persist(a);
//        System.out.println(a.getId());
        return (a);

    }

    public List<Auto> findAll() {
        TypedQuery<Auto> query = entityManager.createQuery("select n from Auto n", Auto.class);
        return query.getResultList();
    }


    @Transactional
    public ResponseEntity removeOne(long id) {
        Auto a = entityManager.find(Auto.class, id);
        if (a == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(a);
            return new ResponseEntity(a, new HttpHeaders(), HttpStatus.OK);
        }
    }

    @Transactional
    public Auto findOne(long id) {
        Auto a = entityManager.find(Auto.class, id);
        return a;
    }

    @Transactional
    public Auto update(long id, Auto a) {
              Auto auto = entityManager.find(Auto.class, id);

//        if (!auto.getMarka().isEmpty()) {
//            auto.setMarka(a.getMarka());
//        }
//        if (!auto.getModel().isEmpty()) {
//            auto.setMarka(a.getMarka());
//        }
//        if (!auto.getMocSilnika().) {
//            auto.setMarka(a.getMarka());
//        }

        a.setImage(auto.getImage());
        entityManager.merge(a);


        return a;

    }

    @Transactional
    public Auto updateRelInAuto(long id, Naprawa nap) {
        Auto auto = entityManager.find(Auto.class, id);
        auto.getNaprawa().add(nap);
        entityManager.merge(auto);
        return auto;
    }




    @Transactional
    public Auto deleteRelInAuto(long id, long idNap) {
        Auto auto = entityManager.find(Auto.class, id);
        System.out.println(auto.getNaprawa().size());
        for (int i = 0; i < auto.getNaprawa().size(); i++) {
            auto.getNaprawa().indexOf(i);
            if (auto.getNaprawa().get(i).getId() == idNap) {
                auto.getNaprawa().remove(i);
            }

        }
        entityManager.merge(auto);
        return auto;

    }
}