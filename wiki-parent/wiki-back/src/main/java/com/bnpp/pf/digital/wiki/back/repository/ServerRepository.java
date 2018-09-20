package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.bnpp.pf.digital.wiki.back.entity.Layer;
import com.bnpp.pf.digital.wiki.back.entity.Server;

@Repository
public interface ServerRepository extends JpaRepository <Server,Integer> {

	public List<Server> findAll();
	
	public Server getById(int id);
	
	public List<Server> getByName(String name);
	
	public List<Server> getServersByLayer(Layer layer);
		
	void deleteById(int id);
}
