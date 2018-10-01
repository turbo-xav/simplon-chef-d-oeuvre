package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bnpp.pf.digital.wiki.back.entity.Environ;





@Repository
public interface EnvironmentRepository extends JpaRepository<Environ, Integer> {
	
public List<Environ> findAll();
	
	public Environ getById(int id);
	
	public List<Environ> getByName(String name);
		
	void deleteById(int id);
	
	@Query("SELECT DISTINCT(e) FROM Environ e "
			+ " JOIN e.layers l "
			+ " JOIN l.servers s "
			+ " JOIN s.diagnostics d "
			+ " JOIN d.application a "
			+ " WHERE a.id = :applicationId"
			)
	public List<Environ> getEnvironnmentsByApplication(@Param("applicationId") int applicationId);
}

