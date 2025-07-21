package com.example.demo.Exceptions;

public class WrongCredentialsException extends  RuntimeException{
    public WrongCredentialsException(String message) {
        super(message);
    }
}
