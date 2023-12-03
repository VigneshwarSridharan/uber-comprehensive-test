import * as React from "react";
import { AppNavBar, setItemActive, NavItem } from "baseui/app-nav-bar";
import { PAGES } from "../constants";
import { useNavigate } from "fusion-plugin-react-router";

const Header = () => {
  const navigate = useNavigate();
  const [mainItems, setMainItems] = React.useState<NavItem[]>([
    { label: "Home", info: PAGES.HOME_PAGE, active: true },
  ]);

  function getUniqueIdentifier(item: NavItem) {
    return item.label;
  }
  function handleMainItemSelect(item: NavItem) {
    setMainItems((prev) => setItemActive(prev, item, getUniqueIdentifier));
    navigate(item.info);
  }
  return (
    <AppNavBar
      title="Uber"
      mainItems={mainItems}
      onMainItemSelect={handleMainItemSelect}
      userItems={[
        {
          label: "Sign out",
        },
      ]}
      username="Sam Anderson"
      userImgUrl=""
    />
  );
};

export default Header;
