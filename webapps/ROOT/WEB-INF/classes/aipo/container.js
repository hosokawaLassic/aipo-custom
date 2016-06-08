/*
 * Aipo is a groupware program developed by Aimluck,Inc.
 * Copyright (C) 2004-2011 Aimluck,Inc.
 * http://www.aipo.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Default container configuration. To change the configuration, you have two options:
//
// A. If you run the Java server: Create your own "myContainer.js" file and
// modify the value in web.xml.
//
//  B. If you run the PHP server: Create a myContainer.js, copy the contents of container.js to it,
//  change
//		{"gadgets.container" : ["default"],
//  to
//		{"gadgets.container" : ["myContainer"],
// And make your changes that you need to myContainer.js.
// Just make sure on the iframe URL you specify &container=myContainer
// for it to use that config.
//
// All configurations will automatically inherit values from this
// config, so you only need to provide configuration for items
// that you require explicit special casing for.
//
// Please namespace your attributes using the same conventions
// as you would for javascript objects, e.g. gadgets.features
// rather than "features".

// NOTE: Please _don't_ leave trailing commas because the php json parser
// errors out on this.

// Container must be an array; this allows multiple containers
// to share configuration.
// TODO: Move out accel container config into a separate accel.js file.
{"gadgets.container" : ["default"],

// Set of regular expressions to validate the parent parameter. This is
// necessary to support situations where you want a single container to support
// multiple possible host names (such as for localized domains, such as
// <language>.example.org. If left as null, the parent parameter will be
// ignored; otherwise, any requests that do not include a parent
// value matching this set will return a 404 error.
"gadgets.parent" : null,

// Should all gadgets be forced on to a locked domain?
"gadgets.lockedDomainRequired" : true,

// DNS domain on which gadgets should render.
"gadgets.lockedDomainSuffix" : ".example.com:8080",

// Origins for CORS requests and/or Referer validation
// Indicate a set of origins or an entry with * to indicate that all origins are allowed
"gadgets.parentOrigins" : ["*"],

// Various urls generated throughout the code base.
// iframeBaseUri will automatically have the host inserted
// if locked domain is enabled and the implementation supports it.
// query parameters will be added.
"gadgets.iframeBaseUri" : "/gadgets/ifr",
"gadgets.uri.iframe.basePath" : "/gadgets/ifr",

// jsUriTemplate will have %host% and %js% substituted.
// No locked domain special cases, but jsUriTemplate must
// never conflict with a lockedDomainSuffix.
"gadgets.jsUriTemplate" : "http://%host%/gadgets/js/%js%",

//New configuration for iframeUri generation:
"gadgets.uri.iframe.lockedDomainSuffix" :  ".example.com:8080",
"gadgets.uri.iframe.unlockedDomain" : "www.example.com:8080",
"gadgets.uri.iframe.basePath" : "/gadgets/ifr",

"gadgets.uri.js.host" : "http://www.example.com/",
"gadgets.uri.js.path" : "/gadgets/js",


// Callback URL.  Scheme relative URL for easy switch between https/http.
"gadgets.uri.oauth.callbackTemplate" : "//%host%/gadgets/oauthcallback",

// Use an insecure security token by default
// "gadgets.securityTokenType" : "insecure",

// Config param to load Opensocial data for social
// preloads in data pipelining.  %host% will be
// substituted with the current host.
"gadgets.osDataUri" : "http://%host%/rpc",

// Uncomment these to switch to a secure version
//
"gadgets.securityTokenType" : "secure",
"gadgets.securityTokenKeyFile" : "res://aipo/securityTokenKey.txt",

// URI for the default shindig test instance.
"defaultShindigTestHost": "http://${SERVER_HOST}:${SERVER_PORT}",

// Authority (host:port without scheme) for the proxy and concat servlets.
"defaultShindigProxyConcatAuthority": "${SERVER_HOST}:${SERVER_PORT}",

// Default Uri config: these must be overridden - specified here for testing purposes
"gadgets.uri.iframe.unlockedDomain": "${Cur['defaultShindigTestHost']}",
"gadgets.uri.iframe.lockedDomainSuffix": "${Cur['defaultShindigTestHost']}",

// Default Js Uri config: also must be overridden.
"gadgets.uri.js.host": "${Cur['defaultShindigTestHost']}",
"gadgets.uri.js.path": "/gadgets/js",

// Default concat Uri config; used for testing.
"gadgets.uri.concat.host" : "${Cur['defaultShindigProxyConcatAuthority']}",
"gadgets.uri.concat.path" : "/gadgets/concat",
"gadgets.uri.concat.js.splitToken" : "false",

// Default proxy Uri config; used for testing.
"gadgets.uri.proxy.host" : "${Cur['defaultShindigProxyConcatAuthority']}",
"gadgets.uri.proxy.path" : "/gadgets/proxy",

// This config data will be passed down to javascript. Please
// configure your object using the feature name rather than
// the javascript name.

// Only configuration for required features will be used.
// See individual feature.xml files for configuration details.
"gadgets.features" : {
  "core.io" : {
    // Note: /proxy is an open proxy. Be careful how you expose this!
    // Note: Here // is replaced with the current protocol http/https
    "proxyUrl" : "//%host%/gadgets/proxy?container=default&refresh=%refresh%&url=%url%%rewriteMime%",
    "jsonProxyUrl" : "//%host%/gadgets/makeRequest"
  },
  "views" : {
    "home" : {
      "isOnlyVisible" : false,
      "aliases": ["default"]
    },
    "preview" : {
        "isOnlyVisible" : false
    },
    "canvas" : {
      "isOnlyVisible" : true
    },
    "popup" : {
        "isOnlyVisible" : true
    }
  },
  "tabs": {
    "css" : [
      ".tablib_table {",
      "margin:5px 0;",
      "width: 100%;",
      "border-collapse: separate;",
      "border-spacing: 0px;",
      "empty-cells: show;",
      "text-align: center;",
      "font-size: .9em;",
    "}",
    ".tablib_emptyTab {",
      "border-bottom: 1px solid #676767;",
      "padding: 0px 1px;",
    "}",
    ".tablib_spacerTab {",
      "border-bottom: 1px solid #676767;",
      "padding: 0px 1px;",
      "width: 1px;",
    "}",
    ".tablib_selected {",
      "padding: 2px 0px;",
      "background-color: #ffffff;",
      "border: 1px solid #A0A0A0;",
      "border-bottom-width: 0px;",
      "font-weight: bold;",
      "width: 100px;",
      "cursor: default;",
    "}",
    ".tablib_unselected {",
      "padding: 2px 0px;",
      "background-color: #EEE;",
      "border: 1px solid #cccccc;",
      "border-bottom-color: #A0A0A0;",
      "width: 100px;",
      "cursor: pointer;",
    "}",
    ".tablib_navContainer {",
      "width: 10px;",
      "vertical-align: middle;",
    "}",
    ".tablib_navContainer a:link, ",
    ".tablib_navContainer a:visited, ",
    ".tablib_navContainer a:hover {",
      "color: #3366aa;",
      "text-decoration: none;",
    "}"
    ]
  },
  "minimessage": {
      "css": [
        ".mmlib_table {",
        "width:100%;",
        "background:#fff4c2;",
        "border-collapse:separate;",
        "border-spacing:0px;",
        "padding:4px;",
		"margin:0 0 5px;",
		"border:1px solid #FBEBA4 !important;",
	    "font-size: .9em;",
      "}",
      ".mmlib_xlink {",
        "display:block;",
        "overflow:hidden;",
        "line-height:50px;",
        "height:11px;",
        "width:11px;",
        "cursor: pointer;",
        "background:url(../images/common/icon_close_mini.gif) top left no-repeat;",
      "}"
     ]
  },
  "rpc" : {
    // Path to the relay file. Automatically appended to the parent
    // parameter if it passes input validation and is not null.
    // This should never be on the same host in a production environment!
    // Only use this for TESTING!
    "parentRelayUrl" : "/gadgets/files/container/rpc_relay.html",

    // If true, this will use the legacy ifpc wire format when making rpc
    // requests.
    "useLegacyProtocol" : false
  },
  // Skin defaults
  "skins" : {
    "properties" : {
      "BG_COLOR": "",
      "BG_IMAGE": "",
      "BG_POSITION": "",
      "BG_REPEAT": "",
      "FONT_COLOR": "#666666",
      "ANCHOR_COLOR": "#666666"
    }
  },
  "opensocial" : {
    // Path to fetch opensocial data from
    // Must be on the same domain as the gadget rendering server
    "path" : "//%host%/rpc",
    // Path to issue invalidate calls
    "invalidatePath" : "//%host%/rpc",
    "domain" : "localhost",
    "enableCaja" : false,
    "supportedFields" : {
       "person" : ["id", {"name" : ["familyName", "givenName"]}, "displayName"],
       "group" : ["id", "title", "type"],
       "activity" : ["appId", "externalId", "id", "priority", "title", "recipients"];
    }
  },
  "osapi.services" : {
    // Specifying a binding to "container.listMethods" instructs osapi to dynamicaly introspect the services
    // provided by the container and delay the gadget onLoad handler until that introspection is
    // complete.
    // Alternatively a container can directly configure services here rather than having them
    // introspected. Simply list out the available servies and omit "container.listMethods" to
    // avoid the initialization delay caused by gadgets.rpc
    // E.g. "gadgets.rpc" : ["activities.requestCreate", "messages.requestSend", "requestShareApp", "requestPermission"]
    "gadgets.rpc" : ["container.listMethods"]
  },
  "osapi" : {
    // The endpoints to query for available JSONRPC/REST services
    "endPoints" : [ "//%host%/rpc" ]
  },
  "osml": {
    // OSML library resource.  Can be set to null or the empty string to disable OSML
    // for a container.
    "library": "config/OSML_library.xml"
  }
}}
