module Styles = {
  open Css;

  let container = style([maxWidth(pct(40.0)), margin(auto)]);
};

let component = ReasonReact.statelessComponent(__MODULE__);

let make = children => {
  ...component,
  render: _self => <main className=Styles.container> ...children </main>,
};