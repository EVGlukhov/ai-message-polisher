import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, finalize, pipe, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { PolishApi } from '../services/polish-api';

export const PolishStore = signalStore(
  { providedIn: 'root' },

  withState({
    result: '',
    loading: false,
    error: null as string | null,
  }),

  withMethods((store, api = inject(PolishApi)) => ({
    polish: rxMethod<string>(
      pipe(
        switchMap((text: string) => {
          patchState(store, { loading: true, error: null });

          return api.polish(text).pipe(
            tap(({ text: result }) => patchState(store, { result })),
            catchError((error: unknown) => {
              const message =
                error instanceof HttpErrorResponse && typeof error.error?.error === 'string'
                  ? error.error.error
                  : 'Could not polish the text. Please try again.';

              patchState(store, { error: message });
              return EMPTY;
            }),
            finalize(() => patchState(store, { loading: false })),
          );
        }),
      ),
    ),
  })),
);
