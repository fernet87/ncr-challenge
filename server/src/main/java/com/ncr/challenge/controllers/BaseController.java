package com.ncr.challenge.controllers;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.ncr.challenge.ErrorResponse;
import com.ncr.challenge.Response;
import com.ncr.challenge.entities.BaseEntity;
import com.ncr.challenge.exceptions.ResponseException;
import com.ncr.challenge.models.BaseModel;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BaseController {

  public ResponseEntity<Response> buildResponseEntity(Response responseBody) {
    return ResponseEntity.status(responseBody.getStatus()).body(responseBody);
  }

  public ResponseEntity<Response> buildResponseEntityFromException(ResponseException responseException, BaseEntity entity) {
    return buildResponseEntity(responseException.createResponse(entity));
  }
  
  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseOk(M model) {
    Response responseBody = new Response(HttpStatus.OK, model);
    return buildResponseEntity(responseBody);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseOk(BaseEntity entity, Class<M> clazz) {
    Response responseBody = new Response(HttpStatus.OK, convertEntityToModel((E) entity, clazz));
    return buildResponseEntity(responseBody);
  }
    
  public ResponseEntity<Response> responseOk() {
    Response responseBody = new Response(HttpStatus.OK);
    return buildResponseEntity(responseBody);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseOk(Optional<? extends BaseEntity> optionalEntity, Class<M> clazz) {
    Response responseBody = new Response(HttpStatus.OK);
    if (!optionalEntity.isEmpty()) {
      E m = (E) optionalEntity.get();
      responseBody.setModel(convertEntityToModel(m, clazz));
    }
    return buildResponseEntity(responseBody);
  }

  public ResponseEntity<Response> responseList(List<? extends BaseModel<? extends BaseEntity>> modelList) {
    Response responseBody = new Response(HttpStatus.OK, modelList);
    return buildResponseEntity(responseBody);
  }
  
  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseEntityList(List<E> entityList, Class<M> clazz) {
    List<M> modelList = new ArrayList<>();

    entityList.forEach((E entity) -> {
      modelList.add(convertEntityToModel(entity, clazz));
    });

    return buildResponseEntity(new Response(HttpStatus.OK, modelList));
  }

  private <M extends BaseModel<E>, E extends BaseEntity> M convertEntityToModel(E entity, Class<M> clazz) {
    M genericClassParameter = null;
    try {
      genericClassParameter = clazz.getDeclaredConstructor().newInstance();
    } catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException
        | NoSuchMethodException | SecurityException e) {
      e.printStackTrace();
    }
    genericClassParameter.map(entity);
    return genericClassParameter;
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseError(BaseEntity entity, String message, String field, HttpStatus status, Class<M> clazz) {
    ErrorResponse responseBody = new ErrorResponse(status, new BaseModel<BaseEntity>(entity), message, field);
    return buildResponseEntity(responseBody);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseError(BaseEntity entity, String message, HttpStatus status, Class<M> clazz) {
    return responseError(entity, message, null, status, clazz);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseConflictError(BaseEntity entity, String message, String field, Class<M> clazz) {
    return responseError(entity, message, field, HttpStatus.CONFLICT, clazz);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseConflictError(BaseEntity entity, String message, Class<M> clazz) {
    return responseError(entity, message, null, HttpStatus.CONFLICT, clazz);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseConflictError(String message, Class<M> clazz) {
    return responseError(null, message, null, HttpStatus.CONFLICT, clazz);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseNotFoundError(BaseEntity entity, String message, String field, Class<M> clazz) {
    return responseError(entity, message, field, HttpStatus.NOT_FOUND, clazz);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseForbiddenError(BaseEntity entity, String message, String field, Class<M> clazz) {
    return responseError(entity, message, field, HttpStatus.FORBIDDEN, clazz);
  }

}
