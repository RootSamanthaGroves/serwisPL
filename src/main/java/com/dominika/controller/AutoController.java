package com.dominika.controller;

import com.dominika.model.Auto;
import com.dominika.model.BadanieTechniczne;
import com.dominika.model.Naprawa;
import com.dominika.model.Polisa;
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
    public ResponseEntity<Auto> deleteAuto(@PathVariable long id) {
     //   System.out.println("AutoController.deleteAuto");
        if (id != -1) {
         //   System.out.println("AutoController.deleteAuto");
            Auto a = autoRepository.findOne(id);
            autoRepository.removeOne(id);
            if (a != null) {
                System.out.println("AutoController.deleteAuto ok");
                return new ResponseEntity(a, new HttpHeaders(), HttpStatus.OK);
            } else {
                System.out.println("AutoController.deleteAuto 404");
                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            System.out.println("AutoController.deleteAuto 400");
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/update/")
    public ResponseEntity<Auto> update(@RequestBody Auto auto) {
        autoRepository.update(auto.getId(), auto);
        return new ResponseEntity<Auto>(auto, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/putRelation/{id}")
    public ResponseEntity<?> updateRelNap(@PathVariable long id, @RequestBody Naprawa naprawa) {
        autoRepository.updateRelInAuto(id, naprawa);
        return new ResponseEntity<>(naprawa, new HttpHeaders(), HttpStatus.OK);
    }


    @DeleteMapping("/deleteNap/id/{id}/{idNap}")
    public ResponseEntity<?> deleteNap(@PathVariable long id, @PathVariable long idNap) {
     //   System.out.println("dotarłem");

            autoRepository.deleteRelInAuto(id, idNap);


        return new ResponseEntity<>(idNap, new HttpHeaders(), HttpStatus.OK);
    }
    @PostMapping("/putRelationPolisa/{id}")
    public ResponseEntity<?> updateRelPol(@PathVariable long id, @RequestBody Polisa polisa) {
        autoRepository.updateRelPol(id, polisa);
        return new ResponseEntity<>(polisa, new HttpHeaders(), HttpStatus.OK);
    }
    @PostMapping("/putRelationBadanie/{id}")
    public ResponseEntity<?> updateRelInspection(@PathVariable long id, @RequestBody BadanieTechniczne badanie) {
        autoRepository.updateRelInspection(id, badanie);
        return new ResponseEntity<>(badanie, new HttpHeaders(), HttpStatus.OK);
    }


    @DeleteMapping("/deleteRelPolisa/id/{id}/{idPol}")
    public ResponseEntity<?> deleteRelPol(@PathVariable long id, @PathVariable long idPol) {
     //   System.out.println("dotarłem");
        autoRepository.deleteRelInAutoPol(id, idPol);
        return new ResponseEntity<>(idPol, new HttpHeaders(), HttpStatus.OK);
    }

}


