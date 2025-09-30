import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { type Term } from "@shared/schema";
import Header from "@/components/Header";
import TermDetail from "@/components/TermDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useEffect } from "react";

export default function TermDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();

  const { data: term, isLoading } = useQuery<Term>({
    queryKey: ["/api/terms", id],
    queryFn: () => fetch(`/api/terms/${id}`).then(res => res.json()),
  });

  const incrementClicksMutation = useMutation({
    mutationFn: async (termId: string) => {
      return apiRequest("POST", `/api/terms/${termId}/click`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/terms"] });
      queryClient.invalidateQueries({ queryKey: ["/api/terms", id] });
    },
  });

  useEffect(() => {
    if (id && !incrementClicksMutation.isPending) {
      incrementClicksMutation.mutate(id);
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-32" data-testid="skeleton-back-button" />
              <Skeleton className="h-16 w-3/4" data-testid="skeleton-title" />
              <Skeleton className="h-64 rounded-xl" data-testid="skeleton-content-1" />
              <Skeleton className="h-64 rounded-xl" data-testid="skeleton-content-2" />
            </div>
          ) : term ? (
            <TermDetail
              term={term}
              onBack={() => setLocation("/")}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">术语未找到</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
