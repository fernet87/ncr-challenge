import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

// props: onSubmit
export default function Form(props) {
  const methods = useForm({ defaultValues: props.model });

  const updateInputAttributes = () => {
    if (props.model) {
      Object.entries(props.model).forEach((modelEntry) => {
        methods.setValue(modelEntry[0], modelEntry[1])
      });
    }
  }

  const updateOutputAttributes = () => {
    if (props.model) {
      Object.entries(methods.getValues()).forEach((item) => {
        props.model[item[0]] = item[1];
      });
    }    
  }

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

  useEffect(() => {
    setFocus();
  }, []);

  useEffect(() => {
    updateInputAttributes();
  }, [props.model]);

  const onBeforeSubmit = () => {
    updateOutputAttributes();
    if (!props.model) {
      console.warn("Model was not defined.")
    }
  }

  return (
    <FormProvider {...methods} >
      <form onClick={onBeforeSubmit} onSubmit={methods.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </FormProvider>
  );
}
