package com.bnpp.pf.digital.wiki.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

   
    @Autowired
    private ServiceUser serviceUser;
    
    public UserController() {
        
    }
    
    @RequestMapping(method= RequestMethod.GET)
    @ResponseStatus(code=HttpStatus.OK)
    @ResponseBody
    public List<User> getAll(){
       return serviceUser.findAll();       
       
    }
    
    @RequestMapping(path="{id}", method= RequestMethod.GET)
    @ResponseStatus(code=HttpStatus.OK)
    @ResponseBody
    @Transactional
    public User getById(@PathVariable("id") int id){
        return serviceUser.getById(id);                
        
    }
    
    @RequestMapping(path="{id}", method= RequestMethod.DELETE)
    @ResponseStatus(code=HttpStatus.OK)
    @ResponseBody
    @Transactional
    public void deleteById(@PathVariable("id") int id){
    	serviceUser.deleteById(id);               
       
    }   
    
    /**
     * 
     * @param name
     * @return
     */
    
    @RequestMapping(method= RequestMethod.PUT)
    @ResponseStatus(code=HttpStatus.OK)
    @ResponseBody
    public int update(@RequestBody User user) {
        return serviceUser.save(user).getId();
    }
    
    /**
     * 
     * @param name
     * @return
     */
    
    @RequestMapping(method= RequestMethod.POST)
    @ResponseStatus(code=HttpStatus.OK)
    @ResponseBody
    public int insert(@RequestBody User user) {
        return serviceUser.save(user).getId();
    }   
}