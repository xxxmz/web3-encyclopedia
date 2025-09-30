import { Badge } from "@/components/ui/badge";
import { Flame, TrendingUp } from "lucide-react";
import { type Term } from "@shared/schema";

interface HotTermsBannerProps {
  terms: Term[];
  onTermClick?: (term: Term) => void;
}

export default function HotTermsBanner({ terms, onTermClick }: HotTermsBannerProps) {
  const topTerms = terms.slice(0, 5);

  return (
    <div className="w-full bg-card border-y py-6">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">热门术语</h2>
          </div>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {topTerms.map((term, index) => (
            <Badge
              key={term.id}
              variant="secondary"
              className="flex items-center gap-2 px-4 py-2 cursor-pointer whitespace-nowrap hover-elevate active-elevate-2 transition-all"
              onClick={() => onTermClick?.(term)}
              data-testid={`badge-hot-term-${term.id}`}
            >
              <Flame className={`w-4 h-4 ${index === 0 ? "text-chart-3" : "text-chart-4"}`} />
              <span className="font-medium">{term.name}</span>
              <span className="text-xs text-muted-foreground">({term.clicks})</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
