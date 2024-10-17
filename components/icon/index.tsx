import * as React from "react";

import barsIcon from "./svgs/bars";
import emailIcon from "./svgs/email";
import rssIcon from "./svgs/rss";
import calendarIcon from "./svgs/calendar";
import tagIcon from "./svgs/tag";
import folderIcon from "./svgs/folder";
import linkIcon from "./svgs/link";
import creativeCommonsIcon from "./svgs/creativeCommons";
import githubIcon from "./svgs/github";
import twitterIcon from "./svgs/twitter";

/* eslint-disable no-unused-vars */
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
/* eslint-enable no-unused-vars */

// This function is used to guard against non-exhaustive icon name lookups.
function exhasutiveCheck(_: never) {} // eslint-disable-line

function iconSvgByName(name: IconNames): React.ReactElement {
  switch (name) {
    case IconNames.Bars:
      return barsIcon();
    case IconNames.Email:
      return emailIcon();
    case IconNames.RSS:
      return rssIcon();
    case IconNames.Calendar:
      return calendarIcon();
    case IconNames.Tag:
      return tagIcon();
    case IconNames.Folder:
      return folderIcon();
    case IconNames.Link:
      return linkIcon();
    case IconNames.CreativeCommons:
      return creativeCommonsIcon();
    case IconNames.GitHub:
      return githubIcon();
    case IconNames.Twitter:
      return twitterIcon();
  }
  exhasutiveCheck(name);
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
}): React.ReactElement => (
  <i
    className="icon"
    aria-label={label}
    style={{
      width: width || pxBySize(size),
      height: width || pxBySize(size),
      fill: "currentColor",
    }}
  >
    {iconSvgByName(name)}
  </i>
);
Icon.Names = IconNames;
Icon.Sizes = IconSizes;

export default Icon;
