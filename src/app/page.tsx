"use client";

import { useState } from "react";
import { DocumentAnalysis } from "@/components/document-analysis";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FileUpload } from "@/components/file-uplaod";

interface AnalysisResult {
  document: string;
  analysis: {
    clause: string;
    severity: string;
    risk_level: "low" | "medium" | "high";
    explanation?: string;
  }[];
  summary?: {
    rent_amount?: string;
    security_deposit?: string;
    lease_term?: string;
    key_terms?: string[];
  };
}

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setUploadedFile(file);

    setTimeout(() => {
      const mockResponse: AnalysisResult = {
        document: file.name,
        analysis: [
          {
            clause: "Tenant must pay rent by the 5th of each month",
            severity: "🟢",
            risk_level: "low",
            explanation: "Standard payment terms with reasonable grace period.",
          },
          {
            clause: "If rent is delayed, penalty of 10% per day applies",
            severity: "🔴",
            risk_level: "high",
            explanation:
              "Excessive late fee that compounds daily - this is unusually harsh and may not be legally enforceable.",
          },
          {
            clause: "Landlord may terminate without notice in case of dispute",
            severity: "🔴",
            risk_level: "high",
            explanation:
              "This clause violates tenant rights. Most jurisdictions require proper notice periods.",
          },
          {
            clause: "Tenant responsible for minor repairs",
            severity: "🟡",
            risk_level: "medium",
            explanation:
              "Typical responsibility, but ensure 'minor repairs' is clearly defined to avoid disputes.",
          },
          {
            clause: "Security deposit equals two months rent",
            severity: "🟡",
            risk_level: "medium",
            explanation:
              "Higher than average but may be legal depending on local regulations.",
          },
        ],
        summary: {
          rent_amount: "$2,400/month",
          security_deposit: "$4,800",
          lease_term: "12 months",
          key_terms: [
            "Pet policy included",
            "Utilities not included",
            "Early termination clause",
          ],
        },
      };
      setAnalysisResult(mockResponse);
      setIsLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setUploadedFile(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {!analysisResult ? (
        <>
          <Hero />
          <div className="container mx-auto px-4 py-12">
            <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
          </div>
        </>
      ) : (
        <DocumentAnalysis
          analysisResult={analysisResult}
          uploadedFile={uploadedFile}
          onReset={handleReset}
        />
      )}
    </main>
  );
}
