package com.yookos;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application extends com.pivotal.mss.apigateway.Application {
	
	public static void main(String[] args) {
		runApplication(Application.class, args);
	}

}
