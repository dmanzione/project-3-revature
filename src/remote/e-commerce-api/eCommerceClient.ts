import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  baseURL: 'http://bizbazaarbizbazaarappeb-backend-env.eba-rzd5q64x.us-east-1.elasticbeanstalk.com/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://bizbazaarbizbazaarappeb-frontend-env.eba-rzd5q64x.us-east-1.elasticbeanstalk.com',
  },
});

export interface eCommerceApiResponse {
  status: number;
  payload: any;
}

export default eCommerceClient;