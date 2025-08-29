const DATA_MAP = {
    "Log": {
        logid: "Log ID",
        receivedat: "Received At",
        processedat: "Processed At",
        processingdurationms: "Processing Time (ms)"
    },
    "Client Identity": {
        cId: "Client ID",
        firstVisited: "First Visited",
        clientAge: "Client Age",
        sId: "Session ID",
        sessionStarted: "Session Started",
        sessionDuration: "Session Duration",
        eId: "Event ID",
        eventTime: "Event Time"
    },
    "Client Fingerprint": {
        fpid: "Browser ID",
        devicehash: "Device ID",
        connectionhash: "Connection ID",
        tlshash: "TLS ID",
        ja3hash: "JA3 ID",
        clientdevicetype: "Device Type"
    },
    "Request Details": {
        rayid: "Ray ID",
        requesttime: "Request Time",
        requestmethod: "Method",
        requestmimetype: "MIME Type",
        sample10: "Decile",
        sample100: "Percentile",
        requesturl: "Full URL",
        urldomain: "Domain",
        urlpath: "Path",
        urlquery: "Parameters"
    },
    "Request Content": {
        requestheaders: "Headers",
        headerbytes: "Header Bytes",
        clientcookies: "Cookies",
        requestbody: "Body",
        bodybytes: "Body Bytes",
        bodytruncated: "Body Truncated"
    },
    "Connection Info": {
        cfcolo: "Cloudflare Colo",
        clientip: "IP Address",
        clienttcprtt: "Ping (ms)",
        cfasn: "ASN",
        cfasorganization: "AS Organization"
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
        cfhttpprotocol: "HTTP Protocol",
        threatscore: "Threat Score",
        verifiedbot: "Verified Bot"
    }
};