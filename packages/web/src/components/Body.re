module Styles = {
  open Css;

  let container =
    style([width(px(80)), background(rgba(0, 0, 0, 0.2)), margin(auto)]);
};

let component = ReasonReact.statelessComponent(__MODULE__);

let make = children => {
  ...component,
  render: _self => <main className=Styles.container> ...children </main>,
};