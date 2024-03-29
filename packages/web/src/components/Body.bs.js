// Generated by BUCKLESCRIPT VERSION 4.0.17, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var container = Css.style(/* :: */[
      Css.maxWidth(Css.pct(40.0)),
      /* :: */[
        Css.margin(Css.auto),
        /* [] */0
      ]
    ]);

var Styles = /* module */[/* container */container];

var component = ReasonReact.statelessComponent("Body-App");

function make(children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (_self) {
              return ReactDOMRe.createElementVariadic("main", {
                          className: container
                        }, children);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

exports.Styles = Styles;
exports.component = component;
exports.make = make;
/* container Not a pure module */
