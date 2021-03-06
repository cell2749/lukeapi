define({ "api": [
  {
    "type": "post",
    "url": "/lukeA/marker/create",
    "title": "Create",
    "name": "Create",
    "group": "AdminMarker",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude of a marker</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude of a marker</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of marker</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of marker</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "owner",
            "description": "<p>Third party owner of the marker</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: {type: String, required: '{PATH} is required!'},\n    longitude: Number,\n    latitude: Number,\n    title: String,\n    description: String,\n    date: String,\n    owner: String\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Marker unique id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude of a marker</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude of a marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date when marker was made</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "owner",
            "description": "<p>Third party owner of the marker</p>"
          }
        ]
      }
    },
    "description": "<p>Creates marker with specified parameter. Some parameters are restricted from user to manage them. Returns the created marker.</p>",
    "error": {
      "examples": [
        {
          "title": "Missing longitude:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing longitude\"\n}",
          "type": "json"
        },
        {
          "title": "Missing latitude:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing latitude\"\n}",
          "type": "json"
        },
        {
          "title": "Missing description:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing description\"\n}",
          "type": "json"
        },
        {
          "title": "Missing title:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing title\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/adminMarker.js",
    "groupTitle": "AdminMarker"
  },
  {
    "type": "get",
    "url": "/lukeA/marker",
    "title": "Get marker(s)",
    "name": "Get",
    "group": "AdminMarker",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of the marker. If specified return only single marker.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "owner",
            "description": "<p>Name of the owner of the marker (Third party user). Returns all markers belonging to the owner.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Limit the amount of returned objects.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n    id: {type: String, required: '{PATH} is required!'},\n    longitude: Number,\n    latitude: Number,\n    title: String,\n    description: String,\n    date: String,\n    owner: String\n}]",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: {type: String, required: '{PATH} is required!'},\n    longitude: Number,\n    latitude: Number,\n    title: String,\n    description: String,\n    date: String,\n    owner: String\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Marker unique id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude of a marker</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude of a marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date when marker was made</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "owner",
            "description": "<p>Third party owner of the marker</p>"
          }
        ]
      }
    },
    "description": "<p>Open to everyone Location filter is available for public. Returns single marker in case id is specified.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/marker?owner=Cthulhu&limit=10",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/adminMarker.js",
    "groupTitle": "AdminMarker"
  },
  {
    "type": "get",
    "url": "/lukeA/marker/remove",
    "title": "Remove",
    "name": "Remove",
    "group": "AdminMarker",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a report to be removed</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success:\"Removed N items\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Contains information on amount of reports removed. Should be 1.</p>"
          }
        ]
      }
    },
    "description": "<p>Removes the specified marker.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/marker/remove?id=e1921e921e9219",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Id is missing or wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No marker with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/adminMarker.js",
    "groupTitle": "AdminMarker"
  },
  {
    "type": "post",
    "url": "/lukeA/marker/update",
    "title": "Update",
    "name": "Update",
    "group": "AdminMarker",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the marker</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "longitude",
            "description": "<p>Longitude of a marker</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "latitude",
            "description": "<p>Latitude of a marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "owner",
            "description": "<p>Third party owner of the marker</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Marker unique id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date when marker was made</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: {type: String, required: '{PATH} is required!'},\n    longitude: Number,\n    latitude: Number,\n    title: String,\n    description: String,\n    date: String,\n    owner: String\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates the marker with new values. Certain properties are forbidden from being updated. All allowed are listed in parameters list.</p>",
    "error": {
      "examples": [
        {
          "title": "Id is missing or wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No marker with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/adminMarker.js",
    "groupTitle": "AdminMarker"
  },
  {
    "type": "get",
    "url": "/lukeA/authzero",
    "title": "Get setup",
    "name": "GetSetup",
    "group": "Auth0",
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n     AUTH0_CLIENT_ID: String,\n     AUTH0_DOMAIN: String,\n     AUTH0_CALLBACK_URL: String\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "AUTH0_CLIENT_ID",
            "description": "<p>Auth0 client id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "AUTH0_DOMAIN",
            "description": "<p>Auth0 domain</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "AUTH0_CALLBACK_URL",
            "description": "<p>Callback url to server. Read more on the callback url implementation.</p>"
          }
        ]
      }
    },
    "description": "<p>Returns auth0 connection setup information.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/authzero",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/lukeApp.js",
    "groupTitle": "Auth0"
  },
  {
    "type": "get",
    "url": "/lukeA/login",
    "title": "Login",
    "name": "Login",
    "group": "Auth0",
    "parameter": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer idToken</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Default",
            "description": "<p>Responds with HTTP/1.1 200 OK on successful authentication</p>"
          }
        ]
      }
    },
    "description": "<p>Registers user in local database. Requires headers.</p>",
    "version": "0.0.0",
    "filename": "routes/lukeA/lukeApp.js",
    "groupTitle": "Auth0"
  },
  {
    "type": "post",
    "url": "/lukeA/category/create",
    "title": "Create",
    "name": "Create",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the category</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "image",
            "description": "<p>Image file that is to be used by category</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "positive",
            "description": "<p>Indicates if category is positive or negative</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n     id:String\n     title:String\n     description:String,\n     image_url:String,\n     positive:Boolean\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url of image/icon used by category</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "positive",
            "description": "<p>Indicates if category is positive or negative</p>"
          }
        ]
      }
    },
    "description": "<p>Creates category with specified parameters. Title is required. Returns created category as json. Requires admin role.</p>",
    "error": {
      "examples": [
        {
          "title": "Missing title:",
          "content": "HTTP/1.1 422\n{\n    error:\"Category title required\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/lukeA/category",
    "title": "Get category(ies)",
    "name": "GetAll",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of an experience pattern to be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n     id:String\n     title:String\n     description:String,\n     image_url:String,\n     positive:Boolean\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-All:",
          "content": "HTTP/1.1 200 OK\n[{\n     id:String\n     title:String\n     description:String,\n     image_url:String,\n     positive:Boolean\n}]",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url of image/icon used by category</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "positive",
            "description": "<p>Indicates if category is positive or negative</p>"
          }
        ]
      }
    },
    "description": "<p>Returns single category based on specified id - json. Returns all categories if id was not specified - array of json.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/category?id=190j31de90u13",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/category.js",
    "groupTitle": "Category",
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/lukeA/category/remove",
    "title": "Remove",
    "name": "Remove",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the category</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n     success:\"Removed N items\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates how many categories were removed. Should be 1.</p>"
          }
        ]
      }
    },
    "description": "<p>Removes category by id. Returns success message on successful deletion. Requires admin role.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://www.balticapp.fi/lukeA/category/remove?id=19021e9u2190u2190u",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wrong or Missing id:",
          "content": "HTTP/1.1 404\n{\n    error:\"No category with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/lukeA/category/update",
    "title": "Update",
    "name": "Update",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the category</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "image",
            "description": "<p>Image file used by category</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "positive",
            "description": "<p>Indicates if category is positive or negative</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n     id:String\n     title:String\n     description:String,\n     image_url:String,\n     positive:Boolean\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url of image/icon used by category</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "positive",
            "description": "<p>Indicates if category is positive or negative</p>"
          }
        ]
      }
    },
    "description": "<p>Updates category with specified parameters. Returns updated category as json. Requires admin role.</p>",
    "error": {
      "examples": [
        {
          "title": "Missing id:",
          "content": "HTTP/1.1 422\n{\n    error:\"Category id was not provided\"\n}",
          "type": "json"
        },
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 422\n{\n    error:\"Report Category with such id doesn't exists\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/lukeA/experience/activate",
    "title": "Activate",
    "name": "Activate",
    "group": "Experience",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rank</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if activation was successful.</p>"
          }
        ]
      }
    },
    "description": "<p>Activates experience pattern by id and deactivates all other patterns. Requires superadmin role.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/experience/activate?id=18ujej0210e138u",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 404\n{\n    error:\"No experience model with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Missing id:",
          "content": "HTTP/1.1 404\n{\n    error:\"Missing id for experience model\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/experience.js",
    "groupTitle": "Experience"
  },
  {
    "type": "post",
    "url": "/lukeA/experience/create",
    "title": "Create",
    "name": "Create",
    "group": "Experience",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the rank</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "reportGain",
            "description": "<p>Experience gain on report</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "upvoteGain",
            "description": "<p>Experience gain on upvote</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "downvoteGain",
            "description": "<p>Experience gain on downvote</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     id:String,\n     title: String,\n     reportGain: Number,\n     upvoteGain: Number,\n     downvoteGain: Number,\n     active: Boolean\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "reportGain",
            "description": "<p>Experience gain on report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "upvoteGain",
            "description": "<p>Experience gain on upvote</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "downvoteGain",
            "description": "<p>Experience gain on downvote</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Indicates if current pattern is active. Only one pattern can be active at a time.</p>"
          }
        ]
      }
    },
    "description": "<p>Creates experience pattern. Returns created experience pattern. Call activate in order to activate experience pattern.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "//POST REQUEST EXAMPLE",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/experience.js",
    "groupTitle": "Experience",
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/lukeA/experience",
    "title": "Get experience pattern(s)",
    "name": "GetAll",
    "group": "Experience",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of an experience pattern to be fetched</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n     id:String,\n     title: String,\n     reportGain: Number,\n     upvoteGain: Number,\n     downvoteGain: Number,\n     active: Boolean\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-All:",
          "content": "HTTP/1.1 200 OK\n[{\n    id:String,\n     title: String,\n     reportGain: Number,\n     upvoteGain: Number,\n     downvoteGain: Number,\n     active: Boolean\n}]",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "reportGain",
            "description": "<p>Experience gain on report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "upvoteGain",
            "description": "<p>Experience gain on upvote</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "downvoteGain",
            "description": "<p>Experience gain on downvote</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Indicates if current pattern is active. Only one pattern can be active at a time.</p>"
          }
        ]
      }
    },
    "description": "<p>Returns single experience pattern based on specified id - json. Returns all experience patterns if id was not specified - array of json.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/experience?id=2121ge921ed123d1",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/experience.js",
    "groupTitle": "Experience",
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/lukeA/experience/nullify",
    "title": "Nullify",
    "name": "Nullify",
    "group": "Experience",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>users id</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if nullification was successful.</p>"
          }
        ]
      }
    },
    "description": "<p>Nullifies specified by id users experience and removes rank. Requires superadmin role.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/experience/nullify?id=1ue190u1290u21e",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Missing id:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing user id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/experience.js",
    "groupTitle": "Experience"
  },
  {
    "type": "get",
    "url": "/lukeA/experience/nullify-all",
    "title": "Nullify All",
    "name": "NullifyAll",
    "group": "Experience",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if nullification was successful.</p>"
          }
        ]
      }
    },
    "description": "<p>Nullifies all users experience and removes rank. Requires superadmin role.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/experience/nullify-all",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/experience.js",
    "groupTitle": "Experience",
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeA/experience/remove",
    "title": "Remove",
    "name": "Remove",
    "group": "Experience",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rank</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the rank</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "reportGain",
            "description": "<p>Experience gain on report</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "upvoteGain",
            "description": "<p>Experience gain on upvote</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "downvoteGain",
            "description": "<p>Experience gain on downvote</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "active",
            "description": "<p>Indicates if current pattern is active. Only one pattern can be active at a time.</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: \"Removed N items\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates amount of patterns removed. Should be 1.</p>"
          }
        ]
      }
    },
    "description": "<p>Removes experience pattern. Requires superadmin role.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/experience/remove?id=12h21h83021",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wrong or missing id:",
          "content": "HTTP/1.1 404\n{\n    error:\"No item with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/experience.js",
    "groupTitle": "Experience"
  },
  {
    "type": "post",
    "url": "/lukeA/experience/update",
    "title": "Update",
    "name": "Update",
    "group": "Experience",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rank</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the rank</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "reportGain",
            "description": "<p>Experience gain on report</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "upvoteGain",
            "description": "<p>Experience gain on upvote</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "downvoteGain",
            "description": "<p>Experience gain on downvote</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     id:String,\n     title: String,\n     reportGain: Number,\n     upvoteGain: Number,\n     downvoteGain: Number,\n     active: Boolean\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "reportGain",
            "description": "<p>Experience gain on report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "upvoteGain",
            "description": "<p>Experience gain on upvote</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "downvoteGain",
            "description": "<p>Experience gain on downvote</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Indicates if current pattern is active. Only one pattern can be active at a time.</p>"
          }
        ]
      }
    },
    "description": "<p>Updates experience pattern. Returns updated experience pattern.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "//POST REQUEST EXAMPLE",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wrong or missing id:",
          "content": "HTTP/1.1 404\n{\n    error:\"No pattern was found\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/experience.js",
    "groupTitle": "Experience"
  },
  {
    "type": "get",
    "url": "/lukeA/link/admin-get",
    "title": "Admin Get",
    "name": "AdminGet",
    "group": "Link",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of the link to retrieve</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "active",
            "description": "<p>Active indicates that if the link is active to present</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n[{\n    id:String,\n    link: String,\n    description: String,\n    title: String,\n    active: Boolean,\n    done: [String]\n}]",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the Link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>Third party link to specific site, or survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the link</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Indicates if the link is good to present</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "done",
            "description": "<p>Array containing ids of users who clicked the link, visited it</p>"
          }
        ]
      }
    },
    "description": "<p>Link get request. Normal users and public get only active true by default. Super admins get everything by default. Super admins can specify parameter active in the request in order to get one or the other. If no id is specified, all the reports are delivered based on the active rules. Reports are active by default upon creation.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/link?id=e2921y8998e1",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/link.js",
    "groupTitle": "Link"
  },
  {
    "type": "post",
    "url": "/lukeA/link/create",
    "title": "Create",
    "name": "Create",
    "group": "Link",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>Link of the link to create</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the link to create</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the link to create</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "active",
            "defaultValue": "true",
            "description": "<p>Active indicates that if the link is active to present</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n    id:String,\n    link: String,\n    description: String,\n    title: String,\n    active: Boolean,\n    done: [String]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the Link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>Third party link to specific site, or survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the link</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Indicates if the link is good to present</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "done",
            "description": "<p>Array containing ids of users who clicked the link, visited it</p>"
          }
        ]
      }
    },
    "description": "<p>Create Link, link parameter is required. All other parameters are optional with active being true by default.</p>",
    "error": {
      "examples": [
        {
          "title": "Missing Link",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing Link\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/link.js",
    "groupTitle": "Link"
  },
  {
    "type": "get",
    "url": "/lukeA/link",
    "title": "Get",
    "name": "Get",
    "group": "Link",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of the link to retrieve</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "active",
            "description": "<p>Active indicates that if the link is active to present</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n[{\n    id:String,\n    link: String,\n    description: String,\n    title: String,\n    active: Boolean,\n    done: [String]\n}]",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the Link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>Third party link to specific site, or survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the link</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Indicates if the link is good to present</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "done",
            "description": "<p>Array containing ids of users who clicked the link, visited it</p>"
          }
        ]
      }
    },
    "description": "<p>Link get request. Normal users and public get only active true by default. Super admins get everything by default. Super admins can specify parameter active in the request in order to get one or the other. If no id is specified, all the reports are delivered based on the active rules. Reports are active by default upon creation.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/link?id=e2921y8998e1",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/link.js",
    "groupTitle": "Link"
  },
  {
    "type": "get",
    "url": "/lukeA/link/remove",
    "title": "Remove",
    "name": "Remove",
    "group": "Link",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the link to be updated</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Remove Link by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/link/remove?id=e2921y8998e1",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/link.js",
    "groupTitle": "Link",
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Missing id:",
          "content": "HTTP/1.1 422\n{\n    success: \"Missing id\"\n}",
          "type": "json"
        },
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 404\n{\n    success: \"No such id\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success: \"Removed N items\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates amount of removed items.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "gpost",
    "url": "/lukeA/link/update",
    "title": "Update",
    "name": "Update",
    "group": "Link",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the link to be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "link",
            "description": "<p>Link of the link to Update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the link to Update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the link to Update</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "active",
            "description": "<p>Active indicates that if the link is active to present</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n    id:String,\n    link: String,\n    description: String,\n    title: String,\n    active: Boolean,\n    done: [String]\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the Link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>Third party link to specific site, or survey</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the link</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the link</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Indicates if the link is good to present</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "done",
            "description": "<p>Array containing ids of users who clicked the link, visited it</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if update was successful</p>"
          }
        ]
      }
    },
    "description": "<p>Update Link, id is required. All other parameters are optional.</p>",
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/link.js",
    "groupTitle": "Link",
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        },
        {
          "title": "Missing id:",
          "content": "HTTP/1.1 422\n{\n    success: \"Missing id\"\n}",
          "type": "json"
        },
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 404\n{\n    success: \"No such id\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/lukeA/link/visit",
    "title": "Visit",
    "name": "Visit",
    "group": "Link",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the link to be updated</p>"
          }
        ]
      }
    },
    "description": "<p>Used in order to register that user has clicked on the link.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/link/visit?id=e2921y8998e1",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Missing id:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing Id\"\n}",
          "type": "json"
        },
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 422\n{\n    error:\"No such Link\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/link.js",
    "groupTitle": "Link"
  },
  {
    "type": "post",
    "url": "/lukeA/rank/create",
    "title": "Create",
    "name": "Create",
    "group": "Rank",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of rank</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Required score/experience for a user to get this rank</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the rank</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "image",
            "description": "<p>Image file that is to be used as Rank icon</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id:String,\n    title:String,\n    description:String,\n    image_url: String,\n    score: Number\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url to an image(icon) of the rank*</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Score required to achieve this rank</p>"
          }
        ]
      }
    },
    "description": "<p>Creates Rank with specified parameters. Title is required. Returns the created rank. Requires admin role.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "//POST REQUEST EXAMPLE",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Title is missing:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing title\"\n}",
          "type": "json"
        },
        {
          "title": "Score is missing:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing score\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/rank.js",
    "groupTitle": "Rank"
  },
  {
    "type": "get",
    "url": "/lukeA/rank",
    "title": "Get rank(s)",
    "name": "GetAll",
    "group": "Rank",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of a rank to be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n    id:String,\n    title:String,\n    description:String,\n    image_url: String,\n    score: Number\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-All:",
          "content": "HTTP/1.1 200 OK\n[{\n    id:String,\n    title:String,\n    description:String,\n    image_url: String,\n    score: Number\n}]",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url to an image/icon of a rank</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Score required to get this rank</p>"
          }
        ]
      }
    },
    "description": "<p>Returns single rank based on specified id - json. Returns all ranks if id was not specified - array of json.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/rank?id=2121ge921ed123d1",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/rank.js",
    "groupTitle": "Rank",
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/lukeA/rank/remove",
    "title": "Remove",
    "name": "Remove",
    "group": "Rank",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a rank to be updated</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success:\"Removed N items\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Indicates amount of ranks removed. Should be 1.</p>"
          }
        ]
      }
    },
    "description": "<p>Deletes rank with specified id. Requires admin role.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/rank/remove?id=2121ge921ed123d1",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Id is missing:",
          "content": "HTTP/1.1 422\n{\n    error:\"Id was not specified\"\n}",
          "type": "json"
        },
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 404\n{\n    error:\"No rank with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/rank.js",
    "groupTitle": "Rank"
  },
  {
    "type": "post",
    "url": "/lukeA/rank/update",
    "title": "Update",
    "name": "Update",
    "group": "Rank",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a rank to be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of rank</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the rank</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "image",
            "description": "<p>Image file that is to be used as rank icon/image</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "score",
            "description": "<p>Required score/experience for a user to get this rank</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id:String,\n    title:String,\n    description:String,\n    image_url: String,\n    score: Number\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the rank</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url to an image(icon) of the rank*</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Score required to achieve this rank</p>"
          }
        ]
      }
    },
    "description": "<p>Updates Rank with specified parameters. Returns the updated rank. Requires admin role.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "//POST REQUEST EXAMPLE",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Id is missing:",
          "content": "HTTP/1.1 422\n{\n    error:\"Id was not specified\"\n}",
          "type": "json"
        },
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 404\n{\n    error:\"Rank with such id doesn't exist\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/rank.js",
    "groupTitle": "Rank"
  },
  {
    "type": "get",
    "url": "/lukeA/report/admin-get",
    "title": "Get report(s) for Admin",
    "name": "AdminGetAll",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of a report in case single report needs to be viewed.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "submitterId",
            "description": "<p>Filter results by submitter id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "long",
            "description": "<p>Filter results by longitude (only if latitude is set). Center of circle.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lat",
            "description": "<p>Filter results by latitude (only if longitude is set). Center of circle.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "distance",
            "defaultValue": "5000",
            "description": "<p>Filter results by radius(in meters, only if longitude and latitude is set). Radius of circle.</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n    id: String\n    longitude: Number,\n    latitude: Number,\n    altitude: Number,\n    image_url: String,\n    thumbnail_url: String,\n    title: String,\n    description: String,\n    date: String,\n    categoryId: [\n        String\n    ],\n    rating: Number,\n    submitterId: String,\n    approved: Boolean,\n    flagged: Boolean,\n    votes: [\n       {\n            userId: String,\n            vote: Boolean\n        }\n    ]\n}]",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: String\n    longitude: Number,\n    latitude: Number,\n    altitude: Number,\n    image_url: String,\n    thumbnail_url: String,\n    title: String,\n    description: String,\n    date: String,\n    categoryId: [\n        String\n    ],\n    rating: Number,\n    submitterId: String,\n    approved: Boolean,\n    flagged: Boolean,\n    votes: [\n       {\n            userId: String,\n            vote: Boolean\n        }\n    ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longtitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "altitude",
            "description": "<p>Altitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url to image that report has</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thumbnail_url",
            "description": "<p>Url to smaller image that report has (40 px)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date when reprot was made</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Array containing category ids of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Rating of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "submitterId",
            "description": "<p>User id of reports submitter</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "approved",
            "description": "<p>If true indicates that report is approved</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "flagged",
            "description": "<p>If true indicates that report is reported/flagged</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "votes",
            "description": "<p>Array containing json objects (Below details)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "votes[]",
            "description": "<p>.userId Id of user who voted on this report</p>"
          }
        ]
      }
    },
    "description": "<p>Admin get request returns unfiltered results. Location filter is available for public. Returns single report in case id is specified.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/report?submitterId=facebook|ad10ed1j2d010d21",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/report/approve",
    "title": "Approve",
    "name": "Approve",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a report to be approved</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, approving was successful</p>"
          }
        ]
      }
    },
    "description": "<p>Approves the specified report.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/report/approve?id=2e12adjsaj120jd101290",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Id is missing or wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "post",
    "url": "/lukeA/report/create",
    "title": "Create",
    "name": "Create",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the report</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude of a point where report was made.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude of a point where report was made.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "altitude",
            "description": "<p>Altitude of a point where report was made</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "image",
            "description": "<p>Image file that is bound to a report.*Not yet implemented.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of a report.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Array containing category ids of a report.</p>"
          }
        ],
        "Special Access Roles": [
          {
            "group": "Special Access Roles",
            "optional": false,
            "field": "admin",
            "description": ""
          },
          {
            "group": "Special Access Roles",
            "optional": false,
            "field": "advanced",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: String\n    longitude: Number,\n    latitude: Number,\n    altitude: Number,\n    image_url: String,\n    thumbnail_url: String,\n    title: String,\n    description: String,\n    date: String,\n    categoryId: [\n        String\n    ],\n    rating: Number,\n    submitterId: String,\n    approved: Boolean,\n    flagged: Boolean,\n    votes: [\n       {\n            userId: String,\n            vote: Boolean\n        }\n    ]\n    positive: Boolean\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "altitude",
            "description": "<p>Altitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url to image that report has</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thumbnail_url",
            "description": "<p>Url to smaller image that report has (40 px)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date when report was made</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Array containing category ids of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Rating of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "submitterId",
            "description": "<p>User id of reports submitter</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "approved",
            "description": "<p>If true indicates that report is approved</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "flagged",
            "description": "<p>If true indicates that report is reported/flagged</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "votes",
            "description": "<p>Array containing json objects (Below details)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "votes[]",
            "description": "<p>.userId Id of user who voted on this report</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "positive",
            "description": "<p>Indicates if the report is positive, negative or neutral. If the positive parameter is not present, then it is neutral;</p>"
          }
        ]
      }
    },
    "description": "<p>Creates report with specified parameter. Some parameters are restricted from user to manage them. Returns the created report. Adds experience to user from active experience pattern. <strong>Requires active experience pattern!</strong></p>",
    "error": {
      "examples": [
        {
          "title": "Missing longitude:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing longitude\"\n}",
          "type": "json"
        },
        {
          "title": "Missing latitude:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing latitude\"\n}",
          "type": "json"
        },
        {
          "title": "Missing description:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing description\"\n}",
          "type": "json"
        },
        {
          "title": "Missing categoryId:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing categoryId\"\n}",
          "type": "json"
        },
        {
          "title": "Experience Model:",
          "content": "HTTP/1.1 404\n{\n    error:\"No experience pattern active\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/report/disapprove",
    "title": "Disapprove",
    "name": "Disapprove",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a report to be disapproved</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, disapproving was successful</p>"
          }
        ]
      }
    },
    "description": "<p>Disapproved the report with specified id.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/report/disapprove?id=2121ge921ed123d1",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Id is missing or wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/report/downvote",
    "title": "Downvote",
    "name": "Downvote",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a report to be downvoted</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, downvoting was successful</p>"
          }
        ]
      }
    },
    "description": "<p>Downvotes the report with specified id. Active experience pattern must be present in db. Adds experience to user from active experience pattern. Diminishes rating.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/report/upvote?id=2121ge921ed123d1",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Id is wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Experience pattern:",
          "content": "HTTP/1.1 404\n{\n    error:\"No active experience patterns\"\n}",
          "type": "json"
        },
        {
          "title": "Id is missing:",
          "content": "HTTP/1.1 422\n{\n    error:\"No report id was provided\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/report/downvote-count",
    "title": "Downvote count",
    "name": "DownvoteCount",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a report</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    count: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Amount of downvotes</p>"
          }
        ]
      }
    },
    "description": "<p>Returns the count of downvotes of a report</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/report/downvote-count?id=2121ge921ed123d1",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Id is wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Id is missing:",
          "content": "HTTP/1.1 422\n{\n    error:\"Report id or vote was not specified\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/report/flag",
    "title": "Flag",
    "name": "Flag",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the report</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if report was flagged/unflagged successfully</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "flagged",
            "description": "<p>True if threshold reached and report is now officially flagged.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "action",
            "description": "<p>Flag if true unflag if false</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success:true,\n    flagged: Boolean,\n    action: Boolean\n\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Adds or removes flag in report by id. If the flags reach threshold the report is flagged, if they are below threshold, it is unflagged. Threshold currently 10.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/report/flag?id=y892128121u08",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Missing Id:",
          "content": "HTTP/1.1 404\n{\n    error: \"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/report",
    "title": "Get report(s)",
    "name": "GetAll",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of a report in case single report needs to be viewed.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "submitterId",
            "description": "<p>Filter results by submitter id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "long",
            "description": "<p>Filter results by longitude (only if latitude is set). Center of circle.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lat",
            "description": "<p>Filter results by latitude (only if longitude is set). Center of circle.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "distance",
            "defaultValue": "5000",
            "description": "<p>Filter results by radius(in meters, only if longitude and latitude is set). Radius of circle.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n    id: String\n    longitude: Number,\n    latitude: Number,\n    altitude: Number,\n    image_url: String,\n    thumbnail_url: String,\n    title: String,\n    description: String,\n    date: String,\n    categoryId: [\n        String\n    ],\n    rating: Number,\n    submitterId: String,\n    approved: Boolean,\n    flagged: Boolean,\n    votes: [\n       {\n            userId: String,\n            vote: Boolean\n        }\n    ]\n}]",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: String\n    longitude: Number,\n    latitude: Number,\n    altitude: Number,\n    image_url: String,\n    thumbnail_url: String,\n    title: String,\n    description: String,\n    date: String,\n    categoryId: [\n        String\n    ],\n    rating: Number,\n    submitterId: String,\n    approved: Boolean,\n    flagged: Boolean,\n    votes: [\n       {\n            userId: String,\n            vote: Boolean\n        }\n    ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longtitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "altitude",
            "description": "<p>Altitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url to image that report has</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thumbnail_url",
            "description": "<p>Url to smaller image that report has (40 px)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date when reprot was made</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Array containing category ids of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Rating of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "submitterId",
            "description": "<p>User id of reports submitter</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "approved",
            "description": "<p>If true indicates that report is approved</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "flagged",
            "description": "<p>If true indicates that report is reported/flagged</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "votes",
            "description": "<p>Array containing json objects (Below details)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "votes[]",
            "description": "<p>.userId Id of user who voted on this report</p>"
          }
        ]
      }
    },
    "description": "<p>Public access and registered users receive only filtered results (approved,!flagged). Location filter is available for public. Returns single report in case id is specified.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/report?submitterId=facebook|ad10ed1j2d010d21",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/report/remove",
    "title": "Remove",
    "name": "Remove",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a report to be removed</p>"
          }
        ],
        "Special Access Roles": [
          {
            "group": "Special Access Roles",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success:\"Removed N items\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Contains information on amount of reports removed. Should be 1.</p>"
          }
        ]
      }
    },
    "description": "<p>Removes the specified report. User can remove his own reports. Admin can remove other users' reports.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/report/remove?id=e1921e921e9219",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Owner mismatch:",
          "content": "HTTP/1.1 401\n{\n    error:\"Restricted Access\"\n}",
          "type": "json"
        },
        {
          "title": "Id is missing :",
          "content": "HTTP/1.1 404\n{\n    error:\"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Wrong Id:",
          "content": "HTTP/1.1 422\n{\n    error:\"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "post",
    "url": "/lukeA/report/update",
    "title": "Update",
    "name": "Update",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the report</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the report</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "img",
            "description": "<p>Image file that is bound to a report.*Not yet implemented.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of a report.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "categoryId",
            "description": "<p>Array containing category ids of a report.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: String\n    longitude: Number,\n    latitude: Number,\n    altitude: Number,\n    image_url: String,\n    thumbnail_url: String,\n    title: String,\n    description: String,\n    date: String,\n    categoryId: [\n        String\n    ],\n    rating: Number,\n    submitterId: String,\n    approved: Boolean,\n    flagged: Boolean,\n    votes: [\n       {\n            userId: String,\n            vote: Boolean\n        }\n    ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Report id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longtitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "altitude",
            "description": "<p>Altitude of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url to image that report has</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thumbnail_url",
            "description": "<p>Url to smaller image that report has (40 px)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date when reprot was made</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Array containing category ids of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>Rating of a report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "submitterId",
            "description": "<p>User id of reports submitter</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "approved",
            "description": "<p>If true indicates that report is approved</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "flagged",
            "description": "<p>If true indicates that report is reported/flagged</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "votes",
            "description": "<p>Array containing json objects (Below details)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "votes[]",
            "description": "<p>.userId Id of user who voted on this report</p>"
          }
        ]
      }
    },
    "description": "<p>Updates the report with new values. Certain properties are forbidden from being updated. All allowed are listed in parameters list. <strong>Implementation not ready yet due to image</strong></p>",
    "examples": [
      {
        "title": "Example:",
        "content": "!!!!Example not ready yet due to image implementation!!!",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Owner mismatch:",
          "content": "HTTP/1.1 401\n{\n    error:\"Restricted Access\"\n}",
          "type": "json"
        },
        {
          "title": "Id is missing or wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/report/upvote",
    "title": "Upvote",
    "name": "Upvote",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a report to be upvoted</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, upvoting was successful</p>"
          }
        ]
      }
    },
    "description": "<p>Upvotes the report with specified id. Adds experience to user from active experience pattern. Buffs rating. <strong>Active experience pattern must be present in db.</strong></p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/report/upvote?id=2121ge921ed123d1",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Id is wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Experience pattern:",
          "content": "HTTP/1.1 404\n{\n    error:\"No active experience patterns\"\n}",
          "type": "json"
        },
        {
          "title": "Id is missing:",
          "content": "HTTP/1.1 422\n{\n    error:\"No report id was provided\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/report/upvote-count",
    "title": "Upvote count",
    "name": "UpvoteCount",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a report</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    count: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Amount of upvotes</p>"
          }
        ]
      }
    },
    "description": "<p>Returns the count of upvotes of a report</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/report/upvote-count?id=2121ge921ed123d1",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Id is wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Id is missing:",
          "content": "HTTP/1.1 422\n{\n    error:\"Report id or vote was not specified\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/report/vote",
    "title": "Vote",
    "name": "Vote",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a report to be voted</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "vote",
            "description": "<p>Value of a report. True - upvote. False - downvote.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, downvoting was successful</p>"
          }
        ]
      }
    },
    "description": "<p>Votes the report with specified id. Active experience pattern must be present in db. Adds experience to user from active experience pattern. Buffs or substracts rating.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/report/vote?id=2121ge921ed123d1&vote=true",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Id is wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No report with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Experience pattern:",
          "content": "HTTP/1.1 404\n{\n    error:\"No active experience patterns\"\n}",
          "type": "json"
        },
        {
          "title": "Id or vote is missing:",
          "content": "HTTP/1.1 422\n{\n    error:\"Report id or vote was not specified\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/lukeA/user/add-role",
    "title": "Add role",
    "name": "AddRole",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role that user needs.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a User</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          },
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, role was added successfully</p>"
          }
        ]
      }
    },
    "description": "<p>Adds role to a user if the role is not 'superadmin'. Addition of 'admin' requires superadmin rights.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/add-role?id=auth0|ej21oje10e212oe12&role=advanced",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Missing role:",
          "content": "HTTP/1.1 422\n{\n    error:\"Role not specified\"\n}",
          "type": "json"
        },
        {
          "title": "Invalid user id:",
          "content": "HTTP/1.1 404\n{\n    error:\"Invalid user id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeA/user/available",
    "title": "Check for username",
    "name": "AvailableUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username that user wants.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    exists:Boolean\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "exists",
            "description": "<p>If true, then username is already taken.</p>"
          }
        ]
      }
    },
    "description": "<p>Checks for Username availability</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/available?username=JohnDoe",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Missing Username:",
          "content": "HTTP/1.1 422\n{\n    error:\"Username not specified\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeA/user/ban",
    "title": "Ban",
    "name": "Ban",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a User</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, user was banned successfully</p>"
          }
        ]
      }
    },
    "description": "<p>Bans user with specified id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/ban?id=auth0|ej21oje10e212oe12",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Invalid user id:",
          "content": "HTTP/1.1 404\n{\n    error:\"Invalid user id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeA/user/delete",
    "title": "Delete",
    "name": "Delete",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User to be deleted.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success: \"removed N items\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Deleted the user by id.</p>",
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeA/user/delete-default-image",
    "title": "Delete default image",
    "name": "DeleteDefaultImage",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Default image name to be deleted.</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          },
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, deletion was successful</p>"
          }
        ]
      }
    },
    "description": "<p>Deletes default image from defaults.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/delete-default-image?name=dogs",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Fail:",
          "content": "HTTP/1.1 500\n{\n    error:\"Image deletion failed\"\n}",
          "type": "json"
        },
        {
          "title": "Missing/Incorrect url:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing/Incorrect url\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/images/lukeA/user/default",
    "title": "",
    "name": "GetImages",
    "group": "User",
    "description": "<p>Location of default user images. Access unique image by name.</p>",
    "examples": [
      {
        "title": "Example image_url:",
        "content": "http://balticapp.fi/images/lukeA/user/default/redTomato.jpg",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeA/user/roles",
    "title": "Get roles",
    "name": "GetRoles",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of a User</p>"
          }
        ],
        "Special Access Roles": [
          {
            "group": "Special Access Roles",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    String\n]",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "array",
            "description": "<p>Contains the roles of specified user</p>"
          }
        ]
      }
    },
    "description": "<p>Returns array of Strings, that are roles for the specified user (Admin only). If id was not specified the users' own roles are returned.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/roles?id=auth0|ej21oje10e212oe12",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Invalid user id:",
          "content": "HTTP/1.1 404\n{\n    error:\"Invalid user id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeA/user",
    "title": "Get user",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1\n{\n    id:String,\n    username:String,\n    image_url:String,\n    score: Number,\n    rankingId: String\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url of the image that User uses.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Experience of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rankingId",
            "description": "<p>Id of a rank that the User has.</p>"
          }
        ]
      }
    },
    "description": "<p>Id is mandatory.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user?id=auth0|21jeh192he921e2121",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 404\n{\n    error:\"No user with such id\"\n}",
          "type": "json"
        },
        {
          "title": "Missing id:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing id\"\n}",
          "type": "json"
        },
        {
          "title": "Invalid id:",
          "content": "HTTP/1.1 404\n{\n    error: 'No user with such id'\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeA/user/me",
    "title": "Get my info",
    "name": "GetUserMe",
    "group": "User",
    "parameter": {
      "fields": {
        "header": [
          {
            "group": "header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer id_token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1\n{\n    id:String,\n    username:String,\n    image_url:String,\n    score: Number,\n    rankingId: String\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url of the image that User uses.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Experience of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rankingId",
            "description": "<p>Id of a rank that the User has.</p>"
          }
        ]
      }
    },
    "description": "<p>Id is optional. If id not specified then function returns the users own information.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user?id=auth0|21jeh192he921e2121",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 404\n{\n    error:\"No user with such id\"\n}",
          "type": "json"
        },
        {
          "title": "In case unexpected:",
          "content": "HTTP/1.1 404\n{\n    error:\"Missing id\"\n}",
          "type": "json"
        },
        {
          "title": "Invalid id:",
          "content": "HTTP/1.1 404\n{\n    error: 'No user with such id'\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeA/user/get-all",
    "title": "Get all users",
    "name": "GetUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url of the image that User uses.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Experience of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rankingId",
            "description": "<p>Id of a rank that the User has.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n[{\n    id:String,\n    username:String,\n    image_url:String,\n    score: Number,\n    rankingId: String\n}]",
          "type": "json"
        }
      ]
    },
    "description": "<p>Returns array of json objects containing user information.</p>",
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeA/user/is-admin",
    "title": "Is Admin",
    "name": "IsAdmin",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, user is admin</p>"
          }
        ]
      }
    },
    "description": "<p>Checks if user is admin. Used for gui manipulation.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/is-admin",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeA/user/is-advanced",
    "title": "Is Advanced",
    "name": "IsAdvanced",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, user is advanced</p>"
          }
        ]
      }
    },
    "description": "<p>Checks if user is advanced. Used for gui manipulation.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/is-advanced",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "advanced",
            "description": ""
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeA/user/remove-role",
    "title": "Remove role",
    "name": "RemoveRole",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role that needs to be removed from user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a User</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          },
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, role was removed successfully</p>"
          }
        ]
      }
    },
    "description": "<p>Removes role from a user if the role is not 'superadmin'. Removing of 'admin' requires superadmin rights.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/remove-role?id=auth0|ej21oje10e212oe12&role=advanced",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Missing role:",
          "content": "HTTP/1.1 422\n{\n    error:\"Role not specified\"\n}",
          "type": "json"
        },
        {
          "title": "Invalid user id:",
          "content": "HTTP/1.1 404\n{\n    error:\"Invalid user id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeA/user/set-username",
    "title": "Set username",
    "name": "SetUsername",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username that user wants.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of a User. For admin.</p>"
          }
        ],
        "Special Access Roles": [
          {
            "group": "Special Access Roles",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, the username was set successfully</p>"
          }
        ]
      }
    },
    "description": "<p>User can set a username if one is available and he doesn't have it yet. Admin can set his own and other users usernames, if the specified username is available.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/set-username?username=JohnDoe",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Missing Username:",
          "content": "HTTP/1.1 422\n{\n    error:\"Username not specified\"\n}",
          "type": "json"
        },
        {
          "title": "Username un-available:",
          "content": "HTTP/1.1 422\n{\n    error:\"Username already exists\"\n}",
          "type": "json"
        },
        {
          "title": "Username already set:",
          "content": "HTTP/1.1 422\n{\n    error:\"Cannot modify existing value\",\n    auth: true\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeA/user/unban",
    "title": "Unban",
    "name": "Unban",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a User</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, user was un-banned successfully</p>"
          }
        ]
      }
    },
    "description": "<p>Unbans user with specified id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/ban?id=auth0|ej21oje10e212oe12",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Invalid user id:",
          "content": "HTTP/1.1 404\n{\n    error:\"Invalid user id\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/lukeA/user/update",
    "title": "Update user",
    "name": "UpdateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "image",
            "description": "<p>Image file that needs to be updated/uploaded</p>"
          }
        ],
        "Parameters Forbidden for Update": [
          {
            "group": "Parameters Forbidden for Update",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Users unique ID. For admin.</p>"
          },
          {
            "group": "Parameters Forbidden for Update",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Parameters Forbidden for Update",
            "type": "String",
            "optional": true,
            "field": "image_url",
            "description": "<p>URL to the image that the user is using</p>"
          },
          {
            "group": "Parameters Forbidden for Update",
            "type": "Number",
            "optional": true,
            "field": "score",
            "description": "<p>Experience of the User.</p>"
          },
          {
            "group": "Parameters Forbidden for Update",
            "type": "String",
            "optional": true,
            "field": "rankingId",
            "description": "<p>Id of a rank that the User has.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    id:String,\n    username:String,\n    image_url:String,\n    score: Number,\n    rankingId: String\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>Url of the image that User uses.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Experience of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rankingId",
            "description": "<p>Id of a rank that the User has.</p>"
          }
        ]
      }
    },
    "description": "<p><strong>Currently user can update only image by uploading it.</strong> Update function available for user to update his own profile. Id is optional. If id is specified and doesn't belong to the user, the user is checked for admin rights.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeA/user/update?id=auth0|21jeh192he921e2121&username=JohnDoe",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        },
        {
          "title": "Invalid id:",
          "content": "HTTP/1.1 404\n{\n    error: 'No user with such id'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/lukeA/user/upload-default-image",
    "title": "Upload default image",
    "name": "UploadDefaultImage",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image_name",
            "description": "<p>Image name without format</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "image",
            "description": "<p>Image file to be used as default image</p>"
          }
        ],
        "Required Role": [
          {
            "group": "Required Role",
            "optional": false,
            "field": "admin",
            "description": ""
          },
          {
            "group": "Required Role",
            "optional": false,
            "field": "superadmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If true, upload was successful</p>"
          }
        ]
      }
    },
    "description": "<p>Uploads default image for the user to view. The image then is accessible through /images/lukeA/user/default/image_name.jpeg</p>",
    "error": {
      "examples": [
        {
          "title": "Fail:",
          "content": "HTTP/1.1 500\n{\n    error:\"Image upload failed\"\n}",
          "type": "json"
        },
        {
          "title": "Missing name:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing name\"\n}",
          "type": "json"
        },
        {
          "title": "Login Error:",
          "content": "HTTP/1.1 401\n{\n    error:\"Authentication required\",\n    login:true\n}",
          "type": "json"
        },
        {
          "title": "Authorization Error:",
          "content": "HTTP/1.1 401\n{\n    error:'Proper authorization required',\n    auth:true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error": [
          {
            "group": "Error",
            "optional": false,
            "field": "4xx",
            "description": "<p>Status Code of the error</p>"
          },
          {
            "group": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>Error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeA/routes/user.js",
    "groupTitle": "User"
  }
] });
