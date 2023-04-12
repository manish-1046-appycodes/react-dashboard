import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const Help = () => (
  <>
    <Helmet>
      <title>Help | ProspectPug </title>
    </Helmet>

    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Help
      </Typography>
    </Container>
  </>
);

export default Help;
