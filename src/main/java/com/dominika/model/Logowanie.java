package com.dominika.model;

import javax.persistence.OneToOne;

/**
 * Created by Dominika on 2017-04-07.
 */
public class Logowanie {
    public long id;
    @OneToOne
    private Uzytkownik uzytkownik;

    public Logowanie() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Uzytkownik getUzytkownik() {
        return uzytkownik;
    }

    public void setUzytkownik(Uzytkownik uzytkownik) {
        this.uzytkownik = uzytkownik;
    }
}
