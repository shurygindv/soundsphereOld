type validators =
  | Email
  | Password
  | MinLength(int)
  | MaxLength(int);


module Rule = {
  type reValidator = {
    isValid: Js.Re.t,
    error: string,
  };

  type fuValidator = {
    message: int => string,
    isValid: (string, int) => bool,
  };

  let email: reValidator = {
    isValid: Js.Re.fromString("^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$") /* TODO: [%re ""] */,
    error: "Email doesn't match a pattern",
  };

  let password: reValidator = {
    isValid: Js.Re.fromString("^.{5,}$"),
    error: "Min 5 length",
  };

  let minLength: fuValidator = {
    isValid: (value: string, length: int) => (value |> Js.String.length) >= length,
    message: (count: int) => count |> Printf.sprintf("Min %d length"),
  };

  let maxLength: fuValidator = {
    isValid: (value: string, length: int) => (value |> Js.String.length) < length,
    message: (count: int) => count |> Printf.sprintf("Max %d length"),
  }; 
};

let testRe = (rule: Rule.reValidator, value: string) =>
  rule.isValid |> Js.Re.test(value);

module FInterop = {
  /* FInterop interop/adapter */
  open Formality;

  let use = (name: validators, value: string) : result('message) =>
    switch (name) {
    | Email =>
      testRe(Rule.email, value) ? Ok(Valid) : Error(Rule.email.error)

    | Password =>
      testRe(Rule.password, value) ? Ok(Valid) : Error(Rule.password.error)

    | MinLength(length) =>
      Rule.minLength.isValid(value, length) ?
        Ok(Valid) :  Error(length |> Rule.minLength.message)

    | MaxLength(length) =>
      Rule.maxLength.isValid(value, length) ?
        Ok(Valid) : Error(length |> Rule.maxLength.message)
    };
};