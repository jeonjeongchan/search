package com.lostark.search.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.lostark.search.config.Constants;

@Service
public class CharacterService {

    @Autowired
    private RestTemplate restTemplate;

    // 원정대 데이터
    public String getCharacterSiblings(String characterName, HttpSession session) {
        // 헤더 설정
        //String apiKey = (String) session.getAttribute("API_KEY");
        // 응답 본문 반환
        return setResponse(Constants.SIBLINGS_URL, characterName).getBody();
    }

    public String getCharacterProfiles(String characterName, HttpSession session) {
        // 응답 본문 반환
        return setResponse(Constants.ARMORIES_PROFILES_URL, characterName).getBody();
    }

    public String getCharacterAll(String characterName, HttpSession session) {
        // 응답 본문 반환
        return setResponse(Constants.ARMORIES_ALL_URL, characterName).getBody();
    }

    public String getCharacterSkills(String characterName, HttpSession session) {
        // 응답 본문 반환
        return setResponse(Constants.ARMORIES_COMBAT_SKILLS_URL, characterName).getBody();
    }


    public String getGuildMemeber(String characterName, HttpSession session) {
        // 응답 본문 반환
        return setResponse(Constants.GUILD_URL, characterName).getBody();
    }




    public ResponseEntity<String> setResponse (String getURL, String characterName) {
        // Http 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.setBearerAuth(Constants.AUTHORIZATION_HEADER);

        // HttpEntity 설정 (헤더와 요청 본문을 포함)
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // API 호출
        return restTemplate.exchange(getURL, HttpMethod.GET, entity, String.class, characterName);

    }

}