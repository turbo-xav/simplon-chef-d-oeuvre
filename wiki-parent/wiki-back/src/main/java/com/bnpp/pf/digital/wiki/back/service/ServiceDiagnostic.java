package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;
import com.bnpp.pf.digital.wiki.back.repository.DiagnosticRepository;


@Component
@Transactional
public class ServiceDiagnostic  implements IserviceDiagnostic{
	
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

	
	
}
