import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const TasksPage = () => (
  <>
    <Helmet>
      <title>Tasks | ProspectPug </title>
    </Helmet>

    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Your Tasks
      </Typography>
    </Container>
  </>
);

export default TasksPage;
