import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const LandingPage=()=> {
    return (
        <>
            <Navbar/>
            <div className='container-fluid'>
            <div className='row'>
                <Sidebar/>
                <Outlet/>
            </div>
            </div>
        </>
    )
}
export default LandingPage