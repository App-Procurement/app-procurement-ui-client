import React, { Component } from 'react';
import Loader from "react-js-loader";

class commonLoader extends Component {
    render() {
        return (
            <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                <Loader
                    type="spinner-default"
                    bgColor={"#3244a8"}
                    color={"#3244a8"}
                    size={60}
                />
            </div>
        );
    }
}

export default commonLoader;