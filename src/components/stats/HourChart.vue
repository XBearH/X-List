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
  const dist = statsStore.hourDistribution
  chart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c} 个 ({d}%)' },
    legend: { bottom: 0, icon: 'circle' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 16, fontWeight: 'bold' }
      },
      data: [
        { value: dist.morning, name: '上午', itemStyle: { color: '#f59e0b' } },
        { value: dist.afternoon, name: '下午', itemStyle: { color: '#10b981' } },
        { value: dist.evening, name: '晚上', itemStyle: { color: '#667eea' } },
        { value: dist.night, name: '凌晨', itemStyle: { color: '#64748b' } }
      ]
    }]
  })
}

onMounted(initChart)
onUnmounted(() => chart?.dispose())
watch(() => statsStore.hourDistribution, updateChart, { deep: true })
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 280px;
}
</style>