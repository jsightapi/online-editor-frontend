import React from 'react';
import {Link} from 'react-router-dom';
import logo from 'assets/images/Logo.svg';

export const HeaderLogo = () => (
  <div className="logo">
    <Link to="/">
      <img src={logo} alt="JSight" />
    </Link>
  </div>
);
