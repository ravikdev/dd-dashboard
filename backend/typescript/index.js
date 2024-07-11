/**
 * Aggregate RUM events and handle responses
 */
var _a = require("@datadog/datadog-api-client"), client = _a.client, v2 = _a.v2;
var _b = require('@datadog/datadog-api-client'), Configuration = _b.Configuration, ApiClient = _b.ApiClient;
var configuration = new client.ClientConfiguration({
    apiKeyAuth: "1a41d33adff650d0eceef0c8fd8dfcbe",
    appKeyAuth: "726b2305a2265c24ffb002c6bce82cad7363ce0d",
});
var apiInstance = new v2.RUMApi(configuration);
var params = {
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
    .then(function (response) {
    console.log("API called successfully. Returned data:", response.data);
})
    .catch(function (error) {
    if (error.response) {
        console.error("Error:", error.response.data);
    }
    else {
        console.error("Error:", error.message);
    }
});
