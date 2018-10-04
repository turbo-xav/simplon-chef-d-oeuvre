package com.bnpp.pf.digital.wiki.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bnpp.pf.digital.wiki.back.entity.Function;
import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.Team;
import com.bnpp.pf.digital.wiki.back.service.IServiceFunction;
import com.bnpp.pf.digital.wiki.back.service.IServiceMember;
import com.bnpp.pf.digital.wiki.back.service.IServiceTeam;

@RestController
@RequestMapping("/organisationnal-chart")
public class OrganisationnalChartController {
	private static final String LISTING_ERROR_MSG = "get list of teams is not possible please verify your database";

	private static final String GETTING_ERROR_MSG = "get this user is not possible please verify your database";
	
	private static final String LISTING_MEMBER_ERROR_MSG = "get list of members is not possible please verify your database";
		
	private static final String LISTING_FUNCTION_ERROR_MSG = "get list of functions is not possible please verify your database";
	
	
	@Autowired
	private IServiceTeam serviceTeam;
	
	@Autowired
	private IServiceMember serviceMember;
	
	@Autowired
	private IServiceFunction serviceFunction;

	public OrganisationnalChartController() {

	}

	@RequestMapping(method = RequestMethod.GET)
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
	
	@RequestMapping(path = "/getMembers", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getMembers() {

		try {
			List<Member> members = serviceMember.findAll();
			return new ResponseEntity<List<Member>>(members, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_MEMBER_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_MEMBER_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}
	
	@RequestMapping(path = "/getFunctions", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getFunctions() {

		try {
			List<Function> functions = serviceFunction.findAll();
			return new ResponseEntity<List<Function>>(functions, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_FUNCTION_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_FUNCTION_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}
}
