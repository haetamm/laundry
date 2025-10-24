import { RiFingerprint2Fill } from "react-icons/ri";
import PasswordToggleIcon from "../component/PasswordToggleIcon";
import { PiFilesFill } from "react-icons/pi";
import { FaUsersLine } from "react-icons/fa6";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

export const fields = [
  {
    name: "username",
    label: "Username",
    type: "text",
    icon: <RiFingerprint2Fill className="w-6 h-6" />,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    icon: <PasswordToggleIcon />,
  },
];

export const sidebarItemLink = (role) =>
  [
    { to: "/dashboard/transaction", icon: PiFilesFill, label: "Transaction" },
    { to: "/dashboard/customer", icon: FaUsersLine, label: "Customer" },
    { to: "/dashboard/product", icon: GiCardboardBoxClosed, label: "Product" },
    role === "ADMIN" && {
      to: "/dashboard/user",
      icon: MdAdminPanelSettings,
      label: "Administrator",
    },
    { to: "/logout", icon: FiLogOut, label: "Logout", isLogout: true }, // <=== tambah ini
  ].filter(Boolean);

export const fieldsUser = [
  {
    name: "name",
    label: "Name",
    type: "text",
    icon: <FaUserCircle className="w-6 h-6" />,
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    icon: <RiFingerprint2Fill className="w-6 h-6" />,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    icon: <IoIosMail className="w-6 h-6" />,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    icon: <PasswordToggleIcon />,
  },
];

export const coloumnName = [
  { value: "Name" },
  { value: "Qty" },
  { value: "Price" },
  { value: "Total" },
];

export const fieldsCustomer = [
  { name: "name", label: "Name", type: "text" },
  { name: "phoneNumber", label: "Phone", type: "number" },
  { name: "address", label: "Address", type: "text" },
];

export const fieldsProduct = [
  { name: "name", label: "Name", type: "text" },
  { name: "price", label: "Price", type: "number" },
  { name: "type", label: "Type", type: "text" },
];
