import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Menu } from "@hitachivantara/uikit-react-icons";
import {
  HvHeader,
  HvHeaderBrand,
  HvHeaderNavigation,
  HvButton,
  HvHeaderNavigationProps,
} from "@hitachivantara/uikit-react-core";

import { HitachiLogo } from "../../../assets/HitachiLogo";
import { NavigationContext } from "../../../context/NavigationContext";
// import navigation from "../../../lib/navigation";

export const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { activePath } = useContext(NavigationContext);

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const handleChange: HvHeaderNavigationProps["onClick"] = (
    event,
    selection,
  ) => {
    if (selection.path) navigate(selection.path);
  };

  return (
    <HvHeader>
      {!isMdUp && (
        <div>
          <HvButton variant="primaryGhost" icon>
            <Menu />
          </HvButton>
        </div>
      )}

      <HvHeaderBrand
        logo={<HitachiLogo />}
        name={!isXs ? "SCT App" : undefined}
      />


      <HvHeaderNavigation
        data={[
          { label: "Home", href: "/home", id: '1' },
          { label: "Settings", href: "/settings", id: '2' },
          { label: "Profile", href: "/profile", id: '3' },
        ]}
      />
    </HvHeader>
  );
};
