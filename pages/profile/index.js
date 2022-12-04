import { getSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import PostList from "../../components/post/post-list";
import ProfileGrid from "../../components/profile/profile-grid";
import ProfileHeader from "../../components/profile/profile-header";
import classes from "./profile-page.module.css";

function UserProfilePage(props) {
  const [isGrid, setIsGrid] = useState(false);
  const [posts, setPosts] = useState([]);
  const profile = props.user;

  useEffect(() => {
    fetch("/api/posts/get-user-posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const postList = posts.posts;

  const changeDisplayHandler = () => {
    setIsGrid((prevState) => !prevState);
  };

  return (
    <Fragment>
      <ProfileHeader name={profile.name} />
      <div className={classes.buttonbox}>
        <button
          className={classes.btn}
          type="button"
          onClick={changeDisplayHandler}
        >
          {!isGrid ? "Grid View" : "List View"}
        </button>
      </div>
      {isGrid && <ProfileGrid posts={postList} />}
      {!isGrid && <PostList posts={postList} />}
      {!postList && <h1>No Posts available</h1>}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: session,
  };
}

export default UserProfilePage;
