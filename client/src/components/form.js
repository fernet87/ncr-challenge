import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ModelProvider } from "./controls/fields/model-context";

// props: model, onSubmit
export default function Form(props) {
  const methods = useForm({ defaultValues: props.model });
  const [model] = useState(props.model);

  useEffect(() => {
    setFocus();
  });

  const setFocus = () => {
    let firstFocuseableField;
    Object.entries(methods.getValues()).forEach((item) => {
      let fieldFound = false;
      let fieldTypes = ["input", "select"];
      fieldTypes.forEach((fieldType) => {
        if (!fieldFound && document.getElementById(fieldType + "-" + item[0])) {
          fieldFound = true;
        }
      });
      if (!firstFocuseableField && fieldFound) {
        firstFocuseableField = item[0];
      }
    });
    methods.setFocus(firstFocuseableField);    
  }

  const onSubmit = (event) => {
    if (props.model) {
      Object.assign(props.model, model);
    }
    methods.handleSubmit(props.onSubmit)();
    event.preventDefault();
  }

  return (
    <ModelProvider model={model} >
      <FormProvider {...methods} >
        <form onSubmit={onSubmit}>
          {props.children}
        </form>
      </FormProvider>
    </ModelProvider>
  );
}
