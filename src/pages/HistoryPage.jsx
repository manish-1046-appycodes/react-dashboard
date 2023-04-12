// react
import { useEffect } from 'react';
// packages
import { FiSearch } from 'react-icons/fi';
import { BiDollar, BiError } from 'react-icons/bi';
import { MdPlace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
// material
import { Card, CardContent, CircularProgress, Container, Grid, Typography } from '@mui/material';
// redux
import {
  getUserHistory,
  selectUserHistoryData,
  selectUserHistoryError,
  selectUserHistoryStatus,
} from '../redux/history/historySlice';
// components
import AppWidgetSummary from '../sections/@dashboard/app/AppWidgetSummary';
import UserHistoryRecord from '../components/user-history/UserHistoryRecord';

const History = () => {
  const dispatch = useDispatch();
  const userHistory = useSelector(selectUserHistoryData);
  const userHistoryError = useSelector(selectUserHistoryError);
  const userHistoryStatus = useSelector(selectUserHistoryStatus);

  useEffect(() => {
    // if (userHistory.length < 1) {
    dispatch(getUserHistory());
    // }
  }, []);

  let content;

  if (userHistoryStatus === 'fetching-user-history') {
    content = (
      <Container maxWidth="xl">
        <div style={{ display: 'grid', placeContent: 'center' }}>
          <Card sx={{ marginTop: '30px' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CircularProgress size={60} />
              <Typography variant="h5" sx={{ marginTop: '10px' }}>
                Fetching your search records
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  if (userHistoryStatus === 'fetched-user-history') {
    if (userHistory?.user_requests) {
      content = (
        <Container maxWidth="xl">
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {userHistory?.user_requests && (
              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary
                  title="Total Requests made"
                  total={userHistory?.user_requests?.length}
                  icon={FiSearch}
                />
              </Grid>
            )}

            {userHistory?.user_requests && (
              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary
                  title="Total Places Fetched"
                  total={userHistory?.user_requests?.reduce(
                    (acc, history) => acc + history?.fetched_places_count || 0,
                    0
                  )}
                  color="warning"
                  icon={MdPlace}
                />
              </Grid>
            )}

            {userHistory?.user_requests && (
              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary title="Total Bill" total={1201} color="info" icon={BiDollar} />
              </Grid>
            )}
          </Grid>

          <Typography variant="h4" sx={{ mb: 5 }}>
            Your Search Records
          </Typography>
          {userHistory?.user_requests?.map((history) => (
            <UserHistoryRecord history={history} key={history?.request_id} />
          ))}
        </Container>
      );
    } else {
      content = (
        <Container maxWidth="xl">
          <AppWidgetSummary title="No records found" color="error" icon={BiError} />
        </Container>
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>History | ProspectPug </title>
      </Helmet>

      {content}
    </>
  );
};

export default History;
