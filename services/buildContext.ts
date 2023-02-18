// https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
const context = process.env.CONTEXT as
  | "production"
  | "deploy-preview"
  | "branch-deploy"
  | "dev";

export function isProduction(): boolean {
  return context === "production";
}
