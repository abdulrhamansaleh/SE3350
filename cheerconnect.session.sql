-- Use the appropriate database
CREATE DATABASE IF NOT EXISTS cheer;
USE your_database_name;

-- Dropping existing tables for a clean setup
DROP TABLE IF EXISTS TimeSheet;
DROP TABLE IF EXISTS AccessibilityOptions;
DROP TABLE IF EXISTS EventWaivers;
DROP TABLE IF EXISTS EventRegistrations;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Child;
DROP TABLE IF EXISTS Subscriptions;
DROP TABLE IF EXISTS Newsletters;
DROP TABLE IF EXISTS Accounts;

CREATE TABLE Accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    registration_reason TEXT,
    type ENUM('admin', 'parent', 'employee', 'child', 'user') NOT NULL,
    accepted BOOLEAN DEFAULT FALSE
);

-- StatusFlags table to manage user statuses
CREATE TABLE StatusFlags (
    flag_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    subscribed BOOLEAN DEFAULT FALSE,
    request_change BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);

-- Newsletters table for admin uploads
CREATE TABLE Newsletters (
    newsletter_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table to track newsletter subscriptions
CREATE TABLE Subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    newsletter_id INT,
    subscription_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
    FOREIGN KEY (newsletter_id) REFERENCES Newsletters(newsletter_id)
);

-- Child table for storing child account information
CREATE TABLE Child (
    child_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    age INT,
    verbal BOOLEAN DEFAULT FALSE,
    special_needs TEXT,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);

-- Events table for communal events
CREATE TABLE Events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time DATETIME,
    end_time DATETIME,
    transport_details TEXT
);

-- EventRegistrations table for event sign-ups
CREATE TABLE EventRegistrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    event_id INT,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

-- EventWaivers table for event-specific waivers
CREATE TABLE EventWaivers (
    waiver_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    file_path VARCHAR(255) NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

-- AccessibilityOptions table for user-specific accessibility settings
CREATE TABLE AccessibilityOptions (
    accessibility_option_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    text_to_speech_enabled BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);

-- TimeSheet table for recording employee work hours (to be implemented in the future phase)
CREATE TABLE TimeSheet (
    timesheet_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    clock_in_time DATETIME,
    clock_out_time DATETIME,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);
