<template>
  <n-grid
    x-gap="10"
    cols="3"
  >
    <n-gi>
      <h4 class="center-vertically">
        <n-icon
          :component="ChurchRound"
          :size="20"
        />
        &nbsp; {{ h.translate("churches_prayers") }} &nbsp;
        <n-tag
          :bordered="false"
          size="small"
          type="info"
        >
          {{ d.prayers.churchPrayers.length }}
        </n-tag>
      </h4>
      <n-space
        :size="10"
        vertical
      >
        <n-list bordered>
          <n-list-item
            v-for="c in d.prayers.churchPrayers"
            :key="c.id"
          >
            <n-space
              :size="10"
              vertical
            >
              <div class="center-vertically">
                <b>{{ c.name }}</b>
              </div>
              <div>
                <n-text :depth="3">{{ c.current_prayers }}</n-text>
              </div>
              <div>
                <n-text :type="c.user_has_prayed ? 'primary' : 'secondary'">
                  <n-icon
                    :component="PrayingHands"
                    :size="16"
                    class="praying-hands"
                    @click="m.handle.click.churchPrayerCount(c)"
                  />
                  &nbsp; {{ m.handle.click.formattedPrayerCount(c) }}
                </n-text>
              </div>
            </n-space>
          </n-list-item>
        </n-list>
      </n-space>
    </n-gi>

    <!-- contacts -->
    <n-gi>
      <h4 class="center-vertically">
        <n-icon
          :component="PersonRound"
          :size="20"
        />
        &nbsp; {{ h.translate("assigned_contacts_prayers") }} &nbsp;
        <n-tag
          :bordered="false"
          size="small"
          type="info"
        >
          {{ d.prayers.contactPrayers.length }}
        </n-tag>
      </h4>

      <n-space
        :size="10"
        vertical
      >
        <n-list bordered>
          <n-list-item
            v-for="c in d.prayers.contactPrayers"
            :key="c.id"
          >
            <n-space
              :size="10"
              vertical
            >
              <div><b>{{ c.name }}</b></div>
              <div><n-text :depth="3">{{ c.current_prayers }}</n-text></div>
              <div>
                <n-text :type="c.user_has_prayed ? 'primary' : 'secondary'">
                  <n-icon
                    :component="PrayingHands"
                    :size="16"
                    class="praying-hands"
                    @click="m.handle.click.contactPrayerCount(c)"
                  />
                  &nbsp; {{ m.handle.click.formattedPrayerCount(c) }}
                </n-text>
              </div>
            </n-space>
          </n-list-item>
        </n-list>
      </n-space>
    </n-gi>
  </n-grid>

  <!-- load more -->
  <n-grid
    x-gap="10"
    cols="3"
    class="wrapper"
  >
    <n-gi :span="2">
      <div class="load-more">
        <n-button
          text
          type="primary"
          size="small"
          @click="m.handle.click.loadMore"
        >
          {{ hasMore ? "Load More ..." : "No More Data" }}
        </n-button>
      </div>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { ChurchRound, PersonRound } from "@vicons/material"
import { PrayingHands } from "@vicons/fa"

// props coming from parent
defineProps<{ d: any; m: any; h: any; hasMore: boolean }>()
</script>

<style scoped>
.center-vertically {
  display: flex;
  align-items: center;
}

.praying-hands {
  cursor: pointer;
}

.load-more {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
