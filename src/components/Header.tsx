import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, PenTool, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, userRole, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="editorial-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-display font-bold editorial-text-gradient hover:opacity-80 transition-opacity">
                Yazı Platformu
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Ana Sayfa
            </Link>
            <Link to="/articles" className="text-muted-foreground hover:text-primary transition-colors">
              Yazılar
            </Link>
            <Link to="/authors" className="text-muted-foreground hover:text-primary transition-colors">
              Yazarlar
            </Link>
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
            {user ? (
              <>
                {(userRole === 'author' || userRole === 'admin') && (
                  <Button 
                    size="sm" 
                    className="editorial-gradient text-white"
                    onClick={() => navigate('/write')}
                  >
                    <PenTool className="w-4 h-4 mr-2" />
                    Yazı Yaz
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={profile?.avatar_url} alt={profile?.display_name} />
                        <AvatarFallback>
                          {profile?.display_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span>{profile?.display_name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="w-4 h-4 mr-2" />
                      Profilim
                    </DropdownMenuItem>
                    {userRole === 'admin' && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Panel
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Çıkış Yap
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                  <User className="w-4 h-4 mr-2" />
                  Giriş Yap
                </Button>
                <Button 
                  size="sm" 
                  className="editorial-gradient text-white"
                  onClick={() => navigate('/auth')}
                >
                  <PenTool className="w-4 h-4 mr-2" />
                  Yazı Yaz
                </Button>
              </>
            )}
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
              <Link to="/" className="text-foreground hover:text-primary py-2">
                Ana Sayfa
              </Link>
              <Link to="/articles" className="text-muted-foreground hover:text-primary py-2">
                Yazılar
              </Link>
              <Link to="/authors" className="text-muted-foreground hover:text-primary py-2">
                Yazarlar
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <>
                    {(userRole === 'author' || userRole === 'admin') && (
                      <Button 
                        size="sm" 
                        className="editorial-gradient text-white justify-start"
                        onClick={() => navigate('/write')}
                      >
                        <PenTool className="w-4 h-4 mr-2" />
                        Yazı Yaz
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="justify-start"
                      onClick={() => navigate('/profile')}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {profile?.display_name}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="justify-start"
                      onClick={signOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Çıkış Yap
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="justify-start"
                      onClick={() => navigate('/auth')}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Giriş Yap
                    </Button>
                    <Button 
                      size="sm" 
                      className="editorial-gradient text-white justify-start"
                      onClick={() => navigate('/auth')}
                    >
                      <PenTool className="w-4 h-4 mr-2" />
                      Yazı Yaz
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;