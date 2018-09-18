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
@Table(name = "wiki_tbl_server")
public class Server {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(length = 200, unique = true)
	private String name;

	// Relation with Diagnostic
	@JsonIgnore
	@OneToMany(mappedBy = "server", fetch = FetchType.LAZY)
	private List<Diagnostic> diagnostics = new ArrayList<Diagnostic>();

	
	// Relation with Layer
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "fk_layer")
	private Layer layer;
	
	
	
	
	public Layer getLayer() {
		return layer;
	}

	public void setLayer(Layer layer) {
		this.layer = layer;
	}


	
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


	public List<Diagnostic> getDiagnostics() {
		return diagnostics;
	}

	public void setDiagnostics(List<Diagnostic> diagnostics) {
		this.diagnostics = diagnostics;
	}

	@Override
	public String toString() {
		return "Server [id=" + id + ", name=" + name + ", diagnostics=" + diagnostics + ", layer=" + layer + "]";
	}

}
