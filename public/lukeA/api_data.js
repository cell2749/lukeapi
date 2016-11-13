define({ "api": [
  {
    "type": "get",
    "url": "/lukeA/callback",
    "title": "Callback",
    "name": "Callback",
    "group": "Auth0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "route",
            "description": "<p>Redirect route after successful authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Default",
            "description": "<p>Responds with HTTP/1.1 200 OK if route is not provided.</p>"
          }
        ]
      }
    },
    "description": "<p>Callback url for the auth0 setup. Can be used with parameters - route. After registering/checking the user in local database redirects to specified route or responds with OK 200.</p>",
    "version": "0.0.0",
    "filename": "routes/lukeA/lukeApp.js",
    "groupTitle": "Auth0"
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
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK",
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
    "description": "<p>Meant to be used instead of callback in case redirection is not needed. Note that this route is not specified as a callback, therefore it has to be called manually. (!Note: token is either manipulated automatically or you will have to send it manually)</p>",
    "version": "0.0.0",
    "filename": "routes/lukeA/lukeApp.js",
    "groupTitle": "Auth0"
  },
  {
    "type": "get",
    "url": "/lukeA/logout",
    "title": "Logout",
    "name": "Logout",
    "group": "Auth0",
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200\n{\n    success:true\n}",
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
            "description": "<p>True if logout is successful</p>"
          }
        ]
      }
    },
    "description": "<p>Logout function. Call this if user wants to logout from application. (!Note: token is either manipulated automatically or you will have to send it manually)</p>",
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
            "field": "id",
            "description": "<p>Id of the category</p>"
          },
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
            "type": "String",
            "optional": true,
            "field": "image_url",
            "description": "<p>Url of image/icon used by category</p>"
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
            "type": "String",
            "optional": true,
            "field": "image_url",
            "description": "<p>Url of image/icon used by category</p>"
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
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
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
    "description": "<p>Creates experience pattern. Returns created experience pattern.</p>",
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
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the rank</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "img",
            "description": "<p>Image file that is to be used as Rank icon</p>"
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
            "field": "img",
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
            "optional": false,
            "field": "title",
            "description": "<p>Title of the report</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "longitude",
            "description": "<p>Longitude of a point where report was made.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
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
            "type": "String",
            "optional": true,
            "field": "date",
            "description": "<p>Date when report was made.*Maybe should be restricted.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
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
          "content": "HTTP/1.1 200 OK\n{\n    id: String\n    longitude: Number,\n    latitude: Number,\n    altitude: Number,\n    image_url: String,\n    title: String,\n    description: String,\n    date: String,\n    categoryId: [\n        String\n    ],\n    rating: Number,\n    submitterId: String,\n    approved: Boolean,\n    flagged: Boolean,\n    votes: [\n       {\n            userId: String,\n            vote: Boolean\n        }\n    ]\n}",
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
    "description": "<p>Creates report with specified parameter. Some parameters are restricted from user to manage them. Returns the created report. Adds experience to user from active experience pattern. <strong>Requires active experience pattern!</strong> <strong>Implementation not rady yet due to image</strong></p>",
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
          "title": "Missing Title:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing Title\"\n}",
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
            "description": "<p>Id of a report to be flagged</p>"
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
            "description": "<p>If true, flagging was successful</p>"
          }
        ]
      }
    },
    "description": "<p>Flag the report with specified id. Currently there is no role restriction on the use of this function.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/report/flag?id=2121ge921ed123d1",
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
            "type": "Boolean",
            "optional": true,
            "field": "approved",
            "description": "<p>Filter results by approved value</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "flagged",
            "description": "<p>Filter results by flagged value</p>"
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
          "content": "HTTP/1.1 200 OK\n[{\n    id: String\n    longitude: Number,\n    latitude: Number,\n    altitude: Number,\n    image_url: String,\n    title: String,\n    description: String,\n    date: String,\n    categoryId: [\n        String\n    ],\n    rating: Number,\n    submitterId: String,\n    approved: Boolean,\n    flagged: Boolean,\n    votes: [\n       {\n            userId: String,\n            vote: Boolean\n        }\n    ]\n}]",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: String\n    longitude: Number,\n    latitude: Number,\n    altitude: Number,\n    image_url: String,\n    title: String,\n    description: String,\n    date: String,\n    categoryId: [\n        String\n    ],\n    rating: Number,\n    submitterId: String,\n    approved: Boolean,\n    flagged: Boolean,\n    votes: [\n       {\n            userId: String,\n            vote: Boolean\n        }\n    ]\n}",
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
    "description": "<p>Public access and registered users receive only filtered results (approved,!flagged). Admins and advanced users have more options to filter the results. Location filter is available for public. Returns single report in case id is specified.</p>",
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
          "title": "Id is missing or wrong:",
          "content": "HTTP/1.1 404\n{\n    error:\"No report with such id\"\n}",
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
    "type": "get",
    "url": "/lukeA/report/unflag",
    "title": "Unflag",
    "name": "Unflag",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of a report to be unflagged</p>"
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
            "description": "<p>If true, unflagging was successful</p>"
          }
        ]
      }
    },
    "description": "<p>Unflag the report with specified id. Only admin can unflag the report.</p>",
    "examples": [
      {
        "title": "Example:",
        "content": "http://balticapp.fi/lukeA/report/unflag?id=2121ge921ed123d1",
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
          "content": "HTTP/1.1 200 OK\n{\n    id: String\n    longitude: Number,\n    latitude: Number,\n    altitude: Number,\n    image_url: String,\n    title: String,\n    description: String,\n    date: String,\n    categoryId: [\n        String\n    ],\n    rating: Number,\n    submitterId: String,\n    approved: Boolean,\n    flagged: Boolean,\n    votes: [\n       {\n            userId: String,\n            vote: Boolean\n        }\n    ]\n}",
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
            "optional": true,
            "field": "id",
            "defaultValue": "Users own id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id:String,\n    username:String,\n    image_url:String,\n    score: Number,\n    rankingId: String\n}",
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
          "content": "HTTP/1.1 200 OK\n[{\n    id:String,\n    username:String,\n    image_url:String,\n    score: Number,\n    rankingId: String\n}]",
          "type": "json"
        }
      ]
    },
    "description": "<p>Returns array of json objects containing user information.</p>",
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
    "type": "get",
    "url": "/lukeA/user/update",
    "title": "Update user",
    "name": "UpdateUser",
    "group": "User",
    "parameter": {
      "fields": {
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
            "description": "<p>Url of the image that User uses.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    success:Boolean\n}",
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
            "description": "<p>If true, then at least one of the specified parameters was updated</p>"
          }
        ]
      }
    },
    "description": "<p><strong>Currently user can't update any of his own parameters.</strong> Update function available for user to update his own profile. Id is optional. If id is specified and doesn't belong to the user, the user is checked for admin rights.</p>",
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
  }
] });
