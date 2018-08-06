package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bnpp.pf.digital.wiki.back.entity.Role;

/**
 * 
 * @author 417165
 *
 */

//@Repository
public interface RoleRespository extends JpaRepository<Role, Integer>{
    /**
     * 
     * @param id
     * @return
     */
    
    Role getById(int id);
    
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
