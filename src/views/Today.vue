<<template>
  <div class="today-page">
    <h1>今日待办</h1>
    
    <div class="role-switch">
      <button :class="{ active: currentRole === 'student' }" @click="currentRole = 'student'">学生</button>
      <button :class="{ active: currentRole === 'worker' }" @click="currentRole = 'worker'">社畜</button>
    </div>
    
    <div class="input-area">
      <input 
        v-model="newTodo" 
        @keyup.enter="handleAdd"
        placeholder="输入任务，按回车添加..."
      />
    </div>
    
    <div class="todo-list">
      <div 
        v-for="todo in todoStore.todos" 
        :key="todo.id"
        class="todo-item"
        :class="{ done: todo.status === 'done' }"
        @click="todoStore.toggleTodo(todo.id)"
      >
        <span class="checkbox">{{ todo.status === 'done' ? '✅' : '⭕' }}</span>
        <span class="title">{{ todo.title }}</span>
        <span class="role-tag">{{ todo.role }}</span>
      </div>
      <div v-if="todoStore.todos.length === 0" class="empty">暂无任务，添加一个吧！</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
const currentRole = ref<'student' | 'worker'>('student')
const newTodo = ref('')

const handleAdd = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value.trim(), currentRole.value)
    newTodo.value = ''
  }
}
</script>

<style scoped>
.today-page { max-width: 600px; margin: 0 auto; padding: 20px; }
.role-switch { display: flex; gap: 10px; margin-bottom: 20px; }
.role-switch button { padding: 8px 20px; border: none; border-radius: 20px; cursor: pointer; background: #eee; }
.role-switch button.active { background: #409eff; color: white; }
.input-area input { width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 16px; }
.todo-list { margin-top: 20px; }
.todo-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: #f5f5f5; margin-bottom: 8px; border-radius: 8px; cursor: pointer; transition: 0.2s; }
.todo-item:hover { background: #e8e8e8; }
.todo-item.done { opacity: 0.6; }
.todo-item.done .title { text-decoration: line-through; }
.checkbox { font-size: 20px; }
.title { flex: 1; }
.role-tag { font-size: 12px; padding: 2px 8px; background: #409eff; color: white; border-radius: 4px; }
.empty { text-align: center; color: #999; padding: 40px; }
</style>