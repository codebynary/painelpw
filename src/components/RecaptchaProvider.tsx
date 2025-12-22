'use client'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const RecaptchaProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleReCaptchaProvider 
    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
    scriptProps={{
      async: false,
      defer: false,
      nonce: undefined,
    }}
    language="pt-BR"
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};