import Image from "next/image";
import Link from "next/link";
import classes from "./post-item.module.css";

function PostItem(props) {
  const { creator, imagePath, caption, location, id, date } = props;


  return (
    <li className={classes.item} key={id}>
      
      <div className={classes.title}>
        <img
          className={classes.icon}
          src={"/name.png"}
          alt="Name"
        />
        <Link href={`/profile/${creator}`}>
        <h2 className={classes.creator}>{creator}</h2>
        </Link>
      </div>
      <img src={imagePath} alt={caption} width={250} height={250} />
      <div className={classes.content}>
        <div className={classes.title}>
        <img
          className={classes.icon}
          src={"/caption.png"}
          alt="Caption"
        />
          <p className={classes.caption}>{caption}</p>
        </div>
        <br />
        <div className={classes.title}>
        <img
          className={classes.icon}
          src={"/location.png"}
          alt="location"
        />
          <p className={classes.location}>{location}</p>
        </div>
        <div className={classes.title}>
          <img className={classes.icon} src={"/date.png"} alt="Date" />
        <p className={classes.date}>{date}</p>
        </div>
      </div>
    </li>
  );
}

export default PostItem;
