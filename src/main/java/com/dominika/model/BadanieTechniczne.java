package com.dominika.model;

import javax.persistence.*;
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
    private Date DataWaznosci;
    public BadanieTechniczne() {

    }

    @Column(columnDefinition = "timestamp with zone")
    public Date getDataBadania() {
        return dataBadania;
    }

    public void setDataBadania(Date dataBadania) {
        this.dataBadania = dataBadania;
    }
    @Column(columnDefinition = "timestamp with zone")
    public Date getDataWaznosci() {
        return DataWaznosci;
    }

    public void setDataWaznosci(Date dataWaznosci) {
        DataWaznosci = dataWaznosci;
    }





    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


}
