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
@Table(name = "wiki_tbl_team")

public class Team {

	/**
	 * Id of team : primary key
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	/**
	 * Name of team
	 */

	@Column(length = 100)
	private String name;	

	/**
	 * sub teams
	 */
	
	@JsonIgnore
	@OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
	private List<Team> teams = new ArrayList<Team>();

	/**
	 * parent team
	 */
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "fk_team")
	private Team team;

	/**
	 * parent Team
	 */
	
	@JsonIgnore
	@OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
	private List<Member> members = new ArrayList<Member>();

	public List<Member> getMembers() {
		return members;
	}

	public void setMembers(List<Member> members) {
		this.members = members;
	}

	/**
	 * Default constructor
	 */

	public Team() {

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

	public List<Team> getTeams() {
		return teams;
	}

	public void setTeams(List<Team> teams) {
		this.teams = teams;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	@Override
	public String toString() {
		return "Team [id=" + id + ", name=" + name + ", teams=" + teams.size() + ", team=" + team + ", members=" + members
				+ "]";
	}

}
