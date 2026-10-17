import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type PolishResponse = {
  text: string;
};

@Injectable({ providedIn: 'root' })
export class PolishApi {
  private readonly http = inject(HttpClient);

  polish(text: string): Observable<PolishResponse> {
    return this.http.post<PolishResponse>('/api/polish', { text });
  }
}
