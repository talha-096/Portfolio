-- Create portfolio_db on SQLEXPRESS instance
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'portfolio_db')
BEGIN
    CREATE DATABASE portfolio_db;
    PRINT 'Database portfolio_db CREATED successfully!';
END
ELSE
BEGIN
    PRINT 'Database portfolio_db already exists.';
END
GO

USE portfolio_db;
GO

-- Create portfolio schema
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'portfolio')
BEGIN
    EXEC('CREATE SCHEMA portfolio');
    PRINT 'Schema [portfolio] CREATED!';
END
ELSE
    PRINT 'Schema [portfolio] already exists.';
GO

-- Contact Messages table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'contact_messages' AND schema_id = SCHEMA_ID('portfolio'))
BEGIN
    CREATE TABLE portfolio.contact_messages (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(200) NOT NULL,
        email NVARCHAR(320) NOT NULL,
        subject NVARCHAR(500) NULL,
        message NVARCHAR(MAX) NOT NULL,
        ip_address NVARCHAR(45) NULL,
        is_emailed BIT DEFAULT 0,
        is_read BIT DEFAULT 0,
        created_at DATETIME2 DEFAULT GETUTCDATE()
    );
    PRINT 'Table portfolio.contact_messages CREATED!';
END
ELSE
    PRINT 'Table portfolio.contact_messages already exists.';
GO

-- NLP Logs table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'nlp_logs' AND schema_id = SCHEMA_ID('portfolio'))
BEGIN
    CREATE TABLE portfolio.nlp_logs (
        id INT IDENTITY(1,1) PRIMARY KEY,
        input_text NVARCHAR(MAX) NOT NULL,
        predicted_label NVARCHAR(100) NOT NULL,
        confidence_score FLOAT NOT NULL,
        ip_address NVARCHAR(45) NULL,
        created_at DATETIME2 DEFAULT GETUTCDATE()
    );
    PRINT 'Table portfolio.nlp_logs CREATED!';
END
ELSE
    PRINT 'Table portfolio.nlp_logs already exists.';
GO

-- Visitor Logs table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'visitor_logs' AND schema_id = SCHEMA_ID('portfolio'))
BEGIN
    CREATE TABLE portfolio.visitor_logs (
        id INT IDENTITY(1,1) PRIMARY KEY,
        page_visited NVARCHAR(500) NOT NULL,
        ip_address NVARCHAR(45) NULL,
        user_agent NVARCHAR(MAX) NULL,
        referrer NVARCHAR(500) NULL,
        created_at DATETIME2 DEFAULT GETUTCDATE()
    );
    PRINT 'Table portfolio.visitor_logs CREATED!';
END
ELSE
    PRINT 'Table portfolio.visitor_logs already exists.';
GO

-- API Request Logs table (stores all automated requests & messages logs)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'api_request_logs' AND schema_id = SCHEMA_ID('portfolio'))
BEGIN
    CREATE TABLE portfolio.api_request_logs (
        id INT IDENTITY(1,1) PRIMARY KEY,
        method NVARCHAR(10) NOT NULL,
        path NVARCHAR(500) NOT NULL,
        query_params NVARCHAR(MAX) NULL,
        status_code INT NOT NULL,
        execution_time_ms FLOAT NOT NULL,
        ip_address NVARCHAR(45) NULL,
        user_agent NVARCHAR(MAX) NULL,
        created_at DATETIME2 DEFAULT GETUTCDATE()
    );
    PRINT 'Table portfolio.api_request_logs CREATED!';
END
ELSE
    PRINT 'Table portfolio.api_request_logs already exists.';
GO

SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'portfolio';
GO

PRINT 'All portfolio tables ready on SQLEXPRESS!';
GO

