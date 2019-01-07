module Form = {
  open Formality;
  open Async;
  let debounceInterval = Formality.Async.debounceInterval;

  type field =
    | Email
    | Password;

  type state = {
    email: string,
    password: string,
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

  let validators = [EmailField.validator, PasswordField.validator];
};

module Styles = {
  open Css;

  let controls = style([display(`flex), justifyContent(spaceBetween)]);
};

module AsyncFormContainer = Formality.Async.Make(Form) /* =============== */;

let initialState: Form.state = {email: "", password: ""};

let renderEmailField = (form: AsyncFormContainer.interface) => {
  MaterialUi.(
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
  );
};

let renderPasswordField = (form: AsyncFormContainer.interface)  => {
  MaterialUi.(
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
  );
};

let renderSubmitButtons = (form: AsyncFormContainer.interface)  => {
  MaterialUi.(
    <>
      <FormControl margin=`Dense>
        <Button
          color=`Primary
          variant=`Contained
          type_="submit"
          disabled={form.submitting}>
          <String v="Login" />
        </Button>
      </FormControl>
      <FormControl margin=`Dense>
        <Button
          variant=`Outlined
          onClick={_event => ReasonReact.Router.push(Config.routes.register)}>
          <String v="Register" />
        </Button>
      </FormControl>
    </>
  );
};

let renderLoginForm = () =>
  <AsyncFormContainer
    initialState
    onSubmit={(state, form) => {
      let {email, password}: Form.state = state;
      ();
    }}>
    ...{form =>
      <form onSubmit={form.submit |> Formality.Dom.preventDefault}>
        <MaterialUi.FormGroup>
          {renderEmailField(form)}
          {renderPasswordField(form)}
          {renderSubmitButtons(form)}
        </MaterialUi.FormGroup>
      </form>
    }
  </AsyncFormContainer>;

let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component,
  render: _self =>
    <> <Header /> <Body> {renderLoginForm()} </Body> <Footer /> </>,
};
