let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component,
  render: self => <div> (ReasonReact.string("register")) </div>,
};