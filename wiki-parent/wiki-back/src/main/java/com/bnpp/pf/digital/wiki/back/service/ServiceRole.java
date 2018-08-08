package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Role;
import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.repository.RoleRepository;
import com.bnpp.pf.digital.wiki.back.repository.UserRepository;

@Component
@Transactional
public class ServiceRole {

    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserRepository userRepository;
        
    /**
     * 
     * @return
     */
    
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
    
    /**
     * 
     * @param id
     * @return
     */
    public Role getById(int id) {
        //Role role = roleRespository.getById(id);
    	Role role = roleRepository.getRoleByIdWithUser(id);
        /*List<User> users = role.getUsers();
        users.size();*/
        return role;
    }
    
    /**
     * 
     * @param role
     * @return
     */
    
    public Role save(Role role) {
        return roleRepository.save(role);
    }
    
    /**
     * 
     * @param id
     * @return
     */
    
    public void deleteById(int id) {
        Role role = roleRepository.getById(id);
        List<User> users = role.getUsers();
        for(User user: users) {
        	user.setRole(null);
        	userRepository.save(user);
        }
        
    	roleRepository.deleteById(id);
    }
      
}
