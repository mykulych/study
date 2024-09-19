import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// auth
import React, { useContext } from 'react';
import { UserContext } from '../../sections/auth/UserContext';

import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';
import { getUserDataFromLocalStorage } from '../../auth/localStorageUtils';


// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user } = useAuthContext();
  const { matchedUser } = useContext(UserContext);
  const theme = useTheme();
  const maxLength = Math.max(matchedUser.results.length, matchedUser.results_two.length, matchedUser.results_three.length);
  const mas = Array.from(
    { length:Math.max(matchedUser.results.length, matchedUser.results_two.length, matchedUser.results_three.length) },
    (_, index) => index + 1
  );
  const users = getUserDataFromLocalStorage();
  const { themeStretch } = useSettingsContext();
  console.log(matchedUser.results);
  console.log(matchedUser);
  const pm11Users = users.filter((user2) => user2.group === 'ПМ-11').length;
  const pm12Users = users.filter((user2) => user2.group === 'ПМ-12').length;
  const pm13Users = users.filter((user2) => user2.group === 'ПМ-13').length;
  const pm14Users = users.filter((user2) => user2.group === 'ПМ-14').length;
  const pmUsers = (users.length-(pm11Users+pm12Users+pm13Users+pm14Users));

  console.log(pm11Users);
  return (
    <>
      <Helmet>
        <title> General: App | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome
              title={`Раді бачити знову! \n ${matchedUser.firstName}`}
              description="Перевірь свої знання."
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Тест 1"
              total="Рівень: легкий"
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Тест 2"
              total="Рівень: середній"
              chart={{
                colors: [theme.palette.info.main],
                series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Тест 3"
              total="Рівень: складний"
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="Користувачі"
              chart={{
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                  theme.palette.secondary.main,
                ],
                series: [
                  { label: 'ПМ-11', value: pm11Users },
                  { label: 'ПМ-12', value: pm12Users },
                  { label: 'Пм-13', value: pm13Users },
                  { label: 'ПМ-14', value: pm14Users },
                  { label: 'Інші', value: pmUsers },
                ],
              }}
            />
          </Grid>
{matchedUser.role==='admin' ? (
 
          <Grid item xs={12} md={6} lg={8}>
                     <AppAreaInstalled
                      title="Результати тестувань"
                      chart={{
                        categories: Array.from(
                          { length: Math.max(
                              ...users.map((user1) => Math.max(user1.results.length, user1.results_two.length, user1.results_three.length))
                            ) },
                          (_, index) => index + 1
                        ),
                        series: users.map((user1) => ({
                          year: user1.firstName,
                          data: [
                            { name: 'Легкий рівень', data: user1.results },
                            { name: 'Середній рівень', data: user1.results_two },
                            { name: 'Складний рівень', data: user1.results_three },
                          ],
                        })),
                      }}
                    />

          </Grid>
          )
:
          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="Результати тестувань"
              chart={{
                categories: Array.from(
                  { length:Math.max(matchedUser.results.length, matchedUser.results_two.length, matchedUser.results_three.length) },
                  (_, index) => index + 1
                ),
                series: [
                  {
                    year: matchedUser.firstName,
                    data: [
                      { name: 'Легкий рівень', data: matchedUser.results},
                      { name: 'Середній рівень', data: matchedUser.results_two },
                      { name: 'Складний рівень', data: matchedUser.results_three },
                    ],
                  },
                  
                ],
              }}
            />
          </Grid>}

         
        </Grid>
      </Container>
    </>
  );
}
