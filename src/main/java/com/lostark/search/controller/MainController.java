package com.lostark.search.controller;

import com.lostark.search.service.MainService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    private final MainService mainService;

    @Autowired
    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    @GetMapping("/")
    public String getMain(Model model) {

        // 공지사항
        String notices = mainService.getNotices();
        String events = mainService.getEvents();
        String gameContents = mainService.getGameContents();

        model.addAttribute("notices", notices);
        model.addAttribute("events", events);
        model.addAttribute("gameContents", gameContents);

        return "main";
    }
}
