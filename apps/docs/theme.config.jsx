import { useRouter } from "next/router";
import React from "react";
import Logo from "./components/Logo";

const config = {
  logo: (
    <div className="flex items-center gap-2">
      <Logo width={45} />
      <span className="font-semibold">SSE Next Admin</span>
    </div>
  ),
  project: {
    link: "https://github.com/sseuniverse/next-admin",
  },
  docsRepositoryBase: "https://github.com/sseuniverse/next-admin",
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        {
          // eslint-disable-next-line react/jsx-no-target-blank
          <a href="https://sseworld.githib.io/v2" target="_blank">
            SSE World
          </a>
        }
        .
      </span>
    ),
  },
  darkMode: true,
  primaryHue: 209,
  primarySaturation: 100,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="keywords"
        content="next, prisma, admin, database, next.js, back-office, cms, sse"
      />
      <meta name="publisher" content="SSE World" />
      {/* <link rel="canonical" href="https://next-admin.vercel.app" /> */}
      <link rel="icon" href="/logo.svg" />
    </>
  ),
  editLink: {
    component: () => null,
  },
  toc: {
    float: false,
  },
  useNextSeoProps: () => {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – SSE Next Admin",
      };
    }
  },
};

export default config;
