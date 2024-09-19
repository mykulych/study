import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthWithSocial from './AuthWithSocial';
import AuthRegisterForm from './AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout title="Вчи програмування разом з нами!">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Якщо ти вже маєш акаунт? </Typography>

          <Link component={RouterLink} to={PATH_AUTH.login} variant="subtitle2">
            Тисни тут! 
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      

    
    </LoginLayout>
  );
}
