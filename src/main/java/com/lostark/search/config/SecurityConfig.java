package com.lostark.search.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // CSRF 보호 끔 (테스트 또는 API 개발 시 주로 사용)
                .csrf(AbstractHttpConfigurer::disable)

                // SecurityContext 저장소 명시 (기본값이지만 명확하게 설정)
                .securityContext(context -> context
                        .securityContextRepository(new HttpSessionSecurityContextRepository())
                )

                // 인증/인가 정책
                .authorizeHttpRequests(auth -> auth
                        // 로그인 필요한 경로만 지정
                        .requestMatchers("/posts/write", "/posts/save").authenticated()
                        // 나머지 모든 요청은 허용
                        .anyRequest().permitAll()
                        // .requestMatchers("/login", "/register", "/css/**", "/js/**").permitAll() // 로그인/회원가입은 누구나 접근 가능
                        // .anyRequest().authenticated() // 그 외는 인증 필요
                )

                // 로그인 설정
                .formLogin(form -> form
                        .loginPage("/login")                   // 커스텀 로그인 페이지
                        .loginProcessingUrl("/login")          // 로그인 POST 처리 URL
                        .defaultSuccessUrl("/", true)          // 로그인 성공 후 이동 경로
                        //.failureUrl("/login?error")            // 로그인 실패 시
                        .permitAll()
                )

                // 로그아웃 설정
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login")
                        .permitAll()
                );

        return http.build();
    }

}