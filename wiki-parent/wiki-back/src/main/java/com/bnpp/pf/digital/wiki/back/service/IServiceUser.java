package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;


import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;

public interface IServiceUser {

	/**
	 * Get all users
	 * @return
	 */

	List<User> findAll();

	/**
	 * Get one user by its Id
	 * @param id
	 * @return
	 */
	User getById(int id);
	
	/**
	 * Get one user by its Id 
	 * @param uid
	 * @return
	 */
	
	User getByUID(String uid);
	

	/**
	 * save user with all informations including its role
	 * @param user
	 * @return
	 * @throws Exception 
	 * @throws TechnicalException 
	 */
	User save(User user) throws Exception;
	
	/**
	 * Create a user account without a role
	 * @param user
	 * @return
	 */
	 

	User createAccount(User user);


	/**
	 * Delete one user by its Id
	 * @param id
	 * @return
	 */

	void deleteById(int id);
	
	/**
	 * Generate a crypted password
	 * @param password
	 * @return
	 */
	
	String generatePassword(String password);

}