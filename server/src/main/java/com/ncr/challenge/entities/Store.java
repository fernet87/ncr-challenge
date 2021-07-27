package com.ncr.challenge.entities;

import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "store")
public class Store extends BaseEntity {
  private Short number;
  private String name;

  public Short getNumber() {
    return number;
  }
  public void setNumber(Short number) {
    this.number = number;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
}
