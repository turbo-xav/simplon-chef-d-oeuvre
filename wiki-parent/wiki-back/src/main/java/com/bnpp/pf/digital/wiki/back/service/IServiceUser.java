package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;


import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;

public interface IServiceUser {

	/**
	 * 
	 * @return
	 */

	List<User> findAll();

	/**
	 * 
	 * @param id
	 * @return
	 */
	User getById(int id);

	/**
	 * 
	 * @param user
	 * @return
	 * @throws Exception 
	 * @throws TechnicalException 
	 */
	User save(User user) throws Exception;
	
	/**
	 * 
	 * @param user
	 * @return
	 */
	 

	User createAccount(User user);


	/**
	 * 
	 * @param id
	 * @return
	 */

	void deleteById(int id);

}