package com.dominika.controller;

import com.dominika.model.Auto;
import com.dominika.model.Naprawa;
import com.dominika.model.Role;
import com.dominika.model.Uzytkownik;
import com.dominika.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.*;

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
    MailClient mailClient;

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


    @Scheduled(cron = "${cron.expression}"/*, zone =*/)
    @GetMapping("/send")
    public ResponseEntity<?> sendmail() {
        System.out.println("UserController.sendmail");
        List<Uzytkownik> all = userRepository.findAll();
//        List<String> odbiorcy7 = new ArrayList<>();
//        List<String> odbiorcyUbezpieczenie = new ArrayList<>();
        Map<String, byte[]> attachments = new HashMap<>();
        for (Uzytkownik u : all) {
            for (Auto a : u.getAuto()) {
                System.out.println(a.getId() + " " + a.getBadanieTechnicznes().size() + " " + a.getPolisa().size());
                Date dataWaznosci = a.getBadanieTechnicznes().get(0).getDataWaznosci();
                Date dataDo = a.getPolisa().get(0).getDataDo();
                Date now = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());
//                System.out.println(dataWaznosci.getTime() - now.getTime() / (1000 * 60 * 60 * 24));
                LocalDate dataBadania = dataWaznosci.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                LocalDate dataPolisy = dataDo.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                LocalDate now2 = LocalDate.now();
                long daysBetweenBadanie = ChronoUnit.DAYS.between(now2, dataBadania);
                long daysBetweenPolisy = ChronoUnit.DAYS.between(now2, dataPolisy);
                System.out.println(daysBetweenBadanie);

                if (daysBetweenBadanie == 7) {
//                    odbiorcy7.add(u.getEmail());
                    try {
                        mailClient.prepareAndSend(new String[]{u.getEmail()},
                                "GarazPL Badanie techniczne pojazdu",
                            "Witaj " +
                                    u.getFirstName() + "\n\nChcemy cię poinformować że za tydzień skończy Ci się " +
                                    "badanie techniczne pojazdu " + a.getMarka() + " " + a.getModel() + " pamiętaj aby " +
                                    "je przeprowadzić w najbliższym czasie.\n\nPozdrawiamy " +
                                    "\nSerwis GarazPL", attachments);
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    } catch (MessagingException e) {
                        e.printStackTrace();
                    }
//
                }
                if (daysBetweenPolisy == 7) {
//                    odbiorcyUbezpieczenie.add(u.getEmail());
                    try {
                        mailClient.prepareAndSend(new String[]{u.getEmail()}, "GarazPL Polisa pojazdu",
                                "Witaj " +
                                        u.getFirstName() + "\n\nChcemy cię poinformować że za tydzień skończy się " +
                            "polisa twojego pojazdu " + a.getMarka() + " " + a.getModel() + " pamiętaj aby " +
                            "ją opłacić przed jej zakończeniem.\n\nPozdrawiamy " +
                            "\nSerwis GarazPL", attachments);
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    } catch (MessagingException e) {
                        e.printStackTrace();
                    }
                }
            }
//            if (true) {
//                Map<String, byte[]> attachments = new HashMap<>();
//                mailClient.prepareAndSend(new String[]{"kosiordawid@gmail.com"}, "temat", "wiadomiość", attachments);
            //            } else {
//                return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
//            }
        }
//        String[] array = new String[odbiorcy7.size()];
//        for (int i = 0; i < odbiorcy7.size(); i++) {
//            array[i] = odbiorcy7.get(i);
//        }
//        try {
//            mailClient.prepareAndSend(array, "", "", attachments);
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
        return ResponseEntity.ok(true);
    }
}

