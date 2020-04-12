import React, {useState, useEffect} from 'react';
import Tabs, {TabPane} from "./Tabs";

function callback(key) {
    console.log(key);
  }

const Opt3 = (props)=>{


    return <>
    <Tabs defaultActiveKey="1"> 
    <TabPane tab="Tab 1" key="1">
    content 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
    content 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
        content 3
    </TabPane>
  </Tabs>
  
  </>
};

export default Opt3;

