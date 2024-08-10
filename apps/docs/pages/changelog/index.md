# @sse-ui/neadmin

## 2.0.0

### Major Changes

- [a005fdf](https://github.com/premieroctet/next-admin/commit/a005fdf):

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
import { createHandler } from "@premieroctet/next-admin/dist/appHandler";

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
  import { createApiRouter } from "@premieroctet/next-admin/dist/pageHandler";
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
import { NextAdmin, PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/dist/appRouter";
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
import { AdminComponentProps, NextAdmin } from "@premieroctet/next-admin";

import { getNextAdminProps } from "@premieroctet/next-admin/dist/pageRouter";
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

- [f120d10](https://github.com/premieroctet/next-admin/commit/f120d10): Add `next-themes` to handle color scheme
- [119a053](https://github.com/premieroctet/next-admin/commit/119a053): Redirect useEffect
- [5b295bb](https://github.com/premieroctet/next-admin/commit/5b295bb): add dist
- [12de962](https://github.com/premieroctet/next-admin/commit/12de962): Change logout system (Request or server action)
- [170a48b](https://github.com/premieroctet/next-admin/commit/170a48b): Fix images CORS issues
- [f3636ad](https://github.com/premieroctet/next-admin/commit/f3636ad): Small fixes (select, dark mode, dashboard, layout, doc)
- [60afe2f](https://github.com/premieroctet/next-admin/commit/60afe2f): Add history on redirect `Save`
- [0221476](https://github.com/premieroctet/next-admin/commit/0221476): Fix date input and add time-second format
- [4e0e774](https://github.com/premieroctet/next-admin/commit/4e0e774): Add `isDirty` for form to submit only fields touched
- [ed78f46](https://github.com/premieroctet/next-admin/commit/ed78f46): Dependency `next-themes`
- [b5322db](https://github.com/premieroctet/next-admin/commit/b5322db): add URL redirect support for logout
- [818f1e4](https://github.com/premieroctet/next-admin/commit/818f1e4): Merge main branch

## 1.0.2

- [714bbce](https://github.com/sseuniverse/next-admin/commit/714bbce){:target="\_blank"}: Fixed All the issue and released stable version

## 1.0.0

### Major Changes

- [f427f5a](https://github.com/sseuniverse/next-admin/commit/f427f5a): Fist release of @sse-ui/neadmin package (unstable)
