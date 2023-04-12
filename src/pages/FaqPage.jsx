import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>FAQ | ProspectPug </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          FAQ
        </Typography>
      </Container>
    </>
  );
};

export default FAQ;
