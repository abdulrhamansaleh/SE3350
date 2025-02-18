import './styles/AdminHome.css'

import React, { useState } from 'react';
import NewsletterUpload from './NewsletterUpload';
import ManageUsers from './ManageUsers';
import WaiverUpload from './WaiverUpload';
import AdminCommunalCalendar from '../admin/AdminCommunalCalendar';
import ManageEvents from './ManageEvents';
import SiteReviews from './SiteReviews';

const AdminPage = () => {
  const [currentView, setCurrentView] = useState('default');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'Upload Newsletters': 
      return <NewsletterUpload />
      case 'Manage Events':
        return <ManageEvents/>
      case 'Manage Users':
        return <ManageUsers/>
      case 'Reported Chats':
        return <div></div>
      case 'Site Reviews':
        return <SiteReviews/> 
      case 'Communal Calendar':
        return <div><AdminCommunalCalendar /></div>
      default:
        return <div><AdminCommunalCalendar /></div>;
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
      <ul className="sidebar-menu">
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Upload Newsletters')}>Upload Newsletters</li>
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Manage Events')}>Event Manager</li>
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Manage Users')}>Manage Users</li>
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Reported Chats')}>Reported Chats</li>
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Site Reviews')}>Site Reviews</li>
        <li className="admin-sidebar-link" onClick={() => onLinkClick('Communal Calendar')}>Communal Calendar</li>
      </ul>
    </div>
  );
};

export default AdminPage;


