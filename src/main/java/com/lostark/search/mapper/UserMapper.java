package com.lostark.search.mapper;

import com.lostark.search.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    // 로그인 확인
    User findByUsername(String username);

    // 회원 가입
    void save(User user);

    // 아이디 중복 확인
    int checkRegister(String username);
}
