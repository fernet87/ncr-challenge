package com.ncr.challenge.exceptions;

import com.ncr.challenge.ErrorResponse;
import com.ncr.challenge.entities.BaseEntity;

import org.springframework.http.HttpStatus;

public abstract class ResponseException extends Exception {
  public abstract String getMessage();
  public abstract String getField();
  public abstract HttpStatus getStatus();

  public ErrorResponse createResponse(BaseEntity body) {
    return new ErrorResponse(this.getStatus(), body, this.getMessage(), this.getField());
  }
}
