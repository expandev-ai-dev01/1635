/**
 * @schema functional
 * Contains the core business logic, entities, and operational tables for the application.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'functional')
BEGIN
    EXEC('CREATE SCHEMA functional');
END
GO

-- MARK: - Feature Tables Placeholder
-- All tables related to business features like tasks, categories, etc., will be defined here.
