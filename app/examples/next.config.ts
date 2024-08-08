import withNextIntl from "next-intl/plugin";

// Import types for NextConfig
import type { NextConfig } from "next";

const withNextIntlPlugin = withNextIntl("./i18n.ts");

export default withNextIntlPlugin({
  reactStrictMode: true,
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },
}) as NextConfig;
