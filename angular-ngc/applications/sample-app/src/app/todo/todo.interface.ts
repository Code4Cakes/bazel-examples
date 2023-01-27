export interface TodoStore {
  isLoading: boolean;
  todos: Array<TodoPayload>;
}

export interface TodoPayload {
  index?: number;
  done?: boolean;
  value?: string;
  newValue?: string;
}
