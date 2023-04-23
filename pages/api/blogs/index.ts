import generator from "generate-password";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

async function blogs(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  // console.info(`req.session.uniqueID`, req.session.uniqueID);
  try {
    if (method === "GET") {
      if (!req.session.uniqueID) {
        // res.status(500).json({ message: "session id not set" });

        const uniqueID = generator.generate({
          length: 64
        });

        req.session.uniqueID = uniqueID;

        await req.session.save();
      }

      // // / add logic about end watch
      // console.info("end: ", id);
      res.json({ message: "OK", sessionID: req.session.uniqueID });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(blogs, sessionOptions);

export type Blog = {
  key: string;
  credential: string;
  created_at: Date;
};

export type BlogObject = {
  [key: number]: Blog;
};
