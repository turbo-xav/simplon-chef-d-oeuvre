package com.bnpp.pf.digital.wiki.back.service;



import java.util.List;

import com.bnpp.pf.digital.wiki.back.entity.Application;
import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;


public interface IServiceApplication {

	Application save(Application application);
	List<Application> findAll();
	Application getById(int id);
	List <Application> getByCodeApp(String codeApp);
	List <Application> getByTitle (String title);
	
	
	public void deleteById(int id);

}
