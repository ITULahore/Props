export const list = {
  data: {
    features: {
      rowActions:[
        {
          name: 'Edit',
          serverCommunication: {
            data: {
              parameters: {
                fields: [
                  {
                    name: "Id",
                    required: true,
                    validation: () => { }
                  },
                  {
                    name: 'Name',
                    required: true,
                    validation: () => { },
                  },
                  {
                    name: 'Email',
                    required: true,
                    validation: () => { },
                  }
                ]
              },
              sagaCommunication: {
                apiActionType: "<Action>",
                permission: '<permission>',
                requestType: 'POST',
                apiUrl: "https://api.example.com/export",
                metaData: true,
                body: {},
                reduxActionType: '<Action>',
                onSuccess: () => { console.log(' successful!') },
                onFailure: (error) => { console.log(` failed: ${error.message}`) }
              }
            },
            config: {
              features: {
                tokenAuthentication: true,
                permission: true,
              }
            },
            response: {
            },
          },
          permission: '<permission>',
          onAction: (params) => { console.log("") },
          options: {
            icon: '<icon>',
            backgroundColor: '#007bff',
            color: '#fff',
          },
        },
        {
          name: 'Delete',
          permission: '<permission>',
          serverCommunication: {
            data: {
              parameters: {
                fields: [
                  {
                    name: "Id",
                    required: true,
                    validation: () => { }
                  },
                  {
                    name: 'Name',
                    required: true,
                    validation: () => { },
                  },
                  {
                    name: 'Email',
                    required: true,
                    validation: () => { },
                  }
                ]
              },
              sagaCommunication: {
                apiActionType: "<Action>",
                permission: '<permission>',
                requestType: 'POST',
                apiUrl: "https://api.example.com/export",
                metaData: true,
                body: {},
                reduxActionType: '<Action>',
                onSuccess: () => { console.log(' successful!') },
                onFailure: (error) => { console.log(` failed: ${error.message}`) }
              }
            },
            config: {
              features: {
                tokenAuthentication: true,
                permission: true,
              }
            },
            response: {
            },
          },
          onAction: (params) => { console.log("") },
          options: {
            icon: '<icon>',
            backgroundColor: '#ff0000',
            color: '#fff',
          },
        },
      ],
      export: {
        serverCommunication: {
          data: {
            parameters: {
              fields: [
                {
                  name: "Id",
                  required: true,
                  validation: () => { }
                },
                {
                  name: 'Name',
                  required: true,
                  validation: () => { },
                },
                {
                  name: 'Email',
                  required: true,
                  validation: () => { },
                }
              ]
            },
            sagaCommunication: {
              apiActionType: "EXPORT_DATA",
              permission: '<permission>',
              requestType: 'POST',
              apiUrl: "https://api.example.com/export",
              metaData: true,
              body: {},
              reduxActionType: 'EXPORT_DATA',
              onSuccess: () => { console.log(' successful!') },
              onFailure: (error) => { console.log(` failed: ${error.message}`) }
            }
          },
          config: {
            features: {
              tokenAuthentication: true,
              permission: true,
            }
          },
          response: {

          },
        },
    
        parameters: {
          fields: [
            {
              name: "Id",
              required: true,
              visibility: false,
              validation: () => { }
            },
            {
              name: 'Name',
              required: true,
              visibility: true,
              validation: () => { },
            },
            {
              name: 'Email',
              required: true,
              visibility: true,
              validation: () => { },
            }
          ]
        },
        permission: '<permission>',
        onAction: (params) => { console.log("") },
        options: {
          formats: ['CSV', 'PDF'],
          includeHeaders: true,
          icon: "",
        },
        onSuccess: () => { alert('Export successful!') },
        onFailure: (error) => { alert(`Export failed: ${error.message}`) }
      },
      filter: {
        parameters: {
        },
        serverCommunication: {
          data: {
            parameters: {
              fields: [
                {
                  name: "Id",
                  required: true,
                  validation: () => { }
                },
                {
                  name: 'Name',
                  required: true,
                  validation: () => { },
                },
                {
                  name: 'Email',
                  required: true,
                  validation: () => { },
                }
              ]
            },
            sagaCommunication: {
              apiActionType: "EXPORT_DATA",
              permission: '<permission>',
              requestType: 'POST',
              apiUrl: "https://api.example.com/export",
              metaData: true,
              body: {},
              reduxActionType: 'EXPORT_DATA',
              onSuccess: () => { console.log(' successful!') },
              onFailure: (error) => { console.log(` failed: ${error.message}`) }
            }
          },
          config: {
            features: {
              tokenAuthentication: true,
              permission: true,
            }
          },
          response: {
          },
        },
        permission: '<permission>',
        onAction: (params) => { console.log("") },
        options: {
          filterBy: ['status', 'category'],
          statusOptions: ['active', 'inactive'],
        }
      },
      sort: {
        serverCommunication: {
          data: {
            parameters: {
              fields: [
                {
                  name: "Id",
                  required: true,
                  validation: () => { }
                },
                {
                  name: 'Name',
                  required: true,
                  validation: () => { },
                },
                {
                  name: 'Email',
                  required: true,
                  validation: () => { },
                }
              ]
            },
            sagaCommunication: {
              apiActionType: "EXPORT_DATA",
              permission: '<permission>',
              requestType: 'POST',
              apiUrl: "https://api.example.com/export",
              metaData: true,
              body: {},
              reduxActionType: 'EXPORT_DATA',
              onSuccess: () => { console.log(' successful!') },
              onFailure: (error) => { console.log(` failed: ${error.message}`) }
            }
          },
          config: {
            features: {
              tokenAuthentication: true,
              permission: true,
            }
          },
          response: {
          },
        },
        parameters: {
          fields: [
          ]
        },
        permission: '<permission>',
        onAction: (params) => { console.log("") },
        options: {
          defaultSortField: 'name',
          defaultSortOrder: 'asc',
          multiColumnSort: true,
        }
      },
      list: {
        serverCommunication: {
          data: {
            parameters: {
              fields: [
                {
                  name: "Id",
                  required: true,
                  validation: () => { }
                },
                {
                  name: 'Name',
                  required: true,
                  validation: () => { },
                },
                {
                  name: 'Email',
                  required: true,
                  validation: () => { },
                }
              ]
            },
            sagaCommunication: {
              apiActionType: "EXPORT_DATA",
              permission: '<permission>',
              requestType: 'POST',
              apiUrl: "https://api.example.com/export",
              metaData: true,
              body: {},
              reduxActionType: 'EXPORT_DATA',
              onSuccess: () => { console.log(' successful!') },
              onFailure: (error) => { console.log(` failed: ${error.message}`) }
            }
          },
          config: {
            features: {
              tokenAuthentication: true,
              permission: true,
            }
          },
          response: {
          },
        },
        parameters: {
          fields: []
        },
        permission: '<permission>',
        onAction: (params) => { console.log("") },
        options: { columns: ['Name', 'Email', 'Status', 'Actions'] },
      },
      pagination:
      {
        parameters: {
          fields: []
        },
        permission: '<data>',
        serverCommunication: {
          data: {
            parameters: {
              fields: [
                {
                  name: "Id",
                  required: true,
                  validation: () => { }
                },
                {
                  name: 'Name',
                  required: true,
                  validation: () => { },
                },
                {
                  name: 'Email',
                  required: true,
                  validation: () => { },
                }
              ]
            },
            sagaCommunication: {
              apiActionType: "<Action>",
              permission: '<permission>',
              requestType: 'POST',
              apiUrl: "https://api.example.com/export",
              metaData: true,
              body: {},
              reduxActionType: '<Action>',
              onSuccess: () => { console.log(' successful!') },
              onFailure: (error) => { console.log(` failed: ${error.message}`) }
            }
          },
          config: {
            features: {
              tokenAuthentication: true,
              permission: true,
            }
          },
          response: {
          },
        },
        options: {
          pageSize: 10,
          pageSizeOptions: [5, 10, 20],
        },
        onAction: (params) => { console.log("") },
      },
      bulkAction: {
        parameters: {
          fields: [
            {
              name: "Id",
              required: true,
              visibility: false,
              validation: () => { }
            },
            {
              name: 'Name',
              required: true,
              visibility: true,
              validation: () => { },
            },
            {
              name: 'Email',
              required: true,
              visibility: true,
              validation: () => { },
            }
          ]
        },
        permission: '<permission>',
        serverCommunication: {
          data: {
            parameters: {
              fields: [
                {
                  name: "Id",
                  required: true,
                  validation: () => { }
                },
                {
                  name: 'Name',
                  required: true,
                  validation: () => { },
                },
                {
                  name: 'Email',
                  required: true,
                  validation: () => { },
                }
              ]
            },
            sagaCommunication: {
              apiActionType: "<Action>",
              permission: '<permission>',
              requestType: 'POST',
              apiUrl: "https://api.example.com/export",
              metaData: true,
              body: {},
              reduxActionType: '<Action>',
              onSuccess: () => { console.log(' successful!') },
              onFailure: (error) => { console.log(` failed: ${error.message}`) }
            }
          },
          config: {
            features: {
              tokenAuthentication: true,
              permission: true,
            }
          },
          response: {
          },
        },
        options: {
          actions: ['Delete', 'Archive'],
        },
        onAction: (params) => { console.log("") },

      },
    },
  },
  config: {
    viewMode: {
      presentation: [
        "List", "Grid", "Card", "Table"
      ]
    },
    features: { export: true, filter: true, sort: true, search: true, pagination: true, bulkAction: true },
  },
  appearance: {
    export:
    {
    button:[
      {
        type: "confirm",
        backgroundColor: '#007bff',
        color: '#fff',
      },
      {
        type: "cancel",
        backgroundColor: '#ccc',
        color: '#333',
      },
    ]
    },
    filter:[
      {
        type: "text",
        backgroundColor: '#007bff',
        color: '#fff',
      },
      {
        type: "dropdown",
        backgroundColor: '#007bff',
        color: '#fff',
      },
      {
        type: "date",
        backgroundColor: '#007bff',
        color: '#fff',
      },
    ]

  }

};

