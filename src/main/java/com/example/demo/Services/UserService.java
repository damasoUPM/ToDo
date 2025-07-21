package com.example.demo.Services;

import com.example.demo.Exceptions.UserAlreadyExistsException;
import com.example.demo.Exceptions.WrongCredentialsException;
import com.example.demo.Model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public void  signUp(User user) {

        if (userRepository.findByUsername(user.getUsername()) != null) {
           throw new UserAlreadyExistsException("User already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public boolean confirmPassword(String password) {
        //Solo se acepta la contraseña si tiene la linguitud , combian caracteres distintos y coinciden las contraseñas,asi obligo
        //aque se escriban contraseñas seguras
        return hasCorrectLenght(password) && hasCorrectCaracterCombination(password) ;
    }


    private boolean hasCorrectLenght(String password) {
        return password.length() >= 8 && password.length() <= 16;
    }

    private boolean hasCorrectCaracterCombination(String password) {
        boolean hasUppercase = false;
        boolean hasLowercase = false;
        boolean hasDigit = false;
        boolean hasSpecialChar = false;

        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) hasUppercase = true;
            else if (Character.isLowerCase(c)) hasLowercase = true;
            else if (Character.isDigit(c)) hasDigit = true;
            else if ("!@#$%^&*()_+-=[]{}|;':\",.<>/?".indexOf(c) >= 0) hasSpecialChar = true;
        }

        return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // Adaptamos tu clase User a un objeto UserDetails
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword()) // ya está encriptado
                .roles("USER") // o puedes personalizar roles
                .build();
    }
}
