import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import CategoryNavigation from '@/components/CategoryNavigation';
import ArticleCard from '@/components/ArticleCard';
import { Loader2 } from 'lucide-react';

const Articles = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, [activeCategory]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('articles')
        .select(`
          *,
          author:profiles!articles_author_id_fkey(username, display_name, avatar_url),
          category:categories(name, slug)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (activeCategory !== 'all') {
        const category = categories.find(cat => cat.slug === activeCategory);
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching articles:', error);
        return;
      }

      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
    setLoading(false);
  };

  const transformArticle = (article: any) => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    author: {
      name: article.author?.display_name || 'Anonim',
      username: article.author?.username || 'anonymous',
      avatar: article.author?.avatar_url,
    },
    publishedAt: new Date(article.published_at).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    readTime: `${article.read_time} dk okuma`,
    category: article.category?.name || 'Genel',
    tags: article.tags || [],
    stats: {
      likes: article.likes_count || 0,
      comments: article.comments_count || 0,
      views: article.views_count || 0,
    },
    coverImage: article.cover_image_url,
    featured: article.featured,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNavigation />
      
      <main className="editorial-container py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold">
            {activeCategory === 'all' ? 'Tüm Yazılar' : 
             categories.find(cat => cat.slug === activeCategory)?.name || 'Yazılar'}
          </h1>
          <div className="text-muted-foreground">
            {articles.length} yazı bulundu
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Bu kategoride henüz yazı yok.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...transformArticle(article)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Articles;