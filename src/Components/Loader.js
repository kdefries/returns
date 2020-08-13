import React from 'react';

const Loader = props => {
  return (
    <div className="ui medium indeterminate text active inverted loader">
      {props.message}
    </div>
  );
};

Loader.defaultProps = {
  message: 'Loading...'
};

export default Loader;
