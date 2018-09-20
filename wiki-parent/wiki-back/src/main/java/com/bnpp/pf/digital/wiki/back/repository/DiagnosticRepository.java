package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;
import com.bnpp.pf.digital.wiki.back.entity.Server;


@Repository
public interface DiagnosticRepository extends JpaRepository <Diagnostic,Integer>  {

	public List<Diagnostic> findAll();
	
	public Diagnostic getById(int id);
	
	public List<Diagnostic> getByUrl(String name);
	
	public List <Diagnostic> getDiagnosticsByServer(Server server);
		
	void deleteById(int id);
}
