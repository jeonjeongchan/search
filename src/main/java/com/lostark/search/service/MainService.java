package com.lostark.search.service;

import com.lostark.search.repository.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MainService {

    private final MainRepository mainRepository;

    @Autowired
    public MainService(MainRepository mainRepository) {
        this.mainRepository = mainRepository;
    }

    @Autowired
    private RestTemplate restTemplate;

    private static final String API_URL = "https://developer-lostark.game.onstove.com/";
    private static final String AUTHORIZATION_HEADER = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzNTE1OTEifQ.J0fJ0sDtCgpVOqW45MGlZJnKQ7NiORwFk33cHlVb0jgxCC6_L9HCIyGOsUkxno_VtQok3dpWzHvOjOhfqhvXLo3okBQU0MMqccfUI6_iDd3Qri6Jh4YGFfy4u6Yach22BKlf2845ZJsobmkYJ0WP_sI9efx1n9818ag8tDl66LfXGbhLMUST3PPmchIOha3jmEq8aeClEM_iPOhKhFrOZknAFTJJqQFYPA9TA9MNflTd_7XZe8DGfH2LTiZMgmBJ2ZCWa4zV6dxTxOI3tkcVyXj_MxBQvLzJKOdsHQbjQ-vy7mAfeVB4569NTqGmW1rZ69xL1aDHLamZieXe5fRXWQ";  // 필요하다면 API 키를 추가해야 함

    // 원정대 데이터
    public String getNotices() {
        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("authorization", "Bearer " + AUTHORIZATION_HEADER);
        String URL = API_URL + "/news/notices";

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // POST 요청 보내기
        ResponseEntity<String> response = restTemplate.exchange(URL, HttpMethod.GET, entity, String.class);

        // 응답 본문 반환
        return response.getBody();
    }

    public String getWelcomeMessage() {
        return mainRepository.fetchWelcomeMessage();
    }
}