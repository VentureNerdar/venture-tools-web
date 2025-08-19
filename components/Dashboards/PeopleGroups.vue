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
const allPeopleGroupConsume = useConsumeApi(RoutePaths.PEOPLE_GROUPS)
const allPeopleGroups = await allPeopleGroupConsume.browse({
  all: true,
})
const peopleGroups = await consume.browse({
  all: true,
})
echarts.use([TooltipComponent, TitleComponent, BarChart, CanvasRenderer])
onMounted(() => {
  // Map peopleGroups into a lookup by id
  const statsById = Object.fromEntries(
    peopleGroups.map((p) => [p.people_group_id, p]),
  )

  // Merge all groups with stats, defaulting to 0
  const mergedGroups = allPeopleGroups.map((g) => {
    const stats = statsById[g.id] || {}
    return {
      name: g.name,
      member_count: stats.member_count || 0,
      baptism_count: stats.baptism_count || 0,
      church_count: stats.church_count || 0,
    }
  })
  const labels = mergedGroups.map((p) => p.name)
  const memberData = mergedGroups.map((p) => p.member_count)
  const baptismData = mergedGroups.map((p) => p.baptism_count)
  const churchData = mergedGroups.map((p) => p.church_count)

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
      textStyle: {
        color: "#17badf",
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: 200,
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
