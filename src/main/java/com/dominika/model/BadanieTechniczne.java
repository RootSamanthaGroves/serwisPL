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
public class BadanieTechniczne {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private Date dataBadania;
    private Date dataWaznosci;


    public BadanieTechniczne() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDataBadania() {
        return dataBadania;
    }

    public void setDataBadania(Date dataBadania) {
        this.dataBadania = dataBadania;
    }


    public Date getDataWaznosci() {
        return dataWaznosci;
    }

    public void setDataWaznosci(Date dataWaznosci) {
        this.dataWaznosci = dataWaznosci;
    }

    @Override
    public String toString() {
        return "BadanieTechniczne{" +
                "id=" + id +
                ", dataBadania=" + dataBadania +
                ", dataWaznosci=" + dataWaznosci +
                '}';
    }
}
