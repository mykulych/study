import { useContext } from 'react';
// @mui

import { Stack, Box } from '@mui/material';
// config
import { NAV } from '../../../config-global';
// utils
import { hideScrollbarX } from '../../../utils/cssStyles';
// components
import Logo from '../../../components/logo';
import { NavSectionMini } from '../../../components/nav-section';
//
import navConfig from './config-navigation';
import NavToggleButton from './NavToggleButton';
import { UserContext } from '../../../sections/auth/UserContext';
// ----------------------------------------------------------------------

export default function NavMini() {
  const {matchedUser} = useContext(UserContext);
  const navConfigWithoutLastItem = navConfig.map(section => ({
    ...section,
    items: section.items.slice(0, section.items.length - 1)
  }));
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />
        {matchedUser.role==='admin'? (<NavSectionMini data={navConfig} />) : (<NavSectionMini data={navConfigWithoutLastItem} />)}
        
      </Stack>
    </Box>
  );
}
