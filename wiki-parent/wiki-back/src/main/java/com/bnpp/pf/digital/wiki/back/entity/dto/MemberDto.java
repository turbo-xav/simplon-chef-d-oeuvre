package com.bnpp.pf.digital.wiki.back.entity.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.bnpp.pf.digital.wiki.back.entity.Member;

public class MemberDto {
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

	
	private String firstName;
	
	/**
	 * lastName of member
	 */

	
	private String lastName;
	
	/**
	 * mail of member
	 */

	
	private String mail;
	
	/**
	 * mail of member
	 */

	
	private String tel;
	
	/**
	 * Function of member
	 */

	
	private FunctionDto function;

	/**
	 * Team of member
	 * 
	 */

	private TeamDto team;

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
		
	public FunctionDto getFunction() {
		return function;
	}

	public void setFunction(FunctionDto function) {
		this.function = function;
	}

	public TeamDto getTeam() {
		return team;
	}

	public void setTeam(TeamDto team) {
		this.team = team;
	}

	public Member toMember() {
		Member member = new Member();
		member.setId(this.getId());
		member.setFirstName(this.getFirstName());
		member.setLastName(this.getLastName());
		member.setMail(this.getMail());
		member.setTel(this.getTel());
		member.setFunction(this.getFunction().toFunction());
		member.setTeam(this.getTeam().toTeam());
		
		return member;
	}

	@Override
	public String toString() {
		return "MemberDto [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", mail=" + mail
				+ ", function=" + function.getName() + ", team=" + team.getName() + "]";
	}

	/**
	 * @return the tel
	 */
	public String getTel() {
		return tel;
	}

	/**
	 * @param tel the tel to set
	 */
	public void setTel(String tel) {
		this.tel = tel;
	}
	
	


}
