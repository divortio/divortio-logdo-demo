# Divortio LogDO Demo & Inspector

This project provides a front-end demonstration and inspection tool for the data collected
by **[Divortio LogDO](https://github.com/divortio/divortio-logdo)**, a high-performance, zero-latency logging service
for Cloudflare Workers.

This demo application fetches a log entry from a deployed `divortio-log-do` service via an RPC call and renders all 50+
data points in a clean, scannable, three-column layout. It serves as both a showcase of the rich data captured and a
practical tool for inspecting individual log entries.

---

## 🚀 Features

* **Live Log Inspection**: Acts as a client to a deployed `divortio-log-do` service to display real log data.
* **Offline Debug Mode**: Includes a complete set of embedded dummy data, activated with a `?debug=true` URL parameter,
  for local testing and UI development without a live backend.
* **Comprehensive Data Display**: Renders every field from the `divortio-log-do` schema, including enriched security
  signals, identity tracking, and detailed connection information.
* **Concise & Scannable UI**: Presents complex log data in a clean, three-column layout using tables for a compact and
  easy-to-read format.

---

## 📊 Data Points Displayed

The following sections detail every field displayed on the LogDO Demo page. The example values are taken from the
built-in debug data.

### Log & Event

This section provides core metadata about the log entry itself, including unique identifiers and timing information
related to its processing.

| Field Name | Example Value | Description |
| :--- | :--- | :--- |
| **Log ID** | `0QZ7qAbkL9xZ~_bVn2m` | A unique, time-sortable Push ID generated for each log entry. |
| **Ray ID** | `8c7b6a5f4d3e2c1a-EWR` | The `cf-ray` header, unique to every request that goes through Cloudflare. |
| **Event ID** | `0QZ12345abcdefghij` | A client-side event ID, sourced from the `_ss_eID` or `_cc_eID` cookie. |
| **Event Time** | `2025-08-24T23:40:00.123Z` | The timestamp of the event, decoded from the Event ID. |
| **Received At** | `2025-08-24T23:40:00.125Z` | An ISO 8601 timestamp of when the log processing started. |
| **Processed At**| `2025-08-24T23:40:00.128Z` | An ISO 8601 timestamp of when the log object was fully assembled. |
| **Processing Time (ms)**| `3` | The total time in milliseconds it took for the worker to assemble the log object. |

### Client Identity

This section contains identifiers related to the user, their session, and their client history, primarily derived from
cookies.

| Field Name | Example Value | Description |
| :--- | :--- | :--- |
| **User ID** | `0QZ7qAbkL9xZdefghij` | A user ID, sourced from `_ss_uID` or `_cc_uID` cookies. |
| **Email Address**| `john@example.com` | An email address, sourced from `_ss_emA` or `_cc_emA` cookies. |
| **Email ID** | `0QZ12345abcdefghij` | An encoded email ID, sourced from `_ss_emID` or `_cc_emID` cookies. |
| **Client ID** | `0QYabcde1234567890` | A campaign or client ID, sourced from `_ss_cID` or `_cc_cID` cookies. |
| **First
Visited**| `2025-08-22T20:00:00.000Z` | The timestamp of the client's first visit, decoded from the Client ID. |
| **Client Age** | `02d 03h 40m 00s` | The calculated duration since the client's first visit. |
| **Session ID** | `0QZ12345abcdefghij` | A session ID, sourced from `_ss_sID` or `_cc_sID` cookies. |
| **Session Started**| `2025-08-24T22:00:00.000Z`| The timestamp of the session start, decoded from the Session ID. |
| **Session Duration**| `01:40:00` | The calculated duration of the session, based on the Event Time. |

### Fingerprint

This section details stable identifiers generated from the client's browser, device, and connection properties.

| Field Name | Example Value | Description |
| :--- | :--- | :--- |
| **Browser ID** | `aBcDeFgHiJkLmNoP` | A client-side generated fingerprint ID, sourced from the `_ss_fpID` cookie. |
| **Device ID** | `1234567890abcdef` | A hash of the User-Agent and TLS signature to identify the device type. |
| **Connection
ID**| `fedcba0987654321` | A hash of the IP, User-Agent, and TLS signature to identify a user's session. |
| **TLS ID** | `abcdef1234567890` | A hash of the JA3, cipher, and random value to fingerprint the TLS connection. |
| **JA3
ID** | `e7d705a3286e19ea42f587f344ee6865`| The client's JA3 fingerprint for identifying TLS negotiation patterns. |
| **Device Type** | `desktop` | The device type ('mobile', 'tablet', 'desktop') derived from the User-Agent. |

### Request

This section provides detailed information about the HTTP request itself.

| Field Name | Example Value | Description |
| :--- | :--- | :--- |
| **Request Time** | `2025-08-24T23:40:00.123Z` | A Unix timestamp (milliseconds) of when the log processing started. |
| **Method** | `GET` | The HTTP method of the request (e.g., GET, POST). |
| **Full URL** | `https://inspector.example.com/?debug=true` | The full URL of the incoming request. |
| **Domain** | `inspector.example.com` | The hostname from the request URL. |
| **Path** | `/` | The path from the request URL. |
| **Parameters** | `?debug=true` | The query string from the request URL. |
| **MIME Type** | `application/json` | The `content-type` of the request. |
| **Header Bytes** | `256` | The approximate size in bytes of the serialized request headers. |
| **Body Bytes** | `15` | The size in bytes of the original request body. |
| **Body Truncated**| `false` | A boolean indicating if the logged request body was truncated. |
| **Decile** | `7` | A 0-9 bucket derived from the connection hash, for decile-based A/B testing. |
| **Percentile** | `73` | A 0-99 bucket derived from the connection hash, for percentile-based A/B testing. |

### Connection

This section contains information about the network connection.

| Field Name | Example Value | Description |
| :--- | :--- | :--- |
| **Cloudflare Colo**| `EWR` | The Cloudflare data center that handled the request. |
| **IP Address** | `198.51.100.1` | The client's IP address. |
| **Ping (ms)** | `50` | The client's TCP round-trip time to the Cloudflare edge. |
| **ASN** | `13335` | The Autonomous System Number of the client's IP. |
| **AS Organization**| `Cloudflare, Inc.` | The organization associated with the ASN. |
| **HTTP Protocol**| `HTTP/2` | The HTTP protocol version used. |

### GeoIP

This section contains geographic information derived from the client's IP address.

| Field Name | Example Value | Description |
| :--- | :--- | :--- |
| **Geo ID** | `NA-US-NJ-Newark-07114` | A concatenated string of geographic data. |
| **Continent** | `NA` | The client's continent code. |
| **Country** | `US` | The client's country code. |
| **Region** | `New Jersey` | The client's region. |
| **City** | `Newark` | The client's city. |
| **Postal Code** | `07114` | The client's postal code. |
| **Timezone** | `America/New_York` | The client's timezone. |
| **Coordinates** | `40.73570, -74.17240` | The client's latitude and longitude. |

### Security

This section provides security-related signals about the connection.

| Field Name | Example Value | Description |
| :--- | :--- | :--- |
| **TLS Version** | `TLSv1.3` | The TLS version used for the connection. |
| **TLS Cipher** | `AEAD-AES128-GCM-SHA256` | The TLS cipher used for the connection. |
| **Threat Score** | `5` | The Cloudflare threat score (0-100). |
| **Verified Bot** | `false` | A boolean indicating if the request is from a known good bot. |
| **Bot Management**| `{"score":5,"verifiedBot":false}` | An object containing bot management scores and data. |
| **TLS Client Auth**| `{"certVerified":"NONE"}` | Details about client certificate authentication. |

### Headers, Cookies, & Request Body

These sections display the full content of their respective parts of the request.

---

## ☁️ Deployment via GitHub

This project is designed for easy deployment using Cloudflare's "Connect to Git" feature.

### Prerequisites

Before deploying this demo, you must have an instance of
the **[divortio-logdo](https://github.com/divortio/divortio-logdo)** service already deployed to your Cloudflare
account.

### Step 1: Clone and Configure

1. Clone this repository to your local machine:
   ```bash
   git clone [https://github.com/divortio/divortio-logdo-demo.git](https://github.com/divortio/divortio-logdo-demo.git)
   ```
2. Navigate into the directory and open `wrangler.toml`.
3. Modify the file to match your Cloudflare setup:

   ```toml
   # wrangler.toml

   # 1. Set the name for your worker
   name = "divortio-logdo-demo"
   main = "src/worker.mjs"
   compatibility_date = "2025-08-21"

   # ... other settings

   # 2. Configure the static assets binding (no changes usually needed)
   [assets]
   directory = "./public"

   # 3. Set the custom domain for this demo page
   [[routes]]
   pattern = "log-demo.your-domain.com" # <-- CHANGE THIS
   custom_domain = true

   # 4. Bind your deployed logger service
   [[services]]
   binding = "LOGGER" # This MUST be "LOGGER"
   service = "divortio-log-do" # <-- This MUST be the name of your deployed LogDO worker
   ```

### Step 2: Push to Your Private Repository

1. Create a new **private** repository on GitHub.
2. Update the remote origin for your local clone and push the code:
   ```bash
   git remote set-url origin [https://github.com/YourUsername/your-private-repo.git](https://github.com/YourUsername/your-private-repo.git)
   git push -u origin main
   ```

### Step 3: Deploy on Cloudflare

1. In the Cloudflare Dashboard, navigate to **Workers & Pages** and click **Create application**.
2. Select the **Connect to Git** tab.
3. Choose your newly created private repository and click **Begin setup**.
4. Cloudflare will detect the `wrangler.toml` settings. Verify the project name.
5. Click **Save and Deploy**.

Your LogDO demo page will now be deployed and connected to your logging service.

---

## 🔌 Usage

Once deployed, you can visit the custom domain you configured in `wrangler.toml` to see a live log entry.

To test the UI locally or without a live backend, open the `public/index.html` file in your browser and
append `?debug=true` to the URL. This will load the embedded dummy data.

---

## 📄 License

This project is licensed under the MIT License.