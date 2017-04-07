package com.dominika.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by Dominika on 2017-04-03.
 */
@Entity
public class Naprawa {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Date data;
    private int aktualnyPrzeglad;
    private String rodzajNaprawy;
    private String opis;
    private int KosztNaprawy;

    public Naprawa(Date data, int aktualnyPrzeglad, String rodzajNaprawy, String opis, int kosztNaprawy) {
        this.data = data;
        this.aktualnyPrzeglad = aktualnyPrzeglad;
        this.rodzajNaprawy = rodzajNaprawy;
        this.opis = opis;
        KosztNaprawy = kosztNaprawy;
    }


    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public int getAktualnyPrzeglad() {
        return aktualnyPrzeglad;
    }

    public void setAktualnyPrzeglad(int aktualnyPrzeglad) {
        this.aktualnyPrzeglad = aktualnyPrzeglad;
    }

    public String getRodzajNaprawy() {
        return rodzajNaprawy;
    }

    public void setRodzajNaprawy(String rodzajNaprawy) {
        this.rodzajNaprawy = rodzajNaprawy;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public int getKosztNaprawy() {
        return KosztNaprawy;
    }

    public void setKosztNaprawy(int kosztNaprawy) {
        KosztNaprawy = kosztNaprawy;
    }
}
