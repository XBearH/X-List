<<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useStatsStore } from '../../stores/statsStore'

const statsStore = useStatsStore()
const chartRef = ref<<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chart) return
  const data = statsStore.weeklyData.map(d => d.count)
  const dates = statsStore.weeklyData.map(d => d.date)

  chart.setOption({
    tooltip: { trigger: 'axis', formatter: '{b}: {c} 个' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: { lineStyle: { color: '#dcdfe6' } },
      axisLabel: { color: '#606266' }
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { type: 'dashed', color: '#e4e7ed' } }
    },
    series: [{
      data,
      type: 'bar',
      barWidth: '40%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#667eea' },
          { offset: 1, color: '#764ba2' }
        ]),
        borderRadius: [6, 6, 0, 0]
      }
    }]
  })
}

onMounted(initChart)
onUnmounted(() => chart?.dispose())

watch(() => statsStore.weeklyData, updateChart, { deep: true })
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}
</style>