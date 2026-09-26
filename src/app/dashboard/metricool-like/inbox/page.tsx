'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  MessageSquareIcon, 
  HeartIcon,
  ReplyIcon,
  MoreHorizontalIcon,
  FilterIcon,
  SearchIcon,
  ShareIcon,
  StarIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { socialCommentsService, SocialComment } from '@/services/socialMediaService';

export default function InboxPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<any>(null);
  const [comments, setComments] = useState<SocialComment[]>([]);
  
  // Cargar comentarios desde la API
  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await socialCommentsService.getComments();
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error loading comments:', error);
        // Fallback a datos de ejemplo si la API falla
        setComments([
          {
            id: '1',
            platform: 'facebook',
            author: 'María González',
            avatar: 'https://ui-avatars.com/api/?name=MG&background=random',
            content: '¡Excelente contenido! Me encantaría saber más sobre este tema. ¿Podrían hacer un video tutorial sobre esto?',
            date: 'Hace 2 horas',
            likes: 5,
            replies: 2,
            isLiked: false,
            isReplied: true
          },
          {
            id: '2',
            platform: 'instagram',
            author: 'Carlos Rodríguez',
            avatar: 'https://ui-avatars.com/api/?name=CR&background=random',
            content: '¿Cuándo estará disponible el próximo webinar? Estoy muy interesado en aprender más sobre marketing digital.',
            date: 'Hace 5 horas',
            likes: 12,
            replies: 1,
            isLiked: true,
            isReplied: false
          },
          {
            id: '3',
            platform: 'twitter',
            author: 'Ana Martínez',
            avatar: 'https://ui-avatars.com/api/?name=AM&background=random',
            content: 'Gracias por compartir esta información tan valiosa. Me ha ayudado mucho en mi negocio.',
            date: 'Hace 1 día',
            likes: 8,
            replies: 0,
            isLiked: false,
            isReplied: false
          },
          {
            id: '4',
            platform: 'facebook',
            author: 'Juan Pérez',
            avatar: 'https://ui-avatars.com/api/?name=JP&background=random',
            content: 'Tengo una pregunta sobre el producto. ¿Funciona con WordPress?',
            date: 'Hace 3 días',
            likes: 3,
            replies: 1,
            isLiked: false,
            isReplied: true
          }
        ]);
      }
    };
    
    loadComments();
  }, []);
  
  const filteredComments = activeTab === 'all' 
    ? comments 
    : comments.filter(comment => comment.platform === activeTab);

  const handleLike = async (id: string) => {
    try {
      await socialCommentsService.likeComment(id);
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === id 
            ? { ...comment, likes: comment.likes + 1, isLiked: true } 
            : comment
        )
      );
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleReply = (comment: SocialComment) => {
    setReplyingTo(comment);
    setShowReplyForm(true);
  };

  const handleCloseReplyForm = () => {
    setShowReplyForm(false);
    setReplyingTo(null);
  };

  const handleSubmitReply = async (replyData: any) => {
    try {
      await socialCommentsService.replyToComment(replyingTo.id, replyData);
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === replyingTo.id 
            ? { ...comment, replies: comment.replies + 1, isReplied: true } 
            : comment
        )
      );
      handleCloseReplyForm();
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  const handleMore = (id: string) => {
    console.log(`Más opciones para el comentario ${id}`);
  };

  const handleShare = (id: string) => {
    console.log(`Compartir comentario ${id}`);
  };

  const handleMarkAsImportant = (id: string) => {
    console.log(`Marcar comentario ${id} como importante`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('metricoolLike.inbox.title')}</h1>
        <p className="text-muted-foreground">{t('metricoolLike.inbox.description')}</p>
      </div>

      {/* Tabs de plataformas */}
      <div className="flex flex-wrap gap-2">
        {['all', 'facebook', 'instagram', 'twitter'].map((platform) => (
          <Button
            key={platform}
            variant={activeTab === platform ? 'default' : 'outline'}
            onClick={() => setActiveTab(platform)}
            className="capitalize"
          >
            {platform === 'all' ? t('metricoolLike.inbox.all') : platform}
          </Button>
        ))}
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder={t('metricoolLike.inbox.searchComments')}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          {t('metricoolLike.inbox.filter')}
        </Button>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <img 
                  src={comment.avatar} 
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{comment.author}</h3>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                      {comment.platform}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.date}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleMore(comment.id)}>
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{comment.content}</p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => handleLike(comment.id)}
                >
                  <HeartIcon className={`h-4 w-4 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  {comment.likes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => handleReply(comment)}
                >
                  <ReplyIcon className="h-4 w-4" />
                  {t('metricoolLike.inbox.reply')}
                  {comment.replies > 0 && ` (${comment.replies})`}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => handleShare(comment.id)}
                >
                  <ShareIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => handleMarkAsImportant(comment.id)}
                >
                  <StarIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulario de respuesta */}
      {showReplyForm && replyingTo && (
        <ReplyForm 
          comment={replyingTo}
          onClose={handleCloseReplyForm}
          onSubmit={handleSubmitReply}
        />
      )}

      {/* Paginación */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredComments.length} de 42 comentarios
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}

// Componente para el formulario de respuesta
function ReplyForm({ comment, onClose, onSubmit }: { comment: SocialComment, onClose: () => void, onSubmit: (data: any) => void }) {
  const { t } = useLanguage();
  const [replyText, setReplyText] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [quickReplies, setQuickReplies] = useState([
    t('metricoolLike.inbox.quickReplies.thanks'),
    t('metricoolLike.inbox.quickReplies.understood'),
    t('metricoolLike.inbox.quickReplies.willRespondSoon')
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ 
        commentId: comment.id, 
        text: replyText,
        isPrivate,
        attachments
      });
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const insertQuickReply = (reply: string) => {
    setReplyText(prev => prev ? `${prev}\n${reply}` : reply);
  };

  const addCustomQuickReply = () => {
    const customReply = prompt(t('metricoolLike.inbox.addCustomReply'));
    if (customReply && customReply.trim()) {
      setQuickReplies(prev => [...prev, customReply.trim()]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('metricoolLike.inbox.replyToComment')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="font-medium">{comment.author}</p>
          <p className="text-sm">{comment.content}</p>
        </div>
        
        {/* Respuestas rápidas */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              {t('metricoolLike.inbox.quickReplies.title')}
            </label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addCustomQuickReply}
              className="text-xs"
            >
              {t('metricoolLike.inbox.quickReplies.addCustom')}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <Button 
                key={index}
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => insertQuickReply(reply)}
                className="text-xs"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('metricoolLike.inbox.yourReply')}
            </label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t('metricoolLike.inbox.enterReply')}
            />
          </div>
          
          {/* Opciones adicionales */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="private-reply"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="private-reply" className="text-sm">
                {t('metricoolLike.inbox.privateReply')}
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('metricoolLike.inbox.attachments')}
              </label>
              <input
                type="file"
                multiple
                onChange={handleAttachmentChange}
                className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90"
              />
              {attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                      <span className="truncate">{file.name}</span>
                      <button 
                        type="button" 
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('metricoolLike.inbox.cancel')}
            </Button>
            <Button type="submit" disabled={!replyText.trim()}>
              {t('metricoolLike.inbox.sendReply')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
