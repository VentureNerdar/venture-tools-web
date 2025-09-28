<template>
  <n-tabs
    default-value="church"
    size="large"
    justify-content="space-evenly"
    animated
  >
    <!-- Church Prayers -->
    <n-tab-pane
      name="church"
      :tab="h.translate('churches_prayers')"
      class="card-container"
    >
      <n-list
        class="card"
        bordered
      >
        <n-list-item
          v-for="c in d.prayers.churchPrayers"
          :key="c.id"
        >
          <n-space
            vertical
            :size="8"
          >
            <div><b>{{ c.name }}</b></div>
            <div><n-text depth="3">{{ c.current_prayers }}</n-text></div>
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
    </n-tab-pane>

    <!-- Assigned Contact Prayers -->
    <n-tab-pane
      name="contact"
      :tab="h.translate('assigned_contacts_prayers')"
    >
      <n-list bordered>
        <n-list-item
          v-for="c in d.prayers.contactPrayers"
          :key="c.id"
        >
          <n-space
            vertical
            :size="8"
          >
            <div><b>{{ c.name }}</b></div>
            <div><n-text depth="3">{{ c.current_prayers }}</n-text></div>
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
    </n-tab-pane>
  </n-tabs>

  <!-- Load more -->
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
</template>

<script setup lang="ts">
import { PrayingHands } from "@vicons/fa"

// props from parent
defineProps<{ d: any; m: any; h: any; hasMore: boolean }>()
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  justify-content: center;

  .card {
    width: 96%;
  }
}


.load-more {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

::v-deep(.n-tabs-tab) {
  font-size: 0.95rem;
  padding: 4px 8px;
}
</style>
