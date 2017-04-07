/**
 * Created by Dominika on 2016-12-14.
 */

package com.dominika.repository;

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


@Repository
public class UserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Uzytkownik save(Uzytkownik u) {
        entityManager.persist(u);
        return u;
    }

    public List<Uzytkownik> findAll() {
        TypedQuery<Uzytkownik> query = entityManager.createQuery("select u from User u", Uzytkownik.class);
        return query.getResultList();
    }

    @Transactional
    public ResponseEntity removeOne(long id) {

        Uzytkownik u = entityManager.find(Uzytkownik.class, id);
        if (u == null) {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        } else {
            entityManager.remove(u);
            return new ResponseEntity(u, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

    }

    @Transactional
    public Uzytkownik findOne(long id) {
        Uzytkownik u = entityManager.find(Uzytkownik.class, id);
        return u;
    }


    public Uzytkownik findOneByEmail(String email) {
        TypedQuery<Uzytkownik> query = entityManager.createQuery("select u from users u where u.email = :email", Uzytkownik.class);
        query.setParameter("email", email);
        List<Uzytkownik> userList = query.getResultList();
        if (userList.isEmpty())
            return null;
        return userList.get(0);
    }


    @Transactional
    public Uzytkownik update(long id, Uzytkownik u) {
        Uzytkownik user = entityManager.find(Uzytkownik.class, id);
        if (!u.getEmail().isEmpty()) {
            user.setEmail(u.getEmail());
        }
        if (!u.getPassword().isEmpty()) {
            user.setPassword(u.getPassword());
        }
        if (!u.getFirstName().isEmpty()) {
            user.setFirstName(u.getFirstName());
        }
        entityManager.merge(user);
        return user;
    }
}
