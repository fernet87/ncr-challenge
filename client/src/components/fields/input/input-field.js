import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useFieldError } from "../../../contexts/field-error-context";
import { toCamelCase } from "../../../utils/string-utils";
import './input-field.css'

// props: register, type, attr, label, required, validationObject
export default function InputField(props) {
  const { register, formState: { errors } } = useFormContext();
  const { fieldErrorData } = useFieldError();

  const getId = () => {
    return 'input-' + props.attr;
  }
  
  let field = document.getElementById(getId());
  let value = (field) ? field.value : null;
  
  const handleErrorClasses = () => {
    if (value) {
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
    if (field) {
      field.classList.remove("is-invalid");
      field.classList.remove("is-valid");
    }
  }

  const updateErrorClasses = () => {
    if (field) {
      if ((errors && errors[props.attr]) || (fieldErrorData.field === props.attr)) {
        field.classList.add("is-invalid");
      }
      else {
        field.classList.add("is-valid");
      }
    }
  }
  
  useEffect(() => {
    handleErrorClasses();
  }, [value, fieldErrorData]);

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
      <input
        {...register(props.attr, validationObject)}
        type={props.type}
        className='form-control'
        id={getId()}
        placeholder={toCamelCase(props.attr)}
      />
      <div className="error-message" >
        {(errors && errors[props.attr]) ? 
          errors[props.attr].message :
          ((fieldErrorData.field === props.attr) ? fieldErrorData.message : '')
        }
      </div>
      <label htmlFor="floatingInput">{props.label}</label>
    </div>
  );
}