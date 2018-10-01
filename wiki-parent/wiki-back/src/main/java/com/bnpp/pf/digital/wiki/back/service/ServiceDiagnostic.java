package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;
import com.bnpp.pf.digital.wiki.back.repository.DiagnosticRepository;


@Component
@Transactional
public class ServiceDiagnostic  implements IserviceDiagnostic{
	
	@PersistenceContext
    private EntityManager em;
	
	@Autowired
	public DiagnosticRepository diagnosticRepository;

	public Diagnostic save(Diagnostic diagnostic) {
		return diagnosticRepository.save(diagnostic);
	}
	public List<Diagnostic> findAll() {
		return diagnosticRepository.findAll();
	}
	public List<Diagnostic> getByUrl(String url){
		return diagnosticRepository.getByUrl(url);
	}
	public Diagnostic getById(int id) {
		return diagnosticRepository.getById(id);
	}
	public void deleteById(int id) {
		diagnosticRepository.deleteById(id);
	}
	
public List<Diagnostic> findByCriteria(String appId, String envId, String layerId, String serverId) {
		
		
		CriteriaBuilder cb = em.getCriteriaBuilder();
				
		String queryStr = "SELECT d FROM Diagnostic d";
		queryStr += " JOIN d.application a";
		queryStr += " JOIN d.server s ";
		queryStr += " JOIN s.layer l ";
		queryStr += " JOIN l.environ e";
		
		queryStr += " WHERE 1 = 1";
		
		if(!appId.equals("")) {
			queryStr += " AND  a.id = :appId";
		}
		
		if(!envId.equals("")) {
			queryStr += " AND  e.id = :envId";
		}	
		
		if(!layerId.equals("")) {
			queryStr += " AND  l.id = :layerId";
		}
		
		if(!serverId.equals("")) {
			queryStr += " AND  s.id = :serverId";
		}
		
		//System.out.println(queryStr);
		
		TypedQuery<Diagnostic> query = em.createQuery(queryStr, Diagnostic.class);
		
		if(!appId.equals("")) {
			query.setParameter("appId", Integer.valueOf(appId));
		}
		
		if(!envId.equals("")) {
			query.setParameter("envId", Integer.valueOf(envId));
		}
		
		if(!layerId.equals("")) {
			query.setParameter("layerId", Integer.valueOf(layerId));
		}
		
		if(!serverId.equals("")) {
			query.setParameter("serverId", Integer.valueOf(serverId));
		}
		
		List<Diagnostic> applications = query.getResultList();
		return applications;
	}

	
	
}
