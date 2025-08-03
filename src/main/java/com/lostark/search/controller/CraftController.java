package com.lostark.search.controller;

import com.lostark.search.service.CraftService;
import com.lostark.search.service.MarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.HttpClientErrorException;

@Controller
public class CraftController {

    private final CraftService craftService;

    @Autowired
    public CraftController(CraftService craftService) {
        this.craftService = craftService;
    }

    @GetMapping("/craft")
    public String getCraft(Model model) {

        String craftInfo = craftService.getCraft();
        model.addAttribute("craftInfo", craftInfo);

        return "market";
    }

}
