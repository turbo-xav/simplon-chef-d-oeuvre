package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
    
	@Query("SELECT u FROM User u LEFT OUTER JOIN FETCH u.role r WHERE u.id = :id")
	User getById(@Param("id") int id);
	
	/**
     * 
     * @param id
     * @return
     */
    
	@Query("SELECT u FROM User u LEFT OUTER JOIN FETCH u.role r WHERE u.uid = :uid")
	User getByUid(@Param("uid") String uid);
    
    /**
     * 
     * @param name
     * @return
     */
    
	List<User> getByFirstName(String firstName);
    
    
    /**
     * 
     * @param id
     * @return
     */
    
    void deleteById(int id);    
    
}
