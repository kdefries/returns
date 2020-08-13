import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.slickcharts.com',
  headers: {
    Authorization: 'Client-ID 9y396HLGL0GLxUAbG6ngQpcceQ5D0VxgRCeJvYW0wEs'
  }
});
