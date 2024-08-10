# @sse-ui/neadmin

## 2.0.0

### Major Changes

- [42a2d31](https://github.com/sseuniverse/next-admin/commit/42a2d31):

## Major Changes

- **Breaking Change**:

  - New implementation of `NextAdmin`. Usage of `API route` instead of `server actions`.
  - Configuration of `page.tsx` and `route.ts` files in the `app/admin/[[...nextadmin]]` and `app/api/[[...nextadmin]]` folders respectively.
  - `createHandler` function now available in `appHandler` and `pageHandler` modules to configure the API route.
  - `getNextAdminProps` function now available in `appRouter` and `pageRouter` modules to configure the page route.

## Migration

### API Route `[[...nextadmin]]`

Create a dynamic route `[[...nextadmin]]` to handle all the API routes.

  <details>
  <summary>App router</summary>

```tsx
// app/api/admin/[[...nextadmin]]/route.ts
import { prisma } from "@/prisma";
import { createHandler } from "@sse-ui/neadmin/dist/appHandler";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  /*options*/
});

export { run as DELETE, run as GET, run as POST };
```

  </details>

  <details>
  <summary>Page router</summary>

```ts copy
  // pages/api/admin/[[...nextadmin]].ts
  import { prisma } from "@/prisma";
  import { createApiRouter } from "@sse-ui/neadmin/dist/pageHandler";
  import schema from "@/prisma/json-schema/json-schema.json";

  export const config = {
    api: {
      bodyParser: false,
    },
  };

  const { run } = createHandler({
    apiBasePath: "/api/admin",
    prisma,
    schema: schema,
    /*options*/,
  });

  export default run;
```

  </details>

### Change `getPropsFromParams` to `getNextAdminProps`

  <details>
  <summary>App router</summary>

Replace the `getPropsFromParams` function with the `getNextAdminProps` function in the `page.tsx` file.

```tsx
// app/admin/[[...nextadmin]]/page.tsx
import { NextAdmin, PageProps } from "@sse-ui/neadmin";
import { getNextAdminProps } from "@sse-ui/neadmin/dist/appRouter";
import { prisma } from "@/prisma";

export default async function AdminPage({ params, searchParams }: PageProps) {
  const props = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    /*options*/
  });

  return <NextAdmin {...props} />;
}
```

  </details>

  <details>
  <summary>Page router</summary>

Do not use `nextAdminRouter` anymore. Replace it with the `getNextAdminProps` function in the `[[...nextadmin]].ts` file for `getServerSideProps`.

```tsx copy
// pages/admin/[[...nextadmin]].tsx
import { AdminComponentProps, NextAdmin } from "@sse-ui/neadmin";

import { getNextAdminProps } from "@sse-ui/neadmin/dist/pageRouter";
import { GetServerSideProps } from "next";
import { prisma } from " @/prisma";
import schema from "@/prisma/json-schema/json-schema.json";
import "@/styles.css";

export default function Admin(props: AdminComponentProps) {
  return (
    <NextAdmin
      {...props}
      /*options*/
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) =>
  await getNextAdminProps({
    basePath: "/pagerouter/admin",
    apiBasePath: "/api/pagerouter/admin",
    prisma,
    schema,
    /*options*/
    req,
  });
```

### Patch Changes

- [0fd4382](https://github.com/sseuniverse/next-admin/commit/0fd4382): Add `next-themes` to handle color scheme
- [0fd4382](https://github.com/sseuniverse/next-admin/commit/0fd4382): Redirect useEffect
- [3419d57](https://github.com/sseuniverse/next-admin/commit/3419d57): add dist
- [42a2d31](https://github.com/sseuniverse/next-admin/commit/42a2d31): Change logout system (Request or server action)
- [42a2d31](https://github.com/sseuniverse/next-admin/commit/170a48b): Fix images CORS issues
- [42a2d31](https://github.com/sseuniverse/next-admin/commit/42a2d31): Small fixes (select, dark mode, dashboard, layout, doc)
- [42a2d31](https://github.com/sseuniverse/next-admin/commit/42a2d31): Add history on redirect `Save`
- [42a2d31](https://github.com/sseuniverse/next-admin/commit/42a2d31): Fix date input and add time-second format
- [0fd4382](https://github.com/sseuniverse/next-admin/commit/0fd4382): Add `isDirty` for form to submit only fields touched
- [0fd4382](https://github.com/sseuniverse/next-admin/commit/0fd4382): Dependency `next-themes`
- [0fd4382](https://github.com/sseuniverse/next-admin/commit/0fd4382): add URL redirect support for logout
- [0fd4382](https://github.com/sseuniverse/next-admin/commit/0fd4382): Merge main branch

## 1.0.2

- [714bbce](https://github.com/sseuniverse/next-admin/commit/714bbce): Fixed All the issue and released stable version

## 1.0.0

### Major Changes

- [f427f5a](https://github.com/sseuniverse/next-admin/commit/f427f5a): Fist release of @sse-ui/neadmin package (unstable)
