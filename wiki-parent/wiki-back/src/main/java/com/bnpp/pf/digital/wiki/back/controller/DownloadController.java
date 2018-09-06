package com.bnpp.pf.digital.wiki.back.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/download")
public class DownloadController {
	@RequestMapping("/{fileName:.+}")
	public void downloadPDFResource(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("fileName") String fileName) {
		// If user is not authorized - he should be thrown out from here itself

		// Authorized user will download the file

		String dataDirectory = "C:/Users/piplo/git/simplon-chef-d-oeuvre/download/";
		Path file = Paths.get(dataDirectory, fileName);
		if (Files.exists(file)) {
			 MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();
			 System.out.println(file.toString());
			String myPath = fileTypeMap.getContentType(file.toString());
			System.out.println(myPath);
			System.out.println(fileName);
			try {
				String fileType = Files.probeContentType(file);

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			response.setContentType("application/pdf");
			response.addHeader("Content-Disposition", "attachment; filename=" + fileName);
			try {
				Files.copy(file, response.getOutputStream());
				response.getOutputStream().flush();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}
}
