import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';



export default function NavBar() {
  
  return (
    <AppBar
      className="AppBar"
      style={{ color: "white" }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Box sx={{ m: 2, display: 'block' }}>
          <NavLink style={{ color: "white" }} to="/tables">Tables</NavLink>
        </Box>
        <Box sx={{ m: 2, display: 'block' }}>
          <NavLink style={{ color: "white" }} to="/orders">Orders</NavLink>
        </Box>
        <Box sx={{ m: 2, display: 'block' }}>
          <NavLink style={{ color: "white" }} to="/menu">Menu</NavLink>
        </Box>
      </Box>
      
    </AppBar>
  );
}