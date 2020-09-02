import React from 'react';
import { Radio } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';

const OrangeRadio = withStyles({
  root: {
    color: orange[400],
    '&$checked': {
      color: orange[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

export default OrangeRadio;
