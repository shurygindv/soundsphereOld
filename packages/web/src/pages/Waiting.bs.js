// Generated by BUCKLESCRIPT VERSION 4.0.17, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var React = require("react");
var Footer$App = require("../components/Footer.bs.js");
var Header$App = require("../components/Header.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUi_LinearProgress = require("@jsiebern/bs-material-ui/src/MaterialUi_LinearProgress.bs.js");

var item = Css.style(/* :: */[
      Css.marginTop(Css.px(40)),
      /* [] */0
    ]);

var Styles = /* module */[/* item */item];

function renderBody(param) {
  return React.createElement(React.Fragment, undefined, React.createElement("div", undefined, React.createElement("div", {
                      className: item
                    }, ReasonReact.element(undefined, undefined, MaterialUi_LinearProgress.make(undefined, undefined, undefined, undefined, /* Query */-250086680, undefined, undefined, /* array */[]))), React.createElement("div", {
                      className: item
                    }, ReasonReact.element(undefined, undefined, MaterialUi_LinearProgress.make(undefined, /* Secondary */67972948, undefined, undefined, /* Query */-250086680, undefined, undefined, /* array */[]))), React.createElement("div", {
                      className: item
                    }, ReasonReact.element(undefined, undefined, MaterialUi_LinearProgress.make(undefined, undefined, undefined, undefined, /* Query */-250086680, undefined, undefined, /* array */[])))));
}

var component = ReasonReact.statelessComponent("Waiting-App");

function make(_children) {
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
              return React.createElement(React.Fragment, undefined, ReasonReact.element(undefined, undefined, Header$App.make(/* array */[])), renderBody(/* () */0), ReasonReact.element(undefined, undefined, Footer$App.make(/* array */[])));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

exports.Styles = Styles;
exports.renderBody = renderBody;
exports.component = component;
exports.make = make;
/* item Not a pure module */