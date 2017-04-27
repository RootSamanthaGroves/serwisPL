package com.dominika.model;

import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * Created by Dominika on 2017-04-03.
 */
@Entity
@Table(name = "users")
public class Uzytkownik {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Size(min = 3, max = 50)
    private String firstName;

    @Column(nullable = false, unique = true)
    @Email
    private String email;

    @Size(min = 5)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany
    private List<Auto> auto;


    public Uzytkownik(String diies, String email, String admin, String role_admin) {
    }

    public Uzytkownik(String firstName, String email, String password, Role role) {
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

//    public Uzytkownik(String firstName, String email, String password) {
//        this.firstName = firstName;
//        this.email = email;
//        this.password = password;
//    }
    public Uzytkownik( String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Uzytkownik( ) {
      }
//    public Uzytkownik( String email) {
//        this.email = email;
//
//    }

    public Uzytkownik(long id) {
        this.id = id;
    }

    public Role getRole(String role_admin) {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getFirstName(String admin) {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public long getId() {
        return id;
    }


    public String getEmail() {
        return email;
    }

    public String getPassword(String admin) {
        return password;
    }

    public void setId(long id) {
        this.id = id;
    }


    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
