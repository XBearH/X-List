<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useStatsStore } from '../../stores/statsStore'

const statsStore = useStatsStore()
const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chart) return
  const dist = statsStore.roleDistribution
  chart.setOption({
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: '60%',
      center: ['50%', '50%'],
      data: [
        { value: dist.student, name: '学习', itemStyle: { color: '#3b82f6' } },
        { value: dist.worker, name: '工作', itemStyle: { color: '#10b981' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.2)'
        }
      }
    }]
  })
}

onMounted(initChart)
onUnmounted(() => chart?.dispose())
watch(() => statsStore.roleDistribution, updateChart, { deep: true })
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 200px;
}
</style>