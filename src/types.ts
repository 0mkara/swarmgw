export interface GetFileArgs {
  gateway: string;
  url: string;
}

export interface PutFileArgs {
  gateway: string;
  content: any;
}

export interface Opts {
  gateway: string;
  mode: string;
}
