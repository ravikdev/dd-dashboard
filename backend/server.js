const axios = require('axios');
require('dotenv').config(); // If using environment variables

const apiUrl = 'https://api.us5.datadoghq.com/api/v2/rum/analytics/aggregate';

// const apiKey = process.env.DD_API_KEY;
// const appKey = process.env.DD_APPLICATION_KEY;

// console.log(apiKey);
// console.log(appKey);

const fetchData = async () => {
  const body = {
    compute: [
      {
        aggregation: 'pc90',
        metric: '@view.time_spent',
        type: 'total',
      },
    ],
    filter: {
      from: 'now-3d',
      query: '@type:view AND @session.type:user',
      to: 'now',
    },
    group_by: [
      {
        facet: '@view.time_spent',
        limit: 10,
        total: false,
      },
    ],
    options: {
      timezone: 'GMT',
    },
    page: {
      limit: 25,
    },
  };

  const headers = {
    'DD-API-KEY':  process.env.DD_API_KEY, // wrap the key in quotes
    'DD-APPLICATION-KEY':  process.env.DD_APPLICATION_KEY, // wrap the key in quotes
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(apiUrl, body, { headers });
    console.log('API called successfully. Returned data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error calling Datadog API:', error);
  }
};

// Call the async function to fetch data
fetchData();
