package com.lostark.search.repository;

import com.lostark.search.repository.mapper.MainMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MainRepository {

    private final MainMapper mainMapper;

    @Autowired
    public MainRepository(MainMapper mainMapper) {
        this.mainMapper = mainMapper;
    }

    public String fetchWelcomeMessage() {
        return mainMapper.getWelcomeMessage();
    }
}
