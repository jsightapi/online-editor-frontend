import React from 'react';

const classes = {divider: 'border-1 border-dark-gama'};

const Divider = () => (
  <>
    <div className="pt-3" />
    <div className={classes.divider} />
    <div className="pt-6" />
  </>
);

export default Divider;
