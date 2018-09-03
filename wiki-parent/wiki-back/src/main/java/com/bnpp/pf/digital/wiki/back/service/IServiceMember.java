package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;

public interface IServiceMember {

	/**
	 * 
	 * @return
	 */

	List<Member> findAll();

	/**
	 * 
	 * @param id
	 * @return
	 */
	Member getById(int id);

	/**
	 * 
	 * @param function
	 * @return
	 * @throws Exception 
	 * @throws TechnicalException 
	 */
	Member save(Member function) throws Exception;

	/**
	 * 
	 * @param id
	 * @return
	 */

	void deleteById(int id);

}