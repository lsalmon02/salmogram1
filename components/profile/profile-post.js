import classes from "./profile-post.module.css";

function ProfilePost(props) {
  const { creator, imagePath, caption, location, id } = props;

  return (
    <div className={classes.item}>
        <div>
      <img className={classes.icon} src={"/location.png"} alt="location" />
      <h2>{location}</h2>
      </div>
      <img src={imagePath} alt={caption} width={150} height={150} />
    </div>
  );
}

export default ProfilePost;
