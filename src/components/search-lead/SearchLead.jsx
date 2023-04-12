import { useEffect, useState } from 'react';
// material
import { Button, Card, CardContent, Typography } from '@mui/material';
// others
import { BASE_URL } from '../../config/variables';
// components
import handleExcelDownload from '../../utils/downloadExcelFile';

const SearchLead = ({ requestId, searchTerm }) => {
  const [isGeneratingFile, setIsGeneratingFile] = useState(true);

  useEffect(() => {
    console.log('SSE : called');
    const evtSource = new EventSource(`${BASE_URL}/api/stream/${requestId}`);
    evtSource.addEventListener('new_message', (event) => {
      setIsGeneratingFile(true);
      console.log('SSE : ', event.data);
      // Logic to handle status updates
      // setMessage((messages) => [...messages, event.data]);
    });

    evtSource.addEventListener('end_event', (event) => {
      // setMessage((messages) => [...messages, event.data]);
      setIsGeneratingFile(false);
      console.log(event);
      //   setStatus(true)
      evtSource.close();
    });

    return () => {
      evtSource.close();
    };
  }, []);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          RequestId: {requestId}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Search Term: {searchTerm}
        </Typography>

        {isGeneratingFile ? (
          <Typography>Please wait while we are processing your request...</Typography>
        ) : (
          <Button variant="contained" onClick={() => handleExcelDownload(requestId, searchTerm)}>
            Download Generated Excel File
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchLead;
