package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bnpp.pf.digital.wiki.back.entity.Guideline;


public interface GuidelineRepository extends JpaRepository<Guideline, Integer> {
	
	@Query("SELECT g FROM Guideline g LEFT OUTER JOIN FETCH g.user u LEFT OUTER JOIN FETCH u.role r ")	
	public List<Guideline> findAll();
	
	/**
     * 
     * @param id
     * @return
     */
     Guideline getById(int id);
    
    /**
     * 
     * @param id
     * @return
     */
    @Query("SELECT g FROM Guideline g LEFT OUTER JOIN FETCH g.user u LEFT OUTER JOIN FETCH u.role r WHERE g.id = :id")
    Guideline getGuidelineByIdWithUser(@Param("id") int id);
    
    /**
     * 
     * @param name
     * @return
     */
     List<Guideline> getByName(String name);
    
    
    /**
     * 
     * @param id
     * @return
     */
    
    void deleteById(int id);    
    
}