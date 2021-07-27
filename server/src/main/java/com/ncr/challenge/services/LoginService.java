package com.ncr.challenge.services;

import java.util.Optional;

import com.ncr.challenge.entities.User;
import com.ncr.challenge.exceptions.InvalidPasswordResponseException;
import com.ncr.challenge.exceptions.UserNotFoundResponseException;

import org.springframework.stereotype.Service;

@Service
public class LoginService {
  
  public User doLogin(Optional<User> optionalUser, String password) throws UserNotFoundResponseException, InvalidPasswordResponseException {
    User user = null;

    if (!optionalUser.isEmpty()) {
      user = optionalUser.get();
    }
    else {
      throw new UserNotFoundResponseException();
    }

    if (user != null && password.compareTo(user.getPassword()) != 0) {
      throw new InvalidPasswordResponseException();
    }

    return user;
  }
  
}
