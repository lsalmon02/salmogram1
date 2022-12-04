import classes from "./profile-grid.module.css";
import ProfilePost from "./profile-post";

function ProfileGrid(props) {
  const { posts } = props;
  if (posts) {
    return (
      <div>
        <ul className={classes.list}>
          {posts.map((post) => (
            <ProfilePost
              key={post._id}
              id={post._id}
              creator={post.creator}
              imagePath={post.imagePath}
              caption={post.caption}
              location={post.location}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ProfileGrid;
