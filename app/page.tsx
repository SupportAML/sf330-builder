"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Plus,
  FileText,
  MoreVertical,
  Copy,
  Trash2,
  Eye,
  Edit3,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/lib/store";
import { calcProgress } from "@/lib/progress";
import { IdentityModal } from "@/components/identity-modal";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const { docs, identity, createDoc, deleteDoc, duplicateDoc } = useStore();
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !identity) {
      setShowIdentityModal(true);
    }
  }, [hydrated, identity]);

  const handleNewDoc = () => {
    const name = `SF 330 — ${format(new Date(), "MMM d, yyyy")}`;
    const id = createDoc(name);
    router.push(`/builder/${id}`);
  };

  const handleDelete = (id: string, name: string) => {
    deleteDoc(id);
    toast.success(`"${name}" deleted`);
  };

  const handleDuplicate = (id: string) => {
    const newId = duplicateDoc(id);
    if (newId) {
      toast.success("Document duplicated");
      router.push(`/builder/${newId}`);
    }
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <IdentityModal
        open={showIdentityModal}
        onClose={() => setShowIdentityModal(false)}
      />
      {/* Top nav */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <span className="font-semibold text-base tracking-tight">
              SF 330 Builder
            </span>
          </div>
          <div className="flex items-center gap-3">
            {identity && (
              <button
                onClick={() => setShowIdentityModal(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {identity.name} · {identity.firm}
              </button>
            )}
            <Button onClick={handleNewDoc} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New SF 330
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Your Documents</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            SF 330 Part I — Contract-Specific Qualifications
          </p>
        </div>

        {docs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FileText className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h2 className="text-lg font-semibold mb-2">No documents yet</h2>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Create your first SF 330 Part I submission. All data is saved
              locally in your browser.
            </p>
            <Button onClick={handleNewDoc}>
              <Plus className="h-4 w-4 mr-1" />
              Create your first SF 330
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {docs.map((doc) => {
              const progress = calcProgress(doc);
              return (
                <Card
                  key={doc.id}
                  className="group hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/builder/${doc.id}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="h-4 w-4 text-primary shrink-0" />
                        <span className="font-medium text-sm truncate">
                          {doc.name}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center rounded-md hover:bg-accent"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DropdownMenuItem
                            onClick={() => router.push(`/builder/${doc.id}`)}
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/preview/${doc.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDuplicate(doc.id)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(doc.id, doc.name)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    {doc.sectionA.contractNumber && (
                      <p className="text-xs text-muted-foreground truncate">
                        Contract #{doc.sectionA.contractNumber}
                      </p>
                    )}
                    {doc.sectionA.title && (
                      <p className="text-xs text-muted-foreground truncate">
                        {doc.sectionA.title}
                      </p>
                    )}
                    {!doc.sectionA.contractNumber && !doc.sectionA.title && (
                      <p className="text-xs text-muted-foreground italic">
                        No contract info yet
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 pt-0">
                    <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
                      <span>{progress}% complete</span>
                      <span>
                        {format(new Date(doc.updatedAt), "MMM d, yyyy")}
                      </span>
                    </div>
                    <Progress value={progress} className="h-1.5 w-full" />
                  </CardFooter>
                </Card>
              );
            })}
            {/* New doc card */}
            <button
              onClick={handleNewDoc}
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors min-h-[160px]"
            >
              <Plus className="h-8 w-8" />
              <span className="text-sm font-medium">New SF 330</span>
            </button>
          </div>
        )}
      </main>
    </>
  );
}
