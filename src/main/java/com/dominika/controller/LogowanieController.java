package com.dominika.controller;

import com.dominika.model.Uzytkownik;
import com.dominika.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * Created by Dominika on 2017-04-12.
 */

@RestController
@RequestMapping("app")
public class LogowanieController {



    @Autowired
    UserRepository userRepository;

    @Transactional
    @PostMapping("logowanie")
    public ResponseEntity<?> addUser(@RequestBody Uzytkownik user) {
        userRepository.save(user);
        if ((user.getId() != -1)) {
            return ResponseEntity.ok(user);
        }
        return new ResponseEntity<Uzytkownik>(HttpStatus.BAD_REQUEST);
    }





    @DeleteMapping("wylogowanie/id/{id}")
    public ResponseEntity<Uzytkownik> deleteEmployee(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            Uzytkownik u = userRepository.findOne(id.get());
            userRepository.removeOne(id.get());
            if (u != null) {
                return new ResponseEntity(u, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);

        }
    }


    @RequestMapping(value = "/id/{id}")
    public ResponseEntity<Uzytkownik> getDetailsOfUsers(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            Uzytkownik user = userRepository.findOne(id.get());
            if (user != null) {
                return new ResponseEntity<Uzytkownik>(user, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Uzytkownik>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Uzytkownik>(HttpStatus.BAD_REQUEST);
    }
}
