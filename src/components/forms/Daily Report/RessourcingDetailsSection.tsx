import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  Grid,
  Divider,
  FormControlLabel,
  Switch,
  FormControl,
  FormLabel,
  RadioGroup,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Checkbox,
  TableFooter,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import OrangeRadioButton from '../../atoms/OrangeRadioButton';

// Prime Contractor
// Contractors on Site
// head count
// visitors
// reason
// Equipment
// quantity
// notes
// Site Activities
// Type
//

const RessourcingDetailsSection = props => {
  const { handleFormInputChange, contractors, disabled } = props;

  return (
    <Grid container spacing={2} justify="space-between">
      <Grid item xs={12}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Contractor</TableCell>
                <TableCell>Head Count</TableCell>
                <TableCell>Is Prime</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {contractors?.map((contractor, index) => {
                const { name, count, isPrime } = contractor;
                return (
                  <TableRow key={contractor}>
                    <TableCell>
                      <Autocomplete
                        options={['Contractor 1', 'Contractor 2']}
                        value={name}
                        onChange={(evt, value) => {
                          const newContractors = [...contractors];
                          newContractors[index] = {
                            ...contractor,
                            name: value,
                          };
                          handleFormInputChange('contractors', newContractors);
                        }}
                        disabled={disabled}
                        getOptionLabel={option => option}
                        renderInput={params => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled={disabled}
                        fullWidth
                        type="number"
                        min
                        variant="outlined"
                        value={count}
                        onChange={(evt, value) => {
                          const newContractors = [...contractors];
                          newContractors[index] = {
                            ...contractor,
                            count: value,
                          };
                          handleFormInputChange('contractors', newContractors);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <OrangeRadioButton
                        checked={isPrime}
                        onChange={() => {
                          handleFormInputChange(
                            'contractors',
                            contractors.map((value, itemIndex) => {
                              if (itemIndex === index) {
                                return { ...value, isPrime: true };
                              }
                              return { ...value, isPrime: false };
                            })
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {contractors.length > 1 && (
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            onClick={() => {
                              handleFormInputChange(
                                'contractors',
                                contractors.filter(
                                  (value, itemIndex) => itemIndex !== index
                                )
                              );
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <Tooltip title="Add" arrow>
                    <IconButton
                      onClick={() => {
                        handleFormInputChange('contractors', [
                          ...contractors,
                          {
                            name: '',
                            count: 0,
                            isPrime: false,
                          },
                        ]);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6} md={6}></Grid>
    </Grid>
  );
};

RessourcingDetailsSection.defaultProps = {
  disabled: false,
};

RessourcingDetailsSection.propTypes = {
  handleFormInputChange: PropTypes.func.isRequired,
  contractors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
      isPrime: PropTypes.bool,
    })
  ).isRequired,
  visitors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      reason: PropTypes.string,
    })
  ).isRequired,
  equipment: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
      notes: PropTypes.string,
    })
  ).isRequired,
  disabled: PropTypes.bool,
};
export default RessourcingDetailsSection;
