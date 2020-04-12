import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import { RoutedTabs, NavTab } from "react-router-tabs";
import SubOpt1 from "./Opt2Tabs/SubOpt1";
import SubOpt2 from "./Opt2Tabs/SubOpt2";
import SubOpt3 from "./Opt2Tabs/SubOpt3";
import "react-router-tabs/styles/react-router-tabs.css";

const Opt2 = ()=>{

    let match = useRouteMatch();

    console.log(match, match.path)
    return (
        <div>
          <NavTab to={`${match.path}/SubOpt1`}>SubOpt1</NavTab>
          <NavTab to={`${match.path}/SubOpt2`}>SubOpt2</NavTab>
          <NavTab to={`${match.path}/SubOpt3`}>SubOpt3</NavTab>
     
          <Switch>
            <Route
              exact
              path={`${match.path}`}
              render={() => <Redirect replace to={`${match.path}/SubOpt1`} />}
            />
            <Route path={`${match.path}/SubOpt1`} component={SubOpt1} />
            <Route path={`${match.path}/SubOpt2`} component={SubOpt2} />
            <Route path={`${match.path}/SubOpt3`} component={SubOpt3} />
          </Switch>
        </div>
      );
};

export default Opt2;

