import { ActionWithPayload } from '../infrastructure/actions';
import {
  CREATE_TODO,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO,
  UPDATE_TODO,
} from './todo.actions';
import { TodoStore, TodoPayload } from './todo.interface';

const initialState: TodoStore = {
  isLoading: false,
  todos: [],
};

let todosIndex = 0;

export function todos(
  state: TodoStore = initialState,
  action: ActionWithPayload<TodoPayload>
) {
  switch (action.type) {
    case CREATE_TODO: {
      todosIndex += 1;
      const created = [
        ...state.todos,
        { value: action.payload, index: todosIndex },
      ];

      return { ...state, todos: created };
    }
    case UPDATE_TODO:
      return { ...state, isLoading: true };
    case UPDATE_TODO_SUCCESS: {
      const updated = state.todos.map(item => {
        return item.index === action.payload.index
          ? { ...item, value: action.payload.value }
          : item;
      });

      return { ...state, todos: updated, isLoading: false };
    }
    case DELETE_TODO: {
      const deleted = state.todos.filter(item => {
        return item.index !== action.payload.index;
      });

      return { ...state, todos: deleted };
    }
    default:
      return state;
  }
}
