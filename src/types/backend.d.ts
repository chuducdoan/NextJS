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

  interface ITrackProps {
    id: number;
    title: string;
    description: string;
    imgUrl: string;
    trackUrl: string;
    category: string;
    countLike: number;
    countPlay: number;
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
    code: number | string;
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

  interface IAuthUser {
    access_token: string;
    refresh_token: string;
    fullName: string;
  }

  interface ITrackTop {}

  interface IShareTrack extends ITrackProps {
    isPlaying: boolean;
  }

  interface ITrackContext {
    isPlaying: boolean;
    setIsPlaying: (v: boolean) => void;
    currentTrack: IShareTrack;
    setCurrentTrack: (v: IShareTrack) => void;
  }

  interface ITrackCommentProps {
    id: number;
    content: string;
    userName: string;
    userId: number;
    moment: number;
    createdAt: string;
    type:string
  }

  interface ITrackLike {}
}
