import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flame, Tag } from "lucide-react";
import { type Term } from "@shared/schema";

interface TermDetailProps {
  term: Term;
  onBack?: () => void;
}

export default function TermDetail({ term, onBack }: TermDetailProps) {
  return (
    <div className="w-full">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="gap-2 -ml-2"
          onClick={onBack}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          返回术语列表
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">{term.name}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xl text-muted-foreground">{term.nameEn}</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Flame className="w-3 h-3 text-chart-4" />
              {term.clicks} 次查看
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Tag className="w-3 h-3" />
              {term.category}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">定义</h2>
          <p className="text-base leading-relaxed">{term.definition}</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">背景</h2>
          <p className="text-base leading-relaxed">{term.background}</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">应用场景</h2>
          <p className="text-base leading-relaxed">{term.applications}</p>
        </Card>
      </div>
    </div>
  );
}
