import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    color: '#BB86FC'
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

  const updateYears = (event, value) => {
    props.onSlide(value);
  };

  return (
    <div>
      <h4 className="ui center aligned inverted header">YEAR RANGE</h4>
      <div className="ui three column grid">
        <div className="center aligned row">
          <div className="two wide center aligned column">{value[0]}</div>
          <div className="center aligned twelve wide column">
            <Slider
              className={classes.root}
              value={value}
              step={1}
              defaultValue={props.yearsSelected}
              min={props.yearsSelected[0]}
              max={props.yearsSelected[1]}
              onChange={handleChange}
              onChangeCommitted={updateYears}
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
          <div className="two wide center aligned column">{value[1]}</div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
