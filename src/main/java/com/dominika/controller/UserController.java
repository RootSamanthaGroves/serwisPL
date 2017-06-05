package com.dominika.controller;

import com.dominika.model.Auto;
import com.dominika.model.Naprawa;
import com.dominika.model.Role;
import com.dominika.model.Uzytkownik;
import com.dominika.repository.AutoRepository;
import com.dominika.repository.CarsRepository;
import com.dominika.repository.NaprawaRepository;
import com.dominika.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Created by Dominika on 2017-04-07.
 */
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AutoRepository autoRepository;

    @Autowired
    CarsRepository autoRepo;

    @Autowired
    NaprawaRepository naprawaRepository;


    //    @Transactional
    @PostMapping("/add")
    public ResponseEntity<Uzytkownik> postUser(@RequestBody Uzytkownik user) {
        user.setRole(Role.ROLE_USER);
        //    System.out.println(user.getEmail());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
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
            //     System.out.println(user.getEmail() + " " + user.getFirstName());
            if (user != null) {
                return new ResponseEntity<Uzytkownik>(user, new HttpHeaders(), HttpStatus.OK);
            } else {
                return new ResponseEntity<Uzytkownik>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<Uzytkownik>(HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/putRelation/{id}")
    public ResponseEntity<?> updateRel(@PathVariable long id, @RequestBody Auto car) {
        userRepository.updateRel(id, car);
        return new ResponseEntity<>(car, new HttpHeaders(), HttpStatus.OK);
    }


    @Transactional
    @DeleteMapping("/deleteCar/id/{id}/{idCar}")
    public ResponseEntity<?> deleteCar(@PathVariable long id, @PathVariable long idCar) {

        Uzytkownik u = userRepository.findOne(id);
        List<Auto> carList = u.getAuto();
        System.out.println(u.getAuto());
        autoRepo.deleteAutoById(idCar);
//        autoRepo.deleteAutoById(idCar);
        Auto b = null;
        for (Auto a : u.getAuto()) {
            if (a.getId() == idCar) {
                b = a;
                //  carList.remove(a);
            }
        }
        carList.remove(b);
        u.setAuto(carList);
//        userRepository.updateCars(u);
//        if (carList != null)
//            for (Auto a : u.getAuto()) {
//                if (a.getId() == idCar) {
//                    if (a.getNaprawa() != null) {
//                        List<Naprawa> fixList = a.getNaprawa();
//                        a.setNaprawa(null);
//                        for (Naprawa n : fixList) {
//                            naprawaRepository.removeOne(n.getId());
//                        }
//                        a.setNaprawa(null);
//                    }
//
//                    carList.remove(a);
//                    u.setAuto(carList);
//                    autoRepository.deleteOne(a);
//                }
//            }
        userRepository.updateCars(u);
        return new ResponseEntity<>(idCar, new HttpHeaders(), HttpStatus.OK);
    }


}

