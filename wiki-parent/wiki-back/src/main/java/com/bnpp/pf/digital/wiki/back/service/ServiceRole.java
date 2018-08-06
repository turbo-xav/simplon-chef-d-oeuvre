package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Role;
import com.bnpp.pf.digital.wiki.back.repository.RoleRespository;

@Component
@Transactional
public class ServiceRole {

    @Autowired
    private RoleRespository roleRespository;
    
    /**
     * 
     * @return
     */
    
    public List<Role> findAll() {
        return roleRespository.findAll();
    }
    
    /**
     * 
     * @param id
     * @return
     */
    public Role getById(int id) {
        return roleRespository.getById(id);
    }
    
    /**
     * 
     * @param role
     * @return
     */
    
    public Role save(Role role) {
        return roleRespository.save(role);
    }
    
    /**
     * 
     * @param id
     * @return
     */
    
    public void deleteById(int id) {
        roleRespository.deleteById(id);
    }
      
}
