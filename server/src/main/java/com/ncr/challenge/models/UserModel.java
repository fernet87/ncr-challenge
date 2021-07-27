package com.ncr.challenge.models;

public class UserModel {
  private Long id;
  private String name;
  private String lastName;
  private String user;
  private String mail;
  private String password;
  private Short profile;
  private Long storeId;
  
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
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
  public Long getStoreId() {
    return storeId;
  }
  public void setStoreId(Long storeId) {
    this.storeId = storeId;
  }
  
}
