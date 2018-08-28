package com.bnpp.pf.digital.wiki.back.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bnpp.pf.digital.wiki.back.entity.User;

@CrossOrigin(origins = { "http://localhost:4200", "*" })
@Controller
@RequestMapping("/auth")
public class AuthController {
	
	@RequestMapping(value="/auth", method = RequestMethod.POST)
	@ResponseBody
	public String auth(@RequestBody User user) {
		return user.getUid() + user.getPassword();
	}
	
	@RequestMapping(value="/login", method = RequestMethod.GET)
	
	public String login(ModelMap model) {
		return "login";
	}
	
	@RequestMapping(value="/auth-fail", method = RequestMethod.GET)
	@ResponseBody
	public String authFail(HttpServletRequest request, HttpServletResponse response) {
		return "authFail";
	}
	
	@RequestMapping(value="/access-denied", method = RequestMethod.GET)
	@ResponseBody
	public String accessDenied(HttpServletRequest request, HttpServletResponse response) {
		return "accessDenied";
	}
	
	@RequestMapping(value="/logout", method = RequestMethod.GET)
	@ResponseBody
	public String logout(HttpServletRequest request, HttpServletResponse response) {
		return "logout";		
	}
	
	@RequestMapping(value = "/ok", method = RequestMethod.GET)
	@ResponseBody
	public String accessDeniedPage(ModelMap model) {
		return "connected";
		
	}
	
	/*private String getPrincipal(){
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			userName = ((UserDetails)principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}*/
}
