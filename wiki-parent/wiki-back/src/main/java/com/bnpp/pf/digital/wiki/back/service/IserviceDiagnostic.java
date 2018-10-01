package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;


public interface IserviceDiagnostic {
	Diagnostic save(Diagnostic diagnostic);
	List<Diagnostic> findAll();
	List<Diagnostic> getByUrl(String name);
	Diagnostic getById(int id);
	public void deleteById(int id);
	
	public List<Diagnostic> findByCriteria(String appId, String envId, String layerId, String serverId);		
	
	
}
