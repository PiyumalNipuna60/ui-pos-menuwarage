<template>
  <div class="homepage-main-container">
    <section class="navigation-panel-home-container">
      <NavigationPanel />
    </section>
    <section class="col-6 main-area-container">
      <h1>This is home page</h1>
      <section>
        <div class="card flex justify-content-center">
          <Chart
            type="doughnut"
            :data="chartData"
            :options="chartOptions"
            class="w-full md:w-30rem"
          />
        </div>
        <div class="card">
          <Chart type="bar" :data="chartData2" :options="chartOptions2" class="h-30rem" />
        </div>
        <div class="card">
          <Chart type="line" :data="chartData3" :options="chartOptions3" class="h-30rem" />
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import { useUserAuthStore } from '@/stores/userAuth'
import { onMounted, ref } from 'vue'
import NavigationPanel from '../components/NavigationPanel.vue'

const userAuthStore = useUserAuthStore()

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
  chartData2.value = setChartData2()
  chartOptions2.value = setChartOptions2()
  chartData2.value = setChartData3()
  chartOptions2.value = setChartOptions3()
})

const chartData = ref()
const chartOptions = ref(null)
const chartData2 = ref()
const chartOptions2 = ref(null)
const chartData3 = ref()
const chartOptions3 = ref(null)

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue('--cyan-500'),
          documentStyle.getPropertyValue('--orange-500'),
          documentStyle.getPropertyValue('--gray-500'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--cyan-400'),
          documentStyle.getPropertyValue('--orange-400'),
          documentStyle.getPropertyValue('--gray-400'),
        ],
      },
    ],
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor,
        },
      },
    },
  }
}

const setChartData2 = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        type: 'bar',
        label: 'Dataset 1',
        backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
        data: [50, 25, 12, 48, 90, 76, 42],
      },
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: documentStyle.getPropertyValue('--gray-500'),
        data: [21, 84, 24, 75, 37, 65, 34],
      },
      {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: documentStyle.getPropertyValue('--orange-500'),
        data: [41, 52, 24, 74, 23, 21, 32],
      },
    ],
  }
}
const setChartOptions2 = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

const setChartData3 = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--cyan-500'),
        yAxisID: 'y',
        tension: 0.4,
        data: [65, 59, 80, 81, 56, 55, 10],
      },
      {
        label: 'Dataset 2',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--gray-500'),
        yAxisID: 'y1',
        tension: 0.4,
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  }
}
const setChartOptions3 = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

  return {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          drawOnChartArea: false,
          color: surfaceBorder,
        },
      },
    },
  }
}
</script>

<style lang="scss">
.homepage-main-container {
  display: flex;

  .navigation-panel-home-container {
    width: 15%;
  }
}
</style>
