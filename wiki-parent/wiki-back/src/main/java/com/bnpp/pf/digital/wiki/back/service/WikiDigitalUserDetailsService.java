package com.bnpp.pf.digital.wiki.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.repository.UserRepository;
import com.bnpp.pf.digital.wiki.back.security.WikiUserPrincipal;

@Component
public class WikiDigitalUserDetailsService implements UserDetailsService {

	 @Autowired
	 private UserRepository userRepository;
	
	 @Override
	    public UserDetails loadUserByUsername(String uid) {
	        
		 	User user = userRepository.getByUid(uid);
	        if (user == null) {
	            throw new UsernameNotFoundException(uid);
	        }
	        return new WikiUserPrincipal(user);
	    }

}
