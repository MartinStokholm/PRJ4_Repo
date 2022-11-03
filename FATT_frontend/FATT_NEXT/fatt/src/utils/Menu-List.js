export const MENULIST = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Workout",
    href: "/workout",
  },
  {
    text: "Diet",
    href: "/diet",
  },
  {
    text: "Friends",
    href: "/friends",
  },
  {
    text: "Goals",
    href: "/goals",
  },
  {
    text: "Exercise",
    href: "/exercise",
    children: [
      {
        text: "Exercise",
        href: "exercise[id]/:exerciseId",
      },
    ],
  },
  {
    text: "Settings",
    href: "/settings",
  },
];
