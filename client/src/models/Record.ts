import { Category } from "./Category";
import { Address } from "./Address";


export enum RecordActionTypes {
	SET__RECORD = 'SET__RECORD',
	SET__RECORD__SUCCESS = 'SET__RECORD__SUCCESS',
	SET__RECORD__ERROR = 'SET__RECORD__ERROR',
}
export interface RecordState {
	loading: boolean,
	error: null | string
}

interface SetRecordAction {
	type: RecordActionTypes.SET__RECORD
}
interface SetRecordSuccessAction {
	type: RecordActionTypes.SET__RECORD__SUCCESS

}
interface SetRecordErrorAction {
	type: RecordActionTypes.SET__RECORD__ERROR,
	payload: string

}

export type RecordAction = SetRecordAction | SetRecordSuccessAction | SetRecordErrorAction

export interface Record {
	phonenumber: string;
	address: Address | null;
}