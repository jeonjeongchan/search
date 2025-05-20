package com.lostark.search.controller;

import com.lostark.search.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MainController {

    private final MainService mainService;

    @Autowired
    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    @GetMapping("/")
    public String getMain(Model model) {

        // Lost Ark API에서 경매장 정보 가져오기
        String notices = mainService.getNotices();

        // 모델에 데이터를 담아 뷰 템플릿에 전달
        model.addAttribute("notices", notices);

        return "main";
    }
}
