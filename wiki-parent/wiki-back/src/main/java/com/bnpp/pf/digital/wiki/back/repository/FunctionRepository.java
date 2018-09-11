package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bnpp.pf.digital.wiki.back.entity.Function;

/**
 * 
 * @author 417165
 *
 */

//@Repository
public interface FunctionRepository extends JpaRepository<Function, Integer>{
    
	 
	@Query("SELECT f FROM Function f")
	public List<Function> findAll();
	
	/**
     * 
     * @param id
     * @return
     */
    
	@Query("SELECT f FROM Function f WHERE f.id = :id")
	Function getById(@Param("id") int id);
		    
    /**
     * 
     * @param name
     * @return
     */
	@Query("SELECT f FROM Function f WHERE f.name = :name")
	Function getByName(@Param("name") String name);
        
    /**
     * 
     * @param id
     * @return
     */
    
    void deleteById(int id);    
    
}
