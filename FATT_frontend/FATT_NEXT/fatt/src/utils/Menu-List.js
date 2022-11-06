export const MENULIST = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Workouts",
    href: "/workout",
  },
  {
    text: "Meals",
    href: "/meal",
  },
  {
    text: "Friends",
    href: "/friend",
  },
  {
    text: "Goals",
    href: "/goal",
  },
  {
    text: "Exercises",
    href: "/exercise",
    children: [
      {
        text: "Exercise",
        href: "exercise[id]/:exerciseId",
      },
    ],
  },
  {
    text: "Dishes",
    href: "/dish",
    children: [
      {
        text: "Dishes",
        href: "dish[id]/:dishId",
      },
    ],
  },
  {
    text: "Settings",
    href: "/settings",
  },
];
