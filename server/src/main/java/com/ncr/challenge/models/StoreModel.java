package com.ncr.challenge.models;

import com.ncr.challenge.entities.Store;


public class StoreModel extends BaseModel<Store> {

  private Short number;
  private String name;
      
  public StoreModel() {
    super();
  }
  
  public StoreModel(Store entity) {
    super(entity);
  }

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
