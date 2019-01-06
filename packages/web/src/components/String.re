let component = ReasonReact.statelessComponent(__MODULE__) /* ~v means `value` */;

let make = (~v, _children) => {
  ...component,
  render: _self => ReasonReact.string(v),
};