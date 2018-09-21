package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bnpp.pf.digital.wiki.back.entity.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {

	// @Query("SELECT a FROM Application a LEFT OUTER JOIN FETCH a.server s")
	public List<Application> findAll();

	// @Query("SELECT a FROM Application a LEFT OUTER JOIN FETCH a.server s WHERE
	// a.id = :id")
	public Application getById(int id);

	public List<Application> getByCodeApp(String codeApp);

	public List<Application> getByTitle(String title);

	//
	// @Query("SELECT a" +
	// "FROM Application a" +
	// "INNER JOIN FETCH a.diagnostics d" +
	// "INNER JOIN FETCH d.server s" +
	// "INNER JOIN FETCH s.layer l" +
	// "INNER JOIN FETCH l.environ e")

	//public List<Application> getAppliAllInfo();

	void deleteById(int id);

}
