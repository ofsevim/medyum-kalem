import { Heart, MessageCircle, Share2, Clock, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
    username: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  stats: {
    likes: number;
    comments: number;
    views: number;
  };
  coverImage?: string;
  featured?: boolean;
}

const ArticleCard = ({ 
  title, 
  excerpt, 
  author, 
  publishedAt, 
  readTime, 
  category, 
  tags, 
  stats,
  coverImage,
  featured = false 
}: ArticleCardProps) => {
  return (
    <article className={`
      editorial-card group cursor-pointer
      ${featured ? 'md:col-span-2 lg:col-span-2' : ''}
    `}>
      {/* Cover Image */}
      {coverImage && (
        <div className={`
          relative overflow-hidden bg-muted
          ${featured ? 'h-64 md:h-80' : 'h-48'}
        `}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 z-10" />
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {featured && (
            <div className="absolute top-4 left-4 z-20">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Öne Çıkan
              </Badge>
            </div>
          )}
          <Badge 
            variant="outline" 
            className="absolute top-4 right-4 z-20 bg-background/90 backdrop-blur-sm"
          >
            {category}
          </Badge>
        </div>
      )}

      <div className="p-6">
        {/* Category & Reading Time */}
        {!coverImage && (
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline">{category}</Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {readTime}
            </div>
          </div>
        )}

        {/* Title */}
        <h2 className={`
          font-display font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-3
          ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}
        `}>
          {title}
        </h2>

        {/* Excerpt */}
        <p className={`
          text-muted-foreground line-clamp-3 mb-4
          ${featured ? 'text-base' : 'text-sm'}
        `}>
          {excerpt}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 bg-primary-subtle text-primary rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author & Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{author.name}</p>
              <p className="text-xs text-muted-foreground">{publishedAt}</p>
            </div>
          </div>

          {coverImage && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {readTime}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{stats.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{stats.comments}</span>
            </button>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{stats.views}</span>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;