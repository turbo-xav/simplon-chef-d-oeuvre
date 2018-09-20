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

import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;
import com.bnpp.pf.digital.wiki.back.entity.Server;
import com.bnpp.pf.digital.wiki.back.service.IServiceServer;

@RestController
@RequestMapping("/server")
public class ServerController {

	private static final String LISTING_ERROR_MSG = "get list of servers is not possible, please verify your database.";

	private static final String GETTING_ERROR_MSG = "get this server is not possible, please verify your database.";

	private static final String DELETING_BY_ID_ERROR_MSG = "delete this server is not possible, please verify your database.";

	private static final String CREATING_ERROR_MSG = "creating this server is not possible, please verify your database.";

	private static final String UPDATING_ERROR_MSG = "updating this server is not possible, please verify your database.";

	private static final String CREATING_INTERITY_ERROR_MSG = "creating this server is not possible, please verify if you are not create an exiting server.";

	private static final String UPDATING_INTERITY_ERROR_MSG = "updating this server is not possible, please verify if you are not update a server with the same name.";

	private static final String CREATING_DATA_ACCESS_ERROR_MSG = "creating this server is not possible, please verify your datas.";

	private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "updating this server is not possible, please verify your datas.";

	private static final String MISSING_NAME_ERROR_MSG = "please specify the name of this server.";

	
	@Autowired
	private IServiceServer serviceServer;
	
	@RequestMapping(method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getAll() {

		try {
			List<Server> servers = serviceServer.findAll();
			return new ResponseEntity<List<Server>>(servers, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getById(@PathVariable("id") int id) {
		try {
			Server server = serviceServer.getById(id);
			return new ResponseEntity<Server>(server, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "name/{name}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getByName(@PathVariable("name") String name) {
		try {
		List <Server> servers = serviceServer.getByName(name);
			return new ResponseEntity <List<Server>>(servers, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
		try {
			serviceServer.deleteById(id);
			return new ResponseEntity<Integer>(id, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> insert(@RequestBody Server server) {
		try {
			if (server.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				server = serviceServer.save(server);
				return new ResponseEntity<Server>(server, HttpStatus.OK);

			}
		} catch (DataIntegrityViolationException e) {
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
	
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> update(@RequestBody Server server) {
		try {
			if (server.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				server = serviceServer.save(server);
				return new ResponseEntity<Server>(server, HttpStatus.OK);
			}

		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}
	
	@RequestMapping(path = "getDiagnosticsByServer/{id}",method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getDiagnosticsByServer(@PathVariable("id") int id) {

		try {
			List<Diagnostic> diagnostics = serviceServer.getDiagnosticsByServer(serviceServer.getById(id));
			return new ResponseEntity<List<Diagnostic>>(diagnostics, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}	
	
	
}
