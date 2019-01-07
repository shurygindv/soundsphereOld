/* TODO: REFACTOR THIS */

module Form = {
  open Formality;
  open Async;

  let debounceInterval = Formality.Async.debounceInterval;

  type field =
    | FirstName
    | LastName
    | Email
    | Password
    | PasswordConfirmation;

  type state = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    passwordConfirmation: string,
  };

  type message = string /*let selector = (name: string, state: state) : string => [%bs.raw "state[name]"]  TODO: remake it, see Js.Dict */;

  module EmailField = {
    let update = (state, value) => {...state, email: value};

    let validator = {
      field: Email,
      strategy: Strategy.OnFirstSuccessOrFirstBlur,
      dependents: None,
      validateAsync: None,
      validate: ({email}) =>
        email |> Validator.FInterop.use(Validator.Email),
    };
  };

  module FirstNameField = {
    let update = (state, value) => {...state, firstName: value};

    let validator = {
      field: FirstName,
      strategy: Strategy.OnFirstSuccessOrFirstBlur,
      dependents: None,
      validateAsync: None,
      validate: ({firstName}) =>
        firstName |> Validator.FInterop.use(Validator.MinLength(3)),
    };
  };

  module LastNameField = {
    let update = (state, value) => {...state, lastName: value};

    let validator = {
      field: LastName,
      strategy: Strategy.OnFirstSuccessOrFirstBlur,
      dependents: None,
      validateAsync: None,
      validate: _state => Ok(Valid),
    };
  };

  module PasswordField = {
    let update = (state, value) => {...state, password: value};

    let validator = {
      field: Password,
      strategy: Strategy.OnFirstSuccessOrFirstBlur,
      dependents: None,
      validateAsync: None,
      validate: ({password}) =>
        password |> Validator.FInterop.use(Validator.Password),
    };
  };

  module PasswordConfirmationField = {
    let update = (state, value) => {...state, passwordConfirmation: value};

    let validator = {
      field: PasswordConfirmation,
      strategy: Strategy.OnFirstSuccessOrFirstBlur,
      dependents: None,
      validateAsync: None,
      validate: ({passwordConfirmation, password}) =>
        switch (passwordConfirmation) {
        | _ when password !== passwordConfirmation =>
          Error("Password doesn't match")

        | "" => Error("Password confirmation is required")
        | _ => Ok(Valid)
        },
    };
  };

  let validators = [
    FirstNameField.validator,
    LastNameField.validator,
    EmailField.validator,
    PasswordField.validator,
    PasswordConfirmationField.validator,
  ];
};

module Styles = {
  open Css;

