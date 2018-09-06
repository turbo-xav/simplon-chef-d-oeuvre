package com.bnpp.pf.digital.wiki.back.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
		return getPrincipal();
		//System.out.println("login : " +  getPrincipal());
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
