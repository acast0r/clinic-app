import React, {useState, useEffect, useContext} from 'react';
import '../assets/css/customStyle.css'
import AuthService from '../Services/AuthService';
import AuthService2 from '../Services/AuthService2';
import Message from '../components/Message';
import {AuthContext} from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import telusLogo from '../assets/images/telus-logo.png';
import bgLogo from '../assets/images/test.PNG';


const Login = (props) => {
    const [user, setUser] = useState({username: "", password: ""});
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const {user, isAuthenticated, message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/')
            }else {
                setMessage(message);
            }
        })
    }

    const onClickSSO = () => {
        window.location = `http://tip-clinic.ml/user/auth/callback`;
        
    }
    
    useEffect(() => {
        document.body.style.backgroundImage = `url(${bgLogo})`;
        document.body.style.backgroundRepeat =  "no-repeat";
        document.body.style.backgroundAttachment =  "fixed";
        document.body.style.backgroundSize = "cover";

        return () => {
            document.body.style.backgroundImage = null;
            document.body.style.backgroundRepeat =  null;
            document.body.style.backgroundAttachment =  null;
            document.body.style.backgroundSize = null;
        }
    }, []);

    return (
        <div className="login-wrapper">
            <div className="login-form">
                <form onSubmit={onSubmit}>
                    <div className="telus-logo-wrapper">
                        <img src={telusLogo} alt="telus-logo" className="login-telus-logo"/>
                    </div>
                    <h6 className="text-center">Log in to your account</h6>		
                    <div className="text-center social-btn">
                        <Link className="btn btn-dark btn-block" onClick={onClickSSO}><i className="fa fa-sign-in"/> Sign in with <b>OneLogin</b></Link>
                    </div>
                    
                    <div className="or-seperator"><i>or</i></div>
                    <div className="form-group">
                    <div className="input-group">                
                        <div className="input-group-prepend">
                        <span className="input-group-text">
                            <span className="fa fa-user" />
                        </span>                    
                        </div>
                        <input type="text" 
                        name="username" 
                        onChange={onChange} 
                        className="form-control" 
                        placeholder="Username"
                        required/>
                    </div>
                    </div>
                    <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-lock" />
                        </span>                    
                        </div>
                        <input type="password" 
                        name="password" 
                        onChange={onChange} 
                        className="form-control" 
                        placeholder="Password"
                        required/>
                    </div>
                    </div>        
                    <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block login-btn" name="button_1">Sign in</button>
                    </div>
                    <div className="clearfix">
                    </div>  
                </form>
            </div>
       </div>
    )
}

export default Login;
