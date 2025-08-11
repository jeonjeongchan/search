package com.lostark.search.controller;

import com.lostark.search.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.HttpClientErrorException;

@Controller
public class AuctionController {

    private final AuctionService auctionService;

    @Autowired
    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    @GetMapping("/auction")
    public String getAuction(Model model) {

        try {
            // Lost Ark API에서 경매장 정보 가져오기
            String damageGems = auctionService.getAuctionGemList("damage");
            String coolDownGems = auctionService.getAuctionGemList("coolDown");
            // 모델에 데이터를 담아 뷰 템플릿에 전달
            model.addAttribute("damageGems", damageGems);
            model.addAttribute("coolDownGems", coolDownGems);
        } catch (HttpClientErrorException.Unauthorized e) {
            model.addAttribute("error", "API Key가 유효하지 않습니다.");
        } catch (Exception e) {
            model.addAttribute("error", "조회 중 오류가 발생했습니다.");
        }

        return "pages/auction";
    }

}
