package com.bnpp.pf.digital.wiki.back.controller;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.service.IServiceUser;

//@CrossOrigin(origins = {"http://localhost:4200","*"})
//@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {
	
	private static final String LISTING_ERROR_MSG = "get list of users is not possible please verify your database";
	
	private static final String GETTING_ERROR_MSG = "get this user is not possible please verify your database";
	
	private static final String DELETING_BY_ID_ERROR_MSG = "delete this user is not possible please verify your database";
	
	
	private static final String CREATING_ERROR_MSG = "creating this user is not possible please verify your database";
		
    private static final String UPDATING_ERROR_MSG = "updating this user is not possible please verify your database";
	
    private static final String CREATING_INTERITY_ERROR_MSG = "creating this user is not possible please verify if you are not create an exiting user";
	
    private static final String UPDATING_INTERITY_ERROR_MSG = "updating this user is not possible please verify if you are not update a user with the same uid or email";
	
    private static final String CREATING_DATA_ACCESS_ERROR_MSG = "creating this user is not possible please verify your datas";
	
    private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "updating this user is not possible please verify your datas";
	
    
    private static final String CREATING_ACCOUNT_ERROR_MSG = "creating this account is not possible due to a technical problem. Please retry later";
	
	private static final String CREATING_ACCOUNT_INTERITY_ERROR_MSG = "creating this account is not possible please verify if you are not create an exiting account";
		
	private static final String CREATING_ACCOUNT_DATA_ACCESS_ERROR_MSG = "creating this account is not possible due to a technical problem. Please retry later";
	
	private static final String MISSING_UID_ERROR_MSG = "please specify an uid (ex : 417165)";
	
	private static final String MISSING_FIRSTNAME_ERROR_MSG = "please specify a firstName ";

	private static final String MISSING_LASTNAME_ERROR_MSG = "please specify a lastName";

	private static final String MISSING_MAIL_ERROR_MSG = "please specify the mail";

	private static final String INVALID_MAIL_ERROR_MSG = "please specify a valid mail adress (ex : jean-pierre.dupond@cetelem.fr)";
	
	private static final String BAD_FORMAT_UID_ERROR_MSG = "please specify a correct uid with 6 alpha numeric caracters (ex : 41765a)";
	
	
	private static final String MISSING_PASSWORD_ERROR_MSG = "please specify a password (ex : 41765a)";
	
	
	
    @Autowired
    private IServiceUser serviceUser;
    
    public UserController() {
        
    }
    
    @RequestMapping(method= RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getAll(){
    	try {
    		List<User> users = serviceUser.findAll(); 
         	return new ResponseEntity<List<User>>(users, HttpStatus.OK);
 		} 
         catch(DataAccessException e) {
         	return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
         }
         catch(Exception e) {
         	return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
         }   
    }
    
    @RequestMapping(path="{id}", method= RequestMethod.GET)
    @ResponseBody
    //@Transactional
    public ResponseEntity<?> getById(@PathVariable("id") int id){
    	try {
    		User user = serviceUser.getById(id); 
        	return new ResponseEntity<User>(user, HttpStatus.OK);
		} 
        catch(DataAccessException e) {
        	return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
        	return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }
    	               
        
    }
    
    @RequestMapping(path="{id}", method= RequestMethod.DELETE)
    @ResponseBody
    //@Transactional
    public ResponseEntity<?> deleteById(@PathVariable("id") int id){
    	try {
    		serviceUser.deleteById(id); 
        	return new ResponseEntity<Integer>(id, HttpStatus.OK);
		} 
        catch(DataAccessException e) {
        	return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
        	return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }
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
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
        catch(DataAccessException e) {
        	return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
        	return new ResponseEntity<WikiError>(new WikiError(UPDATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }   	
    }
    
    /**
     * 
     * @param name
     * @return
     */
    
    @RequestMapping(method= RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> insert(@RequestBody User user) {
    	try {
    		
    		
    		WikiError wikiError = this.checkUserDatas(user);   		
    		
    		if(wikiError.getErrors().size() > 0) {
    			wikiError.setMsg("some errors has stopped saving of the user");
    			return new ResponseEntity<WikiError>(wikiError, HttpStatus.BAD_REQUEST);    					
    		}
    		
    		serviceUser.save(user);
        	return new ResponseEntity<Integer>(user.getId(), HttpStatus.OK);
        	
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
        catch(DataAccessException e) {
        	return new ResponseEntity<WikiError>(new WikiError(CREATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
        	return new ResponseEntity<WikiError>(new WikiError(CREATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }
    }
    
    /**
     * 
     * @param name
     * @return
     */
    
    @RequestMapping(path="/account", method= RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> createAccount(@RequestBody User user) {
    	try {
			serviceUser.createAccount(user);
        	return new ResponseEntity<Integer>(user.getId(), HttpStatus.OK);
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_ACCOUNT_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
        catch(DataAccessException e) {
        	return new ResponseEntity<WikiError>(new WikiError(CREATING_ACCOUNT_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
        	return new ResponseEntity<WikiError>(new WikiError(CREATING_ACCOUNT_ERROR_MSG), HttpStatus.BAD_REQUEST);
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
		
		if (user.getPassword().isEmpty()) {
			wikiError.addError("password", MISSING_PASSWORD_ERROR_MSG);
		}
		
		if (user.getMail().isEmpty()) {
			wikiError.addError("mail", MISSING_MAIL_ERROR_MSG);
		}
		else if(!Pattern.compile(EMAIL_PATTERN).matcher(user.getMail()).matches()) {
			wikiError.addError("mail", INVALID_MAIL_ERROR_MSG);
		}
		
		return wikiError;
    }
}