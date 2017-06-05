package com.dominika.controller;

import com.dominika.model.Auto;
import com.dominika.model.BadanieTechniczne;
import com.dominika.model.Polisa;
import com.dominika.repository.AutoRepository;
import com.dominika.repository.CarsRepository;
import com.dominika.repository.DatyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Created by Dominika on 2017-04-18.
 */
@RestController
@RequestMapping("daty")
public class DatyController
{
    @Autowired
    DatyRepository datyRepository;

    @Autowired
    CarsRepository carsRepository;



    @GetMapping("/all/polisa")
    public ResponseEntity<?> getAllPolisa() {
        List<Polisa> polisaList = datyRepository.findAllPolisa();
        if (polisaList.isEmpty())
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(polisaList);
    }

    @GetMapping("/all/badanietechniczne")
    public ResponseEntity<?> getAllBadanie() {
        List<BadanieTechniczne> btList = datyRepository.findAllBadanieTechniczne();
        if (btList.isEmpty())
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(btList);
    }




    @GetMapping("polisa/id/{id}")
    public ResponseEntity<Polisa> getOneAuto(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            Polisa polisa = datyRepository.findOnePolicy(id.get());
            if (polisa != null) {
                return new ResponseEntity<Polisa>(polisa, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Polisa>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Polisa>(HttpStatus.BAD_REQUEST);
    }



    @GetMapping("badanie/id/{id}")
    public ResponseEntity<BadanieTechniczne> getOnebadanie(@PathVariable Optional<Long> id) {
        if (id.isPresent()) {
            BadanieTechniczne badanieTechniczne = datyRepository.findOneBadanie(id.get());
            if (badanieTechniczne != null) {
                return new ResponseEntity<BadanieTechniczne>(badanieTechniczne, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<BadanieTechniczne>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<BadanieTechniczne>(HttpStatus.BAD_REQUEST);
    }



    @DeleteMapping("delete/polisa/id/{id}")
    public ResponseEntity<Polisa> deletePolisa(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            Polisa p = datyRepository.findOnePolicy(id.get());
            datyRepository.removeOnePolicy(id.get());
            if (p != null) {
                return new ResponseEntity(p, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("delete/badanie/id/{id}")
    public ResponseEntity<Polisa> deleteBadanie(@PathVariable Optional<Long> id) {
        if (!id.equals(null)) {
            BadanieTechniczne b = datyRepository.findOneBadanie(id.get());
            datyRepository.removeOneTechnical(id.get());
            if (b != null) {
                return new ResponseEntity(b, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity(new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }


    @Transactional
    @PostMapping("polisa/put/")
    public ResponseEntity<Polisa> update( @RequestBody Polisa polisa)
    {
        datyRepository.update(polisa.getId(), polisa);
        return new ResponseEntity<Polisa>(polisa, new HttpHeaders(), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("badanie/put/")
    public ResponseEntity<BadanieTechniczne> updateTech( @RequestBody BadanieTechniczne badanieTechniczne)
    {
        datyRepository.updateT(badanieTechniczne.getId(),badanieTechniczne);
        return new ResponseEntity<BadanieTechniczne>(badanieTechniczne, new HttpHeaders(), HttpStatus.OK);
    }


    @Transactional
    @PostMapping("addPolisa")
    public ResponseEntity<Polisa> savaPolisa(@RequestBody Polisa polisa) {
     System.out.println(polisa.toString());
        datyRepository.savePolisa(polisa);
        if ((polisa.getId() != -1)) {
            return ResponseEntity.ok(polisa);
        }
        return new ResponseEntity<Polisa>(HttpStatus.BAD_REQUEST);


    }

    @Transactional
    @PostMapping("addBadanie")
    public ResponseEntity<BadanieTechniczne> saveBadnanieTechnicze(@RequestBody BadanieTechniczne bt) {
        datyRepository.saveBadanie(bt);
        if (bt.getId() != -1) {
            return ResponseEntity.ok(bt);
        }
return new ResponseEntity<BadanieTechniczne>(HttpStatus.BAD_GATEWAY);
    }


    @Transactional
    @PostMapping("addBadanie/{id}")
    public ResponseEntity<BadanieTechniczne> saveBadnanieTechniczeIAuto(@RequestBody BadanieTechniczne bt,
                                                                        @PathVariable long id) {
        datyRepository.saveBadanie(bt);
        if (bt.getId() != -1) {
            Auto car = carsRepository.findOne(id);
            car.getBadanieTechnicznes().add(bt);
            carsRepository.save(car);
            return ResponseEntity.ok(bt);
        }
        return new ResponseEntity<BadanieTechniczne>(HttpStatus.BAD_GATEWAY);
    }




}


