import { getPool } from '@/instances/database';
import { IRecordSet, IResult } from 'mssql';

export enum ExpectedReturn {
  Single,
  Multi,
  None,
}

/**
 * @summary Executes a stored procedure against the database.
 * @param routine The name of the stored procedure to execute (e.g., '[schema].[spName]').
 * @param parameters An object containing the parameters for the stored procedure.
 * @param expectedReturn The expected return type from the procedure.
 * @returns The result from the database operation.
 */
export async function dbRequest(
  routine: string,
  parameters: object,
  expectedReturn: ExpectedReturn
): Promise<any> {
  const pool = await getPool();
  const request = pool.request();

  for (const key in parameters) {
    if (Object.prototype.hasOwnProperty.call(parameters, key)) {
      request.input(key, parameters[key as keyof typeof parameters]);
    }
  }

  const result: IResult<any> = await request.execute(routine);

  switch (expectedReturn) {
    case ExpectedReturn.Single:
      return result.recordset?.[0] || null;
    case ExpectedReturn.Multi:
      return result.recordsets as IRecordSet<any>[];
    case ExpectedReturn.None:
      return;
    default:
      throw new Error('Invalid ExpectedReturn type specified.');
  }
}
