package com.dominika.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

/**
 * Created by Dominika on 2017-04-03.
 */
@Entity
public class Czesci {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id ;
    private  String czesc;
    private int koszt;

    public Czesci(String czesc, int koszt) {
        this.czesc = czesc;
        this.koszt = koszt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCzesc() {
        return czesc;
    }

    public void setCzesc(String czesc) {
        this.czesc = czesc;
    }

    public int getKoszt() {
        return koszt;
    }

    public void setKoszt(int koszt) {
        this.koszt = koszt;
    }
}
