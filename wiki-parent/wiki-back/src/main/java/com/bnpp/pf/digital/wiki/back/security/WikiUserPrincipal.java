package com.bnpp.pf.digital.wiki.back.security;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bnpp.pf.digital.wiki.back.entity.User;

public class WikiUserPrincipal implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private User user;
	 
    public WikiUserPrincipal(User user) {
        this.user = user;
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		WikiAuthority wikiAuthority = new WikiAuthority(user.getRole().getName());
		
		List<? extends GrantedAuthority> listAuthority = Collections.singletonList(wikiAuthority);	
		//System.out.println(listAuthority);
		return listAuthority;
	}
	

	@Override
	public String getPassword() {		
		return user.getPassword();
	}

	@Override
	public String getUsername() {		
		return user.getUid();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return !user.isLocked();
	}

	@Override
	public boolean isCredentialsNonExpired() {		
		return true;
	}

	@Override
	public boolean isEnabled() {
		return user.isEnabled();
	}	
	
}

class WikiAuthority implements GrantedAuthority {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String role;
	
	public WikiAuthority(String role) {
		this.setRole("ROLE_" + role);
	}
	
	@Override
	public String getAuthority() {		
		return this.getRole();
	}

	/**
	 * @return the role
	 */
	public String getRole() {
		return role;
	}

	/**
	 * @param role the role to set
	 */
	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "role = " + role ;
	}
	
	
	
}
