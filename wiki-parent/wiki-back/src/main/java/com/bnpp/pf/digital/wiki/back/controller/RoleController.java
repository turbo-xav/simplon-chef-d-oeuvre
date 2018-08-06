package com.bnpp.pf.digital.wiki.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bnpp.pf.digital.wiki.back.entity.Role;
import com.bnpp.pf.digital.wiki.back.service.ServiceRole;

@RestController
@RequestMapping("/role")
public class RoleController {

   
    @Autowired
    private ServiceRole serviceRole;
    
    public RoleController() {
        
    }
    
    @RequestMapping(path="/find",method= RequestMethod.GET)
    @ResponseStatus(code=HttpStatus.OK)
    @ResponseBody
    public List<Role> getAll(){
        return serviceRole.findAll();
    }

    
    
    /**
     * 
     * @param name
     * @return
     */
    
    @RequestMapping(path="/save",method= RequestMethod.POST)
    @ResponseStatus(code=HttpStatus.OK)
    @ResponseBody
    public int save(@RequestBody Role role) {
        return serviceRole.save(role).getId();
    }
    
    
}
