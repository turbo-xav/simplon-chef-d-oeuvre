package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Guideline;
import com.bnpp.pf.digital.wiki.back.repository.GuidelineRepository;

@Component
@Transactional
public class ServiceGuideline implements IServiceGuideline {

	@Autowired
	private GuidelineRepository guidelineRepository;

	// @Autowired
	// private UserRepository userRepository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceRole#findAll()
	 */

	public List<Guideline> findAll() {
		return guidelineRepository.findAll();
	}

	public Guideline getById(int id) {
		return guidelineRepository.getGuidelineByIdWithUser(id);
	}

	@Transactional()
	public Guideline save(Guideline guideline) {
		return guidelineRepository.save(guideline);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceRole#deleteById(int)
	 */

	public void deleteById(int id) {

		guidelineRepository.deleteById(id);
	}
	
	
}