export const graph = {
  data: {
    features: {
      graph: {
        serverCommunication: {
          data: {
            parameters: {
              fields: [
                {
                  name: "Id",
                  required: true,
                  validation: () => { }
                },
                {
                  name: 'Name',
                  required: true,
                  validation: () => { },
                },
                {
                  name: 'Email',
                  required: true,
                  validation: () => { },
                }
              ]
            },
            sagaCommunication: {
              apiActionType: "<Action>",
              permission: '<permission>',
              requestType: 'GET',
              apiUrl: "https://api.example.com/graph",
              metaData: true,
              reduxActionType: '<Action>',
              onSuccess: () => { console.log(' successful!') },
              onFailure: (error) => { console.log(` failed: ${error.message}`) }
            }
          },
          config: {
            features: {
              tokenAuthentication: true,
              permission: true,
            }
          },
          response: {
          },
        },
        parameters: {
          fields: []
        },
        permission: '<permission>',
        onAction: (params) => { console.log('Fetching graph data...') },
        options: {
          includeLegend: true,
        },
      },

    },
  },
  config: {
    viewMode: {
      presentation: ['Bar', 'Line', 'Pie'],
    },
    features: { graph: true },
  },
  appearance: {
    features: {
      graph: 
       [
        {
          type: "Bar",
          backgroundColor: '#007bff',
          color: '#fff',
        },
        {
          type: "Line",
          backgroundColor: '#007bff',
          color: '#fff',
        },
        {
          type: "Pie",
          backgroundColor: '#007bff',
          color: '#fff',
        },
       ]
      
    },
  },
};


