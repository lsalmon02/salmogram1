import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import classes from "./new-post.module.css";

async function sendPost(creator, imagePath, caption, location, date) {
  const response = await fetch("/api/posts/new-post", {
    method: "POST",
    body: JSON.stringify({ creator, imagePath, caption, location, date }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function NewPost() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();
  const captionRef = useRef();
  const locationRef = useRef();
  const imageRef = useRef();
  const [date, setDate] = useState();

  const submitHandler = async (event) => {
    event.preventDefault();
    const imagePath = imageRef.current.value;
    const location = locationRef.current.value;
    const caption = captionRef.current.value;
    const creator = session.user.name;
    setDate(
      new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );

    // setDate(currentDate);

    try {
      const result = await sendPost(
        creator,
        imagePath,
        caption,
        location,
        date
      );
      console.log(result);
      router.replace("/home");
      console.log(date);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.body}>
      <section className={classes.main}>
        <h1>New Post</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="image">Image URL</label>
          <input type="text" id="image" ref={imageRef} />
          <label htmlFor="caption">Caption</label>
          <textarea rows="4" id="caption" ref={captionRef} />
          <label htmlFor="location">Location</label>
          <input type="text" id="location" ref={locationRef} />

          <button type="submit">Post</button>
        </form>
      </section>
    </div>
  );
}

export default NewPost;
