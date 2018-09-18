package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Environ;
import com.bnpp.pf.digital.wiki.back.repository.EnvironmentRepository;

@Component
@Transactional
public class ServiceEnvironment implements IServiceEnviron{

	@Autowired
	private EnvironmentRepository environmentRepository;
	
	public Environ save(Environ environ) {
		return environmentRepository.save(environ);
	}

		public List<Environ> findAll(){
		return environmentRepository.findAll();
	}

	public Environ getById(int id) {
		return environmentRepository.getById(id);
	}

	public List<Environ> getByName(String name){
		return environmentRepository.getByName(name);
	}

	public void deleteById(int id) {
		environmentRepository.deleteById(id);
	}

	
	}

	

