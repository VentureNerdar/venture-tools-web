<template>
  <div class="tree-chart-container">
    <div
      ref="chartRef"
      class="tree-chart"
    ></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts/core"
import { TooltipComponent, TitleComponent } from "echarts/components"
import { TreeChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
import { onMounted, ref, computed } from "vue"
import { RoutePaths } from "~/types/index.d"

echarts.use([TooltipComponent, TitleComponent, TreeChart, CanvasRenderer])

const chartRef = ref<HTMLDivElement | null>(null)

const consume = useConsumeApi(RoutePaths.GENERATIONAL_CHURCHES_BY_TREE)

const generationalChart = await consume.browse({
  all: true,
})

onMounted(() => {
  if (!chartRef.value) return

  const chart = echarts.init(chartRef.value)

  const option = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
    series: [
      {
        type: "tree",
        data: [
          {
            name: "All Users",
            children: generationalChart,
          },
        ],
        left: "8%",
        right: "20%",
        symbolSize: 7,
        edgeShape: "polyline",
        edgeForkPosition: "63%",
        initialTreeDepth: 3,
        lineStyle: {
          width: 2,
        },
        label: {
          backgroundColor: "#fff",
          position: "left",
          verticalAlign: "middle",
          align: "right",
        },
        leaves: {
          label: {
            position: "right",
            verticalAlign: "middle",
            align: "left",
          },
        },
        emphasis: {
          focus: "descendant",
        },
        layout: "orthogonal",
        orient: "LR",
        nodePadding: 20,
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  }

  chart.setOption(option)

  // Optional: resize on window resize
  window.addEventListener("resize", () => {
    chart.resize()
  })
})
</script>

<style scoped>
.tree-chart-container {
  height: calc(100vh - 160px);
  overflow-y: auto;
  overflow-x: auto;
}

.tree-chart {
  min-height: 100%;
  height: calc(100vh - 160px);
  min-width: 100%;
}
</style>
