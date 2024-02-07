-- Accounts table
CREATE TABLE Accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM ('parent', 'child', 'employee') NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
    subscribed BOOLEAN DEFAULT FALSE
    accepted BOOLEAN DEFAULT FALSE
);

-- EmployeeDetails table
CREATE TABLE EmployeeDetails (
    account_id INT NOT NULL UNIQUE,
    employee_id VARCHAR(255) NOT NULL UNIQUE,
    join_date DATE,
    employee_number VARCHAR(50),
    salary DECIMAL(10, 2),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE SET NULL
);

-- ParentDetails table
CREATE TABLE ParentDetails (
    account_id INT NOT NULL UNIQUE,
    parent_number VARCHAR(50),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE RESTRICT
);

-- Child table with the 'accepted' status specific to children
CREATE TABLE Child (
    account_id INT NOT NULL UNIQUE,
    parent_account_id INT NOT NULL,
    age INT,
    verbal BOOLEAN DEFAULT FALSE,
    special_needs TEXT,
    accepted BOOLEAN DEFAULT FALSE,  -- This status is specific to Child entities
    FOREIGN KEY (parent_account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE
);

-- Newsletters table for admin uploads
CREATE TABLE Newsletters (
    newsletter_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- communal eventss
CREATE TABLE Events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time DATETIME,
    end_time DATETIME,
    transport_details TEXT
);

-- event sign-ups
CREATE TABLE EventRegistrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    event_id INT,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE SET CASCADE
);    

-- event-specific waivers
CREATE TABLE EventWaivers (
    waiver_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    file_path VARCHAR(255) NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE SET NULL
);

-- for user-specific accessibility settings
CREATE TABLE AccessibilityOptions (
    accessibility_option_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL UNIQUE,
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
