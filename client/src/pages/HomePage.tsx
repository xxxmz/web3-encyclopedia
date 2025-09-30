import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useState, useMemo } from "react";
import { type Term } from "@shared/schema";
import Header from "@/components/Header";
import TermCard from "@/components/TermCard";
import HotTermsBanner from "@/components/HotTermsBanner";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 9;

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: terms, isLoading } = useQuery<Term[]>({
    queryKey: ["/api/terms"],
  });

  const { paginatedTerms, totalPages } = useMemo(() => {
    if (!terms) return { paginatedTerms: [], totalPages: 0 };
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    return {
      paginatedTerms: terms.slice(startIndex, endIndex),
      totalPages: Math.ceil(terms.length / ITEMS_PER_PAGE),
    };
  }, [terms, currentPage]);

  const handleTermClick = (termId: string) => {
    setLocation(`/term/${termId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="py-16 lg:py-24 bg-gradient-to-b from-background via-background to-secondary/20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Web3 术语百科
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            为初学者和爱好者提供简洁、权威的 Web3 专业术语解释
          </p>
        </div>
      </div>

      {!isLoading && terms && terms.length > 0 && (
        <HotTermsBanner 
          terms={terms} 
          onTermClick={(term) => handleTermClick(term.id)} 
        />
      )}

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">所有术语</h2>
            <p className="text-muted-foreground">按热度排序 · 第 {currentPage} 页，共 {totalPages} 页</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" data-testid={`skeleton-term-${i}`} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
                {paginatedTerms?.map((term, index) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    rank={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    onClick={() => handleTermClick(term.id)}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>Web3 术语百科 © 2025 - 帮助您快速理解 Web3 世界</p>
        </div>
      </footer>
    </div>
  );
}
