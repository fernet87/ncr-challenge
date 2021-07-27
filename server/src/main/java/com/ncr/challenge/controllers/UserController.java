package com.ncr.challenge.controllers;

import java.util.ArrayList;
import java.util.Optional;

import com.ncr.challenge.ErrorResponse;
import com.ncr.challenge.Response;
import com.ncr.challenge.entities.Store;
import com.ncr.challenge.entities.User;
import com.ncr.challenge.models.UserModel;
import com.ncr.challenge.services.StoreService;
import com.ncr.challenge.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired
  UserService userService;
  @Autowired
  StoreService storeService;

  @GetMapping()
  public ArrayList<User> getUsers() {
    return userService.getUsers();
  }

  @PostMapping("/create")
  public ResponseEntity<Response> create(@RequestBody UserModel userDTO) {
    return createOrUpdateUser(true, userDTO);
  }
  
  @PutMapping("/update")
  public ResponseEntity<Response> update(@RequestBody UserModel userDTO) {
    return createOrUpdateUser(false, userDTO);
  }

  private ResponseEntity<Response> createOrUpdateUser(Boolean create, UserModel userDTO) {
    Store store = storeService.findById(userDTO.getStoreId()).get();
    User user = null;
    if (create) {
      user = new User();
    }
    else {
      user = userService.findById(userDTO.getId()).get();
    }
    user.setName(userDTO.getName());
    user.setLastName(userDTO.getLastName());
    user.setUser(userDTO.getUser());
    user.setMail(userDTO.getMail());
    user.setPassword(userDTO.getPassword());
    user.setProfile(userDTO.getProfile());
    user.setStore(store);

    Response responseBody = null;
    User savedUser = null;
    try {
      savedUser = userService.saveUser(user);
    }
    catch(DataIntegrityViolationException ex) {
      if (ex.getCause().getCause().getMessage().indexOf("USER_UNIQUE_USER_IDX") > -1) {
        responseBody = new ErrorResponse(HttpStatus.CONFLICT, null, "El usuario ingresado ya existe. Ingrese uno diferente.", "user");
      }
      if (ex.getCause().getCause().getMessage().indexOf("USER_UNIQUE_MAIL_IDX") > -1) {
        responseBody = new ErrorResponse(HttpStatus.CONFLICT, null, "El mail ingresado ya existe. Ingrese uno diferente.", "mail");
      }
    }

    if (responseBody == null) {
      responseBody = new Response(HttpStatus.OK, savedUser);
    }

    return ResponseEntity.status(responseBody.getStatus()).body(responseBody);
  }

  @GetMapping(path = "/{id}")
  public Optional<User> getUserById(@PathVariable("id") Long id) {
    return userService.findById(id);
  }

  @GetMapping("/byStoreId/{id}")
  public ArrayList<User> getUsersByStoreId(@PathVariable("id") Long storeId) {
    return userService.findByStoreId(storeId);
  }

  @GetMapping("/byProfile")
  public ArrayList<User> getUsersByProfile(@RequestParam("profile") Short profile) {
    return userService.findByProfile(profile);
  }

  @DeleteMapping(path = "/{id}")
  public ResponseEntity<Response> delete(@PathVariable("id") Long id) {
    Response responseBody = null;
    
    boolean ok = userService.deleteUser(id);

    if (ok) {
      responseBody = new Response(HttpStatus.OK, null);
    }
    else {
      responseBody = new ErrorResponse(HttpStatus.CONFLICT, null, "No se pudo eliminar el usuario.");
    }

    return ResponseEntity.status(responseBody.getStatus()).body(responseBody);
  }
  
}
