import { useUserStore } from "~/stores/useUsersStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { useLanguagesStore } from "~/stores/useLanguagesStore"
import { usePeopleGroupStore } from "~/stores/usePeopleGroupsStore"
import { useDenominationStore } from "~/stores/useDenominationsStore"
import { useFaithMilestoneStore } from "~/stores/useFaithMilestonesStore"
import { useCommunicationPlatformStore } from "~/stores/useCommunicationPlatformsStore"
import { useContactStore } from "~/stores/useContactsStore"
import { useChurchStore } from "~/stores/useChurchesStore"
import { useCommunityStore } from "~/stores/useCommunitiesStore"

export const getStores = () => {
  return {
    auth: useAuthStore,
    user: useUserStore,
    languages: useLanguagesStore,
    peopleGroups: usePeopleGroupStore,
    denominations: useDenominationStore,
    faithMilestones: useFaithMilestoneStore,
    communicationPlatforms: useCommunicationPlatformStore,
    contacts: useContactStore,
    churches: useChurchStore,
    communities: useCommunityStore,
  }
}

