export interface FbUser {
  id: string;
  name: string;
  picture?: {
    data: {
      url: string;
      width?: number;
      height?: number;
    };
  };
}

export interface FbPost {
  id: string;
  created_time?: string;
  message?: string;
  name?: string;
  picture?: string;
}

export interface FbLike {
  id: string;
  created_time?: string;
  name?: string;
  cover?: {
    source: string;
    id?: string;
  };
}

export interface GraphPaging {
  cursors?: {
    before: string;
    after: string;
  };
  next?: string;
}

export interface GraphResponse<T> {
  data: T[];
  paging?: GraphPaging;
}
