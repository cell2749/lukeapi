define({ "api": [
  {
    "type": "get",
    "url": "/lukeB/callback",
    "title": "Callback",
    "name": "Callback",
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
            "field": "Responds",
            "description": "<p>always 200 OK</p>"
          }
        ]
      }
    },
    "description": "<p>Callback url for the auth0 authentication redirect_url. Returns always OK. Should be checked for client uri variables.</p>",
    "version": "0.0.0",
    "filename": "routes/lukeB/lukeApp.js",
    "groupTitle": "Auth0"
  },
  {
    "type": "get",
    "url": "/lukeB/authzero",
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
        "content": "http://balticapp.fi/lukeB/authzero",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/lukeApp.js",
    "groupTitle": "Auth0"
  },
  {
    "type": "get",
    "url": "/lukeB/login",
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
            "description": "<p>Bearer id_token</p>"
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
            "description": "<p>Responds with HTTP/1.1 200 OK on successful authentication</p>"
          }
        ]
      }
    },
    "description": "<p>Meant to be used instead of callback in case redirection is not needed. Note that this route is not specified as a callback, therefore it has to be called manually. (!Note: token is either manipulated automatically or you will have to send it manually)</p>",
    "version": "0.0.0",
    "filename": "routes/lukeB/lukeApp.js",
    "groupTitle": "Auth0"
  },
  {
    "type": "post",
    "url": "/lukeB/category/create",
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
            "description": "<p>Image file that is to be used as categories image/icon</p>"
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
          "content": "HTTP/1.1 200\n{\n    id:String,\n    title:String,\n    description:String,\n    image_url:String\n}",
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
            "description": "<p>Category id</p>"
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
            "description": "<p>Link to image/icon that category uses</p>"
          }
        ]
      }
    },
    "description": "<p>Creates category using provided parameters. Title required. Returns created category.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "//POST REQUEST EXAMPLE",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
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
    "filename": "routes/lukeB/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/lukeB/category",
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
            "description": "<p>Id of a category to be viewed</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Multiple:",
          "content": "HTTP/1.1 200\n[{\n    id:String,\n    title:String,\n    description:String,\n    image_url:String\n}]",
          "type": "json"
        },
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200\n{\n    id:String,\n    title:String,\n    description:String,\n    image_url:String\n}",
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
            "description": "<p>Category id</p>"
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
            "description": "<p>Link to image/icon that category uses</p>"
          }
        ]
      }
    },
    "description": "<p>Returns All categories or category by provided id. Open to all.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/category",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/lukeB/category/remove",
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
            "description": "<p>Id of the category to be updated</p>"
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
            "field": "advanced",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Remove category by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/category/remove?id=e2921y8998e1",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/category.js",
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
    "type": "post",
    "url": "/lukeB/category/update",
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
            "description": "<p>Category id</p>"
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
            "description": "<p>Image file that is to be used as categories image/icon</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    id:String,\n    title:String,\n    description:String,\n    image_url:String\n}",
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
            "description": "<p>Category id</p>"
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
            "description": "<p>Link to image/icon that category uses</p>"
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
    "description": "<p>Updates category by id, using parameters provided. Returns updated category. *Image update requires testing.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "//POST REQUEST EXAMPLE",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/category.js",
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
    "type": "post",
    "url": "/lukeB/comment/create",
    "title": "Create",
    "name": "Create",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reportId",
            "description": "<p>Id of the report which was commented</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "text",
            "description": "<p>Comment message/text</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "location",
            "description": "<p>Json] object containing information on where the user commented</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "location.long",
            "description": "<p>Longitude of the point from where the user commented</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "location.lat",
            "description": "<p>Latitude of the point from where the user commented</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n    id: String,\n    profileId:String,\n    reportId:String,\n    text:String,\n    date:String,\n    votes:[{\n        profileId: String,\n        date: String,\n        vote: Boolean\n    }],\n    location: {\n        long: Number,\n        lat: Number\n    },\n    flagged: Boolean\n}",
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
            "description": "<p>Id of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profileId",
            "description": "<p>Id of the user who posted the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reportId",
            "description": "<p>Id of the report which was commented</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Comment message/text</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date when comment was made</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "votes",
            "description": "<p>Array containing information related to rating of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "votes.profileId",
            "description": "<p>Id of the user who voted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "votes.date",
            "description": "<p>Date when he voted</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "votes.vote",
            "description": "<p>True - upvote, False - downvote</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>Json object containing information on where the user commented</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "location.long",
            "description": "<p>Longitude of the point from where the user commented</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "location.lat",
            "description": "<p>Latitude of the point from where the user commented</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "flagged",
            "description": "<p>Flag, if true comment is inappropriate and should be removed/hidden</p>"
          }
        ]
      }
    },
    "description": "<p>Adds comment to a report.</p>",
    "error": {
      "examples": [
        {
          "title": "Missing id:",
          "content": "HTTP/1.1 422\n{\n    error:\"Missing id\"\n}",
          "type": "json"
        },
        {
          "title": "Url error:",
          "content": "HTTP/1.1 422\n{\n    error:\"No urls are allowed\"\n}",
          "type": "json"
        },
        {
          "title": "Wrong id:",
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
    "filename": "routes/lukeB/routes/comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/lukeB/place/downvote",
    "title": "Downvote",
    "name": "Downvote",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the comment to be upvoted</p>"
          }
        ]
      }
    },
    "description": "<p>Downvote comment by id</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/comment/downvote?id=28h2e82818210u",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/comment.js",
    "groupTitle": "Comment",
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
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ]
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
            "description": "<p>True if voting was successful</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeA/place/downvote-count",
    "title": "Downvote count",
    "name": "DownvoteCount",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the comment</p>"
          }
        ]
      }
    },
    "description": "<p>Returns count of downvotes of the comment by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/comment/downvote-count?id=y892128121u08",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/comment.js",
    "groupTitle": "Comment",
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
          "content": "HTTP/1.1 200\n{\n    count: Number\n}",
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
            "description": "<p>Vote count</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeB/comment",
    "title": "Get comment(s)",
    "name": "GetAll",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of a comment to be viewed</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Multiple:",
          "content": "HTTP/1.1 200 OK\n[{\n    id: String,\n    profileId: String,\n    reportId: String,\n    text:String,\n    date:String,\n    votes:[{\n        profileId: String,\n        date: String,\n        vote: Boolean\n    }],\n    location: {\n        long: Number,\n        lat: Number\n    },\n    flagged: Boolean\n}]",
          "type": "json"
        },
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n    id: String,\n    profileId:String,\n    reportId:String,\n    text:String,\n    date:String,\n    votes:[{\n        profileId: String,\n        date: String,\n        vote: Boolean\n    }],\n    location: {\n        long: Number,\n        lat: Number\n    },\n    flagged: Boolean\n}",
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
            "description": "<p>Id of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profileId",
            "description": "<p>Id of the user who posted the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reportId",
            "description": "<p>Id of the report which was commented</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Comment message/text</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date when comment was made</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "votes",
            "description": "<p>Array containing information related to rating of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "votes[]",
            "description": "<p>.profileId Id of the user who voted</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>Json object containing information on where the user commented</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "location.long",
            "description": "<p>Longitude of the point from where the user commented</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "location.lat",
            "description": "<p>Latitude of the point from where the user commented</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "flagged",
            "description": "<p>Flag, if true comment is inappropriate and should be removed/hidden</p>"
          }
        ]
      }
    },
    "description": "<p>Returns All places or place by provided id. Open to all.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/comment?id=0je10122901e",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "post",
    "url": "/lukeB/comment/remove",
    "title": "remove",
    "name": "Remove",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the comment</p>"
          }
        ]
      }
    },
    "description": "<p>Removes comment of the report.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/comment/remove?id=e2921y8998e1",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/comment.js",
    "groupTitle": "Comment",
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
    "type": "post",
    "url": "/lukeB/comment/update",
    "title": "Update",
    "name": "Update",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the comment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "text",
            "description": "<p>Comment message/text</p>"
          }
        ]
      }
    },
    "description": "<p>Updates comment of the report.</p>",
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/comment.js",
    "groupTitle": "Comment",
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
            "description": "<p>True if update was successful</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeB/place/upvote",
    "title": "Upvote",
    "name": "Upvote",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the comment to be upvoted</p>"
          }
        ]
      }
    },
    "description": "<p>Upvote comment by id</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/comment/upvote?id=28h2e82818210u",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/comment.js",
    "groupTitle": "Comment",
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
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ]
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
            "description": "<p>True if voting was successful</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeA/place/upvote-count",
    "title": "Upvote count",
    "name": "UpvoteCount",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the comment</p>"
          }
        ]
      }
    },
    "description": "<p>Returns count of upvotes of the comment by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/comment/upvote-count?id=y892128121u08",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/comment.js",
    "groupTitle": "Comment",
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
          "content": "HTTP/1.1 200\n{\n    count: Number\n}",
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
            "description": "<p>Vote count</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeB/place/vote",
    "title": "vote",
    "name": "Vote",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the comment to be upvoted</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "vote",
            "description": "<p>If true - upvote, if false - downvote</p>"
          }
        ]
      }
    },
    "description": "<p>Vote comment by id using vote parameter.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/comment/vote?id=28h2e82818210u&vote=false",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/comment.js",
    "groupTitle": "Comment",
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
        },
        {
          "title": "Missing Vote:",
          "content": "HTTP/1.1 422\n{\n    success: \"Missing vote:true or false\"\n}",
          "type": "json"
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ]
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
            "description": "<p>True if voting was successful</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/lukeB/place/create",
    "title": "Create",
    "name": "Create",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "location",
            "description": "<p>Json] object containing location of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "location.long",
            "description": "<p>Longiture of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "location.lat",
            "description": "<p>Latitude of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>Type of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "radius",
            "description": "<p>Radius of the place</p>"
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
            "field": "advanced",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n    id:String,\n    title:String,\n    location:{\n        long:Number,\n        lat:Number\n    },\n    type:String,\n    votes:[{\n        profileId:String,\n        date:String,\n        vote:Boolean\n    }],\n    description:String,\n    nearReports:[{\n        reportId:String\n    }],\n    reportLog:[{\n        profileId:String,\n        date:String,\n        report:Boolean\n    }],\n    weatherData:{\n        temperature:Number,\n        seaTemperature:Number,\n        wind:Number\n    },\n    radius: Number\n}",
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
            "description": "<p>Place id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>Json object containing information about the place location</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "location.long",
            "description": "<p>Longitude of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "location.lat",
            "description": "<p>Latitude of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "votes",
            "description": "<p>Array of json objects containing votes</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "votes[]",
            "description": "<p>.profileId Id of the user who voted on this report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "nearReports",
            "description": "<p>Array of reports that are made withing the area of this place</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nearReports[]",
            "description": "<p>.reportId Id of the report as a reference</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reportLog",
            "description": "<p>Array containing visiting log of users</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reportLog.profileId",
            "description": "<p>Id of the user who visited the place</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reportLog.date",
            "description": "<p>Date when the place was visited by this user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "reportLog.report",
            "description": "<p>If true, user made submission in the area</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "weatherData",
            "description": "<p>Json object containing current weather data about the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weatherData.temperature",
            "description": "<p>Temperature at the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weatherData.seaTemperature",
            "description": "<p>Sea tempereature if the area provides such information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weatherData.wind",
            "description": "<p>Wind speed at the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "radius",
            "description": "<p>Radius of the area around the place</p>"
          }
        ]
      }
    },
    "description": "<p>Creates place using provided parameters. Title required. Returns created place.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "//POST REQUEST EXAMPLE",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
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
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place"
  },
  {
    "type": "get",
    "url": "/lukeB/place/downvote",
    "title": "Downvote",
    "name": "Downvote",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the place to be upvoted</p>"
          }
        ]
      }
    },
    "description": "<p>Downvote place by id</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/place/downvote?id=28h2e82818210u",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place",
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
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ]
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
            "description": "<p>True if voting was successful</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeA/place/downvote-count",
    "title": "Downvote count",
    "name": "DownvoteCount",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the place</p>"
          }
        ]
      }
    },
    "description": "<p>Returns count of downvotes of the place by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/place/downvote-count?id=y892128121u08",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place",
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
          "content": "HTTP/1.1 200\n{\n    count: Number\n}",
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
            "description": "<p>Vote count</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeB/place",
    "title": "Get place(s)",
    "name": "GetAll",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>Id of a place to be viewed</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Multiple:",
          "content": "HTTP/1.1 200 OK\n[{\n    id:String,\n    title:String,\n    location:{\n        long:Number,\n        lat:Number\n    },\n    type:String,\n    votes:[{\n        profileId:String,\n        date:String,\n        vote:Boolean\n    }],\n    description:String,\n    nearReports:[{\n        reportId:String\n    }],\n    reportLog:[{\n        profileId:String,\n        date:String,\n        report:Boolean\n    }],\n    weatherData:{\n        temperature:Number,\n        seaTemperature:Number,\n        wind:Number\n    },\n    radius: Number\n}]",
          "type": "json"
        },
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n    id:String,\n    title:String,\n    location:{\n        long:Number,\n        lat:Number\n    },\n    type:String,\n    votes:[{\n        profileId:String,\n        date:String,\n        vote:Boolean\n    }],\n    description:String,\n    nearReports:[{\n        reportId:String\n    }],\n    reportLog:[{\n        profileId:String,\n        date:String,\n        report:Boolean\n    }],\n    weatherData:{\n        temperature:Number,\n        seaTemperature:Number,\n        wind:Number\n    },\n    radius: Number\n}",
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
            "description": "<p>Place id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>Json object containing information about the place location</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "location.long",
            "description": "<p>Longitude of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "location.lat",
            "description": "<p>Latitude of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "votes",
            "description": "<p>Array of json objects containing votes</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "votes[]",
            "description": "<p>.profileId Id of the user who voted on this report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "nearReports",
            "description": "<p>Array of reports that are made withing the area of this place</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nearReports[]",
            "description": "<p>.reportId Id of the report as a reference</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reportLog",
            "description": "<p>Array containing visiting log of users</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reportLog.profileId",
            "description": "<p>Id of the user who visited the place</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reportLog.date",
            "description": "<p>Date when the place was visited by this user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "reportLog.report",
            "description": "<p>If true, user made submission in the area</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "weatherData",
            "description": "<p>Json object containing current weather data about the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weatherData.temperature",
            "description": "<p>Temperature at the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weatherData.seaTemperature",
            "description": "<p>Sea tempereature if the area provides such information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weatherData.wind",
            "description": "<p>Wind speed at the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "radius",
            "description": "<p>Radius of the area around the place</p>"
          }
        ]
      }
    },
    "description": "<p>Returns All places or place by provided id. Open to all.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/place",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place"
  },
  {
    "type": "get",
    "url": "/lukeB/place/remove",
    "title": "Remove",
    "name": "Remove",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the place to be updated</p>"
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
            "field": "advanced",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Remove place by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/place/remove?id=e2921y8998e1",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place",
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
    "type": "post",
    "url": "/lukeB/place/update",
    "title": "Update",
    "name": "Update",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the place to be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "location",
            "description": "<p>Json] object containing location of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "location.long",
            "description": "<p>Longitude of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "location.lat",
            "description": "<p>Latitude of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>Type of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the place</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "radius",
            "description": "<p>Radius of the place</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n    id:String,\n    title:String,\n    location:{\n        long:Number,\n        lat:Number\n    },\n    type:String,\n    votes:[{\n        profileId:String,\n        date:String,\n        vote:Boolean\n    }],\n    description:String,\n    nearReports:[{\n        reportId:String\n    }],\n    reportLog:[{\n        profileId:String,\n        date:String,\n        report:Boolean\n    }],\n    weatherData:{\n        temperature:Number,\n        seaTemperature:Number,\n        wind:Number\n    },\n    radius: Number\n}",
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
            "description": "<p>Place id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>Json object containing information about the place location</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "location.long",
            "description": "<p>Longitude of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "location.lat",
            "description": "<p>Latitude of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "votes",
            "description": "<p>Array of json objects containing votes</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "votes[]",
            "description": "<p>.profileId Id of the user who voted on this report</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "nearReports",
            "description": "<p>Array of reports that are made withing the area of this place</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nearReports[]",
            "description": "<p>.reportId Id of the report as a reference</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reportLog",
            "description": "<p>Array containing visiting log of users</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reportLog.profileId",
            "description": "<p>Id of the user who visited the place</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reportLog.date",
            "description": "<p>Date when the place was visited by this user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "reportLog.report",
            "description": "<p>If true, user made submission in the area</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "weatherData",
            "description": "<p>Json object containing current weather data about the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weatherData.temperature",
            "description": "<p>Temperature at the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weatherData.seaTemperature",
            "description": "<p>Sea tempereature if the area provides such information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weatherData.wind",
            "description": "<p>Wind speed at the place</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "radius",
            "description": "<p>Radius of the area around the place</p>"
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
    "description": "<p>Updates place by id, using parameters provided. Returns updated place.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "//POST REQUEST EXAMPLE",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place",
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
    "url": "/lukeB/place/upvote",
    "title": "Upvote",
    "name": "Upvote",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the place to be upvoted</p>"
          }
        ]
      }
    },
    "description": "<p>Upvote place by id</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/place/upvote?id=28h2e82818210u",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place",
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
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ]
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
            "description": "<p>True if voting was successful</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeA/place/upvote-count",
    "title": "Upvote count",
    "name": "UpvoteCount",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the place</p>"
          }
        ]
      }
    },
    "description": "<p>Returns count of upvotes of the place by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/place/upvote-count?id=y892128121u08",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place",
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
          "content": "HTTP/1.1 200\n{\n    count: Number\n}",
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
            "description": "<p>Vote count</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeB/place/vote",
    "title": "vote",
    "name": "Vote",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the place to be upvoted</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "vote",
            "description": "<p>If true - upvote, if false - downvote</p>"
          }
        ]
      }
    },
    "description": "<p>Vote place by id using vote parameter.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/place/vote?id=28h2e82818210u&vote=false",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place",
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
        },
        {
          "title": "Missing Vote:",
          "content": "HTTP/1.1 422\n{\n    success: \"Missing vote:true or false\"\n}",
          "type": "json"
        },
        {
          "title": "Banned:",
          "content": "HTTP/1.1 401\n{\n    error: 'You are banned from the service',\n    ban: true\n}",
          "type": "json"
        }
      ]
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
            "description": "<p>True if voting was successful</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeA/place/start-weather-update",
    "title": "Starts the weather update of places",
    "name": "WeatherUpdateStart",
    "group": "Place",
    "description": "<p>Initiated by admin or superadmin if server crashes.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/place/start-weather-update",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success: Started\n}",
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
            "description": "<p>Started indicated the initiation of the weather update.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place"
  },
  {
    "type": "get",
    "url": "/lukeA/place/stop-weather-update",
    "title": "stops the weather update of places",
    "name": "WeatherUpdateStop",
    "group": "Place",
    "description": "<p>Admin or superadmin can stop weather-update in case of errors/unexpected fees from http://openweathermap.org</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/place/stop-weather-update",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success: Stopped\n}",
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
            "description": "<p>Stopped indicated the termination of the weather update.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/place.js",
    "groupTitle": "Place"
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
            "description": "<p>Id of the report</p>"
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
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if approving was successful</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success:true\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Approves report by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/report/approve?id=y892128121u08",
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
    "filename": "routes/lukeB/routes/report.js",
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
            "description": "<p>Title of a report</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "location",
            "description": "<p>Json object containing longitude and latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "location.longitude",
            "description": "<p>Longtitude of a report</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "location.latitude",
            "description": "<p>Latitude of a report</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "image",
            "description": "<p>Image file to be used in a report</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of a report</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date",
            "description": "<p>Date when report was made*</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "categoryId",
            "description": "<p>Array containing category ids of a report</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: String,\n    title: String,\n    location: {\n        long: Number,\n        lat: Number\n    },\n    categoryId: [String],\n    image_url: String,\n    description: String,\n    profileId: String,\n    date: String,\n    votes:[{\n        profileId:String,\n        date:String,\n        vote:Boolean\n    }],\n    approved: Boolean,\n    flagged: Boolean\n}",
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
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>Json object containing longitude and latitude</p>"
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
            "type": "String",
            "optional": false,
            "field": "profileId",
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
    "description": "<p>Create report using provided parameters. Date is currently created on the server side. Maybe make it client side? Image not yet implemented. Returns created report.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "//POST REQUEST EXAMPLE",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/report.js",
    "groupTitle": "Report",
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
            "description": "<p>Id of the report</p>"
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
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if approving was successful</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success:true\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Disapproves report by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/report/disapprove?id=y892128121u08",
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
    "filename": "routes/lukeB/routes/report.js",
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
            "description": "<p>Id of the report</p>"
          }
        ]
      }
    },
    "description": "<p>Downvotes the report by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/report/downvote?id=y892128121u08",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/report.js",
    "groupTitle": "Report",
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
            "description": "<p>True if voting was successful</p>"
          }
        ]
      }
    }
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
            "description": "<p>Id of the report</p>"
          }
        ]
      }
    },
    "description": "<p>Returns count of downvotes of the report by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/report/downvote-count?id=y892128121u08",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/report.js",
    "groupTitle": "Report",
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
          "content": "HTTP/1.1 200\n{\n    count: Number\n}",
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
            "description": "<p>Vote count</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeB/report/flag",
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
            "description": "<p>True if report was flagged successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success:true\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Flags the report by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/report/flag?id=y892128121u08",
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
    "filename": "routes/lukeB/routes/report.js",
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
            "field": "profileId",
            "description": "<p>Filter results by submitters' id</p>"
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
          "title": "Success-Response-Multiple:",
          "content": "HTTP/1.1 200 OK\n[{\n    id: String,\n    title: String,\n    location: {\n        long: Number,\n        lat: Number\n    },\n    categoryId: [String],\n    image_url: String,\n    description: String,\n    profileId: String,\n    date: String,\n    votes:[{\n        profileId:String,\n        date:String,\n        vote:Boolean\n    }],\n    approved: Boolean,\n    flagged: Boolean\n}]",
          "type": "json"
        },
        {
          "title": "Success-Response-Single:",
          "content": "HTTP/1.1 200 OK\n{\n    id: String,\n    title: String,\n    location: {\n        long: Number,\n        lat: Number\n    },\n    categoryId: [String],\n    image_url: String,\n    description: String,\n    profileId: String,\n    date: String,\n    votes:[{\n        profileId:String,\n        date:String,\n        vote:Boolean\n    }],\n    approved: Boolean,\n    flagged: Boolean\n}",
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
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>Json object containing longitude and latitude</p>"
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
            "type": "String",
            "optional": false,
            "field": "profileId",
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
        "content": "http://balticapp.fi/lukeB/report?profileId=facebook|ad10ed1j2d010d21",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/report.js",
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
            "description": "<p>Id of the report to be removed</p>"
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
    "description": "<p>Removes the report by id. Admin can remove other users reports.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/report/remove?id=y892128121u08",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Access restriction:",
          "content": "HTTP/1.1 401\n{\n    error:\"Restricted Access\"\n}",
          "type": "json"
        },
        {
          "title": "Restricted access:",
          "content": "HTTP/1.1 401\n{\n    error:\"Restricted access\"\n}",
          "type": "json"
        },
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
    "filename": "routes/lukeB/routes/report.js",
    "groupTitle": "Report",
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
    "type": "get",
    "url": "/lukeB/report/unflag",
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
            "description": "<p>Id of the report</p>"
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
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if report was unflagged successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    success:true\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Unflags the report by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/report/unflag?id=y892128121u08",
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
    "filename": "routes/lukeB/routes/report.js",
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
            "description": "<p>Id of the report to be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of a report</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of a report</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "categoryId",
            "description": "<p>Array containing category ids of a report</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    id: String,\n    title: String,\n    location: {\n        long: Number,\n        lat: Number\n    },\n    categoryId: [String],\n    image_url: String,\n    description: String,\n    profileId: String,\n    date: String,\n    votes:[{\n        profileId:String,\n        date:String,\n        vote:Boolean\n    }],\n    approved: Boolean,\n    flagged: Boolean\n}",
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
            "type": "Object",
            "optional": false,
            "field": "location",
            "description": "<p>Json object containing longitude and latitude</p>"
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
            "type": "String",
            "optional": false,
            "field": "profileId",
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
    "description": "<p>Updates the report by id. Image is currently not updatable. Returns updated report.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "//POST REQUEST EXAMPLE",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Access restriction:",
          "content": "HTTP/1.1 401\n{\n    error:\"Restricted Access\"\n}",
          "type": "json"
        },
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 401\n{\n    error:\"No report with such id\"\n}",
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
    "filename": "routes/lukeB/routes/report.js",
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
            "description": "<p>Id of the report</p>"
          }
        ]
      }
    },
    "description": "<p>Upvotes the report by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/report/upvote?id=y892128121u08",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/report.js",
    "groupTitle": "Report",
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
            "description": "<p>True if voting was successful</p>"
          }
        ]
      }
    }
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
            "description": "<p>Id of the report</p>"
          }
        ]
      }
    },
    "description": "<p>Returns count of upvotes of the report by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/report/upvote-count?id=y892128121u08",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/report.js",
    "groupTitle": "Report",
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
          "content": "HTTP/1.1 200\n{\n    count: Number\n}",
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
            "description": "<p>Vote count</p>"
          }
        ]
      }
    }
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
            "description": "<p>Id of the report</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "vote",
            "description": "<p>true if upvote, false if downvote.</p>"
          }
        ]
      }
    },
    "description": "<p>Votes the report by id.</p>",
    "examples": [
      {
        "title": "Example URL:",
        "content": "http://balticapp.fi/lukeB/report/upvote?id=y892128121u08?vote=true",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/report.js",
    "groupTitle": "Report",
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
        },
        {
          "title": "Missing Vote:",
          "content": "HTTP/1.1 422\n{\n    success: \"Missing vote:true or false\"\n}",
          "type": "json"
        }
      ]
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
            "description": "<p>True if voting was successful</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lukeB/user/add-favourite-place",
    "title": "Add Favourite Place",
    "name": "AddFavouritePlace",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Place id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "favouriteTime",
            "description": "<p>String indicating users' time preference towards a place.</p>"
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
            "description": "<p>If true, the addition was successful.</p>"
          }
        ]
      }
    },
    "description": "<p>Adds place to user favourites by id.</p>",
    "examples": [
      {
        "title": "Example URL 1:",
        "content": "http://balticapp.fi/lukeB/user/add-favourite-place?id=19012h9120812&favouriteTime=Autumn",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Missing or wrong id:",
          "content": "HTTP/1.1 404\n{\n    error:\"No place with such id\"\n}",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeB/user/add-role",
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
        "content": "http://balticapp.fi/lukeB/user/add-role?id=auth0|ej21oje10e212oe12&role=advanced",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeB/user/available",
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
        "content": "http://balticapp.fi/lukeB/user/available?username=JohnDoe",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeB/user/ban",
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
        "content": "http://balticapp.fi/lukeB/user/ban?id=auth0|ej21oje10e212oe12",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeB/user/copy-profile",
    "title": "Copy Profile",
    "name": "CopyProfile",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "cpyImg",
            "defaultValue": "true",
            "description": "<p>If true sets the image provided by social media to be user image.</p>"
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
            "description": "<p>If true, the profile was copied successfully</p>"
          }
        ]
      }
    },
    "description": "<p>Adds social media profile that user has logged with to profile property. (Optional) Sets user image to one provided by social media. Returns error in case user has not logged through social network.</p>",
    "examples": [
      {
        "title": "Example URL 1:",
        "content": "http://balticapp.fi/lukeB/user/copy-profile?cpyImg=false",
        "type": "json"
      },
      {
        "title": "Example URL 2:",
        "content": "http://balticapp.fi/lukeB/user/copy-profile?cpyImg=0",
        "type": "json"
      },
      {
        "title": "Example URL 3:",
        "content": "http://balticapp.fi/lukeB/user/copy-profile",
        "type": "json"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Missing provider:",
          "content": "HTTP/1.1 404\n{\n    error:\"Error in reading social media profile data\"\n}",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeB/user/delete-default-image",
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
        "content": "http://balticapp.fi/lukeB/user/delete-default-image?name=dogs",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeB/user/get-all",
    "title": "Get All",
    "name": "GetAll",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users chosen username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users e-mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>URL to users image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bio",
            "description": "<p>Users biography</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Users location (country, town or city)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Users gender. String, not boolean? We support apaches?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hobby",
            "description": "<p>Users hobby</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "favouritePlaces",
            "description": "<p>Array of favourite places for user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "favouritePlaces[]",
            "description": "<p>.placeId Id of the place as reference</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "visitedPlaces",
            "description": "<p>Places that user has visited</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visitedPlaces[]",
            "description": "<p>.placeId Place Id as reference</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "profile",
            "description": "<p>Array containing links to social profiles of the user(Facebook, Twitter and etc.)* Note! Currently there is no way of linking multiple social profiles to 1 user. Even though if provider and link will be added, user won't be able to log in from more than 1 of the profiles. Ask Nikita more about this topic if you have any questions.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile[]",
            "description": "<p>.provider Social Provider (Facebook, Twitter, Google and etc.)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastOnline",
            "description": "<p>Date indicating last action of the user?</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "logTimes",
            "description": "<p>Array containing log in and log out times bound to certain places</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logTimes[]",
            "description": "<p>.locationId Place id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfComments",
            "description": "<p>Amount of comments user made</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfRatings",
            "description": "<p>Amount of hearts/flags user has given</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfReports",
            "description": "<p>Amount of reports user has made</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n[{\n    id:String,\n    username:String,\n    email:String,\n    image_url:String,\n    bio:String,\n    location:String,\n    gender:String,\n    hobby:String,\n    favouritePlaces:[{\n        placeId:String,\n        favouriteTime:String\n    }],\n    visitedPlaces:[{\n        placeId:String,\n        report:Boolean\n    }],\n    profile: [{\n        provider: String,\n        link: String\n    }],\n    lastOnline:String,\n    logTimes:[{\n        locationId:String,\n        timeLogIn:String,\n        timeLogOut:String,\n        numberOfComments:Number,\n        numberOfRatings:Number,\n        numberOfReports:Number\n    }]\n}]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "http://balticapp.fi/lukeB/user/get-all",
        "content": "http://balticapp.fi/lukeB/user/get-all",
        "type": "json"
      }
    ],
    "description": "<p>Returns Array of json objects containing users information. Requires Login.</p>",
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/user.js",
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
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/images/lukeB/user/default",
    "title": "Get Default Image(s)",
    "name": "GetImages",
    "group": "User",
    "description": "<p>Location of default user images. Access unique image by name. *Requires improvement.</p>",
    "examples": [
      {
        "title": "Example image_url:",
        "content": "http://balticapp.fi/images/lukeB/user/default/redTomato.jpg",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeB/user/roles",
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
        "content": "http://balticapp.fi/lukeB/user/roles?id=auth0|ej21oje10e212oe12",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeB/user",
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
            "description": "<p>User id that is to be returned. If not provided, users own information is returned.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users chosen username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users e-mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>URL to users image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bio",
            "description": "<p>Users biography</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Users location (country, town or city)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Users gender. String, not boolean? We support apaches?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hobby",
            "description": "<p>Users hobby</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "favouritePlaces",
            "description": "<p>Array of favourite places for user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "favouritePlaces[]",
            "description": "<p>.placeId Id of the place as reference</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "visitedPlaces",
            "description": "<p>Places that user has visited</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visitedPlaces[]",
            "description": "<p>.placeId Place Id as reference</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "profile",
            "description": "<p>Array containing links to social profiles of the user(Facebook, Twitter and etc.)* Note! Currently there is no way of linking multiple social profiles to 1 user. Even though if provider and link will be added, user won't be able to log in from more than 1 of the profiles. Ask Nikita more about this topic if you have any questions.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile[]",
            "description": "<p>.provider Social Provider (Facebook, Twitter, Google and etc.)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastOnline",
            "description": "<p>Date indicating last action of the user?</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "logTimes",
            "description": "<p>Array containing log in and log out times bound to certain places</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logTimes[]",
            "description": "<p>.locationId Place id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfComments",
            "description": "<p>Amount of comments user made</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfRatings",
            "description": "<p>Amount of hearts/flags user has given</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfReports",
            "description": "<p>Amount of reports user has made</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    id:String,\n    username:String,\n    email:String,\n    image_url:String,\n    bio:String,\n    location:String,\n    gender:String,\n    hobby:String,\n    favouritePlaces:[{\n        placeId:String,\n        favouriteTime:String\n    }],\n    visitedPlaces:[{\n        placeId:String,\n        report:Boolean\n    }],\n    profile: [{\n        provider: String,\n        link: String\n    }],\n    lastOnline:String,\n    logTimes:[{\n        locationId:String,\n        timeLogIn:String,\n        timeLogOut:String,\n        numberOfComments:Number,\n        numberOfRatings:Number,\n        numberOfReports:Number\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "http://balticapp.fi/lukeB/user?id=2u190e2u02190u",
        "content": "http://balticapp.fi/lukeB/user?id=2u190e2u02190u",
        "type": "json"
      }
    ],
    "description": "<p>Returns single json object containing user own information if no id was provided. Returns single json object containing user information if id was provided. Requires Login.</p>",
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/user.js",
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
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/lukeB/user/is-admin",
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
        "content": "http://balticapp.fi/lukeB/user/is-admin",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/user.js",
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
    "url": "/lukeB/user/is-advanced",
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
        "content": "http://balticapp.fi/lukeB/user/is-advanced",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/user.js",
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
    "url": "/lukeB/user/remove-favourite-place",
    "title": "Remove Favourite Place",
    "name": "RemoveFavouritePlace",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Place id</p>"
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
            "description": "<p>Always true</p>"
          }
        ]
      }
    },
    "description": "<p>Removes the place from favourites if it finds matching. Does not check for validity of id. Does not say if any place was removed.</p>",
    "examples": [
      {
        "title": "Example URL 1:",
        "content": "http://balticapp.fi/lukeB/user/remove-favourite-place?id=19012h9120812",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/lukeB/routes/user.js",
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
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/lukeB/user/remove-role",
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
        "content": "http://balticapp.fi/lukeB/user/remove-role?id=auth0|ej21oje10e212oe12&role=advanced",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeB/user/set-username",
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
        "content": "http://balticapp.fi/lukeB/user/set-username?username=JohnDoe",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/lukeB/user/unban",
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
        "content": "http://balticapp.fi/lukeB/user/ban?id=auth0|ej21oje10e212oe12",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/lukeB/user/update",
    "title": "Update",
    "name": "Update",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "description": "<p>User id that is to be updated. For admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Users e-mail</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "bio",
            "description": "<p>Users biography</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "location",
            "description": "<p>Users location (country, town or city)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>Users gender. String, not boolean? We support apaches?</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "hobby",
            "description": "<p>Users hobby</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "image",
            "description": "<p>Image file that is to be linked to user profile.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "favouritePlaces",
            "description": "<p>Array of favourite places for user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "favouritePlaces[]",
            "description": "<p>.placeId] Id of the place as reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "visitedPlaces",
            "description": "<p>Places that user has visited</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "visitedPlaces[]",
            "description": "<p>.placeId] Place Id as reference</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "profile",
            "description": "<p>Array containing links to social profiles of the user(Facebook, Twitter and etc.)* Note! Currently there is no way of linking multiple social profiles to 1 user. Even though if provider and link will be added, user won't be able to log in from more than 1 of the profiles. Ask Nikita more about this topic if you have any questions.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "profile[]",
            "description": "<p>.provider] Social Provider (Facebook, Twitter, Google and etc.)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users chosen username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users e-mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>URL to users image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bio",
            "description": "<p>Users biography</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Users location (country, town or city)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Users gender. String, not boolean? We support apaches?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hobby",
            "description": "<p>Users hobby</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "favouritePlaces",
            "description": "<p>Array of favourite places for user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "favouritePlaces[]",
            "description": "<p>.placeId Id of the place as reference</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "visitedPlaces",
            "description": "<p>Places that user has visited</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visitedPlaces[]",
            "description": "<p>.placeId Place Id as reference</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "profile",
            "description": "<p>Array containing links to social profiles of the user(Facebook, Twitter and etc.)* Note! Currently there is no way of linking multiple social profiles to 1 user. Even though if provider and link will be added, user won't be able to log in from more than 1 of the profiles. Ask Nikita more about this topic if you have any questions.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile[]",
            "description": "<p>.provider Social Provider (Facebook, Twitter, Google and etc.)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastOnline",
            "description": "<p>Date indicating last action of the user?</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "logTimes",
            "description": "<p>Array containing log in and log out times bound to certain places</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logTimes[]",
            "description": "<p>.locationId Place id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfComments",
            "description": "<p>Amount of comments user made</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfRatings",
            "description": "<p>Amount of hearts/flags user has given</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "numberOfReports",
            "description": "<p>Amount of reports user has made</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n    id:String,\n    username:String,\n    email:String,\n    image_url:String,\n    bio:String,\n    location:String,\n    gender:String,\n    hobby:String,\n    favouritePlaces:[{\n        placeId:String,\n        favouriteTime:String\n    }],\n    visitedPlaces:[{\n        placeId:String,\n        report:Boolean\n    }],\n    profile: [{\n        provider: String,\n        link: String\n    }],\n    lastOnline:String,\n    logTimes:[{\n        locationId:String,\n        timeLogIn:String,\n        timeLogOut:String,\n        numberOfComments:Number,\n        numberOfRatings:Number,\n        numberOfReports:Number\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Updates the user with specified parameters. Not every parameter is allowed to be updated. The ones that are listed are allowed. User doesn't have to specify his own id, if id is omitted then users own profile is updated. Only admin can update another users profile. Returns updated profile on success.</p>",
    "error": {
      "examples": [
        {
          "title": "Wrong id:",
          "content": "HTTP/1.1 404\n{\n    error: 'No user with such id'\n}",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/lukeB/user/upload-default-image",
    "title": "Upload default image",
    "name": "UploadDefaultImage",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
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
          "content": "HTTP/1.1 422\n{\n    error:\"Missing image_name\"\n}",
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
    "filename": "routes/lukeB/routes/user.js",
    "groupTitle": "User"
  }
] });
