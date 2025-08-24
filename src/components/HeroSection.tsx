import { Button } from '@/components/ui/button';
import { PenTool, BookOpen, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-editorial.jpg';

const HeroSection = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

  const handleWriteClick = () => {
    if (!user) {
      navigate('/auth');
    } else if (userRole === 'author' || userRole === 'admin') {
      navigate('/write');
    } else {
      navigate('/auth'); // Redirect to get author role
    }
  };

  const stats = [
    { icon: BookOpen, label: 'Yazı', value: '2.5K+' },
    { icon: Users, label: 'Yazar', value: '500+' },
    { icon: PenTool, label: 'Kategori', value: '7' }
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Modern editorial platform" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="editorial-container relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Yazılarınızı
            <span className="editorial-text-gradient block">
              Dünyaya Açın
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Modern ve kullanıcı dostu platformumuzda yazılarınızı yayınlayın, 
            binlerce okuyucuya ulaşın ve yazarlık deneyiminizi geliştirin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="editorial-gradient text-white px-8"
              onClick={handleWriteClick}
            >
              <PenTool className="w-5 h-5 mr-2" />
              Yazmaya Başla
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8"
              onClick={() => navigate('/articles')}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Yazıları Keşfet
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-primary-subtle rounded-full">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-display font-bold mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;