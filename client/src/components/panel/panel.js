import './panel.css';

// prop.size: "small", "medium", "large"
export default function Panel(props) {
  return (
    <div className={"container panel-container " + props.size}>
      <div className="row justify-content-center">
        <div >
          <h1 className="title" >{props.title}</h1>
          {props.children}
        </div>        
      </div>
    </div>
  )
}
