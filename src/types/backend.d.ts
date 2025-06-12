export {};

declare global {
  interface IMessage {
    messageId: string;
    destination: string;
    sender: string;
    keyword: string;
    shortMessage: string;
    encryptMessage: string;
    isEncrypt: string;
    type: string;
    requestTime: string;
    partnerCode: string;
    secretKey: string;
  }

  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface ITrack {
    _id: string;
    imgUrl: string;
    title: string;
    description: string;
    trackUrl: string;
  }
}
