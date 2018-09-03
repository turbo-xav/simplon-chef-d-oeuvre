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

import com.bnpp.pf.digital.wiki.back.entity.Function;
import com.bnpp.pf.digital.wiki.back.service.IServiceFunction;

@RestController
@RequestMapping("/function")
public class FunctionController {
	private static final String LISTING_ERROR_MSG = "get list of functions is not possible please verify your database";

	private static final String GETTING_ERROR_MSG = "get this user is not possible please verify your database";

	private static final String DELETING_BY_ID_ERROR_MSG = "delete this user is not possible please verify your database";

	private static final String CREATING_ERROR_MSG = "creating this function is not possible please verify your database";

	private static final String UPDATING_ERROR_MSG = "updating this function is not possible please verify your database";

	private static final String CREATING_INTERITY_ERROR_MSG = "creating this function is not possible please verify if you are not create an exiting function";

	private static final String UPDATING_INTERITY_ERROR_MSG = "updating this function is not possible please verify if you are not update a function with the same name";

	private static final String CREATING_DATA_ACCESS_ERROR_MSG = "creating this function is not possible please verify your datas";

	private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "updating this function is not possible please verify your datas";

	private static final String MISSING_NAME_ERROR_MSG = "please specify the name of this function";

	@Autowired
	private IServiceFunction serviceFunction;

	public FunctionController() {

	}

	@RequestMapping(method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getAll() {

		try {
			List<Function> functions = serviceFunction.findAll();
			return new ResponseEntity<List<Function>>(functions, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}

	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	@ResponseBody
	// @Transactional
	public ResponseEntity<?> getById(@PathVariable("id") int id) {
		try {
			Function function = serviceFunction.getById(id);
			return new ResponseEntity<Function>(function, HttpStatus.OK);
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
			serviceFunction.deleteById(id);
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
	public ResponseEntity<?> update(@RequestBody Function function) {
		try {

			if (function.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				function = serviceFunction.save(function);
				return new ResponseEntity<Function>(function, HttpStatus.OK);

			}

		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
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
	public ResponseEntity<?> insert(@RequestBody Function function) {
		try {
			if (function.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				function = serviceFunction.save(function);
				return new ResponseEntity<Function>(function, HttpStatus.OK);

			}
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
}
