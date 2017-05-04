package com.dominika.controller;

import com.dominika.model.Auto;
import com.dominika.repository.AutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Created by Dominika on 2017-05-03.
 */
@RestController
@RequestMapping("auto")
public class AutoController {

    @Autowired
    AutoRepository autoRepository;


    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        List<Auto> autosList = autoRepository.findAll();
        if (autosList.isEmpty())
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(autosList);
    }

    @Transactional
    @PostMapping("add")
    public ResponseEntity<Auto> postAuto(@RequestBody Auto auto) {
        autoRepository.save(auto);
        if ((auto.getId() != -1)) {
            return ResponseEntity.ok(auto);
        }
        return new ResponseEntity<Auto>(HttpStatus.BAD_REQUEST);


    }



    @GetMapping("/id/{id}")
    public ResponseEntity<Auto> getOneAuto(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            Auto auto = autoRepository.findOne(id.get());
            if (auto != null) {
                return new ResponseEntity<Auto>(auto, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Auto>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Auto>(HttpStatus.BAD_REQUEST);
    }


    @DeleteMapping("delete/id/{id}")
    public ResponseEntity<Auto> deleteAuto(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            Auto a = autoRepository.findOne(id.get());
            autoRepository.removeOne(id.get());
            if (a != null) {
                return new ResponseEntity(a, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/put/")
    public ResponseEntity<Auto> update( @RequestBody Auto auto)
    {
        System.out.println(auto.toString());

        autoRepository.update(auto.getId(), auto);
        return new ResponseEntity<Auto>(auto, new HttpHeaders(), HttpStatus.OK);
    }



}


