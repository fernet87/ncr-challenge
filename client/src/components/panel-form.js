import Form from "./form";
import Panel from "./panel/panel";

export default function PanelForm(props) {
  return (
    <Panel title={props.title} size={props.size} >
      <Form onSubmit={props.onSubmit} >
        {props.children}
      </Form>
    </Panel>
  );
}
