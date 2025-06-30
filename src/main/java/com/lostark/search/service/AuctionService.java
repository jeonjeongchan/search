package com.lostark.search.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import com.lostark.search.config.Constants;

@Service
public class AuctionService {

    @Autowired
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public AuctionService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    // 경매장
    public String getAuctionGems(String level) {
        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.set("authorization", "Bearer " + Constants.AUTHORIZATION_HEADER);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("Sort", "BUY_PRICE");
        requestBody.put("CategoryCode", 210000);
        requestBody.put("ItemName", level);
        requestBody.put("SortCondition", "ASC");
        requestBody.put("PageNo", 0);

        // HttpEntity로 감싸기
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // POST 요청 보내기
        ResponseEntity<String> response = restTemplate.exchange(Constants.AUCTIONS_URL, HttpMethod.POST, requestEntity, String.class);

        // 응답 본문 반환
        return response.getBody();
    }


    public String getAuctionGemList(String gemType) {
        List<String> resultList = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        // 10레벨부터 1레벨까지 반복
        for (int level = 10; level >= 1; level--) {

            String gemName = "";

            if (Objects.equals(gemType, "damage")) {
                gemName = level + "레벨 겁화의 보석";
            } else if(Objects.equals(gemType, "coolDown")) {
                gemName = level + "레벨 작열의 보석";
            }

            String responseBody = getAuctionGems(gemName);

            // JSON에서 첫 번째 데이터 추출
            String firstItemStr = extractFirstItemJson(responseBody);

            // 결과 리스트에 추가
            if (firstItemStr != null) {
                resultList.add(firstItemStr);
            }
        }

        // JSON 문자열 리스트 → JsonNode 리스트로 변환
        List<JsonNode> nodeList = new ArrayList<>();
        for (String jsonStr : resultList) {
            try {
                nodeList.add(mapper.readTree(jsonStr));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // JsonNode 리스트를 JSON 배열 문자열로 변환 후 반환
        try {
            return mapper.writeValueAsString(nodeList);
        } catch (Exception e) {
            e.printStackTrace();
            return "[]"; // 실패 시 빈 배열 반환
        }
    }

    private String extractFirstItemJson(String jsonStr) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(jsonStr);

            // 응답 JSON이 {"Items": [ ... ]} 구조라고 가정
            JsonNode items = root.get("Items");
            if (items != null && items.isArray() && items.size() > 0) {
                JsonNode firstItem = items.get(0);
                return mapper.writeValueAsString(firstItem);
            }
        } catch (Exception e) {
            e.printStackTrace(); // 로그 또는 예외 처리
        }
        return null;
    }


}