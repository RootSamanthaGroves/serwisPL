package com.dominika.model;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
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
    @DateTimeFormat
    protected Date data;
    private int przebieg;
    private String rodzaj;
    private String opis;
    private int koszt;
    @Lob
    private  byte[] paragon;

    public Naprawa() {
    }


    public Naprawa(Date data, int przebieg, String rodzaj, String opis, int koszt) {
        this.data = data;
        this.przebieg = przebieg;
        this.rodzaj = rodzaj;
        this.opis = opis;
        this.koszt = koszt;
    }

    public byte[] getParagon() {
        return paragon;
    }

    public void setParagon(byte[] paragon) {
        this.paragon = paragon;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public int getPrzebieg() {
        return przebieg;
    }

    public void setPrzebieg(int przebieg) {
        this.przebieg = przebieg;
    }

    public String getRodzaj() {
        return rodzaj;
    }

    public void setRodzaj(String rodzaj) {
        this.rodzaj = rodzaj;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public int getKoszt() {
        return koszt;
    }

    public void setKoszt(int koszt) {
        this.koszt = koszt;
    }
}
