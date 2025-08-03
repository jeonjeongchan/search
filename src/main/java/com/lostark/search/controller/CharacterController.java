package com.lostark.search.controller;

import com.lostark.search.service.CharacterService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class CharacterController {

    private final CharacterService characterService;

    @Autowired
    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }


    // 캐릭터 검색
    @GetMapping("/characters/{characterName}")
    public String getCharacter(@PathVariable String characterName, Model model, HttpSession session) {

        // Lost Ark API에서 정보 가져오기
        String characterInfo = characterService.getCharacterProfiles(characterName, session);
        //String characterSkills = characterService.getCharacterSkills(characterName, session);
        String characterAll = characterService.getCharacterAll(characterName, session);
        String siblings = characterService.getCharacterSiblings(characterName, session);
        //String guildMember = characterService.getGuildMember(characterName, session);

        // 모델에 데이터를 담아 뷰 템플릿에 전달
        model.addAttribute("characterInfo", characterInfo);
        model.addAttribute("characterAll", characterAll);
        model.addAttribute("siblings", siblings);
        //model.addAttribute("guildMember", guildMember);

        //String pyj = "멍청이";
        //model.addAttribute("characterSkills ", characterSkills);

        // 반환할 뷰 템플릿 이름 (src/main/resources/templates 폴더에 있는 HTML 파일)
        return "character";
    }



}
