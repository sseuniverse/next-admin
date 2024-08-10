import { NextAdminOptions } from "@sse-ui/neadmin";
import DatePicker from "./components/DatePicker";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";

export const options: NextAdminOptions = {
  basePath: "/admin",
  title: "⚡️ My Admin",
  model: {
    User: {
      toString: (user) => `${user.name} (${user.email})`,
      permissions: ["edit", "delete", "create"],
      title: "Users",
      icon: "UsersIcon",
      aliases: {
        id: "ID",
        name: "Full name",
        birthDate: "Date of birth",
      },
      list: {
        exports: {
          format: "CSV",
          url: "/api/users/export",
        },
        display: ["id", "name", "email", "posts", "role", "birthDate"],
        search: ["name", "email", "role"],
        copy: ["email"],
        filters: [
          {
            name: "is Admin",
            active: false,
            value: {
              role: {
                equals: "ADMIN",
              },
            },
          },
        ],
        fields: {
          role: {
            formatter: (role: {
              toString: () =>
                | string
                | number
                | bigint
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<AwaitedReactNode>
                | null
                | undefined;
            }) => {
              return (
                <strong className="dark:text-white">{role.toString()}</strong>
              );
            },
          },
          birthDate: {
            formatter: (
              date: unknown | string,
              context: { locale: Intl.LocalesArgument }
            ) => {
              return new Date(date as unknown as string)
                ?.toLocaleString(context?.locale)
                .split(/[\s,]+/)[0];
            },
          },
        },
      },
      edit: {
        display: [
          "id",
          "name",
          {
            title: "Email is mandatory",
            id: "email-notice",
            description: "You must add an email from now on",
          } as const,
          "email",
          "posts",
          "role",
          "birthDate",
          "avatar",
          "metadata",
        ],
        styles: {
          _form: "grid-cols-3 gap-4 md:grid-cols-4",
          id: "col-span-2 row-start-1",
          name: "col-span-2 row-start-1",
          "email-notice": "col-span-4 row-start-3",
          email: "col-span-4 md:col-span-2 row-start-4",
          posts: "col-span-4 md:col-span-2 row-start-5",
          role: "col-span-4 md:col-span-2 row-start-6",
          birthDate: "col-span-3 row-start-7",
          avatar: "col-span-4 row-start-8",
          metadata: "col-span-4 row-start-9",
        },
        fields: {
          name: {
            required: true,
          },
          email: {
            validate: (email) => email.includes("@") || "form.user.email.error",
            helperText: "Must be a valid email address",
            tooltip: "Make sure to include the @",
          },
          birthDate: {
            input: <DatePicker />,
          },
          posts: {
            display: "list",
            orderField: "order",
          },
          avatar: {
            format: "file",
            handler: {
              /*
               * Include your own upload handler here,
               * for example you can upload the file to an S3 bucket.
               * Make sure to return a string.
               */
              upload: async (buffer, infos) => {
                return "https://www.gravatar.com/avatar/00000000000000000000000000000000";
              },
            },
          },
          metadata: {
            format: "json",
            validate: (value) => {
              try {
                if (!value) {
                  return true;
                }
                JSON.parse(value as string);
                return true;
              } catch {
                return "Invalid JSON";
              }
            },
          },
        },
      },
      actions: [
        {
          title: "actions.user.email.title",
          action: async (...args) => {
            "use server";
            const { submitEmail } = await import("./actions/nextadmin");
            await submitEmail(...args);
          },
          successMessage: "actions.user.email.success",
          errorMessage: "actions.user.email.error",
        },
      ],
    },
    Post: {
      toString: (post) => `${post.title}`,
      title: "Posts",
      icon: "NewspaperIcon",
      permissions: ["edit", "delete", "create"],
      list: {
        exports: [
          { format: "CSV", url: "/api/posts/export?format=csv" },
          { format: "JSON", url: "/api/posts/export?format=json" },
        ],
        display: ["id", "title", "published", "author", "categories", "rate"],
        search: ["title", "content"],
        fields: {
          author: {
            formatter: (author: {
              name:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<AwaitedReactNode>
                | null
                | undefined;
            }) => {
              return <strong>{author.name}</strong>;
            },
          },
          published: {
            formatter: (value: boolean) => {
              return value ? "Published" : "Unpublished";
            },
          },
        },
      },
      edit: {
        fields: {
          content: {
            format: "richtext-html",
          },
          categories: {
            relationOptionFormatter: (category) => {
              return `${category.name} Cat.${category.id}`;
            },
            display: "list",
            orderField: "order",
            relationshipSearchField: "category",
          },
        },
        display: [
          "id",
          "title",
          "content",
          "published",
          "categories",
          "author",
          "rate",
        ],
      },
    },
    Category: {
      title: "Categories",
      icon: "InboxStackIcon",
      toString: (category) => `${category.name}`,
      list: {
        display: ["name", "posts"],
      },
      edit: {
        display: ["name", "posts"],
        fields: {
          posts: {
            display: "list",
            relationshipSearchField: "post",
          },
        },
      },
    },
    Role: {
      title: "Roles",
      icon: "InboxStackIcon",
      toString: (role: { name: any; }) => `${role.name}`,
      list: {
        display: ["name"],
        // search: ["name"]
      },
      edit: {
        display: ["name",],
        fields: {},
      },
    },
  },
  pages: {
    "/custom": {
      title: "Custom page",
      icon: "PresentationChartBarIcon",
    },
  },
  sidebar: {
    groups: [
      {
        title: "Users",
        models: ["User"],
      },
      {
        title: "Categories",
        models: ["Category"],
      },
      {
        title: "Roles",
        models: ["Roles"],
      },
    ],
  },
  externalLinks: [
    {
      label: "Documentation",
      url: "https://sse-admin.vercel.app",
    },
    {
      label: "Page Router",
      url: "/pagerouter/admin",
    },
  ],
  defaultColorScheme: "dark",
};
