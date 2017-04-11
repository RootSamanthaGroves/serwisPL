package com.dominika.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * Created by Dominika on 2017-04-03.
 */
@Entity
public class Auto {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String marka;
    private String model;
    private String numerVIN;
    private String numerRejestracyjny;
    private Date rokProdukcji;
    private String rodzajNadwozia;
    private int pojemnoscSilnika;
    private int mocSilnika;
    private String rodzajPaliwa;
    @OneToMany
    private List<Naprawa> naprawa;
    @OneToMany
    private List<Czesci> czesc;

    public Auto() {
    }

    public Auto(String marka, String model, String numerVIN, String numerRejestracyjny, Date rokProdukcji, String rodzajNadwozia, int pojemnoscSilnika, int mocSilnika, String rodzajPaliwa) {
        this.marka = marka;
        this.model = model;
        this.numerVIN = numerVIN;
        this.numerRejestracyjny = numerRejestracyjny;
        this.rokProdukcji = rokProdukcji;
        this.rodzajNadwozia = rodzajNadwozia;
        this.pojemnoscSilnika = pojemnoscSilnika;
        this.mocSilnika = mocSilnika;
        this.rodzajPaliwa = rodzajPaliwa;

    }

    public Auto(String marka) {
        this.marka = marka;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMarka() {
        return marka;
    }

    public void setMarka(String marka) {
        this.marka = marka;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getNumerVIN() {
        return numerVIN;
    }

    public void setNumerVIN(String numerVIN) {
        this.numerVIN = numerVIN;
    }

    public String getNumerRejestracyjny() {
        return numerRejestracyjny;
    }

    public void setNumerRejestracyjny(String numerRejestracyjny) {
        this.numerRejestracyjny = numerRejestracyjny;
    }

    public Date getRokProdukcji() {
        return rokProdukcji;
    }

    public void setRokProdukcji(Date rokProdukcji) {
        this.rokProdukcji = rokProdukcji;
    }

    public String getRodzajNadwozia() {
        return rodzajNadwozia;
    }


    public void setRodzajNadwozia(String rodzajNadwozia) {
        this.rodzajNadwozia = rodzajNadwozia;
    }

    public int getPojemnoscSilnika() {
        return pojemnoscSilnika;
    }

    public void setPojemnoscSilnika(int pojemnoscSilnika) {
        this.pojemnoscSilnika = pojemnoscSilnika;
    }

    public int getMocSilnika() {
        return mocSilnika;
    }

    public void setMocSilnika(int mocSilnika) {
        this.mocSilnika = mocSilnika;
    }

    public String getRodzajPaliwa() {
        return rodzajPaliwa;
    }

    public void setRodzajPaliwa(String rodzajPaliwa) {
        this.rodzajPaliwa = rodzajPaliwa;
    }


}
