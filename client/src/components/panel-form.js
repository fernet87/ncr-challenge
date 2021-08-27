import Form from "./form";
import Panel from "./panel";

export default function PanelForm(props) {
  return (
    <Panel title={props.title} size={props.size} >
      <Form onSubmit={props.onSubmit} model={props.model} >
        {props.children}
      </Form>
    </Panel>
  );
}
