package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import com.bnpp.pf.digital.wiki.back.entity.Layer;

public interface IServiceLayer {

	Layer save(Layer layer);

	List<Layer> findAll();

	Layer getById(int id);

	List<Layer> getByName(String name);

	public void deleteById(int id);

}
