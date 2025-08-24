import { useState } from 'react';
import { Search, Menu, X, PenTool, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="editorial-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-display font-bold editorial-text-gradient">
              Yazı Platformu
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Ana Sayfa
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Yazılar
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Yazarlar
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Yazı ara..."
              className="pl-10 w-64 bg-muted/50 border-muted focus:bg-background"
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Giriş Yap
            </Button>
            <Button size="sm" className="editorial-gradient text-white">
              <PenTool className="w-4 h-4 mr-2" />
              Yazı Yaz
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Yazı ara..."
                  className="pl-10 bg-muted/50"
                />
              </div>
              <a href="#" className="text-foreground hover:text-primary py-2">
                Ana Sayfa
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary py-2">
                Yazılar
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary py-2">
                Yazarlar
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" size="sm" className="justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Giriş Yap
                </Button>
                <Button size="sm" className="editorial-gradient text-white justify-start">
                  <PenTool className="w-4 h-4 mr-2" />
                  Yazı Yaz
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;