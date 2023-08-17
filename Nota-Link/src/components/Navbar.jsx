import React, { Component } from "react";
import { Link } from 'react-router-dom'; // Import Link
import { MenuData } from './MenuData';
import "../styles/NavbarStyles.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="logo">
          <Link href="/">
          NotaLink 
          </Link>
         
        </h1>
        <ul className="nav-menu">
          {MenuData.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.url} className={item.cName}>
                  <i className={item.icon}></i>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
