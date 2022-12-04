import { Fragment, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Spinner from "../../components/extras/spinner";
import PostList from "../../components/post/post-list";
import classes from "./main-page.module.css";

function HomePage(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("api/posts/get-posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const postList = posts.posts;

  return (
    <Fragment>
      {postList && <PostList posts={postList} />}
      {!postList && (
        <div className={classes.error} >
          <h1>No posts available</h1>
        </div>
      )}
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

export default HomePage;
