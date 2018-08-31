package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bnpp.pf.digital.wiki.back.entity.User;

/**
 * 
 * @author 417165
 *
 */

//@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    
	 
	@Query("SELECT u FROM User u LEFT OUTER JOIN FETCH u.role r")
	public List<User> findAll();
	
	/**
     * 
     * @param id
     * @return
     */
    
	@Query("SELECT u FROM User u LEFT OUTER JOIN FETCH u.role r WHERE u.id = ?")
	User getById(int id);
	
	/**
     * 
     * @param id
     * @return
     */
    
	@Query("SELECT u FROM User u LEFT OUTER JOIN FETCH u.role r WHERE u.uid = ?")
	User getByUid(String uid);
    
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
