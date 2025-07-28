import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';

const achievements = [
  { title: 'Учитель года', year: '2023', description: 'Региональный конкурс педагогического мастерства' },
  { title: 'Инновационный проект', year: '2022', description: 'Внедрение цифровых технологий в образование' },
  { title: 'Методическая разработка', year: '2021', description: 'Авторская программа по астрономии' },
  { title: 'Современные образовательные технологии', year: '2023', description: '72 академических часа повышения квалификации' },
  { title: 'Цифровая трансформация образования', year: '2022', description: '108 академических часов повышения квалификации' },
  { title: 'Астрономия в школе', year: '2021', description: '36 академических часов повышения квалификации' }
];

const studentAchievements = [
  { name: 'Олимпиада по физике', level: 'Всероссийская', year: '2023' },
  { name: 'Научная конференция', level: 'Региональная', year: '2023' },
  { name: 'Конкурс проектов', level: 'Муниципальная', year: '2022' }
];

const authorCourses = [
  { 
    id: 1,
    title: 'Квантовая физика для начинающих', 
    description: 'Полный курс по основам квантовой механики',
    lessons: 12,
    duration: '6 недель',
    students: 145,
    rating: 4.8,
    price: 'Бесплатно',
    materials: ['Лекции', 'Презентации', 'Тесты']
  },
  { 
    id: 2,
    title: 'Астрономия: от Земли до далёких галактик', 
    description: 'Увлекательное путешествие по Вселенной',
    lessons: 8,
    duration: '4 недели',
    students: 89,
    rating: 4.9,
    price: '2000 ₽',
    materials: ['Видеолекции', 'Интерактивные модели', 'Практические задания']
  },
  { 
    id: 3,
    title: 'Методика преподавания физики', 
    description: 'Современные подходы к обучению физике',
    lessons: 15,
    duration: '8 недель',
    students: 67,
    rating: 4.7,
    price: '3500 ₽',
    materials: ['Методички', 'Видеоуроки', 'Кейсы']
  }
];

const videos = [
  { id: 1, title: 'Урок физики: Законы Ньютона', duration: '15:30', views: 1250, category: 'Физика' },
  { id: 2, title: 'Астрономия: Звездное небо', duration: '22:15', views: 890, category: 'Астрономия' },
  { id: 3, title: 'Методика решения задач', duration: '18:45', views: 2100, category: 'Методика' }
];

const materials = [
  { title: 'Рабочая программа по физике 10-11 класс', type: 'Программа', downloads: 156, category: 'Программы' },
  { title: 'Контрольные работы по астрономии', type: 'Материалы', downloads: 89, category: 'Астрономия' },
  { title: 'Презентации по квантовой физике', type: 'Презентации', downloads: 234, category: 'Физика' }
];

const scheduleEvents = [
  { date: new Date(2024, 6, 30), title: 'Урок физики 10А', time: '09:00' },
  { date: new Date(2024, 6, 31), title: 'Астрономия 11Б', time: '10:30' },
  { date: new Date(2024, 7, 1), title: 'Методсовет', time: '14:00' },
  { date: new Date(2024, 7, 2), title: 'Консультация ЕГЭ', time: '15:00' }
];

const reviews = [
  {
    id: 1,
    name: 'Елена Петрова',
    role: 'Родитель ученика 10А класса',
    rating: 5,
    text: 'Анна Николаевна - потрясающий педагог! Мой сын полюбил физику благодаря её урокам.',
    image: null,
    date: '2024-07-20'
  },
  {
    id: 2,
    name: 'Михаил Иванов',
    role: 'Выпускник 2023 года',
    rating: 5,
    text: 'Поступил в МГУ на физфак во многом благодаря качественной подготовке!',
    image: '/img/review-screenshot.jpg',
    date: '2024-07-15'
  }
];

