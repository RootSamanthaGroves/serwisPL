package com.dominika.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * Created by Dominika on 2017-04-30.
 */
@Entity
public class Data {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Min(1)
    @Max(31)
    private int dzien;
    @Min(1)
    @Max(12)
    private  int miesiac;
    @Min(1950)

    private  int rok;

    public Data() {
    }

    public Data(int dzien, int miesiac, int rok) {
        this.dzien = dzien;
        this.miesiac = miesiac;
        this.rok = rok;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getDzien() {
        return dzien;
    }

    public void setDzien(int dzien) {
        this.dzien = dzien;
    }

    public int getMiesiac() {
        return miesiac;
    }

    public void setMiesiac(int miesiac) {
        this.miesiac = miesiac;
    }

    public int getRok() {
        return rok;
    }

    public void setRok(int rok) {
        this.rok = rok;
    }

    @Override
    public String toString() {
        return "Data{" +
                "id=" + id +
                ", dzien=" + dzien +
                ", miesiac=" + miesiac +
                ", rok=" + rok +
                '}';
    }
}
