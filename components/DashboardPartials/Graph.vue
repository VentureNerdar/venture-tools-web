<template>
  <div
    ref="chart"
    style="height: calc(100vh - 160px); width: 100%"
  ></div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import * as echarts from "echarts"
import { RoutePaths } from "~/types/index.d"

const chart = ref(null)
const consume = useConsumeApi(RoutePaths.GENERATIONAL_CHURCHES_BY_GRAPH)

const data = await consume.browse({
  all: true,
})

onMounted(async () => {
  const myChart = echarts.init(chart.value)
  const rootNode = data.nodes.find((node) => {
    return !data.links.some((link) => link.target === node.id)
  })

  if (rootNode) {
    data.nodes = data.nodes.map((n) =>
      n.id === rootNode.id ? { ...n, x: 300, y: 300, fixed: true } : n,
    )
  }

  myChart.setOption({
    tooltip: { show: true },
    series: [
      {
        type: "graph",
        layout: "force",
        symbolSize: 20,
        roam: true,
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
        },
        force: {
          repulsion: 150,
          edgeLength: 50,
        },
        data: data.nodes,
        edges: data.links,
      },
    ],
  })
})
</script>
