package com.bnpp.pf.digital.wiki.back.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "wiki_tbl_function")
public class Function {

	/**
	 * Id of function : primary key
	 * 
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	/**
	 * Name of function
	 */

	@Column(length = 100)
	private String name;

	/**
	 * List of members
	 */
	@JsonIgnore
	@OneToMany(mappedBy = "function", fetch = FetchType.LAZY)
	private List<Member> members = new ArrayList<Member>();

	/**
	 * Default constructor
	 */

	public Function() {

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

	public List<Member> getMembers() {
		return members;
	}

	public void setMembers(List<Member> members) {
		this.members = members;
	}

	@Override
	public String toString() {
		return "Function [id=" + id + ", name=" + name + ", members=" + members + "]";
	}

	

}
