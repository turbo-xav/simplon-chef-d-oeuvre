package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bnpp.pf.digital.wiki.back.entity.User;

/**
 * 
 * @author 417165
 *
 */

//@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    
	 
	
	public List<User> findAll();
	
	/**
     * 
     * @param id
     * @return
     */
    
	
	User getById(int id);
    
    /**
     * 
     * @param name
     * @return
     */
    
	List<User> getByFirstName(String name);
    
    
    /**
     * 
     * @param id
     * @return
     */
    
    void deleteById(int id);    
    
}
