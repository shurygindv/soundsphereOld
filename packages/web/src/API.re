let host = "http://localhost:8888/api/v1";

let toRequestResult = json => Belt.Result.Ok(json) |> Js.Promise.resolve;

let fetchWithJsonPayload = (url: string, payload: Js_dict.t(Js.Json.t)) =>
  Js.Promise.(
    Fetch.fetchWithInit(
      url,
      Fetch.RequestInit.make(
        ~method_=Post,
        ~body=
          Fetch.BodyInit.make(Js.Json.stringify(Js.Json.object_(payload))),
        ~headers=Fetch.HeadersInit.make({"Content-Type": "application/json"}),
        (),
      ),
    )
    |> then_(Fetch.Response.json)
  ) /*

             POST: USER REGISTER

           */;

type user = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
};

let selectRegisterRequestParams = (request: user) => {
  let registerDict = Js.Dict.empty();

  Js.Dict.set(registerDict, "email", Js.Json.string(request.email));
  Js.Dict.set(registerDict, "firstName", Js.Json.string(request.firstName));
  Js.Dict.set(registerDict, "lastName", Js.Json.string(request.lastName));
  Js.Dict.set(registerDict, "password", Js.Json.string(request.password));

  registerDict;
};

let register = (~request: user, ()) =>
  selectRegisterRequestParams(request)
  |> fetchWithJsonPayload(host |> Printf.sprintf("%s/users/register"))
  |> Js.Promise.then_(toRequestResult) /*

   POST: USER LOGIN

 */;

let selectLoginRequestParams = (email: string, password: string) => {
  let loginDict = Js.Dict.empty();

  Js.Dict.set(loginDict, "email", Js.Json.string(email));
  Js.Dict.set(loginDict, "password", Js.Json.string(password));

  loginDict;
};

let login = (~email: string, ~password: string, ()) =>
  selectLoginRequestParams(email, password)
  |> fetchWithJsonPayload(host |> Printf.sprintf("%s/users/login"));