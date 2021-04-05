export enum StatusEnum {
  INIT = 'init',
  BUSY = 'busy',
  READY = 'ready',
}

export type Status = 'init' | 'busy' | 'ready';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
}
