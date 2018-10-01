package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.bnpp.pf.digital.wiki.back.entity.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer>,JpaSpecificationExecutor<Application> {

	public List<Application> findAll();

	public Application getById(int id);

	public List<Application> getByCodeApp(String codeApp);

	public List<Application> getByTitle(String title);
	

	void deleteById(int id);

}
