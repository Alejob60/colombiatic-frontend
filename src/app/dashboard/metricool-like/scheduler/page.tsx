'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  CalendarIcon, 
  PlusIcon,
  FilterIcon,
  SearchIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { socialMediaService, SocialPost } from '@/services/socialMediaService';

export default function SchedulerPage() {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <SchedulerPageContent 
        t={t}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        showPostForm={showPostForm}
        setShowPostForm={setShowPostForm}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      />
    </DndProvider>
  );
}

function SchedulerPageContent({ 
  t,
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  showPostForm,
  setShowPostForm,
  editingPost,
  setEditingPost
}: any) {
  // Generar días del mes
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Posts de ejemplo
  const [posts, setPosts] = useState<SocialPost[]>([]);
  
  // Cargar posts desde la API
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await socialMediaService.getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        // Fallback a datos de ejemplo si la API falla
        setPosts([
          {
            id: '1',
            title: 'Nueva actualización de nuestra plataforma',
            content: '¡Gran noticias! Hemos lanzado una nueva actualización...',
            date: new Date(2026, 0, 15, 10, 30),
            platform: 'facebook',
            status: 'scheduled'
          },
          {
            id: '2',
            title: 'Consejos para mejorar tu presencia digital',
            content: 'Descubre estos consejos para potenciar tu marca...',
            date: new Date(2026, 0, 18, 14, 0),
            platform: 'instagram',
            status: 'scheduled'
          },
          {
            id: '3',
            title: 'Webinar: Estrategias de marketing 2026',
            content: 'Únete a nuestro webinar gratuito...',
            date: new Date(2026, 0, 22, 16, 0),
            platform: 'twitter',
            status: 'published'
          }
        ]);
      }
    };
    
    loadPosts();
  }, []);
  
  const movePost = async (postId: string, newDate: Date) => {
    try {
      const updatedPost = await socialMediaService.movePost(postId, newDate);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? updatedPost : post
        )
      );
    } catch (error) {
      console.error('Error moving post:', error);
      // Actualización optimista en caso de error
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, date: newDate } 
            : post
        )
      );
    }
  };
  
  // Generar días del mes

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowPostForm(true);
  };

  const handleEditPost = (post: SocialPost) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handleCloseForm = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  const handleSubmitPost = async (postData: any) => {
    try {
      if (editingPost) {
        // Actualizar post existente
        const updatedPost = await socialMediaService.updatePost(editingPost.id, postData);
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === editingPost.id ? updatedPost : post
          )
        );
      } else {
        // Crear nuevo post
        const newPost = await socialMediaService.createPost(postData);
        setPosts(prevPosts => [...prevPosts, newPost]);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('metricoolLike.scheduler.title')}</h1>
          <p className="text-muted-foreground">{t('metricoolLike.scheduler.description')}</p>
        </div>
        <Button onClick={handleCreatePost} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          {t('metricoolLike.scheduler.newPost')}
        </Button>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder={t('metricoolLike.scheduler.searchPosts')}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          {t('metricoolLike.scheduler.filter')}
        </Button>
      </div>

      {/* Calendario */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{format(currentDate, 'MMMM yyyy', { locale: es })}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                ←
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextMonth}>
                →
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Encabezado del calendario */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((day: Date, index: number) => {
              const dayPosts = posts.filter(post => 
                post.date.getDate() === day.getDate() && 
                post.date.getMonth() === day.getMonth() && 
                post.date.getFullYear() === day.getFullYear()
              );
              
              return (
                <DayCell 
                  key={index} 
                  day={day}
                  currentDate={currentDate}
                  isToday={isToday}
                  format={format}
                  dayPosts={dayPosts}
                  movePost={movePost}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de publicaciones */}
      <Card>
        <CardHeader>
          <CardTitle>{t('metricoolLike.scheduler.scheduledPosts')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(post.date, "dd MMM yyyy 'a las' HH:mm", { locale: es })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    post.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {post.status === 'scheduled' ? t('metricoolLike.scheduler.status.scheduled') : t('metricoolLike.scheduler.status.published')}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                    {t('metricoolLike.scheduler.edit')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formulario de creación/edición de publicación */}
      {showPostForm && (
        <PostForm 
          post={editingPost}
          onClose={handleCloseForm}
          onSubmit={handleSubmitPost}
        />
      )}
    </div>
  );
}

// Componente para una celda de día en el calendario
function DayCell({ day, currentDate, isToday, format, dayPosts, movePost }: { day: Date; currentDate: Date; isToday: (date: Date) => boolean; format: any; dayPosts: any[]; movePost: (postId: string, newDate: Date) => void; }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'post',
    drop: (item: any) => {
      // Mover la publicación a esta fecha
      const newDate = new Date(day);
      newDate.setHours(item.post.date.getHours());
      newDate.setMinutes(item.post.date.getMinutes());
      movePost(item.post.id, newDate);
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div 
      ref={(node) => {
        if (node) {
          drop(node);
        }
      }}
      className={`min-h-24 p-1 border rounded-lg ${
        !isSameMonth(day, currentDate) ? 'bg-muted opacity-50' : ''
      } ${isToday(day) ? 'border-primary border-2' : ''} ${isOver ? 'bg-blue-50' : ''}`}
    >
      <div className="text-right">
        <span className={`inline-block w-6 h-6 text-center leading-6 rounded-full ${
          isToday(day) ? 'bg-primary text-primary-foreground' : ''
        }`}>
          {format(day, 'd')}
        </span>
      </div>
      <div className="mt-1 space-y-1">
        {dayPosts.map((post: any) => (
          <DraggablePost key={post.id} post={post} />
        ))}
        {dayPosts.length > 2 && (
          <div className="text-xs text-muted-foreground">
            +{dayPosts.length - 2} más
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para una publicación arrastrable
function DraggablePost({ post }: { post: any; }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'post',
    item: { post },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div 
      ref={(node) => {
        if (node) {
          drag(node);
        }
      }}
      className={`text-xs p-1 rounded truncate cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${
        post.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
      }`}
    >
      {post.title}
    </div>
  );
}

// Componente para el formulario de publicación
function PostForm({ post, onClose, onSubmit }: { post: any, onClose: () => void, onSubmit: (data: any) => void }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    date: post?.date || new Date(),
    platforms: post?.platforms || []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p: string) => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {post ? t('metricoolLike.scheduler.editPost') : t('metricoolLike.scheduler.newPost')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('metricoolLike.scheduler.postTitle')}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t('metricoolLike.scheduler.enterTitle')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('metricoolLike.scheduler.postContent')}
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t('metricoolLike.scheduler.enterContent')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('metricoolLike.scheduler.scheduleDate')}
            </label>
            <input
              type="datetime-local"
              name="date"
              value={format(formData.date, "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setFormData(prev => ({ ...prev, date: new Date(e.target.value) }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('metricoolLike.scheduler.platforms')}
            </label>
            <div className="flex gap-2">
              {['facebook', 'instagram', 'twitter', 'linkedin'].map(platform => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => handlePlatformToggle(platform)}
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    formData.platforms.includes(platform)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('metricoolLike.scheduler.cancel')}
            </Button>
            <Button type="submit">
              {post ? t('metricoolLike.scheduler.updatePost') : t('metricoolLike.scheduler.createPost')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}