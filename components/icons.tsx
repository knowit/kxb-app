import { cn } from "@/lib/utils";
import {
  ArrowTopRightIcon,
  CheckCircledIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  Cross2Icon,
  DashboardIcon,
  GearIcon,
  HamburgerMenuIcon,
  InfoCircledIcon,
  LockClosedIcon,
  MinusCircledIcon,
  PaperPlaneIcon,
  PersonIcon,
  PlusCircledIcon,
  PlusIcon,
  RocketIcon,
  Share2Icon,
  TrashIcon,
  UpdateIcon
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";

export type Icon = IconProps;

export const Icons = {
  Logo: ({ className, ...other }: Icon) => (
    <svg
      className={cn("", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="233"
      height="72"
      fill="currentColor"
      viewBox="0 0 233 72"
      {...other}
    >
      <g>
        <path d="M183,19.8c2.1,0,3.7-1.6,3.7-3.7c0-2.1-1.6-3.7-3.7-3.7s-3.7,1.6-3.7,3.7c0,0,0,0,0,0 C179.3,18.1,181,19.8,183,19.8"></path>
        <path d="M47.8,24H43c-1.5,0-1.7,0.2-3.4,1.9L24.2,41.4V17.1c0.1-0.6-0.4-1.2-1-1.3c-0.1,0-0.2,0-0.3,0h-7.4 c-0.6-0.1-1.2,0.4-1.3,1c0,0.1,0,0.2,0,0.3v3.3c-0.1,0.6,0.4,1.2,1,1.3c0.1,0,0.2,0,0.3,0h2.7v30h-2.7c-0.6-0.1-1.2,0.4-1.3,1 c0,0.1,0,0.2,0,0.3v3.3c-0.1,0.6,0.4,1.2,1,1.3c0.1,0,0.2,0,0.3,0h11.2c0.6,0.1,1.2-0.3,1.3-0.9c0-0.1,0-0.2,0-0.3V53 c0.1-0.6-0.4-1.2-1-1.3c-0.1,0-0.2,0-0.3,0h-2.6v-2.5l5.8-5.9l10.2,12.4c1.3,1.7,1.3,1.7,3.3,1.7h4.4c0.6,0.1,1.2-0.4,1.2-1 c0-0.1,0-0.2,0-0.3V53c0.1-0.6-0.4-1.2-1-1.3c-0.1,0-0.2,0-0.3,0h-3.6L34,39.2l9.2-9.4h4.5c0.6,0.1,1.1-0.4,1.2-1 c0-0.1,0-0.2,0-0.2v-3.4c0.1-0.6-0.3-1.2-1-1.3C48,24,47.9,24,47.8,24"></path>
        <path d="M87.4,51.7h-2.7V37.4c0-8.5-5.4-14-13.7-14c-3.5-0.1-6.9,1.1-9.5,3.5v-1.6c0.1-0.6-0.4-1.2-1-1.2 c-0.1,0-0.2,0-0.3,0H53c-0.6-0.1-1.2,0.3-1.3,1c0,0.1,0,0.2,0,0.3v3.3c-0.1,0.6,0.4,1.2,1,1.3c0.1,0,0.2,0,0.3,0h2.7v21.8H53 c-0.6-0.1-1.2,0.4-1.3,1c0,0.1,0,0.2,0,0.3v3.3c0,0.6,0.4,1.2,1.1,1.2c0.1,0,0.1,0,0.2,0h11.2c0.6,0.1,1.2-0.4,1.3-1 c0-0.1,0-0.2,0-0.2V53c0.1-0.6-0.4-1.2-1-1.3c-0.1,0-0.2,0-0.3,0h-2.6V38.4c0-5.5,3.8-9.4,9.1-9.4s8.2,3.3,8.2,9v13.7h-2.7 c-0.6-0.1-1.2,0.4-1.2,1.1c0,0.1,0,0.2,0,0.3v3.3c-0.1,0.6,0.4,1.2,1,1.3c0.1,0,0.2,0,0.3,0h11.2c0.6,0.1,1.2-0.4,1.3-1 c0-0.1,0-0.2,0-0.3V53c0.1-0.6-0.4-1.2-1-1.3C87.6,51.7,87.5,51.7,87.4,51.7"></path>
        <path d="M105.7,23.4c-9.5,0-17.1,7.7-17.1,17.1c0,0.1,0,0.2,0,0.4c-0.2,9.4,7.3,17.1,16.7,17.3c0.1,0,0.2,0,0.3,0 c9.5,0,17.2-7.7,17.2-17.1c0-0.1,0-0.2,0-0.3c0.2-9.4-7.3-17.1-16.7-17.3C105.9,23.4,105.8,23.4,105.7,23.4 M105.7,52.5 c-6.2,0-11-5.2-11-11.8s4.7-11.6,10.9-11.6s11.1,5.2,11.1,11.8S111.9,52.5,105.7,52.5"></path>
        <path d="M172.5,24H161c-0.6-0.1-1.2,0.3-1.3,1c0,0.1,0,0.2,0,0.3v3.3c-0.1,0.6,0.4,1.2,1,1.3c0.1,0,0.2,0,0.3,0h2.6 l-5.5,17.7L150.3,25c-0.2-0.6-0.8-1-1.4-1h-2.3c-0.6,0-1.2,0.4-1.4,1l-7.7,22.6L132,29.8h2.6c0.6,0.1,1.2-0.4,1.3-1 c0-0.1,0-0.2,0-0.3v-3.3c0.1-0.6-0.4-1.2-1-1.2c-0.1,0-0.2,0-0.3,0H123c-0.6-0.1-1.2,0.4-1.3,1c0,0.1,0,0.2,0,0.2v3.3 c-0.1,0.6,0.4,1.2,1,1.3c0.1,0,0.2,0,0.2,0h2.7l9.1,26.8c0.2,0.6,0.8,1,1.4,1h2.5c0.6,0,1.2-0.4,1.4-1l7.6-22l7.6,22 c0.2,0.6,0.8,1,1.4,1h2.5c0.6,0,1.2-0.4,1.4-1l9.2-26.8h2.7c0.6,0.1,1.2-0.4,1.3-1c0-0.1,0-0.2,0-0.2v-3.3c0.1-0.6-0.4-1.2-1-1.2 C172.7,24,172.6,24,172.5,24"></path>
        <path d="M188.8,51.7h-2.7V25.3c0.1-0.6-0.4-1.2-1-1.2c-0.1,0-0.2,0-0.2,0h-7.4c-0.6-0.1-1.2,0.4-1.2,1 c0,0.1,0,0.2,0,0.3v3.3c-0.1,0.6,0.4,1.2,1,1.3c0.1,0,0.2,0,0.3,0h2.7v21.8h-4.9c-0.6-0.1-1.2,0.4-1.3,1c0,0.1,0,0.2,0,0.3v3.3 c-0.1,0.6,0.4,1.2,1,1.3c0.1,0,0.2,0,0.3,0h13.4c0.6,0.1,1.2-0.4,1.3-1c0-0.1,0-0.2,0-0.3V53c0.1-0.6-0.4-1.2-1-1.3 C189,51.7,188.9,51.7,188.8,51.7"></path>
        <path d="M214.8,40.5h-3.2c-0.6-0.1-1.2,0.4-1.3,1c0,0.1,0,0.2,0,0.3v6.2c0.1,2.3-1.7,4.3-4,4.4c-3.2,0-4.6-1.3-4.6-4.5 v-18h7.8c0.6,0.1,1.2-0.4,1.3-1c0-0.1,0-0.2,0-0.3v-3.3c0.1-0.6-0.4-1.2-1-1.2c-0.1,0-0.2,0-0.2,0h-7.8v-6.9c0.1-0.6-0.3-1.2-1-1.3 c-0.1,0-0.2,0-0.3,0h-3.4c-0.6-0.1-1.2,0.4-1.3,1c0,0.1,0,0.2,0,0.3v7h-3.6c-0.6-0.1-1.2,0.4-1.2,1c0,0.1,0,0.1,0,0.2v3.3 c-0.1,0.6,0.4,1.2,1,1.3c0.1,0,0.2,0,0.3,0h3.6v18.3c0,6,3.9,9.9,10,9.9c6.3,0,10.3-3.8,10.3-9.6v-6.7c0.1-0.6-0.4-1.2-1-1.3 C215.1,40.5,215,40.5,214.8,40.5"></path>
      </g>
    </svg>
  ),
  Gear: GearIcon,
  ChevronLeft: ChevronLeftIcon,
  ChevronRight: ChevronRightIcon,
  Close: Cross2Icon,
  Check: CheckIcon,
  ArrowTopRight: ArrowTopRightIcon,
  Info: InfoCircledIcon,
  Plus: PlusIcon,
  PlusCircled: PlusCircledIcon,
  Rocket: RocketIcon,
  CheckCircled: CheckCircledIcon,
  MinusCircled: MinusCircledIcon,
  PaperPlane: PaperPlaneIcon,
  Loader: ({ className, ...other }: Icon) => (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      stroke="currentColor"
      {...other}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  ),
  Share: Share2Icon,
  Update: UpdateIcon,
  Trash: TrashIcon,
  Person: PersonIcon,
  LockClosed: LockClosedIcon,
  Copy: CopyIcon,
  HamburgerMenu: HamburgerMenuIcon,
  Dashboard: DashboardIcon
};
