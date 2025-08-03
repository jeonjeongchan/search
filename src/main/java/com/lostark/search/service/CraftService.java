package com.lostark.search.service;

import com.lostark.search.config.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class CraftService {


    @Autowired
    private RestTemplate restTemplate;


    // 경매장
    public String getCraft() {

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.setBearerAuth(Constants.AUTHORIZATION_HEADER);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("Sort", "CURRENT_MIN_PRICE");
        requestBody.put("CategoryCode", 50010);
        requestBody.put("ItemName", "재료");
        requestBody.put("SortCondition", "DESC");
//        requestBody.put("ItemGrade", "유물");
        requestBody.put("PageNo", 0);

        // HttpEntity로 감싸기
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // POST 요청 보내기
        ResponseEntity<String> response = restTemplate.exchange(
                Constants.MARKET_URL,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        // 응답 본문 반환
        return response.getBody();
    }


}