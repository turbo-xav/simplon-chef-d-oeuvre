package com.bnpp.pf.digital.wiki.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bnpp.pf.digital.wiki.back.service.ServiceFileUpload;

@RestController
public class UploadController {

	@Autowired
	private ServiceFileUpload fileService;

	@RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = {"multipart/form-data"})
	@ResponseBody
	public int uploadFile(/*@RequestPart("guideline") Guideline guideline,*/ @RequestPart("file") MultipartFile file) {
		// long fileSize = multipartFile.getSize();
		System.out.println("upload");
		//System.out.println(monParam);
		String fileName = file.getOriginalFilename();
		System.out.println(fileName);
		//System.out.println(guideline);
		//if (fileService.saveFile(multipartFile)) {
			//return fileName;
		//}
		return 1;
	}
}
