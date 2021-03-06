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
    @ManyToMany
    private List<Auto> auto ;

    public Uzytkownik() {
    }

    public Uzytkownik(List<Auto> auto) {
        this.auto = auto;
    }

    public Uzytkownik(long id, List<Auto> auto) {
        this.id = id;
        this.auto = auto;
    }

    public Uzytkownik(String firstName, String email, String password, Role role) {
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
//
//    public Uzytkownik(long id) {
//        this.id = id;
//    }


    public Uzytkownik(String firstName, String email, String password, Role role, List<Auto> auto) {
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.auto = auto;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getFirstName() {
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

    public String getPassword() {
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

    public void setAuto(List<Auto> auto) {
        this.auto = auto;
    }

    public List<Auto> getAuto() {
        return auto;
    }

    @Override
    public String toString() {
        return "Uzytkownik{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", auto=" + auto +
                '}';
    }
}
