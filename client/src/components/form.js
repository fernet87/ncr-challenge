import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

// props: onSubmit
export default function Form(props) {
  useEffect(() => {
    let firstFocuseableField;
    Object.entries(props.methods.getValues()).forEach((item) => {
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
    props.methods.setFocus(firstFocuseableField);
  }, []);

  return (
    <FormProvider {...props.methods} >
      <form onSubmit={props.methods.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </FormProvider>
  );
}
