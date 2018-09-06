package com.bnpp.pf.digital.wiki.back.service;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service("fileService")
public class FileService {

	public static final String SAVE_LOCATION = "C:/Users/piplo/git/simplon-chef-d-oeuvre/upload/";
	
	public boolean saveFile(MultipartFile multipartFile){
        boolean result = false;
        //set the saved location and create a directory location
        String fileName  = multipartFile.getOriginalFilename();
        String location = SAVE_LOCATION;
        File pathFile = new File(location);
        //check if directory exist, if not, create directory
        if(!pathFile.exists()){
            pathFile.mkdir();
        }
 
        //create the actual file
        pathFile = new File(location + fileName);
        //save the actual file
        try {
            multipartFile.transferTo(pathFile);
            result = true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
}
