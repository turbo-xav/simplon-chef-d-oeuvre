package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.Team;

/**
 * 
 * @author 417165
 *
 */

//@Repository
public interface TeamRepository extends JpaRepository<Team, Integer>{
    
	 
	
	@Query("SELECT distinct t FROM Team t "
			+ " LEFT OUTER JOIN FETCH t.teams ts "
			+ " LEFT OUTER JOIN FETCH t.team  tp "
			)
	public List<Team> findAll();
	
	/**
     * 
     * @param id
     * @return
     */
    
	@Query("SELECT t FROM Team t "
			+ " LEFT OUTER JOIN FETCH t.teams ts "
			+ " LEFT OUTER JOIN FETCH t.team  tp "
			+ " WHERE t.id = :id"
			)
	Team getById(@Param("id") int id);
	
	/**
     * 
     * @param id
     * @return
     */
    
	Team findTopByTeam(Team team);
	
	@Query("SELECT m FROM Member m WHERE m.team.id = :teamId ")
	List<Member> findMembersByTeam(@Param("teamId") int teamId);
	
	/**
     * 
     * @param id
     * @return
     */
    
	@Query(
			"SELECT t FROM Team t "
					+ " LEFT OUTER JOIN FETCH t.teams ts "
					+" WHERE ts.team IS NULL"
			)
	List<Team> findSubTeamsFromTopTeam();
		    
    /**
     * 
     * @param name
     * @return
     */
	@Query("SELECT t FROM Team t WHERE t.name = :name")
	List<Team> getByName(@Param("name") String name);
        
    /**
     * 
     * @param id
     * @return
     */
    
    void deleteById(int id);    
    
}
