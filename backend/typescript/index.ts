/**
 * Aggregate RUM events and handle responses
 */

const { client, v2 } = require("@datadog/datadog-api-client");
const { Configuration, ApiClient } = require('@datadog/datadog-api-client');

const configuration = new client.ClientConfiguration({
  apiKeyAuth: "1a41d33adff650d0eceef0c8fd8dfcbe",
  appKeyAuth: "726b2305a2265c24ffb002c6bce82cad7363ce0d",
});


const apiInstance = new v2.RUMApi(configuration);

const params = {
  body: {
    compute: [
      {
        aggregation: "pc90",
        metric: "@view.time_spent",
        type: "total",
      },
    ],
    filter: {
      from: "now-15m",
      query: "@type:view AND @session.type:user",
      to: "now",
    },
    groupBy: [
      {
        facet: "@view.time_spent",
        limit: 10,
        total: false,
      },
    ],
    options: {
      timezone: "GMT",
    },
    page: {
      limit: 25,
    },
  },
};

apiInstance
  .aggregateRUMEvents(params)
  .then((response: any) => {
    console.log("API called successfully. Returned data:", response.data);
  })
  .catch((error: any) => {
    if (error.response) {
      console.error("Error:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  });
