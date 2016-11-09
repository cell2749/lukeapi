define({ "api": [
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
  }
] });
