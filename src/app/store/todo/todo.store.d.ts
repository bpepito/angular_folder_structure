export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date | null;
}

export interface TodoInput {
  text: string;
  completed?: boolean;
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
}

export interface AppState {
  todos: Todo[];
  todoStats: TodoStats;
  nextId: number;
}

export declare const todoStore: {
  getState(): AppState;
  dispatch(action: any): void;
  subscribe(listener: () => void): () => void;
};

export declare const setTodos: (todos: Todo[]) => any;
export declare const addTodo: (todoInput: TodoInput) => any;
export declare const deleteTodo: (id: number) => any;
export declare const toggleTodo: (id: number) => any;
