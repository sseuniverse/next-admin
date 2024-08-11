import { options } from "@/pageRouterOptions";
import { prisma } from "@/prisma";
import schema from "@/prisma/json-schema/json-schema.json";
import { createHandler } from "@sse-ui/neadmin/dist/pageHandler";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const {
  run,
}: { run: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown> } =
  createHandler({
    apiBasePath: "/api/pagerouter/admin",
    options,
    prisma,
    schema: schema,
  });

export default run;
