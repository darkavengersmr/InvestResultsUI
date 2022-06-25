import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function AppHeader({ name }) {

  const [state, setState] = React.useState({
    left: false,    
  });

  let navigate = useNavigate();

  const navigateToInvestment = () => {
      navigate(`/investments`);
  }

  const navigateToCategories = () => {
    navigate(`/categories`);
  }

  const navigateToProfile = () => {
    navigate(`/profile`);
  }

  const navigateToReports = () => {
    navigate(`/reports`);
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            { name }
          </Typography>
          <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"                
                color="inherit"
                onClick={navigateToProfile}
              >
                <AccountCircle />
              </IconButton>
        </Toolbar>
      </AppBar>
    </Box>

    <SwipeableDrawer
      anchor="left"
      open={state["left"]}
      onClose={toggleDrawer("left", false)}
      onOpen={toggleDrawer("left", true)}
    >
      <Box      
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>        
          <ListItem onClick={navigateToInvestment}>
            <ListItemButton>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Мои инвестиции" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={navigateToCategories}>
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Категории инвестиций" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={navigateToReports}>
            <ListItemButton>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Отчеты" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Ключевая ставка ЦБ" />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Настройки" />
            </ListItemButton>
          </ListItem>        
          <ListItem onClick={navigateToProfile}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Профиль" />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
    </SwipeableDrawer>
    </>
  );
}

export default AppHeader;