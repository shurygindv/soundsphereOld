type actions =
  | ChangeRoute(Types.route);

type state = {route: Types.route};

let mapUrlToRoute = (url: ReasonReact.Router.url) : Types.route =>
  switch (url.path) {
  | ["home"] => Home
  | ["login"] => Login
  | ["register"] => Register
  | _ => Home
  };

let component = ReasonReact.reducerComponent(__MODULE__);

let make = _children => {
  ...component,
  initialState: () => {
    route: mapUrlToRoute(ReasonReact.Router.dangerouslyGetInitialUrl()),
  },
  reducer: (action, state) =>
    switch (action) {
    | ChangeRoute(route) => ReasonReact.Update({...state, route})
    },
  didMount: self => {
    let warcherId =
      ReasonReact.Router.watchUrl(url =>
        self.send(ChangeRoute(mapUrlToRoute(url)))
      );

    self.onUnmount(() => ReasonReact.Router.unwatchUrl(warcherId));
  },
  render: self => {
    let {route} = self.state;
    <div>
      (
        switch (route) {
        | Login => <Login />
        | Register => <Register />
        | Home => <Home />
        }
      )
    </div>;
  },
};