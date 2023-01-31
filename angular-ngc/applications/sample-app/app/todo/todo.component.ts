import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionWithPayload } from '../infrastructure/actions';
import { TodoStore, TodoPayload } from './todo.interface';
import * as actions from './todo.actions';

@Component({
  selector: 'app-todo',
  styles: [''],
  template: `
    <h2>Todos</h2>
    <form class="m-t-large m-r-large">
      <mat-form-field>
        <input matInput placeholder="New todo" [formControl]="todo" />
      </mat-form-field>

      <button mat-button color="primary" (click)="addTodo()">
        Add
      </button>
    </form>

    <ng-container *ngIf="loading | async; else listView">
      <mat-spinner diameter="35"></mat-spinner>
    </ng-container>

    <ng-template #listView>
      <ng-container *ngFor="let todo of todoListView">
        <form [formGroup]="todo.form" (ngSubmit)="editTodo(todo.form)">
          <mat-card class="m-t-regular m-b-regular">
            <mat-form-field>
              <input matInput name="edit" formControlName="editValue" />
            </mat-form-field>

            <button mat-button type="submit" color="primary">
              Update Todo
            </button>

            <button
              mat-button
              type="button"
              color="secondary"
              (click)="deleteTodo(todo.index)"
            >
              Delete Todo
            </button>
          </mat-card>
        </form>
      </ng-container>
    </ng-template>
  `,
})
export class TodoComponent implements OnInit {
  todos: Observable<Array<TodoPayload>>;
  loading: Observable<boolean>;
  todo = new FormControl('Sample Todo');
  todoListView: any = [];

  constructor(private store: Store<{ todos: TodoStore }>) {}

  ngOnInit() {
    const { store } = this;

    this.todos = store.pipe(
      select('todos'),
      map(data => data.todos)
    );
    this.loading = store.pipe(
      select('todos'),
      map(data => data.isLoading)
    );
    this.todos.subscribe(data => {
      if (this.todoListView.length === 1 && data.length <= 0) {
        this.todoListView = [];
      }
      if (data.length <= 0) {
        return;
      }
      const controls = data.map(todo => {
        return {
          index: todo.index,
          form: new FormGroup({
            index: new FormControl(todo.index),
            editValue: new FormControl(todo.value),
          }),
        };
      });
      this.todoListView = controls;
    });
  }

  addTodo() {
    const { store, todo } = this;
    const { value } = todo;
    const action: ActionWithPayload<TodoPayload> = {
      type: actions.CREATE_TODO,
      payload: { value },
    };

    store.dispatch(action);
  }

  editTodo(form: FormGroup) {
    const { store } = this;
    const { index, editValue } = form.value;

    const action: ActionWithPayload<TodoPayload> = {
      type: actions.UPDATE_TODO,
      payload: { index, value: editValue },
    };

    store.dispatch(action);
  }

  deleteTodo(index: number) {
    const { store } = this;
    const action: ActionWithPayload<TodoPayload> = {
      type: actions.DELETE_TODO,
      payload: { index },
    };

    store.dispatch(action);
  }
}
