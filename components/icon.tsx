import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  faTwitter,
  faGithub,
  faCreativeCommons,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faAt,
  faRss,
  faLink,
  faCalendar,
  faFolder,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

enum IconNames {
  Bars,
  Calendar,
  Email,
  Folder,
  Link,
  RSS,
  Tag,

  GitHub,
  Twitter,
  CreativeCommons,
}

enum IconSizes {
  Default,
  Large,
}

// This function is used to gaurd against non-exhasutive icon name lookups.
function exhasutiveCheck(_: never) {} // eslint-disable-line

function iconByName(name: IconNames): IconDefinition {
  switch (name) {
    case IconNames.Bars:
      return faBars;
    case IconNames.Email:
      return faAt;
    case IconNames.RSS:
      return faRss;
    case IconNames.Calendar:
      return faCalendar;
    case IconNames.Tag:
      return faTag;
    case IconNames.Folder:
      return faFolder;
    case IconNames.Link:
      return faLink;
    case IconNames.CreativeCommons:
      return faCreativeCommons;
    case IconNames.GitHub:
      return faGithub;
    case IconNames.Twitter:
      return faTwitter;
  }
  exhasutiveCheck(name);
}
function sizeModifierBySize(size: undefined | IconSizes): SizeProp {
  switch (size) {
    case undefined:
    case IconSizes.Default:
      return "1x";
    case IconSizes.Large:
      return "2x";
  }
  exhasutiveCheck(size);
}

function pxBySize(size: undefined | IconSizes): string {
  switch (size) {
    case undefined:
    case IconSizes.Default:
      return "16px";
    case IconSizes.Large:
      return "64px";
  }
  exhasutiveCheck(size);
}

const Icon = ({
  name,
  label,
  size,
  width,
}: {
  name: IconNames;
  label: string;
  size?: IconSizes;
  width?: string;
}): JSX.Element => (
  <i
    className="icon"
    aria-label={label}
    style={{ width: width || pxBySize(size), height: width || pxBySize(size) }}
  >
    <FontAwesomeIcon
      icon={iconByName(name)}
      size={sizeModifierBySize(size)}
      style={{
        width: width || pxBySize(size),
        height: width || pxBySize(size),
      }}
    />
  </i>
);
Icon.Names = IconNames;
Icon.Sizes = IconSizes;

export default Icon;
