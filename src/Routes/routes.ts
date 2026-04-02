import { Main } from "../Components/Main/Main";
import { PrivacyPolicy } from "../Pages/PrivacyPolicy/PrivacyPolicy";
import Contacts from "../Pages/Contacts/Contacts";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import { TermsOfService } from "../Pages/TermsOfService/TermsOfService";
import { PATH_NAMES } from "../Constants/pathnames";
// import Works from "../Pages/Portfolio/Works";

export interface RouteConfig {
  path: string;
  component: React.FC; 
}

type RoutesArray = RouteConfig[];

export const routes: RoutesArray = [
  { path: PATH_NAMES.HOME, component: Main },
  { path: PATH_NAMES.CONTACTS, component: Contacts },
  { path: PATH_NAMES.PRIVACY_POLICY, component: PrivacyPolicy },
  { path: PATH_NAMES.TERMS_OF_SERVICE, component: TermsOfService},
  // { path: PATH_NAMES.PORTFOLIO, component: Works}, //пока на согласовании
  {path: "*", component: NotFoundPage},
];
