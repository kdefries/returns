import React from 'react';
import HistoryList from './HistoryList';
import Loader from './Loader';
import Slider from './Slider';
import './App';

class App extends React.Component {
  state = { returns: [] };

  componentDidMount() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://www.slickcharts.com/sp500/returns/history.json';
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(contents => {
        // this.setState({ returns: contents.reverse() });
        this.setState({
          returns: contents.reverse()
        });
        this.cumulativeReturns();
        console.log(this.state.returns);
      });
  }

  cumulativeReturns() {
    var temp = [];

    for (let i = 0; i < this.state.returns.length; i++) {
      if (i === 0) {
        temp[i] = {
          year: this.state.returns[i].year,
          totalReturn: this.state.returns[i].totalReturn,
          cumulativeReturn: parseFloat(
            this.state.returns[i].totalReturn
          ).toFixed(2)
        };
      } else {
        temp[i] = {
          year: this.state.returns[i].year,
          totalReturn: this.state.returns[i].totalReturn,
          cumulativeReturn: (
            parseFloat(this.state.returns[i].totalReturn) +
            parseFloat(temp[i - 1].cumulativeReturn)
          ).toFixed(2)
        };
      }
    }
    this.setState({ returns: temp });
  }

  renderContent() {
    if (this.state.returns === undefined || this.state.returns.length === 0) {
      return <Loader message="Fetching S&P 500 Data" />;
    } else
      return (
        <div className="ui centered two column grid">
          <div className="six wide column">
            <div className="ui inverted segment">
              <HistoryList returns={this.state.returns} />
            </div>
          </div>
          <div className="six wide column">
            <div className="ui inverted segment">
              <Slider returns={this.state.returns} />
            </div>
          </div>
        </div>
      );
  }

  render() {
    return (
      <div style={{ backgroundColor: '#262626' }}>{this.renderContent()}</div>
    );
  }
}

export default App;
