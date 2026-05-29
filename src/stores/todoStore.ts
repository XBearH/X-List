import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Todo {
    is: string
    title: string
    status: 'todo' | 'done'
    role: 'student' | 'worker' //角色选择
    createdAt: number
    completedAt?: number
}

export const useTodoStore = defineStore('todo', () => {
    const todos = ref<Todo[]>([])
    const addTodo = (title: string, role: 'student' | 'worker') =>
    {
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
        if(todo){
            todo.status = todo.status === 'todo'
        ? 'done' : 'todo'
        todo.completedAt = todo.status === 'done' ? Date.now() : undefined
        }
    }
    
    const completedTodos = computed(() => todos.value.filter(t => t.status === 'done'))

    return {todos, addTodo, toggleTodo, completedTodos }

})