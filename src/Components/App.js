import React from 'react';
import HistoryList from './HistoryList';
import Loader from './Loader';
import RangeSlider from './Slider';

class App extends React.Component {
  state = { returns: [], yearsSelected: [], currentList: [] };

  componentDidMount() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://www.slickcharts.com/sp500/returns/history.json';
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(contents => {
        this.setState({
          returns: contents.reverse()
        });
        this.setState({
          yearsSelected: [
            this.state.returns[0].year,
            this.state.returns[this.state.returns.length - 1].year
          ]
        });
        this.cumulativeReturns(this.state.returns);
      });
  }

  cumulativeReturns(array) {
    const temp = [];

    for (let i = 0; i < array.length; i++) {
      if (i === 0) {
        temp[i] = {
          year: array[i].year,
          totalReturn: array[i].totalReturn,
          cumulativeReturn: parseFloat(array[i].totalReturn).toFixed(2)
        };
      } else {
        temp[i] = {
          year: array[i].year,
          totalReturn: array[i].totalReturn,
          cumulativeReturn: (
            parseFloat(array[i].totalReturn) +
            parseFloat(temp[i - 1].cumulativeReturn)
          ).toFixed(2)
        };
      }
    }
    this.setState({
      currentList: temp
    });
  }

  onSlide = updateYears => {
    this.setState({
      currentList: this.state.returns.slice(
        this.state.returns.findIndex(i => i.year === updateYears[0]),
        this.state.returns.findIndex(i => i.year === updateYears[1]) + 1
      )
    });
    this.cumulativeReturns(this.state.currentList);
  };

  renderContent() {
    return this.state.returns === undefined ||
      this.state.returns.length === 0 ? (
      <div
        className="ui inverted raised segment"
        style={{ minHeight: '600px', backgroundColor: '#212121' }}
      >
        <Loader message="Fetching S&P 500 Data" />
      </div>
    ) : (
      <HistoryList currentList={this.state.currentList} />
    );
  }

  renderSlider() {
    return this.state.returns === undefined ||
      this.state.returns.length === 0 ? (
      <div></div>
    ) : (
      <RangeSlider
        returns={this.state.returns}
        yearsSelected={this.state.yearsSelected}
        onSlide={this.onSlide}
      />
    );
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '20px' }}>
        <h2
          className="ui center aligned inverted block header"
          style={{ backgroundColor: '#212121', borderColor: '#212121' }}
        >
          <i className="chart line icon"></i>
          <div className="content">
            S&P 500 Total Returns
            <div className="sub header">
              The total returns of the S&P 500 index are listed by year. Total
              returns include two components: the return generated by dividends
              and the return generated by price changes in the index. While most
              individuals focus only on the price returns of the index,
              dividends play an important factor in overall investment returns.
            </div>
          </div>
        </h2>
        <div className="ui centered two column grid">
          <div className="eight wide column">{this.renderContent()}</div>
          <div className="eight wide column">
            <div
              className="ui inverted raised segment"
              style={{ minHeight: '100px', backgroundColor: '#212121' }}
            >
              {this.renderSlider()}
            </div>
            <div
              className="ui inverted raised segment"
              style={{ minHeight: '486px', backgroundColor: '#212121' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
