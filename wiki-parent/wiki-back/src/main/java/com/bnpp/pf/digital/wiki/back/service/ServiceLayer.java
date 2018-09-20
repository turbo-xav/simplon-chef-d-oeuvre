package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Layer;
import com.bnpp.pf.digital.wiki.back.entity.Server;
import com.bnpp.pf.digital.wiki.back.repository.LayerRepository;
import com.bnpp.pf.digital.wiki.back.repository.ServerRepository;

@Component
@Transactional
public class ServiceLayer implements IServiceLayer {

	@Autowired
	private LayerRepository layerRepository;
	
	@Autowired
	private ServerRepository serverRepository;
	
	public Layer save(Layer layer) {
		return layerRepository.save(layer);
	}

	public List<Layer> findAll() {
		return layerRepository.findAll();
	}

	public Layer getById(int id) {
		return layerRepository.getById(id);
	}

	public List<Layer> getByName(String name) {
		return layerRepository.getByName(name);

	}

	public List<Server> getServersByLayer(Layer layer) {
		return serverRepository.getServersByLayer(layer);
	}

	public void deleteById(int id) {
		layerRepository.deleteById(id);
	}

}
