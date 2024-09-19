import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Button,Box, Card, Typography, Stack } from '@mui/material';
// utils
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../routes/paths';


import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import Chart from '../../../../components/chart';

// import Button from 'src/sections/_examples/extra/animate/other/Button';

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  sx: PropTypes.object,
  chart: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.string,
  percent: PropTypes.number,
};

export default function AppWidgetSummary({ title, percent, total, chart, sx, ...other }) {
  const { colors, series, options } = chart;
  let path;
  console.log(title);
  if (title==='Тест 1')
    path = PATH_DASHBOARD.blog.posts;
  else if (title === 'Тест 2')
    path = PATH_DASHBOARD.blog.posts2;
  else     path = PATH_DASHBOARD.blog.posts3;

  const chartOptions = {
    colors,
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '68%',
        borderRadius: 2,
      },
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
      marker: { show: false },
    },
    ...options,
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

     

        <Typography variant="h3">{total}</Typography>
        <Button component={RouterLink}
              to={path}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Go</Button>
      </Box>

      <Chart type="bar" series={[{ data: series }]} options={chartOptions} width={60} height={36} />
    </Card>
  );
}

// ----------------------------------------------------------------------

TrendingInfo.propTypes = {
  percent: PropTypes.number,
};

function TrendingInfo({ percent }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
      <Iconify
        icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
        sx={{
          mr: 1,
          p: 0.5,
          width: 24,
          height: 24,
          borderRadius: '50%',
          color: 'success.main',
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
          ...(percent < 0 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
          }),
        }}
      />

      <Typography component="div" variant="subtitle2">
        {percent > 0 && '+'}

        {fPercent(percent)}
      </Typography>
    </Stack>
  );
}
