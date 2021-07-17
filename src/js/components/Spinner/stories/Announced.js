import React, { useState } from 'react';
import { grommet } from 'grommet/themes';

import { Box, Button, Grommet, Paragraph, Spinner } from 'grommet';

const PageContent = () => {
  // 'show=true' will trigger the announcement
  const [show, setShow] = useState(false);
  return (
    <Box align="center" gap="small">
      <Paragraph textAlign="center">
        Spinner has a built in Screen Reader functionality to assist screen
        readers. An announcement of the given message prop will be announced to
        screen readers after the spinner component renders.
      </Paragraph>
      <Button
        label="Load"
        onClick={() => {
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 1500);
        }}
      />
      {show && <Spinner message="Start Built-in Spinner Announcement" />}
    </Box>
  );
};

export const Announced = () => (
  <Grommet theme={grommet} full>
    <Box align="center" pad="large">
      <PageContent />
    </Box>
  </Grommet>
);

Announced.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Spinner/Announced',
};
