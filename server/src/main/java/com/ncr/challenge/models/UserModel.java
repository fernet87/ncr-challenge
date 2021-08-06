package com.ncr.challenge.models;

import com.ncr.challenge.entities.User;

public class UserModel extends BaseModel<User> {

  private String name;
  private String lastName;
  private String user;
  private String mail;
  private String password;
  private Short profile;
  private StoreModel store;
        
  public UserModel() {
    super();
  }

  public UserModel(User entity) {
    super(entity);
  }
  
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getLastName() {
    return lastName;
  }
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
  public String getUser() {
    return user;
  }
  public void setUser(String user) {
    this.user = user;
  }
  public String getMail() {
    return mail;
  }
  public void setMail(String mail) {
    this.mail = mail;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public Short getProfile() {
    return profile;
  }
  public void setProfile(Short profile) {
    this.profile = profile;
  }

  public StoreModel getStore() {
    return store;
  }

  public void setStore(StoreModel store) {
    this.store = store;
  }
  
}
