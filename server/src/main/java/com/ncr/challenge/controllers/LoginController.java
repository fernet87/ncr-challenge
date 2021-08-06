package com.ncr.challenge.controllers;

import java.util.Optional;

import com.ncr.challenge.Response;
import com.ncr.challenge.entities.User;
import com.ncr.challenge.exceptions.InvalidPasswordResponseException;
import com.ncr.challenge.exceptions.UserNotFoundResponseException;
import com.ncr.challenge.models.UserModel;
import com.ncr.challenge.services.LoginService;
import com.ncr.challenge.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController extends BaseController {
  
  @Autowired
  LoginService loginService;

  @Autowired
  UserService userService;


  @GetMapping()
  public ResponseEntity<Response> login(@RequestParam("user") String userOrMail, @RequestParam("password") String password) {
    ResponseEntity<Response> response = null;
    User user = null;

    Optional<User> optionalUser = (!userOrMail.contains("@")) ? userService.findByUser(userOrMail) : userService.findByMail(userOrMail);
    try {
      user = loginService.doLogin(optionalUser, password);
      response = responseOk(new UserModel(user));
    }
    catch (UserNotFoundResponseException | InvalidPasswordResponseException responseException) {
      response = buildResponseEntityFromException(responseException, user);
    }

    return response;
  }

}
