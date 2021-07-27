package com.ncr.challenge.services;

import java.util.ArrayList;
import java.util.Optional;

import com.ncr.challenge.entities.User;
import com.ncr.challenge.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  UserRepository userRepository;

  public ArrayList<User> getUsers() {
    return (ArrayList<User>) userRepository.findAll();
  }

  public User saveUser(User userModel) {
    return userRepository.save(userModel);
  }

  public Optional<User> findById(Long id) {
    return userRepository.findById(id);
  }

  public Optional<User> findByUser(String user) {
    return userRepository.findByUser(user);
  }

  public Optional<User> findByMail(String mail) {
    return userRepository.findByMail(mail);
  }

  public ArrayList<User> findByStoreId(Long storeId) {
    return userRepository.findByStoreId(storeId);
  }

  public ArrayList<User> findByProfile(Short profile) {
    return userRepository.findByProfile(profile);
  }

  public boolean deleteUser(Long id) {
    try {
      userRepository.deleteById(id);
      return true;
    }
    catch (Exception exception) {
      return false;
    }
  }
}
