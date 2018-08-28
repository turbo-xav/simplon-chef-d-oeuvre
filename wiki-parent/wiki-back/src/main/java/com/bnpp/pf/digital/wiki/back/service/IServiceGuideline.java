package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import com.bnpp.pf.digital.wiki.back.entity.Guideline;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;

public interface IServiceGuideline {

	/**
	 * 
	 * @return
	 */

	List<Guideline> findAll();

	/**
	 * 
	 * @param id
	 * @return
	 */
	Guideline getById(int id);

	/**
	 * 
	 * @param guideline
	 * @return
	 * @throws Exception 
	 * @throws TechnicalException 
	 */
	Guideline save(Guideline guideline) throws Exception;

	/**
	 * 
	 * @param id
	 * @return
	 */

	void deleteById(int id);

}