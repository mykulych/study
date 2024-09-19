import PropTypes from 'prop-types';
import { memo, useContext } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Toolbar } from '@mui/material';
// config
import { HEADER } from '../../../config-global';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import { NavSectionHorizontal } from '../../../components/nav-section';
//
import navConfig from './config-navigation';
import { UserContext } from '../../../sections/auth/UserContext';

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();
  const {matchedUser} = useContext(UserContext);
  const navConfigWithoutLastItem = navConfig.map(section => ({
    ...section,
    items: section.items.slice(0, section.items.length - 1)
  }));
  
  return (
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0,
        top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
      {matchedUser.role==='admin'? (<NavSectionHorizontal data={navConfig} />) : (<NavSectionHorizontal  data={navConfigWithoutLastItem} />)}
      </Toolbar>

      <Shadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);

// ----------------------------------------------------------------------

Shadow.propTypes = {
  sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
