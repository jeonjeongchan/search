package com.lostark.search.repository;

import com.lostark.search.repository.mapper.MarketMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MarketRepository {

    private final MarketMapper marketMapper;

    @Autowired
    public MarketRepository(MarketMapper marketMapper) {
        this.marketMapper = marketMapper;
    }

    public String fetchWelcomeMessage() {
        return marketMapper.getWelcomeMessage();
    }
}
