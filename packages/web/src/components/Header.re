let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component,
  render: self =>
    <header>
      MaterialUi.(
        <AppBar position=`Sticky color=`Primary>
          <Toolbar> <IconButton> <MenuItem /> </IconButton> </Toolbar>
        </AppBar>
      )
    </header>,
};