package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bnpp.pf.digital.wiki.back.entity.Role;

/**
 * 
 * @author 417165
 *
 */

//@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>{
    
	 
	@Query("SELECT distinct r FROM Role r LEFT OUTER JOIN FETCH r.users u")
	public List<Role> findAll();
	
	/**
     * 
     * @param id
     * @return
     */
    
	
    Role getById(int id);
    
    /**
     * 
     * @param id
     * @return
     */
    
    @Query("SELECT r FROM Role r LEFT OUTER JOIN FETCH r.users u WHERE r.id = :id")
    Role getRoleByIdWithUser(@Param("id") int id);
    
    /**
     * 
     * @param name
     * @return
     */
    
    List<Role> getByName(String name);
    
    
    /**
     * 
     * @param id
     * @return
     */
    
    void deleteById(int id);    
    
}
