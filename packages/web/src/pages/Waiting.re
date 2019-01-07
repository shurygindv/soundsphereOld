module Styles = {
  open Css;

    let item = style([marginTop(px(40))])
};

let renderBody = () =>
  <>
    <div>
      <div className=Styles.item> <MaterialUi.LinearProgress variant=`Query /> </div>
      <div className=Styles.item>
        <MaterialUi.LinearProgress color=`Secondary variant=`Query />
      </div>
      <div className=Styles.item> <MaterialUi.LinearProgress variant=`Query /> </div>
    </div>
  </>;

let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component,
  render: _self => <> <Header /> {renderBody()} <Footer /> </>
}