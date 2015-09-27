package com.yookos.services;

import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class HelloService {
    Map<String, Object> payload = new HashMap<>();

    public String getHelloMessage() {
        payload.put("username", "jomski2009");
        payload.put("firstname", "Jome");
        payload.put("lastname", "Akpoduado");

        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(payload);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "An error occurred. That's all we know for now";
        }
    }

}
