let isEnabled: boolean;

export function setupTracking(trackingEnv: string | undefined): void {
  isEnabled = trackingEnv === "TRUE";
}

export function isTrackingEnabled(): boolean {
  return isEnabled;
}

function _noGlobalFallback(eventName: string, ...rest: Array<any>) {
  console.log("[TRACKING DID NOT LOAD]", eventName, ...rest);
}

export function track(eventName: string, ...rest: Array<any>) {
  const _track = (window as any).plausible || _noGlobalFallback;
  _track(eventName, ...rest);
}
