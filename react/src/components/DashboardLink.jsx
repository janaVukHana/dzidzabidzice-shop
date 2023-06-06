import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

export default function DashboardLink() {
  
  const {token, user, setUser, setToken, setNotification} = useStateContext()
 
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (e) => {
    handleCloseUserMenu()
    
    e.preventDefault()

    axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
            setNotification('Izlogovan si.')
        })
  }

  return (
    <div className='DashboardLink'>

      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/hero.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >

          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center"><NavLink to={`/profil`}>Profil</NavLink></Typography>
          </MenuItem>
          {user.role === 'admin' && 
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center"><NavLink to={`/poruke`}>Poruke</NavLink></Typography>
              </MenuItem>
          }
          {user.role === 'admin' && 
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center"><NavLink to={`/ponuda`}>Ponuda</NavLink></Typography>
            </MenuItem>
          }
          {user.role === 'admin' && 
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center"><NavLink to={`/slicice`}>Sličice</NavLink></Typography>
            </MenuItem>
          }
          {user.role === 'admin' && 
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center"><NavLink to={`/porudzbine`}>Porudžbine</NavLink></Typography>
            </MenuItem>
          }
          <MenuItem onClick={handleLogout}><Typography textAlign="center">Logout</Typography></MenuItem>
      </Menu>
    </div>
  );
}