package com.bnpp.pf.digital.wiki.back.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Role;
import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException.TECHNICAL_EXCEPTION_TYPE;
import com.bnpp.pf.digital.wiki.back.repository.RoleRepository;
import com.bnpp.pf.digital.wiki.back.repository.UserRepository;

@Component
@Transactional
public class ServiceRole implements IServiceRole {

    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserRepository userRepository;
        
    /* (non-Javadoc)
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceRole#findAll()
	 */
    
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
    
   
    public Role getById(int id) {
    	Role role = roleRepository.getRoleByIdWithUser(id);
        return role;
    }
    
    
    @Transactional()
    public Role save(Role role) {       
    	role.setName(role.getName().toUpperCase());	
    	return roleRepository.save(role);		
    }
    
    /* (non-Javadoc)
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceRole#deleteById(int)
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
