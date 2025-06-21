import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AUTH_PATH } from 'constant';

// component: layouts
export default function Container() {

    // state : page path name //
    const { pathname } = useLocation();

    // rendering the component //
    return (
        <>
            <Header />
            <Outlet />
            {pathname !== AUTH_PATH() && <Footer />}
        </>
    );
}

