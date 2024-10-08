import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CollapsibleDocPage from './DocumentationPage';

const App = () => {
  const Data = {
    items: [],
    columns: [],
    apiAction: {},
    actions: [
      {
        label: 'Edit',
        onClick: (itemId) => { },
        permission: 'edit_user',
        confirmationMessages: {
          update: {
            title: 'Confirm Update',
            message: 'Are you sure you want to update this item?',
            buttons: [
              { label: 'Cancel', action: 'cancel' },
              { label: 'Update', action: 'confirm' },
            ],
          },
        },
      },
      { 
        label: 'Delete',
        onClick: (itemId) => { },
        permission: 'delete_user',
        confirmationMessages: {
          delete: {
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
              { label: 'Cancel', action: 'cancel' },
              { label: 'Delete', action: 'confirm' },
            ],
          },
        },
      }
    ],
    features: {
      export: {
        onExport: (exportType) => {  },
        exportOptions: {
          formats: ['CSV', 'PDF'],
          includeHeaders: true,
        },
        onSuccess: () => { alert('Export successful!') },
        onFailure: (error) => { alert(`Export failed: ${error.message}`) }
      },
      filter: {
        onFilter: (filterParams) => {  },
        filterOptions: {
          filterBy: ['status', 'category'],
          statusOptions: ['active', 'inactive'],
        }
      },
      sort: {
        defaultSortField: 'name',
        defaultSortOrder: 'asc',
        onSort: (sortBy) => { },
        multiColumnSort: true,
      },
      search: {
        searchFields: ['name', 'email'],
        onSearch: (query) => { },
        onAdvancedSearch: (criteria) => {  },
      },
    },
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalPages: 20,
      onPageChange: (newPage) => {  },
    },
    batchActions: [
      {
        label: 'Bulk Delete',
        permission: 'bulk_delete',
        onClick: (selectedItems) => {  },
        confirmationMessages: {
          delete: {
            title: 'Confirm Bulk Delete',
            message: 'Are you sure you want to delete these items?',
            buttons: [
              { label: 'Cancel', action: 'cancel' },
              { label: 'Delete', action: 'confirm' },
            ],
          },
        },
      },
    ],
  };
  

  const config = {
    viewMode: 'list',
    showInDarkMode: true,
    multiStep: true,
    stepConfig: {
      currentStep: 0,
      totalSteps: 2,
    },
    features: [
      { 
        name: 'export', 
        enabled: false, 
        permission: 'export_users' 
      },
      { 
        name: 'filter', 
        enabled: true, 
        permission: 'filter_users' 
      },
      { 
        name: 'sort', 
        enabled: true, 
        permission: 'sort_users' 
      },
      { 
        name: 'search', 
        enabled: true, 
        permission: 'search_users' 
      }
    ]
  };
  
  
  const appearance = {
    containerStyle: {
      backgroundColor: '#333',
      color: '#fff',
    },
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
  };

  return (

   <CollapsibleDocPage Data={Data} config={config} appearance={appearance} />

  );
};

export default App;
