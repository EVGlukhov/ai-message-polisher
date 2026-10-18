import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, finalize, pipe, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { PolishApi } from '../api/polish-api';
import {
  Language,
  PolishSettings,
  Tone,
  type PolishChange,
  type PolishRequest,
} from '@ai-message-polisher/contracts';

type PolishState = PolishSettings & {
  result: string;
  changes: PolishChange[];
  loading: boolean;
  error: string | null;
};

export const PolishStore = signalStore(
  { providedIn: 'root' },

  withState<PolishState>({
    tone: Tone.Preserve,
    language: Language.Russian,
    result: '',
    changes: [],
    loading: false,
    error: null as string | null,
  }),

  withMethods((store, api = inject(PolishApi)) => ({
    setLanguage(language: Language): void {
      patchState(store, { language });
    },

    updateSettings(settings: PolishSettings): void {
      patchState(store, settings);
    },

    resetSettings(): void {
      patchState(store, {
        language: Language.Russian,
        tone: Tone.Preserve,
      });
    },

    polish: rxMethod<PolishRequest>(
      pipe(
        switchMap((request: PolishRequest) => {
          patchState(store, {
            loading: true,
            error: null,
            result: '',
            changes: [],
          });

          return api.polish(request).pipe(
            tap(({ text, changes }) =>
              patchState(store, {
                result: text,
                changes,
              }),
            ),
            catchError((error: unknown) => {
              const message =
                error instanceof HttpErrorResponse && typeof error.error?.error === 'string'
                  ? error.error.error
                : 'Не удалось обработать текст. Попробуйте ещё раз.';

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
