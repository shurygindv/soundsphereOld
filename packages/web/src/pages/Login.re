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
      strategy: Strategy.OnFirstBlur,
      dependents: None,
      validateAsync: None,
      validate: ({password}) =>
        password |> Validator.FInterop.use(Validator.Password),
    };
  };

  let validators = [EmailField.validator, PasswordField.validator];
};

module AsyncFormContainer = Formality.Async.Make(Form) /* =============== */;

let renderBody = () =>
  <Body>
    <AsyncFormContainer
      initialState={email: "", password: ""}
      onSubmit=(
        (state, form) => {
          let {email, password}: Form.state = state;
          ();
        }
      )>
      ...(
           form =>
             <form onSubmit=(form.submit |> Formality.Dom.preventDefault)>
               MaterialUi.(
                 <Grid container=true>
                   <Grid item=true md=V12>
                     <Button color=`Primary variant=`Contained>
                       <String v="Login" />
                     </Button>
                   </Grid>
                   <Grid item=true md=V12>
                     <Button variant=`Contained>
                       <String v="Register" />
                     </Button>
                   </Grid>
                 </Grid>
               )
             </form>
         )
    </AsyncFormContainer>
  </Body>;

let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component,
  render: self => <> <Header /> (renderBody()) <Footer /> </>,
};