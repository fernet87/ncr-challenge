package com.ncr.challenge.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(
  name = "user",
  uniqueConstraints = {
    @UniqueConstraint(name = "user_unique_user_idx", columnNames = {"user"}),
    @UniqueConstraint(name = "user_unique_mail_idx", columnNames = {"mail"})
  }
)
public class User extends BaseEntity {
  private String name;
  private String lastName;
  private String user;
  private String mail;
  private String password;
  private Short profile;
  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  private Store store;

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
  public Store getStore() {
    return store;
  }
  public void setStore(Store store) {
    this.store = store;
  }  
}
