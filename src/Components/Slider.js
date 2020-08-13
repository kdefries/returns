import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 400
  }
});

function valuetext(value) {
  return `${value}°C`;
}

const RangeSlider = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState([1926, 2019]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography
        id="range-slider"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        Slider
      </Typography>
      <Slider
        value={value}
        defaultValue={props.yearsSelected}
        min={props.yearsSelected[0]}
        max={props.yearsSelected[1]}
        onChange={handleChange}
        aria-labelledby="range-slider"
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        style={{ alignContent: 'center' }}
      />
    </div>
  );
};

export default RangeSlider;
