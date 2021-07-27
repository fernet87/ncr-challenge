package com.ncr.challenge.controllers;

import java.util.ArrayList;

import com.ncr.challenge.entities.Store;
import com.ncr.challenge.services.StoreService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/store")
public class StoreController {
  @Autowired
  StoreService storeService;

  @GetMapping()
  public ArrayList<Store> getStores() {
    return storeService.getStores();
  }
  
}
