import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import AuthService2 from '../Services/AuthService2';
import {AuthContext} from '../Context/AuthContext';

const Navbar = (props) => {
    const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);
    const authContext = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(() => {
            authContext.setIsAuthenticated(false);
        })
    }

    const onClickLogoutHandler2 = () => {
        AuthService2.logout().then(() => {
            authContext.setIsAuthenticated(false);
        })
    }

    const adminLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                </li>
                <button type="button" className="btn btn-link nav-item nav-link" 
                    onClick={onClickLogoutHandler2}>Logout</button>
            </>
        )
    }

    const managerLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/manager">Manager</Link>
                </li>
                <button type="button" className="btn btn-link nav-item nav-link" 
                    onClick={onClickLogoutHandler2}>Logout</button>
            </>
        )
    }

    const patientLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/pages/medical-information">Medical Information</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/pages/health-wellness-program">Health & Wellness Program</Link>
                </li>
                <button type="button" className="btn btn-link nav-item nav-link " 
                          onClick={onClickLogoutHandler2}>Logout</button>
            </>
        )
    }

    const nurseLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/nurse">Nurse</Link>
                </li>
                <button type="button" className="btn btn-link nav-item nav-link " 
                          onClick={onClickLogoutHandler}>Logout</button>
            </>
        )
    }
    const doctorLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/doctor">Doctor</Link>
                </li>
                <button type="button" className="btn btn-link nav-item nav-link " 
                          onClick={onClickLogoutHandler}>Logout</button>
            </>
        )
    }

    const loadLinks = role => {
        if(role === 'admin') return adminLinks();
        if(role === 'manager') return managerLinks();
        if(role === 'patient') return patientLinks();
        if(role === 'doctor') return doctorLinks();
        if(role === 'nurse') return nurseLinks();
    }

    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <Link className="navbar-brand" to="#!">TIP Clinic</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon" />
                </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav justify-content-center">
                    {loadLinks(user.role)}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
