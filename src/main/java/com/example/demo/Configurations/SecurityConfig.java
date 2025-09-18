package com.example.demo.Configurations;

import com.example.demo.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Autowired
    private UserService userDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //REGISTER,LOGIN y los archivos estaticos los permito para lo demas hay que autentificarse
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login", "/login", "/css/**", "/js/**","/signUp").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .defaultSuccessUrl("/tasks", true)
                        .failureUrl("/loginError")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                );
        return http.build();
    }

   @Bean
   public AuthenticationManager authManager(HttpSecurity http) throws Exception {
       AuthenticationManagerBuilder authenticationManagerBuilder =
               http.getSharedObject(AuthenticationManagerBuilder.class);

       authenticationManagerBuilder
               .userDetailsService(userDetailsService)
               .passwordEncoder(passwordEncoder);

       return authenticationManagerBuilder.build();
   }

}
