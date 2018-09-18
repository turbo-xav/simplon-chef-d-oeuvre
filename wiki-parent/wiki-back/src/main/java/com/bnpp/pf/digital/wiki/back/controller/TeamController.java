package com.bnpp.pf.digital.wiki.back.controller;

import java.util.List;

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

import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.Team;
import com.bnpp.pf.digital.wiki.back.exception.FunctionnalException;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;
import com.bnpp.pf.digital.wiki.back.service.IServiceTeam;

@RestController
@RequestMapping("/team")
public class TeamController {
	private static final String LISTING_ERROR_MSG = "get list of teams is not possible please verify your database";

	private static final String GETTING_ERROR_MSG = "get this user is not possible please verify your database";

	private static final String DELETING_BY_ID_ERROR_MSG = "delete this user is not possible please verify your database";

	private static final String CREATING_ERROR_MSG = "creating this team is not possible please verify your database";

	private static final String UPDATING_ERROR_MSG = "updating this team is not possible please verify your database";

	private static final String CREATING_INTERITY_ERROR_MSG = "creating this team is not possible please verify if you are not create an exiting team";

	private static final String UPDATING_INTERITY_ERROR_MSG = "updating this team is not possible please verify if you are not update a team with the same name";

	private static final String CREATING_DATA_ACCESS_ERROR_MSG = "creating this team is not possible please verify your datas";

	private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "updating this team is not possible please verify your datas";

	private static final String MISSING_NAME_ERROR_MSG = "please specify the name of this team";

	@Autowired
	private IServiceTeam serviceTeam;

	public TeamController() {

	}

	@RequestMapping(method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getAll() {

		try {
			List<Team> teams = serviceTeam.findAll();
			return new ResponseEntity<List<Team>>(teams, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}
	
	@RequestMapping(path = "/topTeam", method = RequestMethod.GET)
	@ResponseBody
	// @Transactional
	public ResponseEntity<?> getTopTeam() {
		try {
			Team team = serviceTeam.findTopByTeam();
			return new ResponseEntity<Team>(team, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	@RequestMapping(path = "/topTeam/subTeams", method = RequestMethod.GET)
	@ResponseBody
	// @Transactional
	public ResponseEntity<?> findSubTeamsFromTopTeam() {
		try {
			List<Team> teams = serviceTeam.findSubTeamsFromTopTeam();
			return new ResponseEntity<List<Team>>(teams, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "/topTeam/subTeams/members/{id}", method = RequestMethod.GET)
	@ResponseBody
	// @Transactional
	public ResponseEntity<?> findSubTeamsMembers(@PathVariable("id") int teamId) {
		try {
			List<Member> members = serviceTeam.findMembersByTeam(teamId);
			return new ResponseEntity<List<Member>>(members, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	@ResponseBody
	// @Transactional
	public ResponseEntity<?> getById(@PathVariable("id") int id) {
		try {
			Team team = serviceTeam.getById(id);
			return new ResponseEntity<Team>(team, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}

	@RequestMapping(path = "{id}", method = RequestMethod.DELETE)
	@ResponseBody
	// @Transactional
	public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
		try {
			serviceTeam.deleteById(id);
			return new ResponseEntity<Integer>(id, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * 
	 * @param name
	 * @return
	 */

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> update(@RequestBody Team team) {
		try {

			if (team.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {				
				team = serviceTeam.save(team);				
				return new ResponseEntity<Integer>(team.getId(), HttpStatus.OK);
			}

		}catch(FunctionnalException e){
			System.out.println(e.getMessage());
			return new ResponseEntity<WikiError>(new WikiError(e.getMessage()), HttpStatus.BAD_REQUEST);
		}catch(TechnicalException e){
			System.out.println(e.getMessage());
			return new ResponseEntity<WikiError>(new WikiError(e.getMessage()), HttpStatus.BAD_REQUEST);
		}catch (DataIntegrityViolationException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * 
	 * @param name
	 * @return
	 */

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> insert(@RequestBody Team team) {
		try {

			if (team.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {				
				team = serviceTeam.save(team);				
				return new ResponseEntity<Integer>(team.getId(), HttpStatus.OK);
			}

		}catch(FunctionnalException e){
			System.out.println(e.getMessage());
			return new ResponseEntity<WikiError>(new WikiError(e.getMessage()), HttpStatus.BAD_REQUEST);
		}catch(TechnicalException e){
			System.out.println(e.getMessage());
			return new ResponseEntity<WikiError>(new WikiError(e.getMessage()), HttpStatus.BAD_REQUEST);
		}catch (DataIntegrityViolationException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<WikiError>(new WikiError(CREATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<WikiError>(new WikiError(CREATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<WikiError>(new WikiError(CREATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
		
	}
}
