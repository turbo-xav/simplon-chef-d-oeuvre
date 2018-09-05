package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Team;
import com.bnpp.pf.digital.wiki.back.exception.FunctionnalException;
import com.bnpp.pf.digital.wiki.back.repository.TeamRepository;

@Component
@Transactional
public class ServiceTeam implements IServiceTeam {

    @Autowired
    private TeamRepository teamRepository;
            
    /* (non-Javadoc)
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceRole#findAll()
	 */
    
    public List<Team> findAll() {
        return teamRepository.findAll();
    }
    
   
    public Team getById(int id) {
    	return teamRepository.getById(id);       
    }
    
    
    public Team save(Team team) throws Exception {       
		if(team.getTeam() != null) {
			if(team.getTeam().getId() == team.getId()) {
				throw new FunctionnalException("you can't create a team wich is own parent");
			}
		}
    	  	
		return teamRepository.save(team);		
    }
    
    /* (non-Javadoc)
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceRole#deleteById(int)
	 */
    
    public void deleteById(int id) {
    	teamRepository.deleteById(id);
    }


	@Override
	public Team findTopByTeam() {
		
		return teamRepository.findTopByTeam(null);
	}
	
	@Override
	public List<Team> findSubTeamsFromTopTeam() {
		
		return teamRepository.findSubTeamsFromTopTeam();
	}
      
}
