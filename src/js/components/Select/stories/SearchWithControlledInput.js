import React, { useState } from 'react';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const defaultOptions = ['one', 'two', 'three'];

export const SearchWithControlledInput = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('two');

  return (
    <Grommet full theme={grommet}>
      <Box pad="large" gap="medium" direction="row">
        <Select
          size="medium"
          placeholder="Select single option"
          value={value}
          searchValue={searchValue}
          options={options}
          onChange={({ option }) => setValue(option)}
          onClose={() => setOptions(defaultOptions)}
          onSearch={text => {
            setSearchValue(text);
            setOptions(defaultOptions.filter(option => text === option));
          }}
        />
      </Box>
    </Grommet>
  );
};

SearchWithControlledInput.story = {
  parameters: {
    chromatic: { disable: true },
  },
};