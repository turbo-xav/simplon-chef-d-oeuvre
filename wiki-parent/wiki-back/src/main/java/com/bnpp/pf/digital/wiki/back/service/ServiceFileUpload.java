package com.bnpp.pf.digital.wiki.back.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.bnpp.pf.digital.wiki.back.service.PropertyLoader;

@Service("fileService")
public class ServiceFileUpload {

	//private static final String SAVE_LOCATION = "C:\\users\\piplo\\git\\simplon-chef-d-oeuvre";
	
	
	

	public boolean saveFile(MultipartFile multipartFile, String path){
        boolean result = false;
        
        //save the actual file
        try {
        	PropertyLoader propertyLoader = new PropertyLoader();
        	File pathFile  = new File(propertyLoader.load().get("guideline.uploadDir") + path); 
        	multipartFile.transferTo(pathFile);
            result = true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
	
	 public File getFile(String filePath) throws FileNotFoundException {
	        File file = null;
			
	        try {
	        	PropertyLoader propertyLoader = new PropertyLoader();
	        	file = new File(propertyLoader.load().get("guideline.uploadDir") + filePath);
				if (!file.exists()){
			        throw new FileNotFoundException("file with path: " + filePath + " was not found.");
			    }
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	       
	        return file;
	   }
}
