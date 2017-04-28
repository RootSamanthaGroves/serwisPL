package com.dominika.controller;

import com.dominika.model.Role;
import com.dominika.model.Uzytkownik;
import com.dominika.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Created by Dominika on 2017-04-07.
 */
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    UserRepository userRepository;

//    @Transactional
//  @RequestMapping(value = "/add", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseEntity<?> addUser(@ModelAttribute Uzytkownik user) {
//        System.out.println(user.getEmail().toString());
//        System.out.println(user.getFirstName());

//        System.out.println(user.getPassword());
//        userRepository.save(user);
//        if ((user.getId() != -1)) {
//            return ResponseEntity.ok(user);
//        }
//        return new ResponseEntity<Uzytkownik>(HttpStatus.BAD_REQUEST);
//    }

    //    @Transactional
    @PostMapping("/add")
    public ResponseEntity<Uzytkownik> postUser(@RequestBody Uzytkownik user) {
        user.setRole(Role.ROLE_USER);
        System.out.println(user.getEmail());
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(user);


    }

    @DeleteMapping("delete/id/{id}")
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


    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Uzytkownik> getDetailsOfUsers(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            Uzytkownik user = userRepository.findOne(id.get());
            System.out.println(user.getEmail() + " " + user.getFirstName());
            if (user != null) {
                return new ResponseEntity<Uzytkownik>(user, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Uzytkownik>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Uzytkownik>(HttpStatus.BAD_REQUEST);
    }


//    @GetMapping(value = "/email")
//    public ResponseEntity<Uzytkownik> getUsersByEmail(@RequestBody String email) {
//        System.out.println(email);
//        Uzytkownik unewU = (Uzytkownik) userRepository.findOneByEmail(email);
//        if (unewU != null) {
//            return new ResponseEntity<Uzytkownik>(unewU, new HttpHeaders(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<Uzytkownik>(HttpStatus.NO_CONTENT);
//        }
//    }


    @PostMapping("/put/{id}")
    public ResponseEntity<Uzytkownik> update(@PathVariable long id, @RequestBody Uzytkownik user) {
        userRepository.update(id, user);
        return new ResponseEntity<Uzytkownik>(user, new HttpHeaders(), HttpStatus.OK);
    }

//    @RequestMapping(value = "/email/{email}")
//    public ResponseEntity<Uzytkownik> getOfUsersByEMail(@PathVariable String email) {
//        if (!email.isEmpty()) {
//            Uzytkownik user = userRepository.findOneByEmail(email);
//            if (user != null) {
//                return new ResponseEntity<Uzytkownik>(user, new HttpHeaders(), HttpStatus.OK);
//            } else {
//                return new ResponseEntity<Uzytkownik>(HttpStatus.NO_CONTENT);
//            }
//        }
//        return new ResponseEntity<Uzytkownik>(HttpStatus.BAD_REQUEST);
//    }

//    @RequestMapping("/log/{a}/{b}")

//    public ResponseEntity<Uzytkownik> getByEmailAndPassword(@PathVariable String a, @PathVariable String b) {
//
//        System.out.println(a);
//        System.out.println(b);
//        Uzytkownik user = (Uzytkownik) userRepository.findByEmailAndPassword(a, b);
//        if (user != null) {
//            return new ResponseEntity<Uzytkownik>(user, new HttpHeaders(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<Uzytkownik>(HttpStatus.NO_CONTENT);
//        }
//
////      return new ResponseEntity<Uzytkownik>(HttpStatus.BAD_REQUEST);
//    }


}

