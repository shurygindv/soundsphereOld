type actions =
  | ChangePage(Types.page);

type state = {page: Types.page};

let mapUrlToPage = (url: ReasonReact.Router.url) : Types.page =>
  switch (url.path) {
  | ["home"] => Home
  | ["login"] => Login
  | ["auth"] => Waiting
  | ["register"] => Register
  | _ => Login
  };

let component = ReasonReact.reducerComponent(__MODULE__);

let make = _children => {
  ...component,
  initialState: () => {
    page: mapUrlToPage(ReasonReact.Router.dangerouslyGetInitialUrl()),
  },
  didMount: self => {
    let warcherId =
      ReasonReact.Router.watchUrl(url =>
        self.send(ChangePage(mapUrlToPage(url)))
      );

    self.onUnmount(() => ReasonReact.Router.unwatchUrl(warcherId));
  },
  reducer: (action, state) =>
    switch (action) {
    | ChangePage(page) => ReasonReact.Update({...state, page})
    },
  render: self =>
    switch (self.state.page) {
    | Home => <Home />
    | Login => <Login />
    | Waiting => <Waiting />
    | Register => <Register />
    },
};