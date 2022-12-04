import classes from "./main-nav.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function MainNavigation() {
    const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logOutHandler() {
    signOut();
    router.replace('/')
    
  }

  return (
    <header className={classes.header}>
      {!session && <Link legacyBehavior href="/">
        <a>
          <div className={classes.brand}>SalmoGram</div>
        </a>
      </Link>}
      {session && <Link legacyBehavior href="/home">
        <a>
          <div className={classes.brand}>SalmoGram</div>
        </a>
      </Link>}
      <nav>{session && <button className={classes.button} onClick={logOutHandler}>Logout</button>}</nav>
    </header>
  );
}

export default MainNavigation;
