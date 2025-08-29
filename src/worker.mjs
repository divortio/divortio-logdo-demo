/**
 * @fileoverview This Worker acts as a client to the main LogDO logger. It fetches log data
 * via an RPC call and uses HTMLRewriter to stream it into an HTML template.
 * @version 1.0.0
 */

/**
 * @typedef {import('@cloudflare/workers-types').Fetcher} Fetcher
 * @typedef {object} LogData A structured object containing all extracted and derived data points for a request.
 */

/**
 * @typedef {object} LoggerService
 * @property {function(Request): Promise<LogData>} getLogData A function that retrieves the compiled log data.
 */

/**
 * @typedef {object} Env The environment bindings for the Worker.
 * @property {Fetcher} ASSETS The binding for the static assets.
 * @property {LoggerService} LOGGER The service binding for the logger Worker.
 */

export default {
    /**
     * Handles incoming HTTP requests.
     * @param {Request} request The incoming request.
     * @param {Env} env The environment bindings for the Worker.
     * @param {import('@cloudflare/workers-types').ExecutionContext} ctx The execution context of the request.
     * @returns {Promise<Response>} A promise that resolves with the response.
     */
    async fetch(request, env, ctx) {
        try {
            // 1. Get log data via a live RPC call.
            const logData = await env.LOGGER.getLogData(request);

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
                    /**
                     * Injects the log data into the specified script tag.
                     * @param {import('@cloudflare/workers-types').HTMLElement} element The script element to modify.
                     */
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