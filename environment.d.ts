declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      NEXT_PUBLIC_SALARY_DEFAULT_HOURLY_RATE: string;
      NEXT_PUBLIC_SALARY_DEFAULT_COMMISSION: string;
      NEXT_PUBLIC_SALARY_DEFAULT_TAX: string;
      NEXT_PUBLIC_SALARY_DEFAULT_WORK_HOURS: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_AZURE_AD_CLIENT_ID: string;
      NEXTAUTH_AZURE_AD_TENANT_ID: string;
      NEXTAUTH_AZURE_AD_SECRET: string;
      AZURE_AD_ADMIN_GROUP_ID: string;
      AZURE_AD_SPECIALIST_GROUP_ID: string;
      DATABASE_URL: string;
      SALES_EMAILS: string;
      FEEDBACK_RECIPIENT_EMAIL: string;
      MICROSOFT_GRAPH_USERNAME: string;
      MICROSOFT_GRAPH_PASSWORD: string;
      MICROSOFT_STORAGE_SAS_TOKEN: string;
      RESEND_SENDING_API_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
