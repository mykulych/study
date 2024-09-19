import React, { useContext,useState } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_AUTH } from '../../routes/paths';
import { useAuthContext } from '../../auth/useAuthContext';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { getUserDataFromLocalStorage } from '../../auth/localStorageUtils';
import { UserContext } from './UserContext';

export default function AuthLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { matchedUser, setMatchedUser } = useContext(UserContext);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const storedData = getUserDataFromLocalStorage(); // Отримання даних з Local Storage
      console.log(storedData)
      const matchUser = storedData.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (matchUser) {
        await login(data.email, data.password);
        setMatchedUser(matchUser);
        console.log('Успішний вхід');
      } else {
        setError('afterSubmit', {
          type: 'manual',
          message: 'Неправильний email або пароль',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { login } = useAuthContext();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email адреса" />

        <RHFTextField
          name="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
          variant="body2"
          color="inherit"
          underline="always"
        >
          Забув пароль?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Увійти
      </LoadingButton>
    </FormProvider>
  );
}
