package com.bnpp.pf.digital.wiki.back.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service("fileService")
public class ServiceFileUpload {

	private static final String SAVE_LOCATION = "C:\\users\\piplo\\git\\simplon-chef-d-oeuvre";
	

	public boolean saveFile(MultipartFile multipartFile, String path){
        boolean result = false;
        //set the saved location and create a directory location
        String fileName  = multipartFile.getOriginalFilename();
                
        //create the actual file
        File pathFile  = new File(SAVE_LOCATION + path);
        
        //save the actual file
        try {
            multipartFile.transferTo(pathFile);
            result = true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
	
	 public File getFile(String filePath) throws FileNotFoundException {
	        File file = new File(SAVE_LOCATION+filePath);
	        if (!file.exists()){
	            throw new FileNotFoundException("file with path: " + filePath + " was not found.");
	        }
	        return file;
	   }
}
