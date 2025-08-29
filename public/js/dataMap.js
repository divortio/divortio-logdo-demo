const DATA_MAP = {
    "Log & Event": {
        logid: "Log ID",
        rayid: "Ray ID",
        eid: "Event ID",
        eventTime: "Event Time",
        receivedat: "Received At",
        processedat: "Processed At",
        processingdurationms: "Processing Time (ms)"
    },
    "Client Identity": {
        cid: "Client ID",
        firstVisited: "First Visited",
        clientAge: "Client Age",
        sid: "Session ID",
        sessionStarted: "Session Started",
        sessionDuration: "Session Duration"
    },
    "Fingerprint": {
        fpid: "Browser ID",
        devicehash: "Device ID",
        connectionhash: "Connection ID",
        tlshash: "TLS ID",
        ja3hash: "JA3 ID",
        clientdevicetype: "Device Type"
    },
    "Request": {
        requesttime: "Request Time",
        requestmethod: "Method",
        requesturl: "Full URL",
        urldomain: "Domain",
        urlpath: "Path",
        urlquery: "Parameters",
        requestmimetype: "MIME Type",
        headerbytes: "Header Bytes",
        bodybytes: "Body Bytes",
        bodytruncated: "Body Truncated"
    },
    "Connection": {
        cfcolo: "Cloudflare Colo",
        clientip: "IP Address",
        clienttcprtt: "Ping (ms)",
        cfasn: "ASN",
        cfasorganization: "AS Organization",
        cfhttpprotocol: "HTTP Protocol"
    },
    "GeoIP": {
        geoid: "Geo ID",
        cfcontinent: "Continent",
        cfcountry: "Country",
        cfregion: "Region",
        cfcity: "City",
        cfpostalcode: "Postal Code",
        cftimezone: "Timezone",
        coordinates: "Coordinates"
    },
    "Security": {
        cftlsversion: "TLS Version",
        cftlscipher: "TLS Cipher",
        threatscore: "Threat Score",
        verifiedbot: "Verified Bot"
    },
    "Headers & Cookies": {
        requestheaders: "Headers",
        clientcookies: "Cookies"
    },
    "Request Body": {
        requestbody: "Body"
    }
};