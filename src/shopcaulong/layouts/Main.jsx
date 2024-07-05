import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './header/Header'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton/ScrollToTopButton';

export default function Main() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ScrollToTopButton />
        </>

    )
}
