type validators =
  | Email
  | Password;

module Rule = {
  type def = {
    exec: Js.Re.t,
    error: string,
  };

  let email: def = {
    exec: Js.Re.fromString("^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$"), /* TODO: [%re ""] */

    error: "Email is incorrect, try again",
  };

  let password: def = {
    exec: Js.Re.fromString(".{,5}+"),

    error: "Password length should be more 5 characters",
  };
};

let test = (rule: Rule.def, value: string) => rule.exec |> Js.Re.test(value);

/* interop/adapter */
module FInterop = {
  open Formality;

  let use = (name: validators, value: string): result('message) => {
    switch (name) {
    | Email => test(Rule.email, value) ? Ok(Valid) : Error(Rule.email.error)
    | _ => Error("heeey, you are fool")
    };
  };
};
