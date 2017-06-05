package com.dominika.repository;

/**
 * Created by DiiES on 2017-06-05.
 */

import com.dominika.model.Auto;
import com.dominika.model.Role;
import com.dominika.model.Uzytkownik;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.*;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

/**
 * Created by kosa1010 on 04.01.17.
 */
@Component
public class Init {

    @Autowired
    UsersRepository userRepository;

    @Autowired
    CarsRepository autoRepository;

    @PostConstruct
    public void init() {
        Uzytkownik user1 = userRepository.findByEmail("user@o2.pl");
        Uzytkownik admin = userRepository.findByEmail("admin@o2.pl");
        if (user1 == null) {
            Uzytkownik user = new Uzytkownik();
            user.setEmail("user@o2.pl");
            user.setFirstName("User");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode("user"));
            user.setRole(Role.ROLE_USER);
            userRepository.save(user);
        }
        if (admin == null) {
            Uzytkownik user = new Uzytkownik();
            user.setEmail("admin@o2.pl");
            user.setFirstName("Dominika");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode("admin"));
            user.setRole(Role.ROLE_ADMIN);
            userRepository.save(user);
        }
    long id = 1;
        Auto auto1 = autoRepository.findOne(id);

        if (auto1 == null) {
            Auto auto = new Auto();
            auto.setMarka("testowe");


            byte[] imageInByte = new byte[0];
            try {

                BufferedImage originalImage = ImageIO.read(new File(
                        "C:\\Users\\Dominika\\Pictures\\car.png"));

                // convert BufferedImage to byte array
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(originalImage, "png", baos);
                baos.flush();
                imageInByte = baos.toByteArray();
                baos.close();

                // convert byte array back to BufferedImage
                InputStream in = new ByteArrayInputStream(imageInByte);
                BufferedImage bImageFromConvert = ImageIO.read(in);

                ImageIO.write(bImageFromConvert, "png", new File(
                        "C:\\Users\\Dominika\\Pictures\\car.png"));

            } catch (IOException e) {
                System.out.println(e.getMessage());
            }

            auto.setImage(imageInByte);
            autoRepository.save(auto);
        }

        }
    }

