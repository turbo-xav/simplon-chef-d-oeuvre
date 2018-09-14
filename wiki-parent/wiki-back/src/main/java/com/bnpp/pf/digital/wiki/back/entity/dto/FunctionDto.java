package com.bnpp.pf.digital.wiki.back.entity.dto;

import com.bnpp.pf.digital.wiki.back.entity.Function;

public class FunctionDto {
	
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
	
	public Function toFunction() {
		Function function = new Function();
		function.setId(this.getId());
		function.setName(this.getName());
		return function;
	}
	

}
