// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.js";
import Institutes from "./views/Institutes/Institutes"
import Events from "./views/Events/Events"
import Courses from "./views/Courses/Courses"
import Exams from "./views/Exams/Exams"
import CareerCounsellor from "./views/CareerCounsellor/CareerCounsellor";
import PendingApprovals from "./views/Pending Approvals/Pending Approvals";
import Advertisement from "./views/Advertisment/Advertisment";
import ProfilePage from "./views/account/AccountView/ProfilePage";
import { ReactComponent as SettingsIcon } from './assets/icons/settings.svg';
import { ReactComponent as DashboardIcon } from './assets/icons/dashboard.svg';
import { ReactComponent as DataEntryIcon } from './assets/icons/dataentry.svg';
import { ReactComponent as DisDataIcon } from './assets/icons/disdata.svg';
import { ReactComponent as DSdataIcon } from './assets/icons/dsdata.svg';
import { ReactComponent as UsersIcon} from './assets/icons/users.svg';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: DashboardPage,
    layout: "/admin",
    users: ['admin'],
  },
  
  {
    path: "/Pending Approvals",
    name: "Pending Approvals",
    icon: SettingsIcon,
    component: PendingApprovals,
    layout: "/admin",
    users: ['admin'],
  },

  
  {
    path: "/Courses",
    name: "Courses",
    icon: DataEntryIcon,
    component: Courses,
    layout: "/admin",
    users: ["admin", "student", "institute", "career_counsellor"],
  },
  {
    path: "/Institutes",
    name: "Institutes",
    icon: DisDataIcon,
    component: Institutes,
    layout: "/admin",
    users: ["admin", "student", "institute", "career_counsellor"],
  },
  {
    path: "/Events",
    name: "Events",
    icon: DSdataIcon,
    component: Events,
    layout: "/admin",
    users: ["admin", "student", "institute", "career_counsellor"],
  },
 
  {
    path: "/exams",
    name: "Exams",
    icon: SettingsIcon,
    component: Exams,
    layout: "/admin",
    users: ["admin", "student", "institute", "career_counsellor"],
  },

  {
    path: "/advertisements",
    name: "Advertisements",
    icon: SettingsIcon,
    component: Advertisement,
    layout: "/admin",
    users: ["admin", "student", "institute", "career_counsellor"],
  },

  {
    path: "/careercounsellor",
    name: "Career Counsellor",
    icon: UsersIcon,
    component: CareerCounsellor,
    layout: "/admin",
    users: ["admin", "student", "institute", "career_counsellor"],
  }, 

  {
    path: "/profilepage",
    name: "Settings",
    icon: SettingsIcon,
    component: ProfilePage,
    layout: "/admin",
    users: ["admin", "student", "institute", "career_counsellor"],
  }, 
];

export default dashboardRoutes;
