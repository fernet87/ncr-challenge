import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

// props: onSubmit
export default function Form(props) {
  const methods = useForm({ defaultValues: props.model });

  useEffect(() => {
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
  }, []);

  const onSubmit = () => {
    if (props.model) {
      Object.entries(methods.getValues()).forEach((item) => {
        props.model[item[0]] = item[1];
      });
    }
    else {
      console.warn("Model was not defined.")
    }
  }

  return (
    <FormProvider {...methods} >
      <form onClick={onSubmit} onSubmit={methods.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </FormProvider>
  );
}
