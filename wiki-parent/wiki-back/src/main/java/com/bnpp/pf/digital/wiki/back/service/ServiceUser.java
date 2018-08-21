package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.repository.UserRepository;

@Component
@Transactional
public class ServiceUser implements IServiceUser {

    
    @Autowired
    private UserRepository userRepository;
        
    /**
     * 
     * @return
     */
    
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    /**
     * 
     * @param id
     * @return
     */
    public User getById(int id) {        
    	return userRepository.getById(id);
    }
    
    /**
     * 
     * @param role
     * @return
     */
    
    public User save(User user) {
        
    	userRepository.save(user);
    	return user;
    }
    
    /**
     * 
     * @param id
     * @return
     */
    
    public void deleteById(int id) {   
    	userRepository.deleteById(id);
    }

	
	public User createAccount(User user) {
		
		user.setRole(null);
		user.setEnabled(false);
		user.setLocked(false);
		userRepository.save(user);
		return user;
	}
      
}
