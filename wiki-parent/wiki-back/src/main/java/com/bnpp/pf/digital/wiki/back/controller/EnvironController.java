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

import com.bnpp.pf.digital.wiki.back.entity.Environ;
import com.bnpp.pf.digital.wiki.back.entity.Layer;
import com.bnpp.pf.digital.wiki.back.service.IServiceEnviron;

@RestController
@RequestMapping("/environment")
public class EnvironController {

	private static final String LISTING_ERROR_MSG = "get list of environments is not possible, please verify your database.";

	private static final String GETTING_ERROR_MSG = "get this environment is not possible, please verify your database.";

	private static final String DELETING_BY_ID_ERROR_MSG = "delete this environment is not possible, please verify your database.";

	private static final String CREATING_ERROR_MSG = "creating this environment is not possible, please verify your database.";

	private static final String UPDATING_ERROR_MSG = "updating this environment is not possible, please verify your database.";

	private static final String CREATING_INTERITY_ERROR_MSG = "creating this environment is not possible, please verify if you are not create an exiting environment.";

	private static final String UPDATING_INTERITY_ERROR_MSG = "updating this environment is not possible, please verify if you are not update a environment with the same name.";

	private static final String CREATING_DATA_ACCESS_ERROR_MSG = "creating this environment is not possible, please verify your datas.";

	private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "updating this environment is not possible, please verify your datas.";

	private static final String MISSING_NAME_ERROR_MSG = "please specify the name of this environment.";
	
	private static final String DELETING_BY_ID_INTEGRITY_ERROR_MSG = "Please verify if a layer page is not linked to this environment.";

	@Autowired
	private IServiceEnviron serviceEnviron;

	@RequestMapping(method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getAll() {

		try {
			List<Environ> environs = serviceEnviron.findAll();
			return new ResponseEntity<List<Environ>>(environs, HttpStatus.OK);
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
			Environ environ = serviceEnviron.getById(id);
			return new ResponseEntity<Environ>(environ, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(path = "name/{name}", method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getByName(@PathVariable("name") String name) {

		try {
			List<Environ> environs = serviceEnviron.getByName(name);
			return new ResponseEntity<List<Environ>>(environs, HttpStatus.OK);
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
			serviceEnviron.deleteById(id);
			return new ResponseEntity<Integer>(id, HttpStatus.OK);
		} catch(DataIntegrityViolationException e) {
			System.out.println("1");
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_INTEGRITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
		catch (DataAccessException e) {
			System.out.println("2");
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println("3");
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> insert(@RequestBody Environ environ) {
		try {
			if (environ.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				environ = serviceEnviron.save(environ);
				return new ResponseEntity<Environ>(environ, HttpStatus.OK);
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
	public ResponseEntity<?> update(@RequestBody Environ environ) {
		try {
			if (environ.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				environ = serviceEnviron.save(environ);
				return new ResponseEntity<Environ>(environ, HttpStatus.OK);
			}

		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}
	
	
	@RequestMapping(path = "getLayersByEnviron/{id}",method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getLayersByEnviron(@PathVariable("id") int id) {

		try {
			List<Layer> layers = serviceEnviron.getLayersByEnviron(serviceEnviron.getById(id));
			return new ResponseEntity<List<Layer>>(layers, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	

}
