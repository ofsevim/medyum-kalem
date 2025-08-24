import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Tümü', count: 245 },
  { id: 'yasam', name: 'Yaşam', count: 45 },
  { id: 'dunya', name: 'Dünya', count: 32 },
  { id: 'uretim', name: 'Üretim', count: 28 },
  { id: 'kultur', name: 'Kültür', count: 35 },
  { id: 'doga', name: 'Doğa', count: 22 },
  { id: 'zihin', name: 'Zihin', count: 41 },
  { id: 'teknoloji', name: 'Teknoloji', count: 42 }
];

const CategoryNavigation = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="bg-background border-b border-border">
      <div className="editorial-container">
        <div className="relative py-4">
          {/* Categories */}
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200
                  ${activeCategory === category.id 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <span className="font-medium whitespace-nowrap">{category.name}</span>
                <span className={`
                  text-xs px-2 py-0.5 rounded-full 
                  ${activeCategory === category.id 
                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Scroll indicators for mobile */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 md:hidden">
            <button className="p-1 bg-background/80 rounded-full shadow-sm">
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 md:hidden">
            <button className="p-1 bg-background/80 rounded-full shadow-sm">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;