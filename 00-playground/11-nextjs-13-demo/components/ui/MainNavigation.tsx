import Link from "next/link";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/issues">Issues</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
