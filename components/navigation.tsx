import React, { useRef, useEffect, useState } from "react";

import classNames from "classnames";
import Link from "next/link";

import Icon from "../components/icon";

function useOutsideAlerter(
  refs: Array<React.RefObject<any>>,
  outsideFn: () => void
): void {
  useEffect(() => {
    function eventTargetIsOutsideAllRefs(
      event: MouseEvent | FocusEvent
    ): boolean {
      return refs.every((ref) => {
        return ref.current && !ref.current.contains(event.target);
      });
    }

    /** Close the menu if clicked outside of or focus moves outside of all of
     * the pass refs */
    function handleEventTargetOutsideRefs(
      event: MouseEvent | FocusEvent
    ): void {
      if (eventTargetIsOutsideAllRefs(event)) {
        outsideFn();
      }
    }

    // Bind the event listeners
    document.addEventListener("mousedown", handleEventTargetOutsideRefs);
    document.addEventListener("focusin", handleEventTargetOutsideRefs);

    return (): void => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleEventTargetOutsideRefs);
      document.removeEventListener("focusin", handleEventTargetOutsideRefs);
    };
  }, [refs, outsideFn]);
}

const Navigation = (props: { pathname?: string }): JSX.Element => {
  const [menuState, setMenuState] = useState(false);
  const navigationListRef = useRef(null);
  const navigationToggleRef = useRef(null);
  useOutsideAlerter([navigationListRef, navigationToggleRef], () => {
    setMenuState(false);
  });

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    }
    // Bind the event listeners
    document.addEventListener("keyup", handleKeyUp);
    return (): void => {
      // Unbind the event listener on clean up
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <nav className="navigation">
      <div className="container">
        <Link
          href="/"
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
          aria-label="Toggle navigation"
          aria-controls="menu-inner"
          ref={navigationToggleRef}
        >
          <Icon name={Icon.Names.Bars} label="" width="24" />
        </button>

        <ul
          className="navigation-list"
          id="menu-inner"
          role="menu"
          aria-labelledby="menu-button"
          data-expanded={menuState}
          ref={navigationListRef}
        >
          <li
            className="navigation-item"
            role="menuitem"
            aria-current={props.pathname === "/" ? "page" : undefined}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className="navigation-item"
            role="menuitem"
            aria-current={props.pathname === "/blog/" ? "page" : undefined}
          >
            <Link href="/blog/">Blog</Link>
          </li>
          <li
            className="navigation-item"
            aria-current={props.pathname === "/projects/" ? "page" : undefined}
            role="menuitem"
          >
            <Link href="/projects/">Projects</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
