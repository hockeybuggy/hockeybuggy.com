import React, { useRef, useEffect, useState } from "react";

import classNames from "classnames";
import Link from "gatsby-link";

import Icon from "../components/icon";

function useOutsideAlerter(
  ref: React.RefObject<any>,
  outsideFn: () => void
): void {
  useEffect(() => {
    /** Close the menu if clicked on outside of the element */
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target)) {
        outsideFn();
      }
    }
    /** Close the menu if focus goes to an element outside of the element */
    function handleFocusOutside(event: FocusEvent): void {
      if (ref.current && !ref.current.contains(event.target)) {
        outsideFn();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusin", handleFocusOutside);

    return (): void => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleFocusOutside);
    };
  }, [ref]);
}

const Navigation = (props: { pathname?: string }): JSX.Element => {
  const [menuState, setMenuState] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setMenuState(false);
  });

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    }
    document.addEventListener("keyup", handleKeyUp);

    return (): void => {
      // Unbind the event listener on clean up
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [wrapperRef]);

  return (
    <nav className="navigation">
      <div className="container">
        <Link
          to="/"
          className={classNames("navigation-title", {
            active: props.pathname === "/",
          })}
        >
          hockeybuggy.com
        </Link>

        <button
          id="menu-button"
          className="menu-button"
          onClick={(): void => setMenuState(!menuState)}
          aria-label="Toggle menu"
          aria-controls="menu-inner"
        >
          <Icon name={Icon.Names.Bars} label="" />
        </button>

        <ul
          className="navigation-list"
          id="menu-inner"
          role="menu"
          aria-labelledby="menu-button"
          data-expanded={menuState}
          ref={wrapperRef}
        >
          <li className="navigation-item" role="none">
            <Link
              to="/"
              role="menuitem"
              aria-current={props.pathname === "/" ? "page" : undefined}
            >
              Home
            </Link>
          </li>
          <li className="navigation-item" role="none">
            <Link
              to="/blog/"
              role="menuitem"
              aria-current={props.pathname === "/blog/" ? "page" : undefined}
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
