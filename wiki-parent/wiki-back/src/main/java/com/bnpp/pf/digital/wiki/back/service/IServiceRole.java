package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import com.bnpp.pf.digital.wiki.back.entity.Role;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;

public interface IServiceRole {

	/**
	 * 
	 * @return
	 */

	List<Role> findAll();

	/**
	 * 
	 * @param id
	 * @return
	 */
	Role getById(int id);

	/**
	 * 
	 * @param role
	 * @return
	 * @throws Exception 
	 * @throws TechnicalException 
	 */
	Role save(Role role) throws Exception;

	/**
	 * 
	 * @param id
	 * @return
	 */

	void deleteById(int id);

}