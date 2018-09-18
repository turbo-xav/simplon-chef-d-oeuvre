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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "wiki_tbl_layer")

public class Layer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(length = 200, unique = true)
	private String name;

	// Relation with Server
	@JsonIgnore
	@OneToMany(mappedBy = "layer", fetch = FetchType.LAZY)
	private List<Server> servers = new ArrayList<Server>();

	
	// Relation with Environment
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "fk_environ")
	private Environ environ;
	
	
	public List<Server> getServers() {
		return servers;
	}

	public void setServers(List<Server> servers) {
		this.servers = servers;
	}

	public Environ getEnviron() {
		return environ;
	}

	public void setEnviron(Environ environ) {
		this.environ = environ;
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

	@Override
	public String toString() {
		return "Layer [id=" + id + ", name=" + name + ", servers=" + servers + ", environ=" + environ + "]";
	}

}
