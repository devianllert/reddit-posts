import React, { ReactElement } from 'react';
import { Container, Box } from '@material-ui/core';

import Bookmarks from '../../components/Bookmarks';

const App = (): ReactElement => (
  <Container>
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Bookmarks />
    </Box>
  </Container>
);

export default App;
