package com.bnpp.pf.digital.wiki.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bnpp.pf.digital.wiki.back.entity.User;
import com.bnpp.pf.digital.wiki.back.service.ServiceUser;

@CrossOrigin(origins = {"http://localhost:4200"}, maxAge = 4800, allowCredentials = "false") 
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
	
   
    @Autowired
    private ServiceUser serviceUser;
    
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
}