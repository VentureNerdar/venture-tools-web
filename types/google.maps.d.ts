// TypeScript declaration for global 'google' object for Google Maps API
// This helps TypeScript recognize 'google' as a global variable

declare global {
  var google: typeof import('google.maps');
}

export {};
