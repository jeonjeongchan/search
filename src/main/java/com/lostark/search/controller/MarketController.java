package com.lostark.search.controller;

import com.lostark.search.service.MarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MarketController {

    private final MarketService marketService;

    @Autowired
    public MarketController(MarketService marketService) {
        this.marketService = marketService;
    }

    @GetMapping("/market")
    public String getMarket(Model model) {
        // Lost Ark API에서 경매장 정보 가져오기
        String marketInfo = marketService.getMarket();

        // 모델에 데이터를 담아 뷰 템플릿에 전달
        model.addAttribute("marketInfo", marketInfo);

        return "market";
    }

}
