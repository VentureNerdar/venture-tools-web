import User from "@/components/Views/User.vue"
import UserRole from "@/components/Views/UserRole.vue"
import PeopleGroup from "@/components/Views/PeopleGroup.vue"
import Denomination from "@/components/Views/Denomination.vue"
import FaithMilestone from "@/components/Views/FaithMilestone.vue"
import CommunicationPlatform from "@/components/Views/CommunicationPlatform.vue"
import Contact from "@/components/Views/Contact.vue"
import Church from "@/components/Views/Church.vue"
import CommunityChecklist from "@/components/Views/CommunityChecklist.vue"
import Community from "@/components/Views/Community.vue"
import Movement from "@/components/Views/Movement.vue"
import PrayerPrompt from "@/components/Views/PrayerPrompt.vue"

export default {
  user: User,
  userRole: UserRole,
  peopleGroup: PeopleGroup,
  denomination: Denomination,
  prayerPrompt: PrayerPrompt,
  faithMilestone: FaithMilestone,
  communicationPlatform: CommunicationPlatform,
  contact: Contact,
  church: Church,
  communityChecklist: CommunityChecklist,
  community: Community,
  movement: Movement,
} as const
