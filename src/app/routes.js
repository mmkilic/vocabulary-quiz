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
  {
    path: "/quiz/question/:quizId",
    name: "Quiz Question",
    icon: <BookOutlined />,
    showInNavbar: false,
  },
  {
    path: "/quiz/result/:quizId",
    name: "Quiz Result",
    icon: <BookOutlined />,
    showInNavbar: false,
  },
];

export default routes;
