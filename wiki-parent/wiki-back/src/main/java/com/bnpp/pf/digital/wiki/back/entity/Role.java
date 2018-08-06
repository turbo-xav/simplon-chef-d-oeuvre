package com.bnpp.pf.digital.wiki.back.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="wiki_tbl_role")
public class Role {

    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO)    
    private int id;
    
    @Column
    private String name;
    
    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<User>();   
    
    public Role() {
        
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
