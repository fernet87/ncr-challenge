package com.ncr.challenge.services;

import java.util.ArrayList;
import java.util.Optional;

import com.ncr.challenge.entities.Store;
import com.ncr.challenge.repositories.StoreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreService {
  @Autowired
  StoreRepository storeRepository;

  public ArrayList<Store> getStores() {
    return (ArrayList<Store>) storeRepository.findAll();
  }

  public Optional<Store> findById(Long id) {
    return storeRepository.findById(id);
  }

}
