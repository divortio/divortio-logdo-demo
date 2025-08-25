/**
 * Divortio Log Inspector Worker
 *
 * This Worker acts as a client to the main LogDO logger. It fetches log data
 * via an RPC call and uses HTMLRewriter to stream it into an HTML template.
 *
 * It includes a debug mode, activated by the `?debug=true` URL parameter,
 * which uses mock data instead of making a live RPC call.
 */

// --- JSDoc for Typed RPC ---
/** @typedef {import('@cloudflare/workers-types').Fetcher} Fetcher */
/** @typedef {object} LogData */
/** @typedef {object} LoggerService
 * @property {(request: Request) => Promise<LogData>} getLogData
 */
/** @typedef {object} Env
 * @property {Fetcher} ASSETS
 * @property {LoggerService} LOGGER
 */

// --- Mock Data for Debug Mode ---
const dummyLogData = {
    "logId": "0QZ7qAbkL9xZ~_bVn2m",
    "rayId": "8c7b6a5f4d3e2c1a-EWR",
    "fpID": "aBcDeFgHiJkLmNoP",
    "deviceHash": "1234567890abcdef",
    "sessionHash": "fedcba0987654321",
    "tlsHash": "abcdef1234567890",
    "serverId": "EWR-metal-id-123",
    "requestTime": 1724538000123,
    "receivedAt": "2025-08-24T23:40:00.125Z",
    "processedAt": "2025-08-24T23:40:00.128Z",
    "queueTime": 2,
    "processingDurationMs": 3,
    "clientTcpRtt": 50,
    "sessionBin10": 7,
    "sessionBin100": 73,
    "requestUrl": "https://inspector.example.com/?debug=true",
    "requestMethod": "GET",
    "urlDomain": "inspector.example.com",
    "urlPath": "/",
    "urlQuery": "?debug=true",
    "clientIp": "198.51.100.1",
    "clientDeviceType": "desktop",
    "cId": "0QYabcde1234567890",
    "sId": "0QZ12345abcdefghij",
    "eId": "0QZ7qAbkL9xZ~_bVn2m",
    "cfAsn": 13335,
    "cfAsOrganization": "Cloudflare, Inc.",
    "cfColo": "EWR",
    "cfCountry": "US",
    "cfCity": "Newark",
    "cfContinent": "NA",
    "cfHttpProtocol": "HTTP/2",
    "cfLatitude": "40.73570",
    "cfLongitude": "-74.17240",
    "cfPostalCode": "07114",
    "cfRegion": "New Jersey",
    "cfRegionCode": "NJ",
    "cfTimezone": "America/New_York",
    "cfTlsCipher": "AEAD-AES128-GCM-SHA256",
    "cfTlsVersion": "TLSv1.3",
    "geoId": "NA-US-NJ-Newark-07114",
    "threatScore": 5,
    "threatCategory": "Low",
    "ja3Hash": "e7d705a3286e19ea42f587f344ee6865",
    "verifiedBot": false,
    "wafScore": 0,
    "edgeServerIp": "172.64.80.1",
    "edgeServerPort": 443,
    "clientPort": 54321,
    "zoneName": "example.com",
    "requestBody": null,
    "requestMimeType": null,
    "headerBytes": 256,
    "bodyBytes": 0,
    "bodyTruncated": false,
    "requestHeaders": JSON.stringify({"accept": "*/*", "user-agent": "Mozilla/5.0...", "debug": "true"}),
    "clientCookies": JSON.stringify({"_ss_cID": "0QYabcde1234567890"})
};

export default {
    /**
     * @param {Request} request
     * @param {Env} env
     * @param {ExecutionContext} ctx
     * @returns {Promise<Response>}
     */
    async fetch(request, env, ctx) {
        try {
            const url = new URL(request.url);
            const isDebug = url.searchParams.get('debug') === 'true';

            // 1. Get log data: either from the mock object or a live RPC call.
            const logData = isDebug
                ? dummyLogData
                : await env.LOGGER.getLogData(request);

            // The data needs to be passed to the rewriter as a string.
            const logJsonString = JSON.stringify(logData);

            // 2. Fetch our HTML template from the static assets.
            const templateUrl = new URL(request.url).origin + '/index.html';
            const templateResponse = await env.ASSETS.fetch(new Request(templateUrl));

            if (!templateResponse.ok) {
                return new Response("HTML template not found.", {status: 500});
            }

            // 3. Use HTMLRewriter to stream the response and inject the log data.
            return new HTMLRewriter()
                .on('script#log-data-script', {
                    element(element) {
                        // Inject the log data directly into the script tag.
                        element.setInnerContent(`const logData = ${logJsonString};`);
                    },
                })
                .transform(templateResponse);

        } catch (error) {
            console.error("Log Inspector Error:", error);
            const errorMessage = `Failed to process request: ${error.message}\n\nStack:\n${error.stack}`;
            return new Response(errorMessage, {
                status: 500,
                headers: {'Content-Type': 'text/plain'},
            });
        }
    },
};
