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
    
    @Column(length=6)
    private String uid; 
    
    @Column(length=100)
    private String firstName;
    
    @Column(length=100)
    private String lastName;
    
    @Column(length=100)
    private String mail;
    
    @Column(length=20)
    private String password;
    
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="fk_role", nullable = false)
    private Role role; 
    
    public User() {
        
    }

}
