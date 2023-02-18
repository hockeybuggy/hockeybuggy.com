// https://docs.netlify.com/configure-builds/environment-variables/#build-metadata

type CONTEXT = "production" | "deploy-preview" | "branch-deploy" | "dev";

let context: CONTEXT;

export function setupContext(contextEnv: string | undefined): void {
  context = (contextEnv || "dev") as CONTEXT;
}

export function isProduction(): boolean {
  console.log({ context });
  return context === "production";
}

export function isDeployPreview(): boolean {
  return context === "deploy-preview";
}
