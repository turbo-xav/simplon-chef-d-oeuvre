package com.bnpp.pf.digital.wiki.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bnpp.pf.digital.wiki.back.service.FileService;

@RestController
public class UploadController {
	
	@Autowired
	private FileService fileService;
	
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public String uploadFile(@RequestParam("file") MultipartFile multipartFile) {
		long fileSize = multipartFile.getSize();
		String fileName = multipartFile.getOriginalFilename();
		
		//ModelAndView modelAndView = new ModelAndView("upload-success");
		if(fileService.saveFile(multipartFile)) {
		//Map<String, Object> modelMap = new HashMap<>();
		//modelMap.put("fileName", fileName);
		//modelMap.put("fileSize", fileSize);
		//modelAndView.addAllObjects(modelMap);
		//return modelAndView;
			return fileName;
		}
		
		return "loupé";
		//return new ModelAndView("upload-failed");
	}
}
