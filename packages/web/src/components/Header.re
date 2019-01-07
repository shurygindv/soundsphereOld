let component = ReasonReact.statelessComponent(__MODULE__);

let make = _children => {
  ...component,
  render: self =>
    <header>
      MaterialUi.(
        <AppBar position=`Sticky color=`Primary>
          <Toolbar>
            <Typography variant=`H5 color=`Inherit>
              <String v="soundsphere" />
            </Typography>
          </Toolbar>
        </AppBar>
      )
    </header>,
};