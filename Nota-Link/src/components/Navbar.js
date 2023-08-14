import React, { Component } from "react";
import { Link } from 'react-router-dom'; // Import Link
import { MenuData } from './components/MenuData';
import "./NavbarStyles.css";

class Navbar extends Component {
  state = { clicked: false };

  handleClicked = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="logo">
          NotaLink <i className="fab fa-react"></i>
        </h1>
        <div className="menu-icons" onClick={this.handleClicked}>
          <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuData.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.url} className={item.cName}> {/* Use Link instead of <a> */}
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
