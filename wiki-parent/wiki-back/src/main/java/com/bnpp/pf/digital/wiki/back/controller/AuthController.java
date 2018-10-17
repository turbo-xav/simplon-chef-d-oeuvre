package com.bnpp.pf.digital.wiki.back.controller;

import java.util.List;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.service.IServiceUser;

@Controller
@RequestMapping("/auth")
public class AuthController {
	
	
    private static final String UPDATING_ERROR_MSG = "updating this user is not possible please verify your database";
	
    private static final String UPDATING_INTERITY_ERROR_MSG = "updating this user is not possible please verify if you are not update a user with the same uid or email";
	  	
    private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "updating this user is not possible please verify your datas";
		
	private static final String MISSING_UID_ERROR_MSG = "please specify an uid (ex : 417165)";
	
	private static final String MISSING_FIRSTNAME_ERROR_MSG = "please specify a firstName ";

	private static final String MISSING_LASTNAME_ERROR_MSG = "please specify a lastName";

	private static final String MISSING_MAIL_ERROR_MSG = "please specify the mail";

	private static final String INVALID_MAIL_ERROR_MSG = "please specify a valid mail adress (ex : jean-pierre.dupond@cetelem.fr)";
	
	private static final String BAD_FORMAT_UID_ERROR_MSG = "please specify a correct uid with 6 alpha numeric caracters (ex : 41765a)";
	
	private static final String MISSING_PASSWORD_ERROR_MSG = "please specify a password (ex : 41765a)";
	
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
	
	@RequestMapping(value="/generate-password",method = RequestMethod.GET)
	@ResponseBody
	public String generatePassword(@RequestParam("password") String password) {
		return serviceUser.generatePassword(password);
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
	
	/**
     * 
     * @param name
     * @return
     */
    
    @RequestMapping(method= RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<?> update(@RequestBody User user) {
    	try {			
    		
    		WikiError wikiError = this.checkUserDatas(user);   		
    		
    		if(wikiError.getErrors().size() > 0) {
    			wikiError.setMsg("some errors has stopped saving of the user");
    			return new ResponseEntity<WikiError>(wikiError, HttpStatus.BAD_REQUEST);    					
    		}
    		
    		serviceUser.save(user);
        	return new ResponseEntity<Integer>(user.getId(), HttpStatus.OK);
        	
        	
		} catch (DataIntegrityViolationException e) {
			e.printStackTrace();
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
        catch(DataAccessException e) {
        	e.printStackTrace();
        	return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
        	e.printStackTrace();
        	return new ResponseEntity<WikiError>(new WikiError(UPDATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }   	
    }
    
    private WikiError checkUserDatas(User user) {
    	String EMAIL_PATTERN = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
    	
    	WikiError wikiError = new WikiError("");
		if (user.getUid().isEmpty()) {
			wikiError.addError("uid", MISSING_UID_ERROR_MSG);
		} else if(!Pattern.compile("^[a-zA-Z0-9]{6}$").matcher(user.getUid()).find()) {
			wikiError.addError("uid", BAD_FORMAT_UID_ERROR_MSG);
		}
		
		if (user.getFirstName().isEmpty()) {
			wikiError.addError("firstName", MISSING_FIRSTNAME_ERROR_MSG);
		}
		
		if (user.getLastName().isEmpty()) {
			wikiError.addError("lastName", MISSING_LASTNAME_ERROR_MSG);
		}
		
		/*if (user.getPassword().isEmpty()) {
			wikiError.addError("password", MISSING_PASSWORD_ERROR_MSG);
		}*/
		
		if (user.getMail().isEmpty()) {
			wikiError.addError("mail", MISSING_MAIL_ERROR_MSG);
		}
		else if(!Pattern.compile(EMAIL_PATTERN).matcher(user.getMail()).matches()) {
			wikiError.addError("mail", INVALID_MAIL_ERROR_MSG);
		}
		
		return wikiError;
    }
}
