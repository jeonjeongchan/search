package com.lostark.search.controller;

import com.lostark.search.service.CharacterService;
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

    @GetMapping("/characters/{characterName}/siblings")
    public String getCharacterSiblings(@PathVariable String characterName, Model model) {
        // Lost Ark API에서 sibling 정보 가져오기
        String siblingsInfo = characterService.getCharacterSiblings(characterName);

        // 모델에 데이터를 담아 뷰 템플릿에 전달
        model.addAttribute("characterName", characterName);
        model.addAttribute("siblingsInfo", siblingsInfo);

        // 반환할 뷰 템플릿 이름 (src/main/resources/templates 폴더에 있는 HTML 파일)
        return "characters";
    }


}
