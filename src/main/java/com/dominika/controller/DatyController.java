package com.dominika.controller;

import com.dominika.model.BadanieTechniczne;
import com.dominika.model.Polisa;
import com.dominika.repository.DatyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

/**
 * Created by Dominika on 2017-04-18.
 */
@RestController
@RequestMapping("daty")
public class DatyController
{
    @Autowired
    DatyRepository datyRepository;



//    @GetMapping("/all")
//    public ResponseEntity<?> getAll() {
//        List<Auto> autosList = autoRepository.findAll();
//        if (autosList.isEmpty())
//            return new ResponseEntity(HttpStatus.NO_CONTENT);
//        return ResponseEntity.ok(autosList);
//    }

    @Transactional
    @PostMapping("addPolisa")
    public ResponseEntity<Polisa> postPolisa(@RequestBody Polisa polisa) {
        datyRepository.save(polisa);
        if ((polisa.getId() != -1)) {
            return ResponseEntity.ok(polisa);
        }
        return new ResponseEntity<Polisa>(HttpStatus.BAD_REQUEST);


    }

    @Transactional
    @PostMapping("addBadanie")
    public ResponseEntity<BadanieTechniczne> postBadnanieTechnicze(@RequestBody BadanieTechniczne bt) {
        System.out.println(bt.getDataWaznosci());
        datyRepository.save(bt);
        if (bt.getId() != -1) {
            return ResponseEntity.ok(bt);
        }
return new ResponseEntity<BadanieTechniczne>(HttpStatus.BAD_GATEWAY);
    }




//    @GetMapping("/id/{id}")
//    public ResponseEntity<Auto> getOneAuto(@PathVariable Optional<Long> id) {
//        if (id.isPresent()) {
//            Auto auto = autoRepository.findOne(id.get());
//            if (auto != null) {
//                return new ResponseEntity<Auto>(auto, new HttpHeaders(), HttpStatus.OK);
//            } else {
//                return new ResponseEntity<Auto>(HttpStatus.NOT_FOUND);
//            }
//        }
//        return new ResponseEntity<Auto>(HttpStatus.BAD_REQUEST);
//    }


//    @DeleteMapping("delete/id/{id}")
//    public ResponseEntity<Auto> deleteAuto(@PathVariable Optional<Long> id) {
//        if (!id.equals(null)) {
//            Auto a = autoRepository.findOne(id.get());
//            autoRepository.removeOne(id.get());
//            if (a != null) {
//                return new ResponseEntity(a, new HttpHeaders(), HttpStatus.OK);
//            } else {
//                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
//            }
//        } else {
//            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @PostMapping("/put/{id}")
//    public ResponseEntity<Auto> update(@PathVariable long id, @RequestBody Auto auto) {
//        autoRepository.update(Long.valueOf(id), auto);
//        return new ResponseEntity<Auto>(auto, new HttpHeaders(), HttpStatus.OK);
//    }

}


