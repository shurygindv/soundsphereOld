import {IResult} from 'mssql';

type ResultOutput<O> = O | {[key: string]: any}; //mssql types aren't so good

interface SqlResult {
    readonly singleValue: any,
    readonly values: any,
    readonly output: any,

    returnValue(): any,
}

export default class SqlRequestResult<T, O> implements SqlResult {
    private readonly result: IResult<T>;
    private readonly error?: Error;

    constructor(result: IResult<T>, error?: Error) {
        this.result = result;
        this.error = error;
    }

    private get recordset() {
        return this.result.recordset;
    }

    get values(): T[] {
        return this.recordset;
    }

    get singleValue(): T {
        const [value] = this.recordset;
        
        return value;
    }

    returnValue() {
        return '';
    }

    get output(): ResultOutput<O> {
        return this.result.output;
    }
}