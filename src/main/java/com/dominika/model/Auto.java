package com.dominika.model;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * Created by Dominika on 2017-05-03.
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
    @Lob
//    @Column( columnDefinition = "LONGBLOB default 'ikony/car.jpg'")
    private byte[] image;
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<Naprawa> naprawa;
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<Polisa> polisa;
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<BadanieTechniczne> badanieTechnicznes;

    public Auto() {
    }

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
                '}';
    }

    public List<Polisa> getPolisa() {
        return polisa;
    }

    public void setPolisa(List<Polisa> polisa) {
        this.polisa = polisa;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
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

    public List<Naprawa> getNaprawa() {
        return naprawa;
    }

    public void setNaprawa(List<Naprawa> naprawa) {
        this.naprawa = naprawa;
    }

    public List<BadanieTechniczne> getBadanieTechnicznes() {
        return badanieTechnicznes;
    }

    public void setBadanieTechnicznes(List<BadanieTechniczne> badanieTechnicznes) {
        this.badanieTechnicznes = badanieTechnicznes;
    }
}
