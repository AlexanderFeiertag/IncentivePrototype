declare global {
  interface Window {
    ethereum?: {
      request: (...args: any[]) => Promise<any>;
      // Füge hier weitere ethereum-spezifische Methoden hinzu, falls nötig
    };
  }
}

export {};
