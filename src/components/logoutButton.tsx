import { useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';


const LogoutButton = () => {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();
   
    const logoutHandler = () => {
        // localStorage.removeItem('token')
        logoutUser();
        navigate('/login');
    }
    
    return (
        <button onClick={logoutHandler}>Logout</button>
    )
};

export default LogoutButton;