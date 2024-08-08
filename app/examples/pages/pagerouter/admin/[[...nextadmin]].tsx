import { AdminComponentProps, NextAdmin } from "@sse-ui/neadmin";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { options } from "../../../pageRouterOptions";
import { prisma } from "../../../prisma";
import schema from "../../../prisma/json-schema/json-schema.json";
import "../../../styles.css";

const pageOptions = options;

export default function Admin(props: AdminComponentProps) {
  return (
    <NextAdmin
      {...props}
      options={pageOptions}
      user={{
        data: {
          name: "John Doe",
        },
        logoutUrl: "/",
      }}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { nextAdminRouter } = await import(
    "@sse-ui/neadmin/dist/router"
  );

  const adminRouter = await nextAdminRouter(prisma, schema, pageOptions);
  return adminRouter.run(req, res) as Promise<
    GetServerSidePropsResult<{ [key: string]: any }>
  >;
};
