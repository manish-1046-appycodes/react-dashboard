import { createElement, forwardRef, React } from 'react';
import PropTypes from 'prop-types';
// icons
import { IconBase } from 'react-icons';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const ReactIcon = forwardRef(({ icon, size = 20, sx, ...other }, ref) => (
  <Box ref={ref} component={IconBase} size={size} {...other}>
    {createElement(icon, { size })}
  </Box>
));

ReactIcon.propTypes = {
  sx: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.elementType.isRequired,
};

export default ReactIcon;
