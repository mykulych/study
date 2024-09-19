import { useState , useContext } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { saveUserDataToLocalStorage } from '../../auth/localStorageUtils';
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
// local storage utils
import { UserContext } from './UserContext';


// ----------------------------------------------------------------------

export default function AuthRegisterForm() {
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      if (register) {
        // Перевірка ролі користувача
        const role = data.email === 'admin@gmail.com' ? 'admin' : 'user';
        const results = [];
        const results_two = [];
        const results_three = [];
        const country = '';
        const city = '';
        const group = '';
        const phone = '';
        const address = '';
        const about = '';
        const show_1=true;
        const show_2=true;
        const show_3=true;
        const show_4=true;
        const show_5=true;

        // Виклик функції реєстрації з встановленою роллю
        // await register(data.email, data.password, data.firstName, data.lastName, role,country,city,group,phone,address,about, results,results_two,results_three,show_1,show_2,show_3,show_4,show_5);
  
        const userData = { ...data, role,country,city,group,phone,address,about,results ,results_two,results_three,show_1,show_2,show_3,show_4,show_5}; // Дані користувача
        setMatchedUser(userData);

        saveUserDataToLocalStorage(userData); // Зберегти дані користувача в Local Storage
        console.log(userData);
        dispatch({
          type: "REGISTER",
          payload: {
            user: userData,
          }
        })
      }
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };
  const { matchedUser, setMatchedUser } = useContext(UserContext);

  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Ім\'я обов\'язкове поле'),
    lastName: Yup.string().required('Прізвище обов\'язкове поле'),
    email: Yup.string().required('Електронна пошта обов\'язкова').email('Електронна пошта повинна бути дійсною'),
    password: Yup.string().required('Пароль обов\'язковий'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="Ім'я" />
          <RHFTextField name="lastName" label="Прізвище" />
        </Stack>

        <RHFTextField name="email" label="Електронна пошта" />

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

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isSubmitSuccessful}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Створити обліковий запис
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
