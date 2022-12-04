import classes from "./profile-header.module.css";

function ProfileHeader(props) {
  return (
    <div className={classes.container}>
        <div>
      <h1>My Profile</h1>
      <br/>
      </div>
      <div className={classes.title}>
        <img className={classes.icon} src={"/name.png"} alt="Name" />
        <h2>{props.name}</h2>
      </div>
    </div>
  );
}

export default ProfileHeader;
