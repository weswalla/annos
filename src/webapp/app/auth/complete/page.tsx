"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

function AuthCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTokens } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    // Clear the URL parameters for security
    const cleanUrl = "/";
    window.history.replaceState({}, document.title, cleanUrl);

    if (error) {
      console.error("Authentication error:", error);
      router.push(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (accessToken && refreshToken) {
      // Store tokens using the auth context function
      setTokens(accessToken, refreshToken);

      // Redirect to dashboard or home page
      router.push("/library");
    } else {
      router.push("/login?error=Authentication failed");
    }
  }, [router, searchParams, setTokens]);

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Completing Sign In</h2>
        <p className="mb-4">
          Please wait while we complete your authentication...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
}

export default function AuthCompletePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Suspense
        fallback={
          <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
              <h2 className="text-2xl font-semibold mb-4">Loading</h2>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            </div>
          </div>
        }
      >
        <AuthCompleteContent />
      </Suspense>
    </main>
  );
}
