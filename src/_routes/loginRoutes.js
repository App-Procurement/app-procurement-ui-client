import React from 'react';

const Login = React.lazy(() => import('../PreLogin/Login'));

const loginRoutes = [
    { path: '/prelogin/login', exact: true, name: 'Login', component: Login },
];

export default loginRoutes;