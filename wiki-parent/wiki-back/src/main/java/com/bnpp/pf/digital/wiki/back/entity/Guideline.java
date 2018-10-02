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
@Table(name = "wiki_tbl_guideline")

public class Guideline {
	/**
	 * Id of guideline : primary key
	 * 
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	
	/**
	 * Name of guideline
	 */
	
    @Column(length=120)
    private String name;
	
    
    /**
	 * Description of guideline
	 */
	
    @Column
    private String description;
    
    
    /**
   	 * Path file of guideline
   	 */
    @Column
    private String file;
    
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="fk_user")
    private User user; 
    
    
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	/**
   	 * type of guideline
   	 */
    @Column
    private String type;


	@Override
	public String toString() {
		return "Guideline [id=" + id + ", name=" + name + ", description=" + description + ", file=" + file + ", user="
				+ user + ", type=" + type + "]";
	}
}