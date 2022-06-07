import React from 'react';
import './spinner.css';

const Spinner = () => {
  return (<div className='to-center'>
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>);
};

export default Spinner;
