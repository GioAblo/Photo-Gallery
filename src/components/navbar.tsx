import { NavLink } from "react-router-dom";
import "../App.css"

function Navbar() {
  return (
    <div className='navbar flex justify-center gap-6 py-2 mb-2 lg:py-4 lg:mb-4 lg:gap-10' style={{boxShadow: "0px 8px 8px 0px rgba(0,0,0,0.2)"}}>
      <NavLink className="lg:text-xl" activeClassName="active" exact to='/'>Home</NavLink>
      <NavLink className="lg:text-xl" activeClassName="active" exact to='/history'>History</NavLink>
    </div>
  )
}

export default Navbar;
