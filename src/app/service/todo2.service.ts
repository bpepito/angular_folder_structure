import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  AppState as TodoState,
  Todo,
  todoStore,
  addTodo,
  deleteTodo,
  toggleTodo,
  TodoInput,
} from '../store/todo/todo.store';

@Injectable({
  providedIn: 'root',
})
export class Todo2Service {
  private stateSubject = new BehaviorSubject<TodoState>(todoStore.getState());
  public state$ = this.stateSubject.asObservable();

  constructor() {
    todoStore.subscribe(() => {
      this.stateSubject.next(todoStore.getState());
    });
  }

  getState(): TodoState {
    return todoStore.getState();
  }

  getState$(): Observable<TodoState> {
    return this.state$;
  }

  getAllTodos() {
    return todoStore.getState().todos;
  }

  getAllTodos$(): Observable<Todo[]> {
    return new Observable((observer) => {
      observer.next(this.getAllTodos());

      const unsubscribe = todoStore.subscribe(() => {
        observer.next(this.getAllTodos());
      });

      return () => unsubscribe();
    });
  }

  // Actions
  addTodo(todoInput: TodoInput) {
    todoStore.dispatch(addTodo(todoInput));
  }

  deleteTodo(id: number) {
    todoStore.dispatch(deleteTodo(id));
  }

  toggleTodo(id: number) {
    todoStore.dispatch(toggleTodo(id));
  }

  getTodoStats() {
    const total = todoStore.getState().todos.length;

    const completed = todoStore
      .getState()
      .todos.filter((todo) => todo.completed).length;
    const active = total - completed;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      total,
      completed,
      active,
      completionRate,
    };
  }

  getFilteredTodos(filter: string) {
    switch (filter) {
      case 'all':
        return todoStore.getState().todos;
      case 'active':
        return todoStore.getState().todos.filter((todo) => !todo.completed);
      case 'completed':
        return todoStore.getState().todos.filter((todo) => todo.completed);
      default:
        return todoStore.getState().todos;
    }
  }

  loadSampleData() {
    const sampleTodos: TodoInput[] = [
      { text: 'Learn AngularJS', completed: true },
      { text: 'Build a todo app', completed: false },
      { text: 'Master $scope and services', completed: false },
    ];

    sampleTodos.forEach((todo) => {
      this.addTodo(todo);
    });
  }
}
