export interface TodoStore {
  isLoading: boolean;
  todos: Array<TodoPayload>;
}

export interface TodoPayload {
  index?: number | null;
  done?: boolean;
  value?: string | null;
  newValue?: string;
}
