package com.lostark.search.controller.api;

import com.lostark.search.service.CharacterService;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/character")
public class ApiCharacterRestController {

    private final CharacterService characterService;

    public ApiCharacterRestController(CharacterService characterService) {
        this.characterService = characterService;
    }

    // 원정대 정보
    @GetMapping("/siblings/{characterName}")
    public ResponseEntity<String> getCharacterSiblings(@PathVariable String characterName, HttpSession session) {
        String result = characterService.getCharacterSiblings(characterName, session);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{characterName}")
    public ResponseEntity<String> getCharacterAll(@PathVariable String characterName, HttpSession session) {
        String result = characterService.getCharacterAll(characterName, session);
        return ResponseEntity.ok(result);
    }

}