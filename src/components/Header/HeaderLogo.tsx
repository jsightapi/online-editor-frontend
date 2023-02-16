import React from 'react';
import {Link} from 'react-router-dom';
import logo from 'assets/images/Logo.svg';

export const HeaderLogo = () => (
  <div className="logo">
    <a href="https://jsight.io" target="_blank" rel="noreferrer noopener">
      <img src={logo} alt="JSight" />
    </a>
  </div>
);
