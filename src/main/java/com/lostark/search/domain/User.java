package com.lostark.search.domain;


import lombok.Data;

import java.sql.Date;


@Data
public class User {

    private Long id;

    private String username;
    private String password;
    private String email;
    private Date create_at;
    private Date modify_at;


}