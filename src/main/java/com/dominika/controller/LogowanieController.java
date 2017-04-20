package com.dominika.controller;

import com.dominika.model.Logowanie;
import com.dominika.model.Uzytkownik;
import com.dominika.repository.LogowanieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Created by Dominika on 2017-04-12.
 */

@RestController
@RequestMapping("log")
public class LogowanieController {
    @Autowired
    LogowanieRepository logowanieRepository;


    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        List<Logowanie> ListOfLog = logowanieRepository.findAll();
        if (ListOfLog.isEmpty())
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(ListOfLog);
    }



    @Transactional
    @PostMapping("/  login")
    public ResponseEntity<?> loginUser(@RequestBody Logowanie l) {
        logowanieRepository.save(l);
        if ((l.getId() != -1)) {
            return ResponseEntity.ok(l);
        }
        return new ResponseEntity<Uzytkownik>(HttpStatus.BAD_REQUEST);
    }





    @DeleteMapping("wylogowanie/id/{id}")
    public ResponseEntity<Logowanie> deleteEmployee(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            Logowanie l = logowanieRepository.findOne(id.get());
            logowanieRepository.removeOne(id.get());
            if (l != null) {
                return new ResponseEntity(l, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);

        }
    }


    @RequestMapping(value = "/id/{id}")
    public ResponseEntity<Logowanie> getDetailsOfUsers(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            Logowanie l = logowanieRepository.findOne(id.get());
            if (l != null) {
                return new ResponseEntity<Logowanie>(l, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Logowanie>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Logowanie>(HttpStatus.BAD_REQUEST);
    }
}
