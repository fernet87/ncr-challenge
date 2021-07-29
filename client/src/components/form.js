import { FormProvider } from "react-hook-form";

// props: onSubmit
export default function Form(props) {
  return (
    <FormProvider {...props.methods} >
      <form onSubmit={props.methods.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </FormProvider>
  );
}
