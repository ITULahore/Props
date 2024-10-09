export const list= {
    Data : {

    Features: {

      export: {
        apiUrl: 'https://api.example.com/export',
        onExport: (exportType) => {  },
        exportOptions: {
          formats: ['CSV', 'PDF'],
          includeHeaders: true,
        },
        onSuccess: () => { alert('Export successful!') },
        onFailure: (error) => { alert(`Export failed: ${error.message}`) }
      },
      filter: {
        apiUrl: 'https://api.example.com/export',
        onFilter: (filterParams) => {  },
        filterOptions: {
          filterBy: ['status', 'category'],
          statusOptions: ['active', 'inactive'],
        }
      },
      sort: {
        apiUrl: 'https://api.example.com/export',
        defaultSortField: 'name',
        defaultSortOrder: 'asc',
        onSort: (sortBy) => { },
        multiColumnSort: true,
      },
      search: {
        apiUrl: 'https://api.example.com/export',
        searchFields: ['name', 'email'],
        onSearch: (query) => { },
        onAdvancedSearch: (criteria) => {  },
      },
      list: {
        coloumnsHeaders: ['Name', 'Email', 'Status', 'Actions'],

        apiUrl: 'https://api.example.com/export',
        onRowClick: (rowData) => { },
        onRowDoubleClick: (rowData) => { },
        onRowSelect: (selectedRows) => { },
        onRowDeselect: (deselectedRows) => { },
        onRowExpand: (expandedRow) => { },
        onRowCollapse: (collapsedRow) => { },

      },
      
      pagination: {
        apiUrl: 'https://api.example.com/export',
        pageSize: 10,
        onPageSizeChange: (pageSize) => { },
        onPageChange: (page) => { },
      },
      grid  : {
        coloumnsHeaders: ['Name', 'Email', 'Status', 'Actions'],
        apiUrl: 'https://api.example.com/export',
        onRowClick: (rowData) => { },
        onRowDoubleClick: (rowData) => { },
        onRowSelect: (selectedRows) => { },
        onRowDeselect: (deselectedRows) => { },
        onRowExpand: (expandedRow) => { },
        onRowCollapse: (collapsedRow) => { },
      },
    },
  },
  Config : {
    
    viewMode: {
      list:true,
      grid:true
    },
    features: {
      multiStep: true,
      export:true,
      filter:true,
      sort:true,
      search:true,
      pagination:true,
      bulkActions:true,
      fetchData:true
    }
  },
   Appearance : {
export:{
  buttonStyle: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  modalStyle: {
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  modalButtonStyle: {
    cancelButton: {
      backgroundColor: '#ccc',
      color: '#333',
    },
    confirmButton: {
      backgroundColor: '#ff0000',
      color: '#fff',
    },
  }
},
filter:{
  buttonStyle: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  modalStyle: {
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  modalButtonStyle: {
    cancelButton: {
      backgroundColor: '#ccc',
      color: '#333',
    },
    confirmButton: {
      backgroundColor: '#ff0000',
      color: '#fff',
    },
  }
},
sort:{

  buttonStyle: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  modalStyle: {
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  modalButtonStyle: {
    cancelButton: {
      backgroundColor: '#ccc',
      color: '#333',
    },
    confirmButton: {
      backgroundColor: '#ff0000',
      color: '#fff',
    },
  }
},
  }
}
export const Graph=
{ 
     Data : {
    features: {
      fetchData: {
        apiUrl: 'https://api.example.com/graph-data',
        onFetch: (params) => { },
        fetchOptions: {
          graphTypes: ['Bar', 'Line', 'Pie'],
          includeLegend: true,
        },
        onSuccess: () => { alert('Graph data fetched successfully!') },
        onFailure: (error) => { alert(`Graph data fetch failed: ${error.message}`) },
      },
      update: {
        apiUrl: 'https://api.example.com/graph-update',
        onUpdate: (updateParams) => { },
        updateOptions: {
          autoRefresh: true,
          refreshInterval: 60000, // 60 seconds
        },
      },
      customize: {
        onCustomize: (customizeOptions) => { },
        customizeOptions: {
          colors: ['#007bff', '#28a745', '#dc3545'],
          displayGridLines: true,
        },
      },
    },
  },
  
   Config : {
    viewMode: {
      BarGraph: true,
      LineGraph:true,
      PieGraph:true
    },
    features: {
      fetchData: true,
      update: true,
      customize: true,
      export: true,
    }
  },
  
   Appearance : {
    fetchData: {
      buttonStyle: {
        backgroundColor: '#28a745',
        color: '#fff',
      },
      graphStyle: {
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      },
    },
    update: {
      buttonStyle: {
        backgroundColor: '#17a2b8',
        color: '#fff',
      },
      graphStyle: {
        backgroundColor: '#f9f9f9',
        color: '#000',
      },
    },
    customize: {
      buttonStyle: {
        backgroundColor: '#ff851b',
        color: '#fff',
      },
      modalStyle: {
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      },
    },
  }
}

export const Form={
     Data : {
        features: {
          multiStep:{
            currentStep:1,
            totalSteps:5
          },
          validation: [
            {

            onValidate: (formData) => { },
            validationOptions: {
              fields: ['name', 'email', 'password'],
              requiredFields: ['name', 'email'],
              fieldValidations: {
                email:()=>{},
                password:()=>{},
              },
            },
          },
          {

            onValidate: (formData) => { },
            validationOptions: {
              fields: ['phone Number', 'Address', 'Blood Type'],
              requiredFields: ['Phone Number', 'Address'],
              fieldValidations: {
                PhoneNumber:()=>{},
                Address:()=>{},
              },
            },
          }
        ],
          submission: {
            apiUrl: 'https://api.example.com/form-submit',
            onSubmit: (formData) => { },
            onSccess: () => { alert('Form submitted successfully!') },
            onFailure: (error) => { alert(`Form submission failed: ${error.message}`) },
          },
          reset: {
            onReset: () => { },
          },
        },
      },
      
       Config : {
        viewMode: {
        ModalView:true,
        },
        features: {
          validation: true,
          submission: true,
          reset: true,
          multiStep:true
        }
      },
      
       Appearance : {
        validation: {
          fieldStyle: {
            backgroundColor: '#f1f1f1',
            color: '#333',
            borderRadius: '5px',
            padding: '10px',
          },
          errorStyle: {
            color: '#ff0000',
          },
        },
        submission: {
          buttonStyle: {
            submitButton: {
              backgroundColor: '#007bff',
              color: '#fff',
            },
          },
          formStyle: {
            backgroundColor: '#fff',
            color: '#333',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          },
        },
        reset: {
          buttonStyle: {
            resetButton: {
              backgroundColor: '#ccc',
              color: '#333',
            },
          },
        },
      }
      
}