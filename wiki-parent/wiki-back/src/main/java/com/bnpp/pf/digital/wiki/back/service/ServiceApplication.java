package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Application;
import com.bnpp.pf.digital.wiki.back.repository.ApplicationRepository;

@Component
@Transactional
public class ServiceApplication implements IServiceApplication {

	@Autowired
	private ApplicationRepository applicationRepository;
	
	public Application save(Application application) {
		return applicationRepository.save(application);
	}
	
	public List<Application> findAll(){
		return applicationRepository.findAll();
	}
	
	public Application getById(int id) {
		return applicationRepository.getById(id);
	}
	
	public List<Application> getByCodeApp(String codeApp) {
		return applicationRepository.getByCodeApp(codeApp);
	}
	
	public List <Application> getByTitle(String title) {
		return applicationRepository.getByTitle(title);
		
	}
	public void deleteById(int id) {
		applicationRepository.deleteById(id);
	}

	
}


