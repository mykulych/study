import * as Yup from 'yup';
import { useCallback , useContext} from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
import { fData } from '../../../../utils/formatNumber';
// assets
import { countries } from '../../../../assets/data';
// components
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFSelect,
  RHFUploadAvatar,
  RHFTextFieldEdit,
} from '../../../../components/hook-form';
import { UserContext } from '../../../auth/UserContext';
import { getUserDataFromLocalStorage } from '../../../../auth/localStorageUtils';


// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  // const { user } = useAuthContext();

  const { matchedUser } = useContext(UserContext);


  // const UpdateUserSchema = Yup.object().shape({
  //   displayName: Yup.string().required('Name is required'),
  //   email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  //   photoURL: Yup.mixed().required('Avatar is required'),
  //   phoneNumber: Yup.string().required('Phone number is required'),
  //   country: Yup.string().required('Country is required'),
  //   address: Yup.string().required('Address is required'),
  //   state: Yup.string().required('State is required'),
  //   city: Yup.string().required('City is required'),
  //   zipCode: Yup.string().required('Zip code is required'),
  //   about: Yup.string().required('About is required'),
  // });

  const defaultValues = {
    displayName: matchedUser.firstName || '',
    email: matchedUser.email || '',
    displayLastName: matchedUser.lastName  || null,
    phone: matchedUser.phone || '',
    country: matchedUser.country || 'Україна',
    address: matchedUser.address || '',
    group: matchedUser.group || '',
    city: matchedUser.city || '',
    about: matchedUser.about || '',
    
  };

  const methods = useForm({
    // resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Зміни збережені!');
      console.log('DATA', data);
      const users = getUserDataFromLocalStorage();

      const updatedUsers = users.map((user) => {
        if (
          user.email === matchedUser.email &&
          user.password === matchedUser.password
        ) {
          user.firstName = data.displayName;
          user.lastName = data.displayLastName;
          user.email = data.email;
          user.phone = data.phone;
          user.address = data.address;
          user.city = data.city;
          user.country = data.country;
          user.group = data.group;
          user.about = data.about;

        }
        return user;
      });
      localStorage.setItem('usersData', JSON.stringify(updatedUsers));
      console.log(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoURL', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
       
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
               <RHFTextFieldEdit name="displayName" label="Ім'я"  />
     

              <RHFTextFieldEdit name='displayLastName' label="Прізвище"  />
              <RHFTextFieldEdit name='email' label="Email" />

              <RHFTextFieldEdit name='phone' label="Номер телефону" />

              <RHFTextFieldEdit name='address' label="Адреса" />

              <RHFSelect native name='country' label="Країна" placeholder="Країна" >
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>

              

              <RHFTextFieldEdit name='city' label="Місто" />

              <RHFTextFieldEdit name='group' label="Група" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextFieldEdit name='about' multiline rows={4} label="Про себе" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Зберегти зміни
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
