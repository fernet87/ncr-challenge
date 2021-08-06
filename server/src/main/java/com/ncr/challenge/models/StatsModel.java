package com.ncr.challenge.models;

import com.ncr.challenge.entities.BaseEntity;

public class StatsModel extends BaseModel<BaseEntity> {
  
  public StatsModel() {
    super(null);
  }

  private short numberOfCashiers;
  private short numberOfSupervisors;
  private float percentageOfCashiersOverTotalUsers;
  private float percentageOfSupervisorsOverTotalUsers;
  
  public short getNumberOfCashiers() {
    return numberOfCashiers;
  }
  public void setNumberOfCashiers(short numberOfCashiers) {
    this.numberOfCashiers = numberOfCashiers;
  }
  public short getNumberOfSupervisors() {
    return numberOfSupervisors;
  }
  public void setNumberOfSupervisors(short numberOfSupervisors) {
    this.numberOfSupervisors = numberOfSupervisors;
  }
  public float getPercentageOfCashiersOverTotalUsers() {
    return percentageOfCashiersOverTotalUsers;
  }
  public void setPercentageOfCashiersOverTotalUsers(float percentageOfCashiersOverTotalUsers) {
    this.percentageOfCashiersOverTotalUsers = percentageOfCashiersOverTotalUsers;
  }
  public float getPercentageOfSupervisorsOverTotalUsers() {
    return percentageOfSupervisorsOverTotalUsers;
  }
  public void setPercentageOfSupervisorsOverTotalUsers(float percentageOfSupervisorsOverTotalUsers) {
    this.percentageOfSupervisorsOverTotalUsers = percentageOfSupervisorsOverTotalUsers;
  }
  
}
