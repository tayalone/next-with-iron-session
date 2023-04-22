// import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import generator from "generate-password";
import type { BlogObject, Blog } from "pages/api/blogs";

type startViewBlogRes = {
  redisKey: string;
  credential: string;
  created_at: Date;
};

const callStartViewBlogSession = function (
  id: number,
  sessionID: string
): startViewBlogRes {
  // / call backend

  const res: startViewBlogRes = {
    redisKey: "redisKey",
    credential: "credential",
    created_at: new Date()
  };

  return res;
};

async function Start(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  let id = "";

  if (typeof query.id === "string") {
    id = query.id;
  }

  const blogID = parseInt(id, 10);

  try {
    if (method === "POST") {
      // / add logic about start watch

      const sessionID = req.session.uniqueID;
      if (!sessionID) {
        return res.status(500).json({ message: "sessionID Unset" });
      }

      const resAPI = callStartViewBlogSession(blogID, sessionID);

      const blogInfo: Blog = {
        key: resAPI.redisKey,
        credential: resAPI.credential,
        created_at: resAPI.created_at
      };

      if (req.session.blogWatching) {
        req.session.blogWatching[blogID] = blogInfo;
      } else {
        const blogWatching = {
          [blogID]: blogInfo
        };
        req.session.blogWatching = blogWatching;
      }

      await req.session.save();

      res.json({ message: "OK" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(Start, sessionOptions);
