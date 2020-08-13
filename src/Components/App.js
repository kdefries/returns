import React from 'react';
import HistoryList from './HistoryList';
import Loader from './Loader';
import RangeSlider from './Slider';

class App extends React.Component {
  state = { returns: [], yearsSelected: [], currentTable: [] };

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
        this.setState({
          yearsSelected: [
            this.state.returns[0].year,
            this.state.returns[this.state.returns.length - 1].year
          ]
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
    this.setState({
      returns: temp
    });
  }

  onSlide() {}

  renderContent() {
    return this.state.returns === undefined ||
      this.state.returns.length === 0 ? (
      <Loader message="Fetching S&P 500 Data" />
    ) : (
      <HistoryList returns={this.state.returns} />
    );
  }

  renderSlider() {
    return this.state.returns === undefined ||
      this.state.returns.length === 0 ? (
      <div
        className="ui inverted raised segment"
        style={{ minHeight: '100px', backgroundColor: '#2B2B2B' }}
      ></div>
    ) : (
      <div
        className="ui inverted raised segment"
        style={{ minHeight: '100px', backgroundColor: '#2B2B2B' }}
      >
        <RangeSlider
          returns={this.state.returns}
          yearsSelected={this.state.yearsSelected}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '50px' }}>
        <div className="ui centered two column grid">
          <div className="eight wide column">
            <div
              className="ui inverted raised segment"
              style={{ minHeight: '700px', backgroundColor: '#2B2B2B' }}
            >
              {this.renderContent()}
            </div>
          </div>
          <div className="eight wide column">
            {this.renderSlider()}
            <div
              className="ui inverted raised segment"
              style={{ minHeight: '586px', backgroundColor: '#2B2B2B' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
