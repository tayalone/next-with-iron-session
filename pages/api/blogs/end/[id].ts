// import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

const callEndViewBlogSession = function (
  id: number,
  key: string,
  sessionID: string,
  credential: string,
  created_at: string,
  sended_at: string
) {
  // / call backend
};

async function End(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  let id = "";

  if (typeof query.id === "string") {
    id = query.id;
  }

  const blogID = parseInt(id, 10);

  try {
    if (method === "POST") {
      // / add logic about end watch
      console.info("end: ", id);

      const sessionID = req.session.uniqueID;
      if (!sessionID) {
        return res.status(500).json({ message: "sessionID Unset" });
      }

      const blogWatching = req.session.blogWatching;

      if (!blogWatching) {
        return res
          .status(500)
          .json({ message: "sessionID blogWatching unset" });
      }

      const currentWatchBlog = blogWatching[blogID];
      if (!currentWatchBlog) {
        return res.status(500).json({ message: "ยังไม่ได้ดู Blog id นี้" });
      }

      const { key, credential, created_at } = currentWatchBlog;

      callEndViewBlogSession(
        blogID,
        key,
        sessionID,
        credential,
        new Date(created_at).toISOString(),
        new Date().toISOString()
      );

      const wantRemoveCurrentWatchBlog = true;
      if (wantRemoveCurrentWatchBlog) {
        if (req.session.blogWatching) {
          if (req.session.blogWatching[blogID]) {
            delete req.session.blogWatching[blogID];
          }
        }
        await req.session.save();
      }

      console.info(`req.session.blogWatching`, req.session.blogWatching);

      res.json({ message: "OK" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(End, sessionOptions);
