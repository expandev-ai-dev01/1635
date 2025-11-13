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

/**
 * @table task Stores user-defined tasks.
 * @multitenancy true
 * @softDelete true
 * @alias tsk
 */
CREATE TABLE [functional].[task] (
  [idTask] INT IDENTITY(1, 1) NOT NULL,
  [idAccount] INT NOT NULL,
  [title] NVARCHAR(100) NOT NULL,
  [description] NVARCHAR(500) NOT NULL,
  [dueDate] DATE NULL,
  [priority] TINYINT NOT NULL,
  [status] TINYINT NOT NULL,
  [dateCreated] DATETIME2 NOT NULL,
  [dateModified] DATETIME2 NOT NULL,
  [deleted] BIT NOT NULL
);
GO

/**
 * @primaryKey pkTask
 * @keyType Object
 */
ALTER TABLE [functional].[task]
ADD CONSTRAINT [pkTask] PRIMARY KEY CLUSTERED ([idTask]);
GO

/**
 * @foreignKey fkTask_Account Links a task to a specific account for multi-tenancy.
 * @target subscription.account
 */
ALTER TABLE [functional].[task]
ADD CONSTRAINT [fkTask_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

/**
 * @check chkTask_Priority Ensures priority is within the allowed range.
 * @enum {0} Baixa
 * @enum {1} Média
 * @enum {2} Alta
 */
ALTER TABLE [functional].[task]
ADD CONSTRAINT [chkTask_Priority] CHECK ([priority] BETWEEN 0 AND 2);
GO

/**
 * @check chkTask_Status Ensures status is within the allowed range.
 * @enum {0} Pendente
 * @enum {1} Em Andamento
 * @enum {2} Concluída
 * @enum {3} Cancelada
 */
ALTER TABLE [functional].[task]
ADD CONSTRAINT [chkTask_Status] CHECK ([status] BETWEEN 0 AND 3);
GO

/**
 * @default dfTask_Priority Sets the default priority to 'Média' (1).
 */
ALTER TABLE [functional].[task]
ADD CONSTRAINT [dfTask_Priority] DEFAULT (1) FOR [priority];
GO

/**
 * @default dfTask_Status Sets the default status to 'Pendente' (0).
 */
ALTER TABLE [functional].[task]
ADD CONSTRAINT [dfTask_Status] DEFAULT (0) FOR [status];
GO

/**
 * @default dfTask_DateCreated Sets the creation date to the current UTC date and time.
 */
ALTER TABLE [functional].[task]
ADD CONSTRAINT [dfTask_DateCreated] DEFAULT (GETUTCDATE()) FOR [dateCreated];
GO

/**
 * @default dfTask_DateModified Sets the modification date to the current UTC date and time.
 */
ALTER TABLE [functional].[task]
ADD CONSTRAINT [dfTask_DateModified] DEFAULT (GETUTCDATE()) FOR [dateModified];
GO

/**
 * @default dfTask_Deleted Sets the soft delete flag to false (0) by default.
 */
ALTER TABLE [functional].[task]
ADD CONSTRAINT [dfTask_Deleted] DEFAULT (0) FOR [deleted];
GO

/**
 * @index ixTask_Account Optimizes queries filtered by account.
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixTask_Account]
ON [functional].[task]([idAccount])
WHERE [deleted] = 0;
GO

/**
 * @index uqTask_Account_Title Enforces unique task titles per account for active tasks.
 * @type Search
 * @unique true
 * @filter Ensures uniqueness only among non-deleted tasks.
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqTask_Account_Title]
ON [functional].[task]([idAccount], [title])
WHERE [deleted] = 0;
GO
