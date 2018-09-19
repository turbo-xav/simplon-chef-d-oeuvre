package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.hibernate.cfg.Environment;

import com.bnpp.pf.digital.wiki.back.entity.Environ;
import com.bnpp.pf.digital.wiki.back.entity.Layer;



public interface IServiceEnviron {

	Environ save(Environ environment);

	List<Environ> findAll();

	Environ getById(int id);

	List<Environ> getByName(String name);

	public void deleteById(int id);
	
	public List<Layer> getLayersByEnviron(Environ env);

}
