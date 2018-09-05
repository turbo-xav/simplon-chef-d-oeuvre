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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "wiki_tbl_member")
public class Member {
	
	/**
	 * Id of member : primary key
	 * 
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	/**
	 * firstName of member
	 */

	@Column(length = 100)
	private String firstName;
	
	/**
	 * lastName of member
	 */

	@Column(length = 100)
	private String lastName;
	
	/**
	 * mail of member
	 */

	@Column(length = 100)
	private String mail;
	
	
	

	/**
	 * Function of member
	 */

	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "fk_function")
	private Function function;

	/**
	 * Team of member
	 * 
	 */

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "fk_team")
	private Team team;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Function getFunction() {
		return function;
	}

	public void setFunction(Function function) {
		this.function = function;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	@Override
	public String toString() {
		return "Member [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", mail=" + mail
				+ ", function=" + function + ", team=" + team + "]";
	}
	
	
	
	
}

