<template>
  <div
    ref="chartRef"
    style="width: 100%; height: calc(100vh - 160px)"
  />
</template>

<script setup>
import * as echarts from "echarts/core"
import { TooltipComponent, TitleComponent } from "echarts/components"
import { BarChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
import { RoutePaths } from "~/types/index.d"

const chartRef = ref(null)
const consume = useConsumeApi(RoutePaths.DASHBOARD_PEOPLE_GROUPS)
const peopleGroups = await consume.browse({
  all: true,
})
echarts.use([TooltipComponent, TitleComponent, BarChart, CanvasRenderer])
onMounted(() => {
  const labels = peopleGroups.map((p) => p.name)
  const memberData = peopleGroups.map((p) => p.member_count)
  const baptismData = peopleGroups.map((p) => p.baptism_count)
  const churchData = peopleGroups.map((p) => p.church_count)

  const chart = echarts.init(chartRef.value)

  chart.setOption({
    title: {
      text: "People Group Statistics",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Members", "Baptisms", "Churches"],
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: 120,
      right: 50,
      bottom: 20,
      top: 50,
    },
    dataZoom: [
      {
        type: "slider",
        yAxisIndex: 0,
        orient: "vertical",
        start: 0,
        end: 20,
      },
    ],
    xAxis: {
      type: "value",
      name: "Count",
    },
    yAxis: {
      type: "category",
      data: labels,
    },
    series: [
      {
        name: "Members",
        type: "bar",
        data: memberData,
        label: {
          show: true,
          position: "top",
        },
      },
      {
        name: "Baptisms",
        type: "bar",
        data: baptismData,
        label: {
          show: true,
          position: "top",
        },
      },
      {
        name: "Churches",
        type: "bar",
        data: churchData,
        label: {
          show: true,
          position: "top",
        },
      },
    ],
  })
})
</script>
