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
    private String pojemnoscSilnika;
    private String mocSilnika;
    private String rodzajPaliwa;
    @OneToMany
    private List<Naprawa> naprawa;

        @OneToMany

        private List<Czesci> czesc;
        
    @Override
    public String toString() {
        return "Auto{" +
                "id=" + id +
                ", marka='" + marka + '\'' +
                ", model='" + model + '\'' +
                ", numerVIN='" + numerVIN + '\'' +
                ", numerRejestracyjny='" + numerRejestracyjny + '\'' +
                ", rokProdukcji=" + rokProdukcji +
                ", rodzajNadwozia='" + rodzajNadwozia + '\'' +
                ", pojemnoscSilnika=" + pojemnoscSilnika +
                ", mocSilnika=" + mocSilnika +
                ", rodzajPaliwa='" + rodzajPaliwa + '\'' +
                ", naprawa=" + naprawa +
                ", czesc=" + czesc +
                '}';
    }




    public Auto() {
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



    public List<Naprawa> getNaprawa() {
        return naprawa;
    }

    public void setNaprawa(List<Naprawa> naprawa) {
        this.naprawa = naprawa;
    }

    public List<Czesci> getCzesc() {
        return czesc;
    }

    public void setCzesc(List<Czesci> czesc) {
        this.czesc = czesc;
    }

    public String getPojemnoscSilnika() {
        return pojemnoscSilnika;
    }

    public void setPojemnoscSilnika(String pojemnoscSilnika) {
        this.pojemnoscSilnika = pojemnoscSilnika;
    }

    public String getMocSilnika() {
        return mocSilnika;
    }

    public void setMocSilnika(String mocSilnika) {
        this.mocSilnika = mocSilnika;
    }

    public String getRodzajPaliwa() {
        return rodzajPaliwa;
    }

    public void setRodzajPaliwa(String rodzajPaliwa) {
        this.rodzajPaliwa = rodzajPaliwa;
    }


}
