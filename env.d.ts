declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DATABASE_ID: string;
        BOTS_COLLECTION_ID: string;
        TELEGRAMS_COLLECTION_ID: string;
        REVENUECAT_COLLECTION_ID: string;
      }
    }
  }
  
  export {};