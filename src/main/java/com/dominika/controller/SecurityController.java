package com.dominika.controller;
//package com.dominika.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//import java.util.Optional;
//
////import com.mgiec.entities.Token;
////import com.mgiec.entities.User;
////import com.mgiec.repositories.TokenRepository;
////import com.mgiec.security.SecurityUtils;
////import com.mgiec.services.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//import java.util.Optional;
//
//
//
///**
// * Created by Dominika on 2017-04-20.
// */
//@RestController
//public class SecurityController {
//
//
//
//
//
//
//        @Autowired
//        private UserService userService;
//
//
//        @Autowired
//        private TokenRepository tokenRepository;
//
//        @RequestMapping(value = "/security/account", method = RequestMethod.GET)
//        public
//        @ResponseBody
//        User getUserAccount() {
//            User user = null;
//            Optional<User> userOpt = userService.findByName(SecurityUtils.getCurrentLogin());
//            if (userOpt.isPresent()) {
//                user = userOpt.get();
//                user.setPassword(null);
//            }
//            return user;
//        }
//
//
//        @PreAuthorize("hasAuthority('admin')")
//        @RequestMapping(value = "/security/tokens", method = RequestMethod.GET)
//        public
//        @ResponseBody
//        List<Token> getTokens() {
//            List<Token> tokens = tokenRepository.findAll();
//            for (Token t : tokens) {
//                t.setSeries(null);
//                t.setValue(null);
//            }
//            return tokens;
//        }
//    }
//

import com.dominika.config.SecurityUtils;
import com.dominika.model.Uzytkownik;
import com.dominika.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {
    @Autowired
    private UsersRepository usersRepository;

    @RequestMapping(value = "/security/account", method = RequestMethod.GET)
    public @ResponseBody
    Uzytkownik getUserAccount() {
        Uzytkownik user = usersRepository.findByEmail(SecurityUtils.getCurrentLogin());
        if(user!=null)
            user.setPassword(null);
        return user;
    }

    //Only for test
    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public @ResponseBody
    String getText() {
        return "Text only for admin";
    }
}


