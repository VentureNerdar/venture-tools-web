<template>
  <n-button
    type="primary"
    size="small"
    @click="showModal = true"
  >
    <n-icon>
      <LocationOnRound />
    </n-icon>
  </n-button>

  <n-modal
    v-model:show="showModal"
    transform-origin="center"
    :mask-closable="false"
    closable
  >
    <n-card
      style="width: 600px"
      :title="modalTitle"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-button
          type="default"
          size="small"
          quaternary
          @click="showModal = false"
        >
          <n-icon>
            <CloseRound />
          </n-icon>
        </n-button>
      </template>

      <n-text
        italic
        depth="3"
        style="margin-bottom: 10px; display: block"
      >
        {{ modalAddress }}
      </n-text>

      <n-auto-complete
        v-model:value="autocompleteValue"
        :input-props="{
          autocomplete: 'disabled',
        }"
        :options="suggestions"
        :placeholder="searchInputPlaceholder"
        clearable
        @update:value="handleInput"
        @select="handleSuggestionSelect"
      />

      <!-- 
      <input
        ref="searchInput"
        type="text"
        class="search-input"
        :placeholder="searchInputPlaceholder"
        @input="handleInput"
      />
      <div
        v-if="suggestions.length > 0"
        class="suggestions-container"
      >
        <div
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          class="suggestion-item"
          @click="handleSuggestionSelect(suggestion)"
        >
          {{ suggestion.text }}
        </div>
      </div>
      -->
      <div
        id="map"
        ref="mapElement"
        class="map-container"
      ></div>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { LocationOnRound, CloseRound } from "@vicons/material"
// import { Google } from "@vicons/fa"

declare const google: any

type FormattedPlace = {
  place: any
  viewport: any
  lat: number
  lng: number
}

const { AutocompleteSessionToken, AutocompleteSuggestion, Place } =
  await google.maps.importLibrary("places")
const { AdvancedMarkerElement } = (await google.maps.importLibrary(
  "marker",
)) as google.maps.MarkerLibrary
const { Geocoder } = await google.maps.importLibrary("geocoding")
const { Map } = (await google.maps.importLibrary(
  "maps",
)) as google.maps.MapsLibrary
// const {Place} = await google.maps.importLibrary("places")

const emit = defineEmits(["update"])
const searchInput = ref<HTMLInputElement | null>(null)
const mapElement = ref<HTMLElement | null>(null)
const suggestions = ref<any[]>([])
const autocompleteValue = ref("")
// Initialize the map with a default position

const showModal = ref(false)

const position = reactive({
  lat: 0,
  lng: 0,
}) as { lat: number; lng: number }

const modalTitle = ref("Select Location")
const modalAddress = ref("")

const h = useHelpers()

const props = defineProps<{
  latitude: number
  longitude: number
  places?: any
}>()

let map: google.maps.Map
let mapMarker: google.maps.marker.AdvancedMarkerElement

// const handleInput = async (event: Event) => {
const handleInput = async (value: string) => {
  if (typeof value !== "string" || value.trim() === "") {
    modalAddress.value = ""
    suggestions.value = []
    return
  }

  try {
    const token = new AutocompleteSessionToken()

    const suggestionRequest = {
      input: value,
      includedPrimaryTypes: ["geocode", "establishment"],
      sessionToken: token,
    }

    const response =
      await AutocompleteSuggestion.fetchAutocompleteSuggestions(
        suggestionRequest,
      )
    let Gsuggestions = [] as any[]
    response.suggestions.forEach((sug: any) => {
      const predict = sug.placePrediction
      Gsuggestions.push({
        value: predict.placeId,
        label: predict.text.text,
      })
    })

    suggestions.value = Gsuggestions
  } catch (error) {
    console.error("Error fetching suggestions:", error)
    suggestions.value = []
  }
}

const handleSuggestionSelect = async (placeId: any) => {
  try {
    await getPlaceByPlaceID(placeId)
  } catch (error) {
    console.error("Error selecting place:", error)
  }
}

const searchInputPlaceholder = computed(() => {
  return h.translate("search_for_a_place_here") === ""
    ? "Search for a place here"
    : h.translate("search_for_a_place_here")
})

watch(showModal, async (visible) => {
  if (!visible) return

  await nextTick()
  try {
    console.log("Loading Google Maps libraries...")
    // Load required libraries
    let initialPosition = { lat: 13.7563, lng: 100.5018 } // Bangkok
    let initialZoom = 5

    // if props have coordinates
    if (props.latitude && props.longitude) {
      initialPosition = { lat: props.latitude, lng: props.longitude }
      initialZoom = 19
    }

    // initialize map
    map = new Map(mapElement.value as HTMLElement, {
      center: initialPosition,
      zoom: initialZoom,
      mapId: "49f84f4fe99b4c959dd7a6e3",
    })

    // setting viewport if places is set
    if (props.places && props.places.length > 0) {
      const place = JSON.parse(props.places)

      if (place.viewport) {
        map.fitBounds(place.viewport)
      }
    }

    // Initialize a marker
    mapMarker = new AdvancedMarkerElement({
      map,
      position: initialPosition,
      title: "Default Location",
    })

    // @ts-expect-error google maps
    google.maps.event.addListener(map, "drag", function () {
      try {
        mapMarker.position = {
          lat: map.getCenter().lat(),
          lng: map.getCenter().lng(),
        }
        modalTitle.value =
          "Latitude: " +
          map.getCenter().lat() +
          ", Longitude: " +
          map.getCenter().lng()
        modalAddress.value = ""
      } catch (err) {
        console.log(err)
      }
    })

    // @ts-expect-error google maps
    google.maps.event.addListener(map, "dragend", function () {
      position.lat = map.getCenter().lat()
      position.lng = map.getCenter().lng()
      modalAddress.value = ""
      getGeoCode(position)
    })

    // @ts-expect-error google maps
    google.maps.event.addListener(map, "click", async function (event: any) {
      console.log(event)
      map.setCenter(event.latLng)
      mapMarker.position = { lat: event.latLng.lat(), lng: event.latLng.lng() }

      if (event.placeId) {
        await getPlaceByPlaceID(event.placeId)
      } else {
        getGeoCode(event.latLng)
      }
    })
  } catch (error) {
    console.error("Error initializing map:", error)
  }
})

