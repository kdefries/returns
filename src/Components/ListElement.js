import React from 'react';
import './ListElement.css';

class ListElement extends React.Component {
  render() {
    const { year, totalReturn, cumulativeReturn } = this.props.element;
    const arrow = Math.sign(totalReturn) === 1 ? 'arrow up' : 'arrow down';
    return (
      <tr>
        <td>{year}</td>
        <td>{totalReturn}</td>
        <td
          className={`right aligned cumulative-return ${arrow
            .split(' ')
            .join('')}`}
        >
          {cumulativeReturn} <i className={`${arrow} icon`} />
        </td>
      </tr>
    );
  }
}

export default ListElement;
