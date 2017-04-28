package com.dominika.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by Dominika on 2017-04-07.
 */
@Entity
public class Polisa {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private Date data;
    private String numerPolisy;

    private Date dataOd;

    private Date dataDo;
    private  int Skladka;


    public Polisa() {
    }

    public Polisa(Date data, String numerPolisy, Date dataOd, Date dataDo, int skladka) {
        this.data = data;
        this.numerPolisy = numerPolisy;
        this.dataOd = dataOd;
        this.dataDo = dataDo;
        Skladka = skladka;
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

    public String getNumerPolisy() {
        return numerPolisy;
    }

    public void setNumerPolisy(String numerPolisy) {
        this.numerPolisy = numerPolisy;
    }

    public Date getDataOd() {
        return dataOd;
    }

    public void setDataOd(Date dataOd) {
        this.dataOd = dataOd;
    }

    public Date getDataDo() {
        return dataDo;
    }

    public void setDataDo(Date dataDo) {
        this.dataDo = dataDo;
    }

    public int getSkladka() {
        return Skladka;
    }

    public void setSkladka(int skladka) {
        Skladka = skladka;
    }
}