const setMap = (post: { lat: number; lng: number }, viewport: any) => {
  map.setCenter(post)
  map.fitBounds(viewport)
  mapMarker.position = post
  suggestions.value = []
}

// const getGeoCode = async (position: any) => {
//   const geocoder = new Geocoder()
//   const response = await geocoder.geocode({ location: position })
//   emit("update", position, response)
// }
const getGeoCode = async (position: any) => {
  const geocoder = new Geocoder()
  const response = await geocoder.geocode({ location: position })

  if (!response.results || response.results.length === 0) return

  const result = response.results[0]
  const components = result.address_components

  const adminLevels = {
    administrative_area_level_1: "",
    administrative_area_level_2: "",
    administrative_area_level_3: "",
    locality: "",
    sublocality: "",
    country: "",
    postal_code: "",
  }

  components.forEach((component: any) => {
    const types = component.types

    if (types.includes("administrative_area_level_1")) {
      adminLevels.administrative_area_level_1 = component.long_name
    } else if (types.includes("administrative_area_level_2")) {
      adminLevels.administrative_area_level_2 = component.long_name
    } else if (types.includes("administrative_area_level_3")) {
      adminLevels.administrative_area_level_3 = component.long_name
    } else if (types.includes("locality")) {
      adminLevels.locality = component.long_name
    } else if (types.includes("sublocality")) {
      adminLevels.sublocality = component.long_name
    } else if (types.includes("country")) {
      adminLevels.country = component.long_name
    } else if (types.includes("postal_code")) {
      adminLevels.postal_code = component.long_name
    }
  })

  modalTitle.value = `Latitude: ${position.lat}, Longitude: ${position.lng}`
  modalAddress.value = result.formatted_address

  emit("update", position, {
    formatted_address: result.formatted_address,
    adminLevels,
    raw: result,
  })
}

const getPlaceByPlaceID = async (
  placeID: string,
  setMapOption: boolean = true,
  emitOption: boolean = true,
) => {
  const place = new Place({ id: placeID })
  await place.fetchFields({
    fields: [
      "displayName",
      "adrFormatAddress",
      "formattedAddress",
      "viewport",
      "location",
      "addressComponents",
      "googleMapsURI",
      "types",
    ],
  })

  const lng = place.location.lng()
  const lat = place.location.lat()
  const components =
    place.addressComponents as google.maps.places.AddressComponent[]
  const adminLevels = {
    administrative_area_level_1: "",
    administrative_area_level_2: "",
    administrative_area_level_3: "",
    locality: "",
    sublocality: "",
    country: "",
    postal_code: "",
  }

  components.forEach((component) => {
    const types = component.types

    if (types.includes("administrative_area_level_1")) {
      adminLevels.administrative_area_level_1 = component.longText
    } else if (types.includes("administrative_area_level_2")) {
      adminLevels.administrative_area_level_2 = component.longText
    } else if (types.includes("administrative_area_level_3")) {
      adminLevels.administrative_area_level_3 = component.longText
    } else if (types.includes("locality")) {
      adminLevels.locality = component.longText
    } else if (types.includes("sublocality")) {
      adminLevels.sublocality = component.longText
    } else if (types.includes("country")) {
      adminLevels.country = component.longText
    } else if (types.includes("postal_code")) {
      adminLevels.postal_code = component.longText
    }
  })

  modalTitle.value = place.displayName
  modalAddress.value = place.formattedAddress

  position.lat = lat
  position.lng = lng

  if (setMapOption) {
    setMap(position, place.viewport)
  }

  if (emitOption) {
    emit("update", position, place)
  }

  return {
    place: place,
    viewport: place.viewport,
    lat: lat,
    lng: lng,
  } as FormattedPlace
}
</script>

<style scoped>
.search-input {
  width: calc(100% - 40px);
  padding: 10px;
  margin: 10px 10px;
  border: 2px solid #0c3156;
  border-radius: 4px;
  font-size: 16px;
  color: #17badf;
  background-color: #0c3156;
  transition: border-color 100ms ease-in-out;
}

.search-input:focus {
  outline: none;
  border-color: #17badf;
}

.suggestions-container {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: #0a233d;
  border: 1px solid #0c3156;
  border-radius: 4px;
  z-index: 1000;
}

.suggestion-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #0c3156;
}

.suggestion-item:hover {
  background-color: #0a233d;
}

.map-container {
  height: 400px;
  margin-top: 16px;
  border: 2px solid #17badf;
  border-radius: 8px;
}
</style>
