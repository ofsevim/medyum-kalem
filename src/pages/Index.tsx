import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryNavigation from '@/components/CategoryNavigation';
import ArticleCard from '@/components/ArticleCard';

// Sample data
const sampleArticles = [
  {
    title: "Modern Web Geliştirme Teknikleri ve En İyi Uygulamalar",
    excerpt: "2024 yılında web geliştirme alanındaki en son trend ve teknikleri keşfedin. React, TypeScript ve modern araçlarla nasıl daha verimli kod yazabileceğinizi öğrenin.",
    author: {
      name: "Ahmet Yılmaz",
      username: "ahmet_dev",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmet"
    },
    publishedAt: "2 gün önce",
    readTime: "8 dk okuma",
    category: "Teknoloji",
    tags: ["web-geliştirme", "react", "typescript"],
    stats: { likes: 142, comments: 23, views: 1250 },
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    featured: true
  },
  {
    title: "Sürdürülebilir Yaşam İçin Pratik Öneriler",
    excerpt: "Günlük hayatınızda çevreye duyarlı tercihler yaparak nasıl fark yaratabilirsiniz? İşte sürdürülebilir yaşam için uygulanabilir adımlar.",
    author: {
      name: "Elif Kaya",
      username: "elif_eco",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elif"
    },
    publishedAt: "1 gün önce",
    readTime: "5 dk okuma",
    category: "Yaşam",
    tags: ["sürdürülebilirlik", "çevre", "yaşam"],
    stats: { likes: 89, comments: 15, views: 780 },
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop"
  },
  {
    title: "Yapay Zeka ve Gelecek: Neler Bizi Bekliyor?",
    excerpt: "Yapay zeka teknolojilerinin hızla geliştiği bu dönemde, gelecekte nasıl bir dünya bizi bekliyor? Uzmanların görüşleri ve tahminleri.",
    author: {
      name: "Mehmet Özkan",
      username: "mehmet_ai",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mehmet"
    },
    publishedAt: "3 gün önce",
    readTime: "12 dk okuma",
    category: "Teknoloji",
    tags: ["yapay-zeka", "gelecek", "teknoloji"],
    stats: { likes: 203, comments: 45, views: 2100 }
  },
  {
    title: "Mindfulness: Zihin Sağlığı İçin Meditasyon",
    excerpt: "Stresli yaşam temposunda zihinsel dengeni korumak için meditasyon ve farkındalık tekniklerini nasıl hayatına entegre edebilirsin?",
    author: {
      name: "Ayşe Demir",
      username: "ayse_zen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ayse"
    },
    publishedAt: "4 gün önce",
    readTime: "6 dk okuma",
    category: "Zihin",
    tags: ["meditasyon", "zihin-sağlığı", "wellness"],
    stats: { likes: 67, comments: 12, views: 540 }
  },
  {
    title: "Türk Sinemasının Altın Çağı",
    excerpt: "1960'lardan günümüze Türk sinemasının gelişimi ve dünya sinemasındaki yeri. Unutulmaz filmler ve yönetmenler üzerine bir inceleme.",
    author: {
      name: "Cem Aktaş",
      username: "cem_sinema",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cem"
    },
    publishedAt: "5 gün önce",
    readTime: "10 dk okuma",
    category: "Kültür",
    tags: ["sinema", "türk-sineması", "kültür"],
    stats: { likes: 134, comments: 28, views: 950 }
  },
  {
    title: "Doğa Fotoğrafçılığında İpuçları",
    excerpt: "Doğanın güzelliklerini objektifle yakalamak için bilmeniz gerekenler. Kompozisyon, ışık ve ekipman seçimi hakkında pratik öneriler.",
    author: {
      name: "Fatma Şen",
      username: "fatma_foto",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatma"
    },
    publishedAt: "1 hafta önce",
    readTime: "7 dk okuma",
    category: "Doğa",
    tags: ["fotoğrafçılık", "doğa", "sanat"],
    stats: { likes: 98, comments: 19, views: 720 }
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryNavigation />
      
      {/* Main Content */}
      <main className="editorial-container py-12">
        {/* Featured & Latest Articles */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold">Öne Çıkan Yazılar</h2>
            <button className="text-primary hover:underline">Tümünü Gör</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </section>

        {/* Most Read Articles */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold">En Çok Okunanlar</h2>
            <button className="text-primary hover:underline">Tümünü Gör</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleArticles.slice(0, 4).map((article, index) => (
              <ArticleCard key={`popular-${index}`} {...article} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
