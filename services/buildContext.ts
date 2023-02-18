// https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
const context = (process.env.CONTEXT || "dev") as
  | "production"
  | "deploy-preview"
  | "branch-deploy"
  | "dev";

export function isProduction(): boolean {
  console.log({ context });
  return context === "production";
}
