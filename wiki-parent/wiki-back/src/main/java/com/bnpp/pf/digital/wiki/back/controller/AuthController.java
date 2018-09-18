package com.bnpp.pf.digital.wiki.back.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.service.IServiceUser;

//@CrossOrigin(origins = { "http://localhost:4200", "*" })
@Controller
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private IServiceUser serviceUser;
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public User login() {
		try {			
				return getPrincipal();
			} catch (Exception e) {
				System.out.println(e);
			}
		
		return null;
		
	}
	
		
	@RequestMapping(value="/logout", method = RequestMethod.GET)
	@ResponseBody
	public void logout(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("logout success : "+ getPrincipal());
	}
	
	
	private User getPrincipal(){
		User user = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();		
		if (principal instanceof UserDetails) {
			user = serviceUser.getByUID( ( ( UserDetails) principal).getUsername() );			
		} 
		return user;
	}
}
