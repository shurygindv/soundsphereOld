module Styles = {
  open Css;

  let uppercased = style([textTransform(uppercase)]);
};

let component = ReasonReact.statelessComponent(__MODULE__);

let make = (~level=1, ~content: ReasonReact.reactElement, _children) => {
  ...component,
  render: _self =>
    switch (level) {
    | 1 => <h1 className=Styles.uppercased> content </h1>
    | 2 => <h2> content </h2>
    | 3 => <h3> content </h3>
    | 4 => <h4> content </h4>
    | 5 => <h5> content </h5>
    | _ => <p> content </p>
    },
};
