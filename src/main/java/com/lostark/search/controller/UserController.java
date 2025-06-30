package com.lostark.search.controller;

import com.lostark.search.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public String getRegister() {
        return "register";
    }

    @PostMapping("/register")
    public String register(@RequestParam String username,
                           @RequestParam String password,
                           Model model) {

        // 아이디 중복 체크
        if (userService.checkRegister(username)) {
            model.addAttribute("error", "이미 사용중인 아이디 입니다.");
            return "/register";
        }

        userService.register(username, password);
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String getLogin(@RequestParam(required = false) String error, Model model) {
        if (error != null) model.addAttribute("error", "아이디 또는 비밀번호가 올바르지 않습니다.");

        return "login";
    }

}
