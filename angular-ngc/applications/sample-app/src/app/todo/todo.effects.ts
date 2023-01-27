import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UPDATE_TODO, UPDATE_TODO_SUCCESS } from './todo.actions';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions) {}

  updateTodo$: Observable<{ type: string; payload: string }> = createEffect(
    () => {
      const { actions$ } = this;

      return actions$.pipe(
        ofType(UPDATE_TODO),
        delay(2000),
        map(({ payload }) => {
          return { type: UPDATE_TODO_SUCCESS, payload };
        })
      );
    }
  );
}
