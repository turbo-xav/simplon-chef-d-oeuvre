package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bnpp.pf.digital.wiki.back.entity.Layer;


@Repository
public interface LayerRepository extends JpaRepository<Layer, Integer> {
	
	public List<Layer> findAll();
	public Layer getById(int id);
	public List<Layer> getByName (String Name);
	
	void deleteById(int id);
	
}


