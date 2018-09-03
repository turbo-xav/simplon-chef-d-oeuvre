package com.bnpp.pf.digital.wiki.back.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

@Entity
@Table(name = "wiki_tbl_team")

public class Team {

	/**
	 * Id of team : primary key
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	/**
	 * Name of team
	 */

	@Column(length = 100)
	private String name;	

	/**
	 * sub teams
	 */

	@OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
	private List<Team> teams = new ArrayList<Team>();

	/**
	 * parent team
	 */
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fk_team")
	private Team team;

	/**
	 * parent Team
	 */

	@ManyToMany(mappedBy = "team")
	private Set<Member> members = new HashSet<Member>();

	public Set<Member> getMembers() {
		return members;
	}

	public void setMembers(Set<Member> members) {
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
		return "Team [id=" + id + ", name=" + name + ", teams=" + teams + ", team=" + team + ", members=" + members
				+ "]";
	}

}
