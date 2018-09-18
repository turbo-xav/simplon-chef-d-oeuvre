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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bnpp.pf.digital.wiki.back.entity.Application;
import com.bnpp.pf.digital.wiki.back.entity.Role;
import com.bnpp.pf.digital.wiki.back.service.IServiceApplication;


@RestController
@RequestMapping("/application")
public class ApplicationController {

	private static final String LISTING_ERROR_MSG = "get list of applications is not possible, please verify your database.";

	private static final String GETTING_ERROR_MSG = "get this application is not possible, please verify your database.";

	private static final String DELETING_BY_ID_ERROR_MSG = "delete this application is not possible, please verify your database.";

	private static final String CREATING_ERROR_MSG = "creating this application is not possible, please verify your database.";

	private static final String UPDATING_ERROR_MSG = "updating this application is not possible, please verify your database.";

	private static final String CREATING_INTERITY_ERROR_MSG = "creating this application is not possible, please verify if you are not create an exiting application.";

	private static final String UPDATING_INTERITY_ERROR_MSG = "updating this application is not possible, please verify if you are not update a application with the same name.";

	private static final String CREATING_DATA_ACCESS_ERROR_MSG = "creating this application is not possible, please verify your datas.";

	private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "updating this application is not possible, please verify your datas.";

	private static final String MISSING_NAME_ERROR_MSG = "please specify the name of this application.";

	@Autowired
	private IServiceApplication serviceApplication;

	// public ApplicationController() {
	// }

	@RequestMapping(method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getAll() {

		try {
			List<Application> applications = serviceApplication.findAll();
			return new ResponseEntity<List<Application>>(applications, HttpStatus.OK);
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
			Application application = serviceApplication.getById(id);
			return new ResponseEntity<Application>(application, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "{codeApp}", method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getByCodeApp(@PathVariable("codeApp") String codeApp) {

		try {
			List<Application> applications = serviceApplication.getByCodeApp(codeApp);
			return new ResponseEntity<List<Application>>(applications, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@RequestMapping(path = "{title}", method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getByTitle(@PathVariable("title") String title) {

		try {
			List<Application> applications = serviceApplication.getByTitle(title);
			return new ResponseEntity<List<Application>>(applications, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	@RequestMapping(path = "{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
		try {
			serviceApplication.deleteById(id);
			return new ResponseEntity<Integer>(id, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> insert(@RequestBody Application application) {
		try {
			if (application.getTitle().isEmpty() && application.getDescription().isEmpty() && application.getCodeApp().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				application = serviceApplication.save(application);
				return new ResponseEntity<Application>(application, HttpStatus.OK);
			}
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	
	
	
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> update(@RequestBody Application application) {
		try {
			if (application.getTitle().isEmpty() && application.getDescription().isEmpty() && application.getCodeApp().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				application = serviceApplication.save(application);
				return new ResponseEntity<Application>(application, HttpStatus.OK);
			}

		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}

	

}
