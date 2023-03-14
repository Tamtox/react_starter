import './Spinner.scss';
import React from 'react';

const Spinner: React.FC<{ height: string }> = (props) => {
  return (
    <div style={{ height: props.height }} className="loading">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
