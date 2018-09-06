package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Member;
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
    
    
    public Team save(Team team) throws FunctionnalException {       
		
    	if(team.getTeam() != null) {
			//Own Parent
    		if(team.getTeam().getId() == team.getId()) {
				throw new FunctionnalException("you can't create a team wich is own parent");
			}
			
    		//Cyclic relation
			Team team2 = this.getById(team.getTeam().getId());
			if(team2 != null && team2.getTeam() != null) {
			    //Cyclic parent
				if(team2.getTeam().getId() == team.getId()) {				
					//System.out.println("parent cyclic");
					throw new FunctionnalException(
								team2.getName() 
								+ " can't be parent of  " + team.getName() 
								+ " because  "+ team.getName() +" is already the parent of " + team2.getName()
							);	
				}
			}
			
			
			
			
		}else {
			List<Team> teams = teamRepository.findAll();
			
			for(Team teamEc : teams) {
				if(teamEc.getId() != team.getId() && teamEc.getTeam() == null) {
					throw new FunctionnalException("One top team already exists");
				}
			}
		}
    	
    	
    	
    	Team teamInBddBeforeSaving = teamRepository.findOne(team.getId());
    	if(teamInBddBeforeSaving.getTeam() == null && team.getTeam() != null) {
    		throw new FunctionnalException("One top team is required, you can't affect this team as a child of another");
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
	
	
	public List<Member> findMembersByTeam(int teamId) {
		return teamRepository.findMembersByTeam(teamId);
	}
      
}
