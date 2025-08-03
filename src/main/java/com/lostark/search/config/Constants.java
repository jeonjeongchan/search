package com.lostark.search.config;

public class Constants {
    // 로아 api 주소
    public static final String API_URL = "https://developer-lostark.game.onstove.com";
    // 로아 api 키
    public static final String AUTHORIZATION_HEADER = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzNTE1OTEifQ.J0fJ0sDtCgpVOqW45MGlZJnKQ7NiORwFk33cHlVb0jgxCC6_L9HCIyGOsUkxno_VtQok3dpWzHvOjOhfqhvXLo3okBQU0MMqccfUI6_iDd3Qri6Jh4YGFfy4u6Yach22BKlf2845ZJsobmkYJ0WP_sI9efx1n9818ag8tDl66LfXGbhLMUST3PPmchIOha3jmEq8aeClEM_iPOhKhFrOZknAFTJJqQFYPA9TA9MNflTd_7XZe8DGfH2LTiZMgmBJ2ZCWa4zV6dxTxOI3tkcVyXj_MxBQvLzJKOdsHQbjQ-vy7mAfeVB4569NTqGmW1rZ69xL1aDHLamZieXe5fRXWQ";  // 필요하다면 API 키를 추가해야 함


    // 모듈 별 URL 주소
    public static final String MARKET_URL = API_URL + "/markets/items";
    public static final String SIBLINGS_URL = API_URL + "/characters/{characterName}/siblings";
    public static final String ARMORIES_ALL_URL = API_URL + "/armories/characters/{characterName}";

    public static final String ARMORIES_COMBAT_SKILLS_URL = API_URL + "/armories/characters/{characterName}/combat-skills";
    public static final String ARMORIES_PROFILES_URL = API_URL + "/armories/characters/{characterName}/profiles";
    public static final String NOTICES_URL = API_URL + "/news/notices";
    public static final String EVENT_URL = API_URL + "/news/events";
    public static final String AUCTIONS_URL = API_URL + "/auctions/items";
    public static final String GAME_CONTENTS_URL = API_URL + "/gamecontents/calendar";

    public static final String GUILD_URL = API_URL + "/guilds/rankings";


    // 보석 레벨
    public static String toStringDamage(String level) {
        return level + "레벨 겁화의 보석";
    }
    public static String toStringCoolTime(String level) {
        return level + "레벨 작열의 보석";
    }


}