  let controls = style([display(`flex), justifyContent(spaceBetween)]);
};

let initialState: Form.state = {
  email: "",
  password: "",
  passwordConfirmation: "",
  firstName: "",
  lastName: "",
};

module AsyncFormContainer = Formality.Async.Make(Form);

let renderBody = () =>
  <Body>
    <AsyncFormContainer
      initialState
      onSubmit={(state, form) => {
        let {email, password}: Form.state = state;
        ();
      }}>
      ...{form =>
        <form onSubmit={form.submit |> Formality.Dom.preventDefault}>
          MaterialUi.(
            <FormGroup>
              <FormControl required=true>
                <TextField
                  id="firstName"
                  error={
                    /* TODO eoptimize error & label */
                    switch (Form.FirstName |> form.result) {
                    | Some(Ok(Valid)) => false
                    | Some(Error(_message)) => true
                    | _ => false
                    }
                  }
                  label={
                    switch (Form.FirstName |> form.result) {
                    | Some(Error(message)) => <String v=message />
                    | _ => <String v="FirstName" />
                    }
                  }
                  value={`String(form.state.firstName)}
                  onChange={event =>
                    form.change(
                      Form.FirstName,
                      Form.FirstNameField.update(
                        form.state,
                        event->ReactEvent.Form.target##value,
                      ),
                    )
                  }
                  disabled={form.submitting}
                  onBlur={_ => form.blur(Form.FirstName)}
                  margin=`Normal
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="lastName"
                  label={<String v="LastName" />}
                  value={`String(form.state.lastName)}
                  onChange={event =>
                    form.change(
                      Form.LastName,
                      Form.LastNameField.update(
                        form.state,
                        event->ReactEvent.Form.target##value,
                      ),
                    )
                  }
                  disabled={form.submitting}
                  onBlur={_ => form.blur(Form.LastName)}
                  margin=`Normal
                />
              </FormControl>
              <FormControl required=true>
                <TextField
                  id="email"
                  error={
                    switch (Form.Email |> form.result) {
                    | Some(Ok(Valid)) => false
                    | Some(Error(_message)) => true
                    | _ => false
                    }
                  }
                  label={
                    switch (Form.Email |> form.result) {
                    | Some(Error(message)) => <String v=message />
                    | _ => <String v="Email" />
                    }
                  }
                  value={`String(form.state.email)}
                  onChange={event =>
                    form.change(
                      Form.Email,
                      Form.EmailField.update(
                        form.state,
                        event->ReactEvent.Form.target##value,
                      ),
                    )
                  }
                  disabled={form.submitting}
                  onBlur={_ => form.blur(Form.Email)}
                  margin=`Normal
                />
              </FormControl>
              <FormControl required=true>
                <TextField
                  id="password"
                  type_="password"
                  error={
                    /* TODO: REMAKE IT */
                    switch (Form.Password |> form.result) {
                    | Some(Ok(Valid)) => false
                    | Some(Error(_message)) => true
                    | _ => false
                    }
                  }
                  label={
                    /* TODO: REMAKE IT */
                    switch (Form.Password |> form.result) {
                    | Some(Error(message)) => <String v=message />
                    | _ => <String v="Password" />
                    }
                  }
                  disabled={form.submitting}
                  onBlur={_ => form.blur(Form.Password)}
                  value={`String(form.state.password)}
                  onChange={event =>
                    form.change(
                      Form.Password,
                      Form.PasswordField.update(
                        form.state,
                        event->ReactEvent.Form.target##value,
                      ),
                    )
                  }
                  margin=`Normal
                />
              </FormControl>
              <FormControl required=true>
                <TextField
                  id="passwordConfirmation"
                  type_="password"
                  error={
                    /* TODO: REMAKE IT */
                    switch (Form.PasswordConfirmation |> form.result) {
                    | Some(Ok(Valid)) => false
                    | Some(Error(_message)) => true
                    | _ => false
                    }
                  }
                  label={
                    /* TODO: REMAKE IT */
                    switch (Form.PasswordConfirmation |> form.result) {
                    | Some(Error(message)) => <String v=message />
                    | _ => <String v="Password Confirmation" />
                    }
                  }
                  disabled={form.submitting}
                  onBlur={_ => form.blur(Form.PasswordConfirmation)}
                  value={`String(form.state.passwordConfirmation)}
                  onChange={event =>
                    form.change(
                      Form.PasswordConfirmation,
                      Form.PasswordConfirmationField.update(
                        form.state,
                        event->ReactEvent.Form.target##value,
                      ),
                    )
                  }
                  margin=`Normal
                />
              </FormControl>
              <FormControl margin=`Dense>
                <Button
                  color=`Primary
                  variant=`Contained
                  type_="submit"
                  disabled={form.submitting}>
                  <String v="Submit" />
                </Button>
              </FormControl>
              <FormControl margin=`Dense>
                <Button
                  variant=`Outlined
                  onClick={_event =>
                    ReasonReact.Router.push(Config.routes.login)
                  }>
                  <String v="Back" />
                </Button>
              </FormControl>
            </FormGroup>
          )
        </form>
      }
    </AsyncFormContainer>
  </Body>;

let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component,
  render: _self => <> <Header /> {renderBody()} <Footer /> </>,
};
