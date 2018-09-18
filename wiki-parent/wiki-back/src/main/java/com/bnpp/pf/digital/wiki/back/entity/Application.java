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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "wiki_tbl_application")
public class Application {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(length = 20, unique = true)
	private String codeApp;

	@Column(length = 200, unique = true)
	private String title;

	@Column(length = 500, unique = true)
	private String description;

	// Relation with Servers
	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "appli_server", joinColumns = {
			@JoinColumn(name = "fk_appli", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "fk_server", referencedColumnName = "id") })
	private List<Server> servers = new ArrayList<Server>();

	// Default constructor
	public Application() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCodeApp() {
		return codeApp;
	}

	public void setCodeApp(String codeApp) {
		this.codeApp = codeApp;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Server> getServers() {
		return servers;
	}

	public void setServers(List<Server> servers) {
		this.servers = servers;
	}

	@Override
	public String toString() {
		return "Application [id=" + id + ", codeApp=" + codeApp + ", title=" + title + ", description=" + description
				+ ", servers=" + servers + "]";
	}

}
