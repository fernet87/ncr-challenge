package com.ncr.challenge.controllers;

import java.util.Optional;

import com.ncr.challenge.Response;
import com.ncr.challenge.entities.User;
import com.ncr.challenge.exceptions.InvalidPasswordResponseException;
import com.ncr.challenge.exceptions.UserNotFoundResponseException;
import com.ncr.challenge.services.LoginService;
import com.ncr.challenge.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {
  
  @Autowired
  LoginService loginService;

  @Autowired
  UserService userService;


  @GetMapping()
  public ResponseEntity<Response> login(@RequestParam("user") String userOrMail, @RequestParam("password") String password) {
    Response responseBody = null;
    User user = null;

    Optional<User> optionalUser = (!userOrMail.contains("@")) ? userService.findByUser(userOrMail) : userService.findByMail(userOrMail);
    try {
      user = loginService.doLogin(optionalUser, password);
    }
    catch (UserNotFoundResponseException | InvalidPasswordResponseException responseException) {
      responseBody = responseException.createResponse(user);
    }
    finally {
      if (responseBody == null) {
        responseBody = new Response(HttpStatus.OK, user);
      }
    }

    return ResponseEntity.status(responseBody.getStatus()).body(responseBody);
  }

}
