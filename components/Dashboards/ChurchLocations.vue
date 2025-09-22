<template>
  <ClientOnly>
    <div
      ref="mapElement"
      class="map-container"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { RoutePaths } from "~/types/index.d"
import type { ChurchLocationFormModel } from "~/types/models"

const consume = useConsumeApi(RoutePaths.CHURCH_LOCATION)

const locations: ChurchLocationFormModel[] = await consume.browse({
  all: true,
})

const mapElement = ref<HTMLElement | null>(null)
let map: google.maps.Map
let markers: google.maps.marker.AdvancedMarkerElement[] = []

const toLatLng = (loc: { lat: number; long?: number; lng?: number }) => ({
  lat: loc.lat,
  lng: loc.lng ?? loc.long!,
})
const initMap = async () => {
  const { Map } = (await google.maps.importLibrary(
    "maps",
  )) as google.maps.MapsLibrary
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker",
  )) as google.maps.MarkerLibrary

  if (!locations || locations.length === 0) return

  const bounds = new google.maps.LatLngBounds()
  map = new Map(mapElement.value!, {
    zoom: 6,
    center: toLatLng(locations[0]),
    mapId: "49f84f4fe99b4c959dd7a6e3",
  })

  locations.forEach((loc: ChurchLocationFormModel) => {
    const latlng = toLatLng(loc)
    bounds.extend(latlng)

    const marker = new AdvancedMarkerElement({
      position: latlng,
      map: map,
      title: loc.name,
    })

    markers.push(marker)
  })

  if (locations.length > 1) map.fitBounds(bounds)
  else map.setCenter(toLatLng(locations[0]))
}

onMounted(async () => {
  await initMap()
})

</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  /* height: 400px */
}
</style>
