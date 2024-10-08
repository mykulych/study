import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Реєструйся в нашій системі!</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Новий користувач?</Typography>

          <Link component={RouterLink} to={PATH_AUTH.register} variant="subtitle2">
            Створюй акаунт!
          </Link>
        </Stack>

        
      </Stack>

    

      <AuthLoginForm />

      
    </LoginLayout>
  );
}
