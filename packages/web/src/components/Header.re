let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component,
  render: self =>
    <header>
      MaterialUi.(
        <AppBar position=`Sticky color=`Primary>
          <Toolbar>
              <Button href="#" color=`Inherit>
               <String v="soundsphere" />
              </Button>
          </Toolbar>
        </AppBar>
      )
    </header>,
};