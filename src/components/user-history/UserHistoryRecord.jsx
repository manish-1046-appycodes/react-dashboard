// material
import { Button, Card, CardContent, CardHeader, Chip, Container, Grid, Typography } from '@mui/material';
import { BiTime } from 'react-icons/bi';
import ApexCharts from 'react-apexcharts';
import downloadExcelFile from '../../utils/downloadExcelFile';
import AppWidgetSummary from '../../sections/@dashboard/app/AppWidgetSummary';
import SummaryWidget from '../summary-widget/SummaryWidget';
import { AppConversionRates } from '../../sections/@dashboard/app';
import CircleChart from '../CircleChart';

const UserHistoryRecord = ({ history }) => {
  const {
    request_id: requestId,
    query,
    status,
    requested_places_count: requestedPlacesCount,
    fetched_places_count: fetchedPlacesCount,
    request_time: requestTime,
    response_time: responseTime,
  } = history;

  const formatMilliseconds = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    const formattedTime = [];
    if (days > 0) formattedTime.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) formattedTime.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) formattedTime.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds > 0) formattedTime.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

    if (formattedTime.length === 0) {
      return '0 second';
    }

    return formattedTime.join(' ');
  };

  const processingTime = () => {
    const RequestTime = new Date(requestTime);
    const ResponseTime = new Date(responseTime);

    const timeDiff = ResponseTime - RequestTime; // difference in milliseconds
    // return timeDiff;

    return formatMilliseconds(timeDiff);
  };

  const chartData = {
    series: [requestedPlacesCount / 360, fetchedPlacesCount / 360],
    options: {
      chart: {
        // height: 390,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: true,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ['#1ab7ea', '#0084ff'],
      //   colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      labels: ['Requested', 'Fetched'],
      legend: {
        show: true,
        floating: true,
        fontSize: '16px',
        position: 'bottom',
        offsetX: 0,
        offsetY: 0,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 300,
        },
        formatter: (seriesName, opts) => `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`,
        itemMargin: {
          vertical: 3,
        },
      },
      //   responsive: [
      //     {
      //         breakpoint: 480,
      //       options: {
      //         legend: {
      //           show: true,
      //         },
      //       },
      //     },
      //   ],
    },
  };

  return (
    <Card title={query} key={requestId} sx={{ mb: 2 }}>
      <CardHeader title={query} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppConversionRates
              title="Places Count"
              chartData={[
                { label: 'Requested', value: requestedPlacesCount },
                { label: 'Fetched', value: fetchedPlacesCount },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SummaryWidget title="Processing Time" total={processingTime()} color="info" icon={BiTime} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div style={{ display: 'grid', placeContent: 'center', height: '100%' }}>
              <Button variant="contained" onClick={() => downloadExcelFile(requestId, query)}>
                Download Excel File
              </Button>
              {/* <Chip sx={{ color: 'white' }} label={status} color="success" variant="filled" /> */}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserHistoryRecord;
