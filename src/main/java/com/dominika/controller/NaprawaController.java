package com.dominika.controller;

import com.dominika.model.Naprawa;
import com.dominika.repository.NaprawaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Created by Dominika on 2017-04-07.
 */
@RestController
@RequestMapping("naprawa")
public class NaprawaController {


    @Autowired
    NaprawaRepository naprawaRepository;

//    @Autowired
//    UsersRepository usersRepository;


    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        List<Naprawa> naprawyList = naprawaRepository.findAll();
        if (naprawyList.isEmpty())
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(naprawyList);
    }

    @Transactional
    @PostMapping("add")
    public ResponseEntity<Naprawa> postAuto(@RequestBody Naprawa naprawa) {
        naprawaRepository.save(naprawa);
        if ((naprawa.getId() != -1)) {
            return ResponseEntity.ok(naprawa);
        }
        return new ResponseEntity<Naprawa>(HttpStatus.BAD_REQUEST);


    }



    @GetMapping("/id/{id}")
    public ResponseEntity<Naprawa> getOneAuto(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            Naprawa naprawa = naprawaRepository.findOne(id.get());
            if (naprawa != null) {
                return new ResponseEntity<Naprawa>(naprawa, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Naprawa>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Naprawa>(HttpStatus.BAD_REQUEST);
    }


    @DeleteMapping("delete/id/{id}")
    public ResponseEntity<Naprawa> deleteAuto(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            Naprawa n = naprawaRepository.findOne(id.get());
            naprawaRepository.removeOne(id.get());
            if (n != null) {
                return new ResponseEntity(n, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/put/")
    public ResponseEntity<Naprawa> update( @RequestBody Naprawa naprawa) {
        naprawaRepository.update(naprawa.getId(), naprawa);
        return new ResponseEntity<Naprawa>(naprawa, new HttpHeaders(), HttpStatus.OK);
    }


//    @PostMapping("/put/{id}")
//    public ResponseEntity<Uzytkownik> updateRelation(@PathVariable long id, @RequestBody Uzytkownik uzytkownik) {
//        usersRepository.updateRelation(Long.valueOf(id), uzytkownik);
//        return new ResponseEntity<Uzytkownik>(uzytkownik, new HttpHeaders(), HttpStatus.OK);
//    }

}
