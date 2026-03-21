import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FbUser, FbPost, FbLike, GraphResponse } from '../types';

const BASE_URL = 'https://graph.facebook.com/v25.0';

@Injectable({ providedIn: 'root' })
export class FbApiService {
  private readonly http = inject(HttpClient);

  getMe(token: string): Observable<FbUser> {
    return this.http.get<FbUser>(`${BASE_URL}/me`, {
      params: { fields: 'id,name,picture', access_token: token },
    });
  }

  getPosts(token: string, limit = 100, after?: string): Observable<GraphResponse<FbPost>> {
    const params: Record<string, string> = {
      fields: 'id,created_time,message,name,picture',
      limit: limit.toString(),
      access_token: token,
    };
    if (after) params['after'] = after;
    return this.http.get<GraphResponse<FbPost>>(`${BASE_URL}/me/posts`, { params });
  }

  getLikes(token: string, limit = 100, after?: string): Observable<GraphResponse<FbLike>> {
    const params: Record<string, string> = {
      fields: 'id,created_time,name,cover',
      limit: limit.toString(),
      access_token: token,
    };
    if (after) params['after'] = after;
    return this.http.get<GraphResponse<FbLike>>(`${BASE_URL}/me/likes`, { params });
  }
}
