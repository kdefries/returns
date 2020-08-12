import axios from 'axios';

const getReturnHistory = async () => {
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://www.slickcharts.com/sp500/returns/history.json';
  await fetch(proxyurl + url)
    .then(response => response.json())
    .then(contents => {
      // this.setState({ returns: contents.reverse() });
      this.setState({
        returns: contents.reverse()
      });
      this.cumulativeReturns();
      console.log(this.state.returns);
    });
};