export const form = {
  data: {
    features: {

      submission: [
        {
          serverCommunication: {
            data: {
              parameters: {
              },
              sagaCommunication: {
                apiActionType: "<Action>",
                permission: 'permission',
                requestType: 'POST',
                apiUrl: "https://api.example.com/export",
                metaData: true,
                body: {},
                reduxActionType:  "<Action>",
                onSuccess: () => { console.log(' successful!') },
                onFailure: (error) => { console.log(` failed: ${error.message}`) }
              }
            },
            config: {
              features: {
                tokenAuthentication: true,
                permission: true,
              }
            },
            response: {
            },
          },
          parameters: {
            fields: [
            ]
          },
          permission: '<permission>',
          onAction: (formData) => { console.log('Submitting form...') },
          options: {
          },
        },
        {
          serverCommunication: {
            data: {
              parameters: {
                fields: [
                  {
                    name: "Phone Number",
                    required: true,
                    validation: () => { }
                  },
                  {
                    name: 'Blood Type',
                    required: true,
                    validation: () => { },
                  },
                  {
                    name: 'Contact Number',
                    required: true,
                    validation: () => { },
                  }
                ]
              },
              sagaCommunication: {
                apiActionType: "<Action>",
                permission: '<permission>',
                requestType: 'POST',
                apiUrl: "https://api.example.com/export",
                metaData: true,
                body: {},
                reduxActionType: '<Action>',
                onSuccess: () => { console.log(' successful!') },
                onFailure: (error) => { console.log(` failed: ${error.message}`) }
              }
            },
            config: {
              features: {
                tokenAuthentication: true,
                permission: true,
              }
            },
            response: {
            },
          },
          parameters: {
            fields: [
              {
                name: 'Phone Number',
                required: true,
                visibility: true,
                validation: () => { },
              },
              {
                name: 'Blood Type',
                required: true,
                visibility: true,
                validation: () => { },
              },
            ]
          },
          permission: '<permission>',
          onAction: (formData) => { console.log('Submitting form...') },
          options: {
            submitMethod: 'POST',
          },
        }

      ],

    },
  },
  config: {
    viewMode: {
      presentation: ['Form', "modalView"],
      mode: ["create", "edit", "view"]
    },
    features: { submission: true },
  },
  appearance: {
    features: {

      submission: {
        button: [{
          type: "confirm",
          backgroundColor: '#007bff',
          color: '#fff',
        },
        {
          type: "cancel",
          backgroundColor: '#ccc',
          color: '#333',
        },
        ],
      },

    },
  },
};
