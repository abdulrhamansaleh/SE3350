import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faCalendarAlt, 
  faDonate, 
  faEnvelope, 
  faImages, 
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import './MobileNavBar.css';
const MobileNavBar = () => {
    const [collapsed, setCollapsed] = useState(false);
  
    const toggleSidebar = () => {
      setCollapsed(!collapsed);
    };
  
    return (
      <div>
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
        <Sidebar collapsed={collapsed}>
          <Menu iconShape="square">
            <MenuItem icon={<FontAwesomeIcon icon={faHome} />}>
              <NavLink to="/cheer/home">CHEER</NavLink>
            </MenuItem>
            {/* Add other menu items similar to above */}
          </Menu>
        </Sidebar>
      </div>
    );
  };
  
  export default MobileNavBar;