import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Link } from "wouter";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-xl bg-background/80">
      <div className="container mx-auto flex h-16 lg:h-20 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 hover-elevate active-elevate-2 px-3 py-2 -ml-3 rounded-md transition-transform" data-testid="link-home">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
            <span className="text-2xl font-bold text-primary">W3</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Web3 术语百科</span>
            <span className="text-xs text-muted-foreground hidden sm:block">快速理解 Web3 专业术语</span>
          </div>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          data-testid="button-theme-toggle"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
