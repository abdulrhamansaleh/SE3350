import './styles/AdminHome.css'

import React, { useState } from 'react';
import NewsletterUpload from './NewsletterUpload';

const AdminPage = () => {
  const [currentView, setCurrentView] = useState('default');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'Upload Newsletters': 
      return <NewsletterUpload />
      case 'Upload Waiver':
        return <div></div>
      case 'Manage Users':
        return <div></div>
      case 'Reported Chats':
        return <div></div>
      case 'Site Reviews':
        return <div></div> 
      case 'Communal Calendar':
        return <div></div>
      default:
        return <div></div>;
    }
  };

  return (
    <div className="container">
      <AdminNavigation onLinkClick={handleViewChange} />
      <div className="admin-content-container">
        {renderContent()}
      </div>
    </div>
  );
};

const AdminNavigation = ({ onLinkClick }) => {
  return (
    <div id="sidebar">
      <div className="sidebar-header">
        <h3>Admin</h3>
      </div>
      <ul className="sidebar-menu">
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Upload Newsletters')}>Upload Newsletters</li>
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Upload Waiver')}>Upload Waiver</li>
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Manage Users')}>Manage Users</li>
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Reported Chats')}>Reported Chats</li>
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Site Reviews')}>Site Reviews</li>
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Communal Calendar')}>Communal Calendar</li>
      </ul>
    </div>
  );
};

export default AdminPage;


