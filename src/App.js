import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginLayout, DefaultLayout } from './Layout';
import Loading from './_components/Loading';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={Loading}>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return (
                                <Redirect to="/prelogin/login" />
                            )
                        }}
                    />
                    <Route path="/prelogin/login" component={LoginLayout} />
                    <Route path="/postlogin" component={DefaultLayout} />
                   
                    

                    <ToastContainer enableMultiContainer containerId={'TOP_RIGHT'} position={toast.POSITION.TOP_RIGHT} />
                </Suspense>
            </BrowserRouter>
        );
    }
}

export default App;