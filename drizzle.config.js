/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://htree_owner:SeYy1NVZMqD9@ep-spring-smoke-a5drsnrx.us-east-2.aws.neon.tech/htree?sslmode=require",
  },
};
