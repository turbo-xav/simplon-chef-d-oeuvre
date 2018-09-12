package com.bnpp.pf.digital.wiki.back.entity.dto;

import com.bnpp.pf.digital.wiki.back.entity.Team;

public class TeamDto {
	
	
	private int id;

	
	private String name;


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
	
	public Team toTeam() {
		Team team = new Team();
		team.setId(this.getId());
		team.setName(this.getName());
		return team;
	}
	
	


}