export default function Index() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [comments, setComments] = useState<{[key: number]: any[]}>({});
  const [newComment, setNewComment] = useState('');
  const [commentFile, setCommentFile] = useState<File | null>(null);
  const [newReview, setNewReview] = useState({ name: '', role: '', rating: 5, text: '', image: null });
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const filteredVideos = useMemo(() => {
    if (!searchQuery) return videos;
    return videos.filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredMaterials = useMemo(() => {
    if (!searchQuery) return materials;
    return materials.filter(material => 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const addComment = (videoId: number) => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: 'Анна Николаевна',
      text: newComment,
      date: new Date().toLocaleDateString(),
      file: commentFile
    };
    
    setComments(prev => ({
      ...prev,
      [videoId]: [...(prev[videoId] || []), comment]
    }));
    
    setNewComment('');
    setCommentFile(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon 
        key={i} 
        name="Star" 
        size={16} 
        className={i < rating ? "text-yellow-400 fill-current" : "text-gray-400"} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-blue via-cosmic-blue to-nebular-purple">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Icon name="Star" className="text-nebular-purple" size={24} />
            <span className="font-bold text-white text-xl">Космический Педагог</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Icon name="Settings" size={16} className="mr-2" />
                Админ
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-space-blue/95 border-white/10">
              <SheetHeader>
                <SheetTitle className="text-white">Админ-панель</SheetTitle>
                <SheetDescription className="text-gray-300">
                  Управление содержимым портфолио
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="upload" className="text-white">Загрузить файл</Label>
                  <Input id="upload" type="file" className="bg-white/10 border-white/20 text-white" />
                </div>
                <div>
                  <Label htmlFor="title" className="text-white">Заголовок</Label>
                  <Input id="title" placeholder="Введите заголовок" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">Описание</Label>
                  <Textarea id="description" placeholder="Введите описание" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                </div>
                <Button className="w-full bg-nebular-purple hover:bg-nebular-purple/80">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт данных
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <Avatar className="w-32 h-32 border-4 border-white/20">
              <AvatarImage src="/img/02402aed-ec41-42bb-b817-5e7b4604f4cf.jpg" alt="Педагог" />
              <AvatarFallback className="bg-nebular-purple text-white text-2xl">АН</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-montserrat">
                Анна Николаевна
                <span className="block text-nebular-purple">Звездочетова</span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Учитель физики и астрономии • 15 лет опыта
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="bg-nebular-purple/20 text-white border-nebular-purple/50">Физика</Badge>
                <Badge className="bg-cosmic-blue/20 text-white border-cosmic-blue/50">Астрономия</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Методист</Badge>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Icon name="Mail" size={24} className="mx-auto mb-2 text-nebular-purple" />
                <p className="text-sm">Email</p>
                <p className="font-medium">anna.zvezdochetova@school.ru</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Icon name="Phone" size={24} className="mx-auto mb-2 text-cosmic-blue" />
                <p className="text-sm">Телефон</p>
                <p className="font-medium">+7 (999) 123-45-67</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Icon name="MapPin" size={24} className="mx-auto mb-2 text-white" />
                <p className="text-sm">Школа</p>
                <p className="font-medium">МБОУ "Школа №42"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                placeholder="Поиск по материалам и видео..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-white/10 border-white/20 mb-8">
              <TabsTrigger value="achievements" className="data-[state=active]:bg-nebular-purple data-[state=active]:text-white text-gray-300">
                <Icon name="Trophy" size={16} className="mr-2" />
                Достижения
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-cosmic-blue data-[state=active]:text-white text-gray-300">
                <Icon name="Video" size={16} className="mr-2" />
                Видеоблог
              </TabsTrigger>
              <TabsTrigger value="materials" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-300">
                <Icon name="FileText" size={16} className="mr-2" />
                Материалы
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-space-blue data-[state=active]:text-white text-gray-300">
                <Icon name="GraduationCap" size={16} className="mr-2" />
                Авторские курсы
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300">
                <Icon name="Calendar" size={16} className="mr-2" />
                Расписание
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300">
                <Icon name="MessageSquare" size={16} className="mr-2" />
                Отзывы
              </TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid gap-6">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Icon name="Award" className="mr-2 text-nebular-purple" />
                      Достижения и квалификация
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                          <div>
                            <h3 className="font-semibold text-white">{achievement.title}</h3>
                            <p className="text-gray-300 text-sm">{achievement.description}</p>
                          </div>
                          <Badge className="bg-nebular-purple/20 text-white border-nebular-purple/50">
                            {achievement.year}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Icon name="Users" className="mr-2 text-cosmic-blue" />
                      Достижения учащихся
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {studentAchievements.map((achievement, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                          <div>
                            <h3 className="font-semibold text-white">{achievement.name}</h3>
                            <p className="text-gray-300 text-sm">{achievement.level} уровень</p>
                          </div>
                          <Badge className="bg-cosmic-blue/20 text-white border-cosmic-blue/50">
                            {achievement.year}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="PlayCircle" className="mr-2 text-cosmic-blue" />
                    Архив видеоблога
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Образовательные видео и мастер-классы
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {filteredVideos.map((video, index) => (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-12 bg-cosmic-blue/20 rounded flex items-center justify-center">
                                <Icon name="Play" size={20} className="text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-white">{video.title}</h3>
                                <p className="text-gray-300 text-sm">{video.views} просмотров • {video.category}</p>
                              </div>
                            </div>
                            <Badge className="bg-white/20 text-white">
                              {video.duration}
                            </Badge>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="bg-space-blue/95 border-white/10 max-w-4xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">{video.title}</DialogTitle>
                            <DialogDescription className="text-gray-300">
                              {video.views} просмотров • {video.duration}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="aspect-video bg-black/50 rounded flex items-center justify-center">
                              <Icon name="Play" size={48} className="text-white/50" />
                            </div>
                            
                            {/* Comments Section */}
                            <div className="space-y-4">
                              <h4 className="text-white font-semibold">Комментарии</h4>
                              <div className="space-y-3">
                                {(comments[video.id] || []).map((comment) => (
                                  <div key={comment.id} className="p-3 bg-white/5 rounded border border-white/10">
                                    <div className="flex justify-between items-start mb-2">
                                      <span className="text-white font-medium">{comment.author}</span>
                                      <span className="text-gray-300 text-sm">{comment.date}</span>
                                    </div>
                                    <p className="text-gray-300">{comment.text}</p>
                                    {comment.file && (
                                      <div className="mt-2 p-2 bg-white/5 rounded">
                                        <Icon name="Paperclip" size={16} className="inline mr-2 text-gray-400" />
                                        <span className="text-gray-300 text-sm">{comment.file.name}</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              
                              <div className="space-y-3">
                                <Textarea 
                                  placeholder="Написать комментарий..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                                />
                                <div className="flex items-center space-x-3">
                                  <Input 
                                    type="file" 
                                    onChange={(e) => setCommentFile(e.target.files?.[0] || null)}
                                    className="bg-white/10 border-white/20 text-white"
                                  />
                                  <Button 
                                    onClick={() => addComment(video.id)}
                                    className="bg-cosmic-blue hover:bg-cosmic-blue/80"
                                  >
                                    <Icon name="Send" size={16} className="mr-2" />
                                    Отправить
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="space-y-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="FolderOpen" className="mr-2 text-white" />
                    Методические материалы
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Программы, презентации и учебные материалы
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {filteredMaterials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">
                            <Icon name="FileText" size={20} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{material.title}</h3>
                            <p className="text-gray-300 text-sm">{material.downloads} скачиваний • {material.category}</p>
                          </div>
                        </div>
                        <Badge className="bg-white/20 text-white">
                          {material.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid gap-6">
                {authorCourses.map((course) => (
                  <Card key={course.id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                          <p className="text-gray-300 mb-4">{course.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {course.materials.map((material, idx) => (
                              <Badge key={idx} className="bg-space-blue/20 text-white border-space-blue/50">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white mb-1">{course.price}</div>
                          <div className="flex items-center space-x-1 mb-2">
                            {renderStars(Math.floor(course.rating))}
                            <span className="text-gray-300 text-sm">({course.rating})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-white font-semibold">{course.lessons}</div>
                          <div className="text-gray-300 text-sm">уроков</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-semibold">{course.duration}</div>
                          <div className="text-gray-300 text-sm">длительность</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-semibold">{course.students}</div>
                          <div className="text-gray-300 text-sm">студентов</div>
                        </div>
                        <div className="text-center">
                          <Button 
                            onClick={() => setSelectedCourse(course)}
                            className="bg-nebular-purple hover:bg-nebular-purple/80"
                          >
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedCourse && (
                <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
                  <DialogContent className="bg-space-blue/95 border-white/10 max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">{selectedCourse.title}</DialogTitle>
                      <DialogDescription className="text-gray-300">
                        {selectedCourse.description}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Tabs defaultValue="content" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20">
                        <TabsTrigger value="content">Содержание</TabsTrigger>
                        <TabsTrigger value="test">Тест</TabsTrigger>
                        <TabsTrigger value="comments">Комментарии</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="content" className="space-y-4">
                        <div className="p-4 bg-white/5 rounded border border-white/10">
                          <h4 className="text-white font-semibold mb-3">Урок 1: Введение в квантовую механику</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <Icon name="FileText" className="text-gray-400" />
                              <span className="text-gray-300">Текстовая лекция</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Icon name="Presentation" className="text-gray-400" />
                              <span className="text-gray-300">Презентация</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Icon name="Video" className="text-gray-400" />
                              <span className="text-gray-300">Видеолекция (15 мин)</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="test" className="space-y-4">
                        <div className="p-4 bg-white/5 rounded border border-white/10">
                          <h4 className="text-white font-semibold mb-3">Вопрос 1 из 5</h4>
                          <p className="text-gray-300 mb-4">Что является основным принципом квантовой механики?</p>
                          <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-gray-300">
                              <input type="radio" name="q1" className="accent-nebular-purple" />
                              <span>Принцип неопределенности</span>
                            </label>
                            <label className="flex items-center space-x-2 text-gray-300">
                              <input type="radio" name="q1" className="accent-nebular-purple" />
                              <span>Принцип суперпозиции</span>
                            </label>
                            <label className="flex items-center space-x-2 text-gray-300">
                              <input type="radio" name="q1" className="accent-nebular-purple" />
                              <span>Принцип дополнительности</span>
                            </label>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="comments" className="space-y-4">
                        <div className="space-y-3">
                          <div className="p-3 bg-white/5 rounded border border-white/10">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-white font-medium">Студент курса</span>
                              <span className="text-gray-300 text-sm">2024-07-20</span>
                            </div>
                            <p className="text-gray-300">Отличный курс! Очень доступно объясняется сложная тема.</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <Textarea 
                            placeholder="Написать комментарий к курсу..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          />
                          <div className="flex items-center space-x-3">
                            <Input 
                              type="file" 
                              className="bg-white/10 border-white/20 text-white"
                            />
                            <Button className="bg-nebular-purple hover:bg-nebular-purple/80">
                              <Icon name="Send" size={16} className="mr-2" />
                              Отправить
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Calendar" className="mr-2 text-purple-400" />
                    Расписание занятий
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="bg-white/10 border-white/20 text-white rounded-md"
                      />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">События на выбранную дату</h4>
                      {scheduleEvents
                        .filter(event => selectedDate && event.date.toDateString() === selectedDate.toDateString())
                        .map((event, index) => (
                          <div key={index} className="p-4 bg-white/5 rounded border border-white/10">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="text-white font-medium">{event.title}</h5>
                                <p className="text-gray-300 text-sm">{event.time}</p>
                              </div>
                              <Icon name="Clock" className="text-purple-400" />
                            </div>
                          </div>
                        ))
                      }
                      {(!selectedDate || !scheduleEvents.some(event => selectedDate && event.date.toDateString() === selectedDate.toDateString())) && (
                        <p className="text-gray-300">На эту дату нет запланированных событий</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="MessageSquare" className="mr-2 text-green-400" />
                    Отзывы
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Отзывы от учеников и родителей
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-4 bg-white/5 rounded border border-white/10">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-white font-semibold">{review.name}</h4>
                            <p className="text-gray-300 text-sm">{review.role}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-gray-300 text-sm">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3">{review.text}</p>
                        {review.image && (
                          <div className="w-32 h-24 bg-gray-600 rounded flex items-center justify-center">
                            <Icon name="Image" className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <Separator className="bg-white/20" />
                    
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Оставить отзыв</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input 
                          placeholder="Ваше имя"
                          value={newReview.name}
                          onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                        <Input 
                          placeholder="Ваша роль (родитель, ученик...)"
                          value={newReview.role}
                          onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-white">Оценка:</span>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Icon 
                              key={i}
                              name="Star" 
                              size={20} 
                              className={`cursor-pointer ${i < newReview.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                              onClick={() => setNewReview({...newReview, rating: i + 1})}
                            />
                          ))}
                        </div>
                      </div>
                      <Textarea 
                        placeholder="Ваш отзыв..."
                        value={newReview.text}
                        onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                      <div className="flex items-center space-x-3">
                        <Input 
                          type="file" 
                          accept="image/*"
                          className="bg-white/10 border-white/20 text-white"
                        />
                        <Button className="bg-green-600 hover:bg-green-600/80">
                          <Icon name="Send" size={16} className="mr-2" />
                          Отправить отзыв
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Icon name="Rocket" className="text-nebular-purple" size={24} />
            <span className="text-white font-semibold">Космическое образование</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Анна Николаевна Звездочетова. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}