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

    /**
      * Id of role : primary key
      * 
      */
	
	@Id 
    @GeneratedValue(strategy=GenerationType.AUTO)    
    private int id;
    
	/**
	 * Name of role
	 */
	
    @Column(length=20)
    private String name;
    
    /**
      *
      * RelationShip with Users
      * 
      */
      
    
    @OneToMany(mappedBy = "role", fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<User>();   
    
    /**
      * Default constructor
      */
    
    public Role() {
        
    }
    
    /**
      * Get the list of users
      * 
      * @return list of users
      * 
      */

    public List<User> getUsers() {
		return users;
	}

    /**
      * Set the users
      *  
      * @param users the list of users
      * 
      */

	public void setUsers(List<User> users) {
		this.users = users;
	}
	
	/**
	  * Add a user
	  * 
	  * @param user : user to add
	  */
	
	public void addUser(User user) {
		this.users.add(user);
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