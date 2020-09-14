import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  card_item: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  card_content: {
    flexGrow: 1,
  },
}));

const PPESection = props => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const {
    handleFormInputChange,
    PPE,
    isItSafeToProceed,
    safeToProceedExplanation,
    disabled,
  } = props;

  return (
    <>
      {!disabled && (
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} md={4}>
            <Card variant="outlined" className={classes.card_item}>
              <CardContent className={classes.card_content}>
                <Typography variant="h6" gutterBottom>
                  Personal Protective Equipment
                </Typography>
                <Typography variant="body2" component="p">
                  Used as last line of protection against hazards. Not sure what
                  you should be wearing? Find out before getting on site.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  href="https://www.ccohs.ca/teach_tools/phys_hazards/ppe.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" className={classes.card_item}>
              <CardContent className={classes.card_content}>
                <Typography variant="h6" gutterBottom>
                  Get Hurt?
                </Typography>
                <Typography variant="body2" component="p">
                  Seek medical attention and submit an incident report to
                  prevent future occurences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" className={classes.card_item}>
              <CardContent className={classes.card_content}>
                <Typography variant="h6" gutterBottom>
                  Fall Protection
                </Typography>
                <Typography variant="body2" component="p">
                  Use of controls designed to protect personnel from falling or
                  in the event they do fall, to stop them without causing severe
                  injury. Be aware of your fall protection plan & procedures.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  href="https://www.ccohs.ca/oshanswers/hsprograms/fall%20protection_general.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Equipment</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PPE?.map((equipment, index) => (
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={equipment.checked}
                    disabled={disabled}
                    onChange={() => {
                      handleFormInputChange(
                        'PPE',
                        PPE.splice(index, 1, {
                          ...equipment,
                          checked: !equipment.checked,
                        })
                      );
                    }}
                  />
                </TableCell>
                <TableCell>{equipment.name}</TableCell>
                <TableCell>{equipment.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FormControlLabel
        control={<Switch color="primary" />}
        label="Is It Safe To Proceed?"
        checked={isItSafeToProceed}
        disabled={disabled}
        onChange={() => {
          handleFormInputChange('isItSafeToProceed', !isItSafeToProceed);
        }}
      />
      {!isItSafeToProceed && (
        <TextField
          label="Explanation"
          fullWidth
          helperText="Explain why it is not safe to proceed"
          variant="outlined"
          multiline
          rows={5}
          disabled={disabled}
          value={safeToProceedExplanation}
          onChange={evt => {
            handleFormInputChange('safeToProceedExplanation', evt.target.value);
          }}
        />
      )}
    </>
  );
};

PPESection.defaultProps = {
  disabled: false,
};

PPESection.propTypes = {
  handleFormInputChange: PropTypes.func.isRequired,
  PPE: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      required: PropTypes.bool,
      checked: PropTypes.bool,
    })
  ).isRequired,
  isItSafeToProceed: PropTypes.bool.isRequired,
  safeToProceedExplanation: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
export default PPESection;
