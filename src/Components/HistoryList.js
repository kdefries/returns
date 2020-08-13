import React from 'react';
import ListElement from './ListElement';
import './HistoryList.css';

const HistoryList = props => {
  const currentList = props.currentList.map(element => {
    return <ListElement key={element.year} element={element} />;
  });

  return (
    <div className="history-list">
      <table className="ui selectable inverted table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Return</th>
            <th className="right aligned">Cumulative Returns</th>
          </tr>
        </thead>
        <tbody>{currentList}</tbody>
      </table>
    </div>
  );
};

export default HistoryList;
