/**
 * @schema subscription
 * Handles account management, multi-tenancy, and subscription plans.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'subscription')
BEGIN
    EXEC('CREATE SCHEMA subscription');
END
GO

/**
 * @table account Stores information about each tenant account in the system.
 * @multitenancy false (This table defines the tenants)
 * @softDelete true
 * @alias acc
 */
CREATE TABLE [subscription].[account] (
    [idAccount] INT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    [dateCreated] DATETIME2 NOT NULL,
    [dateModified] DATETIME2 NOT NULL,
    [deleted] BIT NOT NULL
);
GO

/**
 * @primaryKey pkAccount
 * @keyType Object
 */
ALTER TABLE [subscription].[account]
ADD CONSTRAINT [pkAccount] PRIMARY KEY CLUSTERED ([idAccount]);
GO

/**
 * @default dfAccount_DateCreated
 */
ALTER TABLE [subscription].[account]
ADD CONSTRAINT [dfAccount_DateCreated] DEFAULT (GETUTCDATE()) FOR [dateCreated];
GO

/**
 * @default dfAccount_DateModified
 */
ALTER TABLE [subscription].[account]
ADD CONSTRAINT [dfAccount_DateModified] DEFAULT (GETUTCDATE()) FOR [dateModified];
GO

/**
 * @default dfAccount_Deleted
 */
ALTER TABLE [subscription].[account]
ADD CONSTRAINT [dfAccount_Deleted] DEFAULT (0) FOR [deleted];
GO

/**
 * @index uqAccount_Name Enforces unique account names for active accounts.
 * @type Search
 * @unique true
 * @filter Ensures uniqueness only among non-deleted accounts.
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqAccount_Name]
ON [subscription].[account]([name])
WHERE [deleted] = 0;
GO
