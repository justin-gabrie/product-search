import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Header.css'

export default function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="logo" height="32px" />
                <p>Genzy</p>
            </div>
            <div className="nav-bar">
                <NavLink to="/electronics" className="nav-items">
                    ELECTRONICS
                </NavLink>
                <NavLink to="/grocery" className="nav-items">
                    GROCERY
                </NavLink>
            </div>
        </div>
    )
}
