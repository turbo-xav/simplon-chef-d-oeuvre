package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import com.bnpp.pf.digital.wiki.back.entity.Function;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;

public interface IServiceFunction {

	/**
	 * 
	 * @return
	 */

	List<Function> findAll();

	/**
	 * 
	 * @param id
	 * @return
	 */
	Function getById(int id);

	/**
	 * 
	 * @param function
	 * @return
	 * @throws Exception 
	 * @throws TechnicalException 
	 */
	Function save(Function function) throws Exception;

	/**
	 * 
	 * @param id
	 * @return
	 */

	void deleteById(int id);

}