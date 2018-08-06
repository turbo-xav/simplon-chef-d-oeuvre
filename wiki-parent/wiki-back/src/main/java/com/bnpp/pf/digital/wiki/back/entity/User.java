package com.bnpp.pf.digital.wiki.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="wiki_tbl_user")
public class User {

    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO)    
    private int id;
    
    @Column
    private String uid; 
    
    @Column
    private String firstName;
    
    @Column
    private String lastName;
    
    @Column
    private String mail;
    
    @Column
    private String password;
    
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="fk_role", nullable = false)
    private Role role; 
    
    public User() {
        // TODO Auto-generated constructor stub
    }

}
