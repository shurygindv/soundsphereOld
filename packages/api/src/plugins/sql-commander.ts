import * as sql from 'mssql';
import * as R from 'ramda';

import {IDbProvider} from 'app/core/core.types';
import {Element} from 'app/fixtures/types';
import {SqlRequestResult} from '.';

type Request = sql.Request;

interface SqlInput {
  name: string;
  value: any;
}

interface SqlOutput {
  name: string;
  type: (() => sql.ISqlType) | sql.ISqlType;
  value?: any;
}

const mapNameToAppName = (name: string) => `S_${name}`;

const mapInputToRequest = (req: Request, input: SqlInput) =>
  req.input(input.name, input.value);

const mapOutputToRequest = (req: Request, output: SqlOutput) =>
  req.output(output.name, output.type, output.value);

export const sqlTypes = {
  int: sql.Int,
  bigInt: sql.BigInt,
  nVarChar: sql.NVarChar,
  varBinary: sql.VarBinary,
};

interface OptionalOutput {
  [key: string]: any;
} // see mssql types

export default class SqlCommander<I, O = OptionalOutput> {
  static create<I, O = OptionalOutput>(db: IDbProvider) {
    return new SqlCommander<I, O>(db);
  }

  private input: SqlInput[] = [];
  private output: SqlOutput[] = [];

  constructor(private readonly db: IDbProvider) {}

  private withInput(request: Request): Request {
    return R.reduce(mapInputToRequest, request, this.input);
  }

  private withOutput(request: Request): Request {
    return R.reduce(mapOutputToRequest, request, this.output);
  }

  addInput(name: string, value: any) {
    this.input.push({name, value});
  }

  addOutput(
    name: string,
    type: (() => sql.ISqlType) | sql.ISqlType,
    value?: any,
  ) {
    this.output.push({name, type, value});
  }

  async execute(name: string): Promise<SqlRequestResult<Element<I>, O>> {
    const request = this.withOutput(this.withInput(this.db.request()));
    const result = await request.execute(mapNameToAppName(name));

    return new SqlRequestResult<Element<I>, O>(result);
  }
}
