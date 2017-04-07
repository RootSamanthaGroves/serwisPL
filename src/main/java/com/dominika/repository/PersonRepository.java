package com.dominika.repository;

import com.dominika.model.Person;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;


@Repository
public class PersonRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void save(Person person){
        entityManager.persist(person);
    }

    public List<Person> findAll(){
        TypedQuery query = entityManager.createQuery("select p from Person p", Person.class);
        return query.getResultList();
    }

    @Transactional
    public void removeOne(long id){
        Person p = entityManager.find(Person.class, id);
        entityManager.remove(p);
    }
}
