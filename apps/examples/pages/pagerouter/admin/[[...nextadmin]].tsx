import { AdminComponentProps, NextAdmin } from "@sse-ui/neadmin";
import { getNextAdminProps } from "@sse-ui/neadmin/dist/pageRouter";
import { GetServerSideProps } from "next";
import { options } from "../../../pageRouterOptions";
import { prisma } from "../../../prisma";
import schema from "../../../prisma/json-schema/json-schema.json";
import "../../../app/globals.css";

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
        logout: ["/"],
      }}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) =>
  await getNextAdminProps({
    basePath: "/pagerouter/admin",
    apiBasePath: "/api/pagerouter/admin",
    prisma,
    schema,
    options: pageOptions,
    req,
  });
