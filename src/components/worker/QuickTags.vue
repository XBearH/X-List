<template>
  <div class="quick-tags">
    <span class="label">快速添加：</span>
    <button
      v-for="tag in tags"
      :key="tag"
      class="tag-btn"
      @click="$emit('select', tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ tags: string[] }>()
defineEmits<{ (e: 'select', tag: string): void }>()
</script>

<style scoped>
.quick-tags {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.label {
  color: #666;
  font-size: 14px;
}
.tag-btn {
  padding: 6px 14px;
  border: 1px solid #dcdfe6;
  background: white;
  border-radius: 16px;
  cursor: pointer;
  font-size: 13px;
  transition: 0.2s;
}
.tag-btn:hover {
  background: #409eff;
  color: white;
  border-color: #409eff;
}
</style>