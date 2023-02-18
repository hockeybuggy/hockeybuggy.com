function _noGlobalFallback(eventName: string, ...rest: Array<any>) {
  console.log("[TRACKING DID NOT LOAD]", eventName, ...rest);
}

export function track(eventName: string, ...rest: Array<any>) {
  const _track = (window as any).plausible || _noGlobalFallback;
  _track(eventName, ...rest);
}
