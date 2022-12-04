import PostItem from "./post-item";
import classes from "./post-list.module.css";

const PostList = (props) => {
  const { posts } = props;

  if (posts) {
    return (
      <ul className={classes.list}>
        {posts.map((post) => (
          <PostItem
            key={post._id}
            id={post._id}
            creator={post.creator}
            imagePath={post.imagePath}
            caption={post.caption}
            location={post.location}
            date={post.date}
          />
        ))}
      </ul>
    );
  }
};

export default PostList;
