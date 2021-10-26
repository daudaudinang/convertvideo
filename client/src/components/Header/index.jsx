import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import './Header.scss';

Header.propTypes = {};

function Header({headerType}) {
  if(headerType === "modifier"){
    return (
      <header className="header">
          <Row className="justify-content-between">
           
            <Col xs="auto">
              <NavLink
                exact
                className="header__link"
                to="/convertFile"
                activeClassName="header__link--active"
              >
                Convert
              </NavLink>
            </Col>
  
            <Col xs="auto">
              <NavLink
                exact
                className="header__link"
                to="/fileController"
                activeClassName="header__link--active"
              >
                Quản lý File
              </NavLink>
            </Col>
            
            <Col xs="auto">
              <NavLink
                exact
                className="header__link"
                to="/userController"
                activeClassName="header__link--active"
              >
                Quản lý Người Dùng
              </NavLink>
            </Col>
  
            <Col xs="auto">
              <NavLink
                exact
                className="header__link"
                to="/logout"
                activeClassName="header__link--active"
              >
                Đăng xuất
              </NavLink>
            </Col>
          </Row>
      </header>
    );
  } else return (
    <header className="header">
        <Row className="justify-content-between">
         
          <Col xs="auto">
            <NavLink
              exact
              className="header__link"
              to="/convertFile"
              activeClassName="header__link--active"
            >
              Convert
            </NavLink>
          </Col>

          <Col xs="auto">
            <NavLink
              exact
              className="header__link"
              to="/fileController"
              activeClassName="header__link--active"
            >
              Quản lý File
            </NavLink>
          </Col>

          <Col xs="auto">
            <NavLink
              exact
              className="header__link"
              to="/logout"
              activeClassName="header__link--active"
            >
              Đăng xuất
            </NavLink>
          </Col>
        </Row>
    </header>
  );
}

export default Header;