import { Connection, FindOperator, FindOperatorType } from 'typeorm';

class FindOperatorWithExtras<T> extends FindOperator<T> {
  constructor(
    type: FindOperatorType | 'not in',
    value: FindOperator<T> | T | FindOperator<any> | any,
    useParameter?: boolean,
    multipleParameters?: boolean,
  ) {
    // @ts-ignore
    super(type, value, useParameter, multipleParameters);
  }

  public toSql(
    connection: Connection,
    aliasPath: string,
    parameters: string[],
  ): string {
    // @ts-ignore
    if (this._type === 'not in') {
      if (parameters && parameters.length > 0)
        return `${aliasPath} NOT IN (${parameters.join(',')})`;
      else return aliasPath;
    }

    // @ts-ignore
    return super.toSql(connection, aliasPath, parameters);
  }
}

export function NotIn<T>(
  value: T[] | FindOperator<T>,
): FindOperatorWithExtras<T> {
  return new FindOperatorWithExtras('not in', value, true, true);
}
