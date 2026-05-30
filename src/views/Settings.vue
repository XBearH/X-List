<template>
  <div class="settings-page">
    <h1>设置</h1>

    <div class="setting-section">
      <h3>考试管理</h3>
      <div class="exam-form">
        <input v-model="newExamName" placeholder="考试名称（如：英语六级）" />
        <input type="date" v-model="newExamDate" />
        <button @click="addExam">添加考试</button>
      </div>
      <div class="exam-list">
        <div v-for="exam in userStore.exams" :key="exam.id" class="exam-item">
          <span>{{ exam.name }} - {{ exam.date }}</span>
          <button @click="userStore.removeExam(exam.id)">删除</button>
        </div>
        <div v-if="userStore.exams.length === 0" class="exam-empty">
          暂无考试，点击上方添加
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const newExamName = ref('')
const newExamDate = ref('')

const addExam = () => {
  if (newExamName.value && newExamDate.value) {
    userStore.addExam(newExamName.value, newExamDate.value)
    newExamName.value = ''
    newExamDate.value = ''
  }
}
</script>

<style scoped>
.settings-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.setting-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}
.exam-form {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.exam-form input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  flex: 1;
  min-width: 120px;
}
.exam-form button {
  padding: 8px 16px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.exam-form button:hover {
  background: #66b1ff;
}
.exam-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
}
.exam-item button {
  background: #f56c6c;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.exam-empty {
  text-align: center;
  color: #999;
  padding: 20px;
}
</style>