package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Role;
import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.repository.RoleRepository;
import com.bnpp.pf.digital.wiki.back.repository.UserRepository;

@Component
@Transactional
public class ServiceUser implements IServiceUser {

    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    /**
     * 
     * @param password
     * @return
     */
    
    public String generatePassword(String password) {
    	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		return passwordEncoder.encode(password);
    }
    
        
    /**
     * 
     * @return all Fetch
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
    	
    	if( user.getPassword() != null ) {
    		//If a password is specified then we crypt it
    		if(!user.getPassword().equals("")) {
    			System.out.println(user.getPassword());
    			user.setPassword(generatePassword(user.getPassword()));
    		}//An empty password is forbidden, so we wake a default value (firstName)    		
    		else {
    			System.out.println(user.getFirstName());
    			user.setPassword(generatePassword(user.getFirstName()));
    		}
    	//If password is null we affect the same like in database if exists or default value like firstName
    	}else {
    		User userFromBack = userRepository.getById(user.getId());    		    		
    		if(userFromBack != null) {
    			System.out.println(userFromBack.getPassword());
    			user.setPassword(userFromBack.getPassword());
    		}else {    			
    			String password = user.getFirstName();
    			String passwordEncrypted = generatePassword(password);
    			System.out.println(passwordEncrypted);
    			user.setPassword(passwordEncrypted);
    		}
    	}
    	
    	if(user.getRole() == null) {
	    	Role role = roleRepository.getByName("USER");
	    	if(role != null) {
	    		user.setRole(role);
	    	}
    	}
    	
    	//System.out.println(user.getPassword());
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
    
    /**
     * 
     */

	
	public User createAccount(User user) {
		
		user.setRole(null);
		user.setEnabled(true);
		user.setLocked(false);
		this.save(user);
		//userRepository.save(user);
		return user;
	}
	
	

	public User getByUID(String uid) {
		return userRepository.getByUid(uid);
	}
      
}
