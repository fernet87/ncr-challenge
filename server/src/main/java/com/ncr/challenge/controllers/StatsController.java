package com.ncr.challenge.controllers;

import java.util.ArrayList;

import com.ncr.challenge.entities.User;
import com.ncr.challenge.models.StatsModel;
import com.ncr.challenge.services.StatsService;
import com.ncr.challenge.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stats")
public class StatsController {
  @Autowired
  StatsService statsService;

  @Autowired
  UserService userService;

  @GetMapping(path = "/{storeId}")
  public StatsModel calculateStats(@PathVariable("storeId") Long storeId) {
    ArrayList<User> users = userService.findByStoreId(storeId);
    return statsService.calculateStats(users);
  }
}
