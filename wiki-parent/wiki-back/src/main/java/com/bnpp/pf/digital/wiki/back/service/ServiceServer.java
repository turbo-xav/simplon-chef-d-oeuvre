package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Server;
import com.bnpp.pf.digital.wiki.back.repository.ServerRepository;

@Component
@Transactional
public class ServiceServer implements IServiceServer {

	@Autowired
	public ServerRepository serverRepository;

	public Server save(Server server) {
		return serverRepository.save(server);
	}

	public List <Server> findAll() {
		return serverRepository.findAll();
	}
	
	public Server getById(int id) {
		return serverRepository.getById(id);
	}
	
	public List<Server> getByName(String name){
		return serverRepository.getByName(name);
	}
	
	public void deleteById(int id) {
		serverRepository.deleteById(id);
	}
}
