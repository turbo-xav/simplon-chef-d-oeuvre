package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;
import com.bnpp.pf.digital.wiki.back.entity.Server;


@Repository
public interface DiagnosticRepository extends JpaRepository <Diagnostic,Integer>  {

	/**
	 * equivalent SQL :
	 * SELECT * FROM wiki_tbl_diag diag
INNER JOIN wiki_tbl_application app ON diag.fk_appli = app.id
INNER JOIN wiki_tbl_server serv ON diag.fk_server = serv.id
INNER JOIN wiki_tbl_layer layer ON serv.fk_layer = layer.id
INNER JOIN wiki_tbl_environnment env ON layer.fk_environ = env.id
	 */
	@Query("SELECT d FROM Diagnostic d "
			+ " INNER JOIN FETCH d.application a"
			+ " INNER JOIN FETCH d.server s "
			+ " INNER JOIN FETCH s.layer l "
			+ " INNER JOIN FETCH l.environ e "
		)	
	
	public List<Diagnostic> findAll();
	
	public Diagnostic getById(int id);
	
	public List<Diagnostic> getByUrl(String name);
	
	public List <Diagnostic> getDiagnosticsByServer(Server server);
		
	void deleteById(int id);
}
