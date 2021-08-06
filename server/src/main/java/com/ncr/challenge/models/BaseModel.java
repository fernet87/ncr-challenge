package com.ncr.challenge.models;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;

import com.ncr.challenge.entities.BaseEntity;

import org.modelmapper.ModelMapper;

public class BaseModel<T extends BaseEntity> {
  private static ModelMapper modelMapper = new ModelMapper();

  private Long id;
    
  public BaseModel() {
  }

  public BaseModel(T entity) {
    map(entity);
  }

  public void map(T entity) {
    if (entity != null) {
      BaseModel.modelMapper.map(entity, this);
    }
  }

  public BaseEntity toEntity() {
    ParameterizedType superClass = (ParameterizedType) getClass().getGenericSuperclass();
    Class<T> type = (Class<T>) superClass.getActualTypeArguments()[0];
    T genericClassParameter = null;
    
    try {
      type.getDeclaredConstructor();
      genericClassParameter = type.getDeclaredConstructor().newInstance();
    } catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException
        | NoSuchMethodException | SecurityException e) {
      e.printStackTrace();
    }
    
    return BaseModel.modelMapper.map(this, genericClassParameter.getClass());
  }
  
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
  
}
