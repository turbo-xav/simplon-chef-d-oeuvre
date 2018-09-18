package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bnpp.pf.digital.wiki.back.entity.Environ;




@Repository
public interface EnvironmentRepository extends JpaRepository<Environ, Integer> {
	
public List<Environ> findAll();
	
	public Environ getById(int id);
	
	public List<Environ> getByName(String name);
		
	void deleteById(int id);
}
