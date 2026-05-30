import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { storage } from '../utils/storage'

const STORAGE_KEY = 'x-todo-todos'

export interface Todo {
  id: string
  title: string
  status: 'todo' | 'done'
  role: 'student' | 'worker'
  createdAt: number
  completedAt?: number
}

export const useTodoStore = defineStore('todo', () => {
  const saved = storage.get(STORAGE_KEY)
  const todos = ref<Todo[]>(Array.isArray(saved) ? saved : [])

  // 自动保存到 localStorage
  watch(todos, (val) => {
    storage.set(STORAGE_KEY, val)
  }, { deep: true })

  const addTodo = (title: string, role: 'student' | 'worker') => {
    todos.value.push({
      id: Date.now().toString(),
      title,
      status: 'todo',
      role,
      createdAt: Date.now(),
    })
  }

  const toggleTodo = (id: string) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.status = todo.status === 'todo' ? 'done' : 'todo'
      todo.completedAt = todo.status === 'done' ? Date.now() : undefined
    }
  }

  const completedTodos = computed(() => todos.value.filter(t => t.status === 'done'))

  return { todos, addTodo, toggleTodo, completedTodos }
})