let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component /* initialState: () => {route: 1} reducer: (action, state) => {},
   didMount: self => {}, */,
  render: _self => <button> (ReasonReact.string("Register")) </button>,
};