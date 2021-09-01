import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useError } from "../../../../contexts/error-context";
import { toCamelCase } from "../../../../utils/string-utils";
import styled from 'styled-components'
import { useModel } from "../model-context";

const StyledErrorMessage = styled.div`
  color: red;
  padding-left: 20px;
  font-size: 10px;
  position: absolute;
  top: 60px;
`;

const StyledFormControl = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
`;


// props: register, type, attr, label, required, validationObject
export default function InputField(props) {
  const { register, setValue, formState: { errors } } = useFormContext();
  const { fieldError } = useError();
  const model = useModel();
    
  useEffect(() => {
    setValue(props.attr, model.get(props.attr));
  });

  useEffect(() => {
    handleErrorClasses();
  }, [fieldError]);

  const getId = () => {
    return 'input-' + props.attr;
  }

  const getField = () => {
    return document.getElementById(getId());
  }

  const getValue = () => {
    let field = getField();
    return (field) ? field.value : null;
  }

  const updateField = () => {
    model.set(props.attr, getValue());
  }
  
  const handleErrorClasses = () => {
    if (getValue()) {
      cleanErrorClasses();
      updateErrorClasses();
    }
    else {
      if (errors && errors[props.attr] && errors[props.attr].type === "required") {
        updateErrorClasses();
      }
      else {
        cleanErrorClasses();
      }
    }
  }

  const cleanErrorClasses = () => {
    let field = getField();
    if (field) {
      field.classList.remove("is-invalid");
      field.classList.remove("is-valid");
    }
  }

  const updateErrorClasses = () => {
    let field = getField();
    if (field) {
      if ((errors && errors[props.attr]) || (fieldError.field === props.attr)) {
        field.classList.add("is-invalid");
      }
      else {
        field.classList.add("is-valid");
      }
    }
  }

  let validationObject = (props.validationObject) ? props.validationObject : {};
  if (props.required) {
    validationObject.required = 'Campo obligatorio';
  }
  if (props.maxLength) {
    validationObject.maxLength = {
      value: props.maxLength,
      message: 'El campo debe tener como maximo ' + props.maxLength + ' caracteres'
    };
  }
  if (props.minLength) {
    validationObject.minLength = {
      value: props.minLength,
      message: 'El campo debe tener como minimo ' + props.minLength + ' caracteres'
    };
  }
  if (props.max) {
    validationObject.max = {
      value: props.max,
      message: 'Supero el maximo del campo. Maximo: ' + props.max
    };
  }
  if (props.min) {
    validationObject.min = {
      value: props.min,
      message: 'Supero el minimo del campo. Minimo: ' + props.min
    };
  }
  if (props.pattern) {
    validationObject.pattern = {
      value: new RegExp(props.pattern),
      message: 'El campo debe respetar el siguiente patron: ' + props.pattern
    };
  }
  if (props.type === 'mail') {
    const pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
    if (props.pattern) {
      pattern = props.pattern;
    }
    validationObject.pattern = {
      value: new RegExp(pattern),
      message: 'E-Mail invalido.'
    };
  }

  return (
    <div className="form-floating">
      <StyledFormControl
        {...register(props.attr, validationObject)}
        type={props.type}
        className='form-control'
        id={getId()}
        placeholder={toCamelCase(props.attr)}
        onBlur={updateField}
      />
      <StyledErrorMessage>
        {(errors && errors[props.attr]) ? 
          errors[props.attr].message :
          ((fieldError.field === props.attr) ? fieldError.message : '')
        }
      </StyledErrorMessage>
      <label htmlFor="floatingInput">{props.label}</label>
    </div>
  );
}