package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.Team;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;

public interface IServiceTeam {

	/**
	 * 
	 * @return
	 */

	List<Team> findAll();

	/**
	 * 
	 * @param id
	 * @return
	 */
	Team getById(int id);
	
	/**
	 * 
	 * @return
	 */
	 

	Team findTopByTeam();
	
	/**
	 * 
	 * @return
	 */
	
	List<Team> findSubTeamsFromTopTeam();
	
	/**
	 * 
	 * @param team : team of searched members
	 * @return
	 */
	
	List<Member> findMembersByTeam(int teamId);

	/**
	 * 
	 * @param team
	 * @return
	 * @throws Exception 
	 * @throws TechnicalException 
	 */
	Team save(Team team) throws Exception;

	/**
	 * 
	 * @param id
	 * @return
	 */

	void deleteById(int id);
	
	
}