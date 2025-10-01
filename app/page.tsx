"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const SplashScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/signup"); {/* Navigate to signup page after 3 seconds */}
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <section className="flex justify-center items-center min-h-screen bg-[#4203a9]">
      <div className="text-center px-6">
        <h1 className="text-[40px] md:text-[50px] lg:text-[60px] text-white font-bold animate-pulse">
          Welcome to Healthify
        </h1>
        <div className="mt-8">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default SplashScreen;