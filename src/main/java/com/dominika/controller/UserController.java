package com.dominika.controller;

import com.dominika.model.User;
import com.dominika.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * Created by Dominika on 2017-04-07.
 */
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Transactional
    @PostMapping("add")
    public ResponseEntity<?> addUser(@RequestBody    User user) {
        userRepository.save(user);
        if ((user.getId() != -1)) {
            return ResponseEntity.ok(user);
        }
        return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
    }





    @DeleteMapping("delete/id/{id}")
    public ResponseEntity<User> deleteEmployee(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            User u = userRepository.findOne(id.get());
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
    public ResponseEntity<User> getDetailsOfUsers(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            User user = userRepository.findOne(id.get());
            if (user != null) {
                return new ResponseEntity<User>(user, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
    }




    @PostMapping("/put/{id}")
    public ResponseEntity<User> update(@PathVariable long id, @RequestBody User user) {
        userRepository.update(id, user);
        return new ResponseEntity<User>(user, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/email/{email}")
    public ResponseEntity<User> getOfUsersByEMail(@PathVariable String email) {
        if (!email.isEmpty()) {
            User user = userRepository.findOneByEmail(email);
            if (user != null) {
                return new ResponseEntity<User>(user, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
            }
        }
        return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
    }




}

