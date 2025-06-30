package com.lostark.search.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lostark.search.config.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class ApiKeyService {

    @Autowired
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public ApiKeyService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

}