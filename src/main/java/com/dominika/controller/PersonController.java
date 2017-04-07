package com.dominika.controller;

import com.dominika.model.Person;
import com.dominika.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Marcin on 24.11.2016.
 */
@RestController
@RequestMapping("/person")
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @PostMapping("/add")
    public ResponseEntity<?> savePerson(@RequestBody Person person){
        personRepository.save(person);
        System.out.println(person.getName());
        if(person.getId()!=null){
            return ResponseEntity.ok(person);
        }
        return new ResponseEntity<Person>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAll(){
        List<Person> people = personRepository.findAll();
        if(people.size()>0){
            return ResponseEntity.ok(people);
        }
        return new ResponseEntity<Person>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/remove/{id}")
    public void removePerson(@PathVariable("id") Long id){ //to ("id") mozna usnac bo zmienna nazywa sie tak samo
        personRepository.removeOne(id);
    }
}
