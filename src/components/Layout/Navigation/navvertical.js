import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import "./style.css";
import Axios from "axios";

class NavVertical extends Component {
  state = {
    vertical: [],
  };

  //to store data & render in DOM
  componentDidMount() {
    Axios.get("/navmenu/vertical").then((res) => {
      const vertical = res.data[0];
      this.setState({ vertical });
    });
  }

  render() {
    let { vertical } = this.state;

    return (
      <>
        <CDBSidebar textColor="#fff" backgroundColor="#373a47">
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              {vertical.map((item, index) => {
                return (
                  <div key={index}>
                    <NavLink exact to={item.menuitemlink}>
                      <CDBSidebarMenuItem icon={item.iconurl}>
                        {item.menuitemname}
                      </CDBSidebarMenuItem>
                    </NavLink>
                  </div>
                );
              })}
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarHeader
            prefix={<i className="fa fa-bars fa-large"></i>}
          ></CDBSidebarHeader>
        </CDBSidebar>
      </>
    );
  }
}

export default NavVertical;
