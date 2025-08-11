package com.lostark.search.controller;

import com.lostark.search.service.MarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.HttpClientErrorException;

@Controller
public class MarketController {

    private final MarketService marketService;

    @Autowired
    public MarketController(MarketService marketService) {
        this.marketService = marketService;
    }

    @GetMapping("/market")
    public String getMarket(Model model) {

        try {
            String marketInfo = marketService.getMarket();
            model.addAttribute("marketInfo", marketInfo);
        } catch (HttpClientErrorException.Unauthorized e) {
            model.addAttribute("error", "API Key가 유효하지 않습니다.");
        } catch (Exception e) {
            model.addAttribute("error", "조회 중 오류가 발생했습니다.");
        }

        return "pages/market";
    }

}
