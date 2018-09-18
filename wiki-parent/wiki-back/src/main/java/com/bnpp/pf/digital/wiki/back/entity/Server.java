package com.bnpp.pf.digital.wiki.back.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "wiki_tbl_server")
public class Server {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(length = 200, unique = true)
	private String name;

	@Column(length = 400, unique = true)
	private String url;
	
  	// Relation with Applications
	@JsonIgnore
	@ManyToMany(mappedBy = "servers", fetch = FetchType.LAZY)
	private List<Application> applications = new ArrayList<Application>();

	// Default constructor
	public Server() {
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

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<Application> getApplications() {
		return applications;
	}

	public void setApplications(List<Application> applications) {
		this.applications = applications;
	}
	
	

	@Override
	public String toString() {
		return "Server [id=" + id + ", name=" + name + ", url=" + url + ", applications=" + applications + "]";
	}

	
	
}
