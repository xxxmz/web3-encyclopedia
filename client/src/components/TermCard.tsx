import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";
import { type Term } from "@shared/schema";

interface TermCardProps {
  term: Term;
  rank?: number;
  onClick?: () => void;
}

export default function TermCard({ term, rank, onClick }: TermCardProps) {
  const isTopThree = rank && rank <= 3;

  return (
    <Card
      className={`p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover-elevate active-elevate-2 ${
        isTopThree ? "bg-gradient-to-br from-primary/5 to-accent/5 border-primary/30" : ""
      }`}
      onClick={onClick}
      data-testid={`card-term-${term.id}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold mb-1 text-foreground hover:text-primary transition-colors">
            {term.name}
          </h3>
          <p className="text-sm text-muted-foreground">{term.nameEn}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge variant="secondary" className="gap-1 text-xs" data-testid={`badge-clicks-${term.id}`}>
            <Flame className={`w-3 h-3 ${isTopThree ? "text-chart-3" : "text-chart-4"}`} />
            {term.clicks}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {term.brief}
      </p>

      <Badge variant="outline" className="text-xs" data-testid={`badge-category-${term.id}`}>
        {term.category}
      </Badge>
    </Card>
  );
}
