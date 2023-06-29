import React from "react";

import "./Spinner.css";

function Spinner(): JSX.Element {
    return (
        <div className=' Spiner lds-roller'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Spinner;
