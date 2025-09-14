import { HomeOutlined, BookOutlined, InfoCircleOutlined } from "@ant-design/icons";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <HomeOutlined />,
    showInNavbar: true,
  },
  {
    path: "/quiz",
    name: "Quiz",
    icon: <BookOutlined />,
    showInNavbar: true,
  },
  {
    path: "/word",
    name: "Word",
    icon: <BookOutlined />,
    showInNavbar: true,
    requiresAuth: true,
  },
  {
    path: "/about",
    name: "About",
    icon: <InfoCircleOutlined />,
    showInNavbar: true,
  },
];

export default routes;
