package com.lostark.search.controller.api;


import com.lostark.search.service.ApiKeyService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/apiKey")
public class ApiKeyRestController {

    private final ApiKeyService apiKeyService;

    public ApiKeyRestController(ApiKeyService apiKeyService) {
        this.apiKeyService = apiKeyService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveApiKey(@RequestBody Map<String, String> request, HttpSession session) {
        String apiKey = request.get("apiKey");
        session.setAttribute("API_KEY", apiKey);
        return ResponseEntity.ok().build();
    }

    @GetMapping("")
    public ResponseEntity<Map<String, String>> getApiKey(HttpSession session) {
        String apiKey = (String) session.getAttribute("API_KEY");
        Map<String, String> response = new HashMap<>();
        response.put("apiKey", apiKey != null ? apiKey : "");
        return ResponseEntity.ok(response);
    }
}