import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { PolishResponse, PolishRequest } from '@ai-message-polisher/contracts';

@Injectable({ providedIn: 'root' })
export class PolishApi {
  private readonly http = inject(HttpClient);

  polish(request: PolishRequest): Observable<PolishResponse> {
    return this.http.post<PolishResponse>('/api/polish', request);
  }
}
