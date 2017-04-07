package com.dominika.model;

import javax.persistence.OneToOne;

/**
 * Created by Dominika on 2017-04-07.
 */
public class Zalogowani {
    public long id;
    @OneToOne
    private Uzytkownik uzytkownik;
}
