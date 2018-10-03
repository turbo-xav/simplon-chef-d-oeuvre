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

import com.bnpp.pf.digital.wiki.back.entity.Application;
import com.bnpp.pf.digital.wiki.back.entity.Layer;
import com.bnpp.pf.digital.wiki.back.entity.Server;
import com.bnpp.pf.digital.wiki.back.service.IServiceLayer;

@RestController
@RequestMapping("/layer")
public class LayerController {

	private static final String LISTING_ERROR_MSG = "get list of layers is not possible, please verify your database.";

	private static final String GETTING_ERROR_MSG = "get this layer is not possible, please verify your database.";

	private static final String DELETING_BY_ID_ERROR_MSG = "delete this layer is not possible, please verify your database.";

	private static final String CREATING_ERROR_MSG = "creating this layer is not possible, please verify your database.";

	private static final String UPDATING_ERROR_MSG = "updating this layer is not possible, please verify your database.";

	private static final String CREATING_INTERITY_ERROR_MSG = "creating this layer is not possible, please verify if you are not create an exiting layer.";

	private static final String UPDATING_INTERITY_ERROR_MSG = "updating this layer is not possible, please verify if you are not update a layer with the same name.";

	private static final String CREATING_DATA_ACCESS_ERROR_MSG = "creating this layer is not possible, please verify your datas.";

	private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "updating this layer is not possible, please verify your datas.";

	private static final String MISSING_NAME_ERROR_MSG = "please specify the name of this layer.";
	
	private static final String DELETING_BY_ID_INTEGRITY_ERROR_MSG = "Please verify if a server page is not linked to this layer.";

	@Autowired
	private IServiceLayer serviceLayer;
	
	@RequestMapping(method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getAll() {

		try {
			List<Layer> layers = serviceLayer.findAll();
			return new ResponseEntity<List<Layer>>(layers, HttpStatus.OK);
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
			Layer layer = serviceLayer.getById(id);
			return new ResponseEntity<Layer>(layer, HttpStatus.OK);
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
			List<Layer> layers = serviceLayer.getByName(name);
			return new ResponseEntity<List<Layer>>(layers, HttpStatus.OK);
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
			serviceLayer.deleteById(id);
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
	public ResponseEntity<?> insert(@RequestBody Layer layer) {
		try {
			if (layer.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				layer = serviceLayer.save(layer);
				return new ResponseEntity<Integer>(layer.getId(), HttpStatus.OK);
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
	public ResponseEntity<?> update(@RequestBody Layer layer) {
		try {
			if (layer.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				layer = serviceLayer.save(layer);
				return new ResponseEntity<Layer>(layer, HttpStatus.OK);
			}

		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}
	
	
	/*@RequestMapping(path = "getServersByLayer/{id}",method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getServersByLayer(@PathVariable("id") int id) {

		try {
			List<Server> servers = serviceLayer.getServersByLayer(serviceLayer.getById(id));
			return new ResponseEntity<List<Server>>(servers, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}*/	
	
	
	
	
	
	
	
}
