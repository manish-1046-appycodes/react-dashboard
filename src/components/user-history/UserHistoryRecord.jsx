import { BiTime } from 'react-icons/bi';
import { ImLocation } from 'react-icons/im';
import { IoTimeOutline } from 'react-icons/io5';
// material
import { Button, Card, CardContent, CardHeader, Chip, Container, Grid, Stack, Typography } from '@mui/material';
// functions
import downloadExcelFile from '../../utils/downloadExcelFile';
// components

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

  return (
    <Card title={query} key={requestId} sx={{ mb: 2 }}>
      {/* <CardHeader title={query} /> */}
      <CardContent>
        <Typography variant="h4" textTransform={'capitalize'}>
          {query}
        </Typography>
        <Stack direction={'row'} gap={'20px'} flexWrap={'wrap'}>
          <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
            <ImLocation /> {requestedPlacesCount}/{fetchedPlacesCount} Places Fetched
          </Stack>
          <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
            <BiTime /> {processingTime()}
          </Stack>
          <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
            <Button variant="contained" size="small" onClick={() => downloadExcelFile(requestId, query)}>
              Download File
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserHistoryRecord;
