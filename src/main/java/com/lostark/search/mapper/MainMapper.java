package com.lostark.search.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MainMapper {

    @Select("SELECT 'Welcome from Database via MyBatis!'")
    String getWelcomeMessage();
}
