/**
 * @summary
 * Creates a new task for a given account with specified details.
 * 
 * @procedure spTaskCreate
 * @schema functional
 * @type stored-procedure
 * 
 * @endpoints
 * - POST /api/v1/internal/task
 * 
 * @parameters
 * @param {INT} idAccount 
 *   - Required: Yes
 *   - Description: The identifier of the account to which the task belongs.
 * @param {NVARCHAR(100)} title
 *   - Required: Yes
 *   - Description: The title of the task.
 * @param {NVARCHAR(500)} description
 *   - Required: Yes
 *   - Description: The detailed description of the task.
 * @param {DATE} dueDate
 *   - Required: No
 *   - Description: The due date for the task. Must be a future date if provided.
 * @param {TINYINT} priority
 *   - Required: Yes
 *   - Description: The priority of the task (0: Baixa, 1: Média, 2: Alta).
 * 
 * @testScenarios
 * - Create a task with all parameters.
 * - Create a task with only required parameters.
 * - Attempt to create a task with a duplicate title for the same account.
 * - Attempt to create a task with a past due date.
 */
CREATE OR ALTER PROCEDURE [functional].[spTaskCreate]
    @idAccount INT,
    @title NVARCHAR(100),
    @description NVARCHAR(500),
    @dueDate DATE,
    @priority TINYINT
AS
BEGIN
    SET NOCOUNT ON;

    /**
     * @validation Ensure the provided idAccount exists and is active.
     * @throw {AccountNotFound}
     */
    IF NOT EXISTS (SELECT 1 FROM [subscription].[account] WHERE [idAccount] = @idAccount AND [deleted] = 0)
    BEGIN
        ;THROW 51000, 'AccountNotFound', 1;
    END

    /**
     * @validation Ensure the due date is not in the past.
     * @throw {DueDateCannotBeInThePast}
     */
    IF (@dueDate IS NOT NULL AND @dueDate < CAST(GETUTCDATE() AS DATE))
    BEGIN
        ;THROW 51000, 'DueDateCannotBeInThePast', 1;
    END

    /**
     * @validation Ensure the task title is unique for the account.
     * @throw {TaskTitleMustBeUnique}
     */
    IF EXISTS (SELECT 1 FROM [functional].[task] WHERE [idAccount] = @idAccount AND [title] = @title AND [deleted] = 0)
    BEGIN
        ;THROW 51000, 'TaskTitleMustBeUnique', 1;
    END

    DECLARE @newTaskId INT;

    BEGIN TRY
        BEGIN TRAN;

        INSERT INTO [functional].[task] ([idAccount], [title], [description], [dueDate], [priority])
        VALUES (@idAccount, @title, @description, @dueDate, @priority);

        SET @newTaskId = SCOPE_IDENTITY();

        COMMIT TRAN;

        /**
         * @output {CreatedTask, 1, 1}
         * @column {INT} idTask - The ID of the newly created task.
         * @column {INT} idAccount - The account ID.
         * @column {NVARCHAR(100)} title - The task title.
         * @column {NVARCHAR(500)} description - The task description.
         * @column {DATE} dueDate - The task due date.
         * @column {TINYINT} priority - The task priority.
         * @column {TINYINT} status - The initial task status.
         * @column {DATETIME2} dateCreated - The creation timestamp.
         * @column {DATETIME2} dateModified - The modification timestamp.
         * @column {BIT} deleted - The soft delete flag.
         */
        SELECT
            [idTask],
            [idAccount],
            [title],
            [description],
            [dueDate],
            [priority],
            [status],
            [dateCreated],
            [dateModified],
            [deleted]
        FROM [functional].[task]
        WHERE [idTask] = @newTaskId;

    END TRY
    BEGIN CATCH
        IF (@@TRANCOUNT > 0)
        BEGIN
            ROLLBACK TRAN;
        END
        ;THROW;
    END CATCH
END;
GO
