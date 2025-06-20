import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification2Service } from 'src/app/service/notification2.service';
import { Storage2Service } from 'src/app/service/storage2.service';
import { Todo2Service } from 'src/app/service/todo2.service';
import { Todo, TodoInput } from 'src/app/store/todo/todo.store';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  newTodo: TodoInput = { text: '', completed: false };
  currentFilter: string = 'all';
  totalCount: number = 0;
  completedCount: number = 0;
  activeCount: number = 0;
  completionRate: number = 0;

  private todosSubscription?: Subscription;

  constructor(
    private todoService: Todo2Service,
    private storageService: Storage2Service,
    private notificationService: Notification2Service
  ) {}

  ngOnInit(): void {
    this.todosSubscription = this.todoService
      .getAllTodos$()
      .subscribe((todos) => {
        this.todos = todos;
        this.updateStats();
      });
    this.resetForm();
  }

  ngOnDestroy() {
    this.todosSubscription?.unsubscribe();
  }

  resetForm() {
    this.newTodo = { text: '', completed: false };
  }

  updateStats() {
    const stats = this.todoService.getTodoStats();
    this.totalCount = stats.total;
    this.completedCount = stats.completed;
    this.activeCount = stats.active;
    this.completionRate = stats.completionRate;
  }

  addTodo() {
    if (this.newTodo?.text && this.newTodo?.text.trim()) {
      const todoInput = {
        text: this.newTodo.text.trim(),
        completed: this.newTodo.completed ?? false,
      };

      this.todoService.addTodo(todoInput);
      this.notificationService.showNotification(
        'Todo added successfully!',
        'success'
      );
      this.resetForm();
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
    this.notificationService.showNotification(
      'Todo deleted successfully',
      'success'
    );
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
    const updated = this.todos.find((todo) => todo.id === id);
    const message = updated?.completed
      ? 'Todo completed!'
      : 'Todo marked as active!';
    this.notificationService.showNotification(message, 'success');
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    this.storageService.set('todoFilter', filter);
  }

  getFilteredTodos() {
    return this.todoService.getFilteredTodos(this.currentFilter);
  }

  getTodoStats() {
    const { total, completed, active, completionRate } =
      this.todoService.getTodoStats();
    this.totalCount = total;
    this.completedCount = completed;
    this.activeCount = active;
    this.completionRate = completionRate;
  }
}
