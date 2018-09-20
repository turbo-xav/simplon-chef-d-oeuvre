package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;
import com.bnpp.pf.digital.wiki.back.entity.Server;

public interface IServiceServer {
	
	Server save(Server server);
	List<Server> findAll();
	List<Server> getByName(String name);
	Server getById(int id);
	public void deleteById(int id);
	
	public List <Diagnostic> getDiagnosticsByServer(Server server);

}
