package com.lostark.search.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.lostark.search.config.Constants;
@Service
public class MainService {

    @Autowired
    private RestTemplate restTemplate;

    // 공지사항
    public String getNotices() {
        // 응답 본문 반환
        return setResponse(Constants.NOTICES_URL).getBody();
    }

    // 진행중 이벤트
    public String getEvents() {
        // 응답 본문 반환
        return setResponse(Constants.EVENT_URL).getBody();
    }

    public String getGameContents() {
        // 응답 본문 반환
        return setResponse(Constants.GAME_CONTENTS_URL).getBody();
    }


    // GET 요청 보내기 API
    public ResponseEntity<String> setResponse (String getURL) {
        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("authorization", "Bearer " + Constants.AUTHORIZATION_HEADER);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 응답 본문 반환
        return restTemplate.exchange
                (getURL, HttpMethod.GET, entity, String.class);
    }

}