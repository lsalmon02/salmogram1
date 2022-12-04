import { Fragment, useEffect, useState } from "react";
import PostList from "../../components/post/post-list";
import ProfileGrid from "../../components/profile/profile-grid";
import ProfileHeader from "../../components/profile/profile-header";
import { getAllUsers } from "../../helpers/users.util";
import classes from "./profile-page.module.css";

function CustomUserProfilePage(props) {
  const [isGrid, setIsGrid] = useState(false);
  const [posts, setPosts] = useState([]);
  const profile = props.userFullName;

  useEffect(() => {
    fetch(`/api/posts/${profile}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  });

  const postList = posts.posts;

  const changeDisplayHandler = () => {
    setIsGrid((prevState) => !prevState);
  };

  return (
    <Fragment>
      <ProfileHeader name={profile} />
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
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const userFullName = context.params.userprofile;

  return {
    props: {
      userFullName: userFullName,
    },
    revalidate: 6000,
  };
}

export async function getStaticPaths() {
  const users = await getAllUsers();

  const paths = users.map((user) => ({ params: { userprofile: user.name } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default CustomUserProfilePage;
