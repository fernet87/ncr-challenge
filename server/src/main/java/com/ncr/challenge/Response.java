package com.ncr.challenge;

import com.ncr.challenge.entities.BaseEntity;

import org.springframework.http.HttpStatus;

public class Response {
  private HttpStatus status;
  private BaseEntity model;

  public Response(HttpStatus status, BaseEntity model) {
    super();
    this.status = status;
    this.model = model;
  }
  
  public HttpStatus getStatus() {
    return status;
  }

  public void setStatus(HttpStatus status) {
    this.status = status;
  }

  public BaseEntity getModel() {
    return model;
  }

  public void setModel(BaseEntity model) {
    this.model = model;
  }


}
