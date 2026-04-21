"use client";

import { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import type { SF330Doc } from "@/lib/types";

// Dynamically import PDF components to prevent SSR issues
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFDownloadLink),
  { ssr: false }
);

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFViewer),
  { ssr: false }
);

const SF330PdfDocument = dynamic(
  () =>
    import("@/components/pdf-document").then((m) => m.SF330PdfDocument),
  { ssr: false }
);

function ExportClient({ doc }: { doc: SF330Doc }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Give react-pdf time to initialize
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const filename = `SF330-${doc.name.replace(/[^a-z0-9]/gi, "-")}.pdf`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href={`/builder/${doc.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            Back to Builder
          </Button>
        </Link>
        <Link href={`/preview/${doc.id}`}>
          <Button variant="outline" size="sm">
            HTML Preview
          </Button>
        </Link>
        {ready && SF330PdfDocument && (
          <PDFDownloadLink
            document={<SF330PdfDocument doc={doc} />}
            fileName={filename}
          >
            {({ loading }) => (
              <Button disabled={loading} size="sm">
                {loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                    Preparing PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Download PDF
                  </>
                )}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </div>

      {!ready && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Preparing PDF renderer...
        </div>
      )}

      {/* PDF Viewer — desktop only */}
      {ready && SF330PdfDocument && (
        <div className="hidden md:block border rounded-lg overflow-hidden" style={{ height: "80vh" }}>
          <PDFViewer width="100%" height="100%" showToolbar={false}>
            <SF330PdfDocument doc={doc} />
          </PDFViewer>
        </div>
      )}

      {/* Mobile: just show download link */}
      {ready && SF330PdfDocument && (
        <div className="md:hidden p-4 bg-white rounded-lg border text-center text-sm text-muted-foreground">
          PDF preview is not available on mobile. Use the Download button above.
        </div>
      )}
    </div>
  );
}

export default function ExportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getDoc } = useStore();
  const [hydrated, setHydrated] = useState(false);
  const [doc, setDoc] = useState<SF330Doc | undefined>(undefined);

  useEffect(() => {
    setHydrated(true);
    const d = getDoc(id);
    setDoc(d);
  }, [id, getDoc]);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Document not found.</p>
        <Button onClick={() => router.push("/")} variant="outline">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-base font-semibold">Export PDF</h1>
        <p className="text-sm text-muted-foreground">{doc.name}</p>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <ExportClient doc={doc} />
      </div>
    </div>
  );
}
