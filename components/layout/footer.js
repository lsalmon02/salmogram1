import { useSession } from "next-auth/react";
import classes from "./footer.module.css";

function Footer() {
  const { data: session, status } = useSession();
  const loading = status === "loading";



  return (
    <footer className={classes.footer}>
        {session && <nav>
            <ul>
                 <li>
                    <a href="/new-post">
                        <img className={classes.plus} src="/plus.png" alt="New Post" />
                    </a>
                </li>
                <li>
                    <a href="/home">
                        <img className={classes.home} src="/home-page.png" alt="Home Page" />
                    </a>
                </li>
                <li>
                    <a href="/profile">
                        <img className={classes.user} src="/user-profile.png" alt="Profile Page" />
                    </a>
                </li>
            </ul>
        </nav>}
        {!session && !loading && <nav className={classes.nav}>
            <ul>
                <li>
                    <a href="/auth/login">Login</a>
                </li>
                <li>
                    <a href="/auth/signup">Signup</a>
                </li>
            </ul>
        </nav> }
    </footer>
  );
}

export default Footer;
