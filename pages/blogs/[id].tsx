import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "components/Layout";
import { useRouter } from "next/router";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function BlogID() {
  const router = useRouter();
  const [blogId, setBlogID] = useState<string>("");

  //   console.info(`displayID`, displayID);
  useEffect(() => {
    const startWatching = async () => {
      let isCheckSessionID = false;

      try {
        const res = await axios.get(`/api/blogs`);
        // console.info(`res`, res);
        if (res.data.sessionID) {
          isCheckSessionID = true;
        }
      } catch (err) {
        console.error("check Session Error");
      }
      if (isCheckSessionID) {
        let isSetStartWatchingSuccess = false;
        try {
          // / Demo Start Watch Blog
          await axios.post(`/api/blogs/start/${id}`);

          // / Demo End Watch Blog
          await axios.post(`/api/blogs/end/${id}`);
        } catch (err) {
          console.error("check watching fail Error");
        }
      }
    };

    const { id } = router.query as { id: string | string[] };
    const displayID: string = Array.isArray(id) ? id[0] : id;

    if (displayID) {
      // axios
      //   .post(`/api/blogs/start/${displayID}`)
      //   .then((response) => {
      //     // setData(response.data);
      //     console.info();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      startWatching();
    }

    setBlogID(displayID);
  }, [router.query]);

  return (
    <Layout>
      <h1>Blog ID: {blogId}</h1>
    </Layout>
  );
}
