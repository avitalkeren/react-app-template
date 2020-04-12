import React, {useState, useEffect} from 'react';
import {Tabs} from "antd";
const { TabPane } = Tabs;
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

import {useHistory} from "react-router";


function callback(key) {
    console.log(key);
  }

const NavTabs = (props)=>{

    const history = useHistory();
    let match = useRouteMatch();

    const [activeKey, setActiveKey] = useState();

    const tabRoot =  match.path.substring(0,match.path.lastIndexOf("/:tabId"));

    const handleSelect = (route) => {
        // Get your route name from params and pass it to history.push()
        history.push(`${tabRoot}/${route}`);
        setActiveKey(route);
      };


      const handleFirstLoad = ()=>{
        console.log("handleFirstLoad");

        if (!match.params.tabId)
        {
            console.log("tabId is null");

            history.push(`${tabRoot}/${props.defaultActiveKey}`);
            setActiveKey(props.defaultActiveKey);
        }
        else{
            setActiveKey(match.params.tabId);
        }
      };
    
    //  useEffect(()=>{
     //   handleFirstLoad();
     // },[]);

      useEffect(()=>{
        handleFirstLoad();
      },[match.params.tabId]);



    return <>
    <Tabs defaultActiveKey={props.defaultActiveKey} onChange={handleSelect} activeKey={activeKey}> 
        {props.children.map((item) =><TabPane key={item.key} tab={item.props.tab}>{item.props.children}</TabPane>)}
    </Tabs>
    { false && <Switch >
        {props.children.map((item) =><Route path={`${tabRoot}/${item.key}`} key={item.key} ></Route>)}
    </Switch>}
  </>
};

export {TabPane}

export default NavTabs;

