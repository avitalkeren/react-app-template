import React, {useState, useEffect} from 'react';
import {Tabs} from "antd";
const { TabPane } = Tabs;
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

import {useHistory} from "react-router";

const NavTabs = (props)=>{

    const history = useHistory();
    let match = useRouteMatch();
    const [activeKey, setActiveKey] = useState();
    const tabRoot =  match.path.substring(0,match.path.lastIndexOf("/:tabId"));
    
    const handleSelect = (route) => {
        history.push(`${tabRoot}/${route}`);
        if (props.handleSelect) props.handleSelect();

      };


    const handleFirstLoad = ()=>{

        if (!match.params.tabId)
        {
            history.push(`${tabRoot}/${props.defaultActiveKey}`);
            setActiveKey(props.defaultActiveKey);
        }
        else{
            setActiveKey(match.params.tabId);
        }
      };
     
      useEffect(()=>{
        handleFirstLoad();
      },[match.params.tabId]);



    return <>
    <Tabs defaultActiveKey={props.defaultActiveKey} onChange={handleSelect} activeKey={activeKey}> 
        {props.children}
    </Tabs>
  </>
};

export {TabPane}

export default NavTabs;

