import User from "@/components/Forms/User.vue"
import UserRole from "@/components/Forms/UserRole.vue"
import PeopleGroup from "@/components/Forms/PeopleGroup.vue"
import Denomination from "@/components/Forms/Denomination.vue"
import FaithMilestone from "@/components/Forms/FaithMilestone.vue"
import CommunicationPlatform from "@/components/Forms/CommunicationPlatform.vue"
import Contact from "@/components/Forms/Contact.vue"
import Church from "@/components/Forms/Church.vue"
import CommunityChecklist from "@/components/Forms/CommunityChecklist.vue"
import Community from "@/components/Forms/Community.vue"

export default {
  user: User,
  userRole: UserRole,
  peopleGroup: PeopleGroup,
  denomination: Denomination,
  faithMilestone: FaithMilestone,
  communicationPlatform: CommunicationPlatform,
  contact: Contact,
  church: Church,
  communityChecklist: CommunityChecklist,
  community: Community,
} as const
