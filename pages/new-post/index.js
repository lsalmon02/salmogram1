import { getSession } from "next-auth/react";
import NewPost from "../../components/post/new-post";

function NewPostPage() {

    return (
        <div>
            <NewPost />
        </div>
    )

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
      props: session
    }
  }

export default NewPostPage;