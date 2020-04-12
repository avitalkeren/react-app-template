import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {Redirect } from "react-router";
import { Layout, Menu, ConfigProvider, Result } from "antd";
import heIL from "antd/es/locale-provider/he_IL";
const { Header, Content, Footer, Sider } = Layout;


import Opt1 from "./components/Opt1";
import Opt2 from "./components/Opt2";
import Opt3 from "./components/Opt3";

function App() {
  return (
    <div>
    <ConfigProvider direction="rtl" locale={heIL}>
      <Router basename="/" >
        <Layout style={{ minHeight: "100vh", width: "100%" }}>
          <Header className="header">
            <Menu theme="dark" defaultSelectedKeys={["1,2"]} mode="horizontal" className="mainMenu">
              <Menu.Item key="1">
                אופציה 1
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                אופציה 2
                <Link to="/Opt2" />
              </Menu.Item>
              <Menu.Item key="3">
                אופציה 3
                <Link to="/Opt3" />
              </Menu.Item>
            </Menu>
          </Header>
          <Content
            style={{
              margin: "10px",
              padding: 0,
              minHeight: 280
            }}
          >
            <Switch>
              <Route exact path="/" ><Redirect to="/Opt1" ></Redirect></Route>
              <Route path="/Opt1" ><Opt1></Opt1></Route>
              <Route path="/Opt2" ><Opt2></Opt2></Route>
              <Route path="/Opt3/:tabId?" ><Opt3></Opt3></Route>
              <Route path="*">
                <Result status="404" title="404" subTitle="מצטערים, דף זה אינו קיים" />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  </div>
  );
}

export default App;
