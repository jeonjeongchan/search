package com.lostark.search.repository.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MarketMapper {

    @Select("SELECT 'Welcome from Database via MyBatis!'")
    String getWelcomeMessage();
}
