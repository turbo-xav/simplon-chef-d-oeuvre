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
@Table(name = "wiki_tbl_diag")
public class Diagnostic {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(length = 400, unique = true)
	private String url;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "fk_appli")
	private Application application;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "fk_server")
	private Server server;
	
	
	
	public Diagnostic() {

	}

	public int getId() {
		return id;
	}

	public Server getServer() {
		return server;
	}

	public void setServer(Server server) {
		this.server = server;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		return "Diagnostic [id=" + id + ", url=" + url + ", application=" + application + ", server=" + server + "]";
	}

}
