import { NavLink } from "react-router"
import LogoutButton from "./logoutButton"
import { useAuth } from "../AuthContext"

const Navigation: React.FC = () => {
    const { user } = useAuth()
    return (

        <>
        
        <div className="navigation-wrapper">
        <nav className="main-navigation">
        <ul className="nav-list">
                    <li className="nav-item">
                            <NavLink className='nav-link' to="/" end>Home</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className='nav-link' to="/cart" end>Cart</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className='nav-link' to="/login" end>Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to="/register" end>Register</NavLink>
                        </li> */}
                        </ul>

                         
                        {user ? (
            <li>
              <LogoutButton />
              <li className="nav-item">
                            <NavLink className='nav-link' to="/profile" end>Profile</NavLink>
                        </li>
                        </li>
          ) : (
            <>
              <li>
                <NavLink to={'/login'}>Login</NavLink>
              </li>
              <li>
                <NavLink to={'/register'}>Register</NavLink>
              </li>
            </>
          )}
                        </nav>
                        </div>
                
                
                      

        </>
    )

}   
export default Navigation;