package com.lostark.search.controller;

import com.lostark.search.service.CraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

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

        return "pages/craft";
    }

}
