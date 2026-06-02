<template>
  <div class="empty-state">
    <div class="empty-icon">{{ icon }}</div>
    <div class="empty-title">{{ title }}</div>
    <div class="empty-desc">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string
  title?: string
  description?: string
}>()
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}
.empty-icon {
  font-size: 56px;
  margin-bottom: 16px;
  opacity: 0.6;
}
.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 8px;
}
.empty-desc {
  font-size: 14px;
}
</style>