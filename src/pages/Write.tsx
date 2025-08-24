import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, Send, X, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Write = () => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    categoryId: '',
    coverImageUrl: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (userRole !== 'author' && userRole !== 'admin') {
      toast({
        variant: 'destructive',
        title: 'Yetki Hatası',
        description: 'Yazı yazmak için yazar olmanız gerekiyor.',
      });
      navigate('/');
      return;
    }

    fetchCategories();
  }, [user, userRole, navigate]);

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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9şğüöçı\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (status: 'draft' | 'pending') => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        variant: 'destructive',
        title: 'Eksik Bilgi',
        description: 'Başlık ve içerik alanları zorunludur.',
      });
      return;
    }

    if (!formData.categoryId) {
      toast({
        variant: 'destructive',
        title: 'Eksik Bilgi',
        description: 'Lütfen bir kategori seçin.',
      });
      return;
    }

    setLoading(true);

    try {
      const slug = generateSlug(formData.title);
      const readTime = calculateReadTime(formData.content);

      const articleData = {
        title: formData.title.trim(),
        slug,
        excerpt: formData.excerpt.trim() || formData.content.substring(0, 150) + '...',
        content: formData.content.trim(),
        cover_image_url: formData.coverImageUrl.trim() || null,
        author_id: user!.id,
        category_id: formData.categoryId,
        status,
        tags,
        read_time: readTime,
        published_at: status === 'pending' ? new Date().toISOString() : null,
      };

      const { data, error } = await supabase
        .from('articles')
        .insert(articleData)
        .select()
        .single();

      if (error) {
        console.error('Error creating article:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Yazı kaydedilirken bir hata oluştu.',
        });
        return;
      }

      toast({
        title: status === 'draft' ? 'Taslak Kaydedildi' : 'Yayına Gönderildi',
        description: status === 'draft' 
          ? 'Yazınız taslak olarak kaydedildi.' 
          : 'Yazınız admin onayı için gönderildi.',
      });

      navigate('/');
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Bir hata oluştu.',
      });
    }

    setLoading(false);
  };

  if (!user || (userRole !== 'author' && userRole !== 'admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="editorial-container py-6">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => handleSubmit('draft')}
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              Taslak Kaydet
            </Button>
            <Button
              onClick={() => handleSubmit('pending')}
              disabled={loading}
              className="editorial-gradient text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Yayına Gönder
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Yeni Yazı</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Başlık *</Label>
                  <Input
                    id="title"
                    placeholder="Yazınızın başlığını girin..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="text-lg font-medium"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Özet</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Yazınızın kısa bir özetini girin..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">İçerik *</Label>
                  <Textarea
                    id="content"
                    placeholder="Yazınızın içeriğini buraya yazın..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={20}
                    className="min-h-[400px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Yazı Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Kategori *</Label>
                  <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="coverImage">Kapak Görseli URL'si</Label>
                  <Input
                    id="coverImage"
                    placeholder="https://example.com/image.jpg"
                    value={formData.coverImageUrl}
                    onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Etiketler</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      placeholder="Etiket ekle..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button onClick={addTag} size="sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          #{tag}
                          <X 
                            className="w-3 h-3 cursor-pointer" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Yazı İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Kelime Sayısı:</span>
                    <span>{formData.content.trim().split(/\s+/).filter(word => word.length > 0).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Okuma Süresi:</span>
                    <span>~{calculateReadTime(formData.content)} dk</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;