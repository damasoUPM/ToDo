package com.example.demo.Services;

import com.example.demo.Exceptions.UserAlreadyExistsException;
import com.example.demo.Model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService  {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

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


    public void signIn(String username, String password) {
        User userFound = userRepository.findByUsername(username);
        if (userFound != null && passwordEncoder.matches(password, userFound.getPassword())){

        }

    }
}
