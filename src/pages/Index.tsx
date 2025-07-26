import React, { useState } from 'react';
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
import Icon from '@/components/ui/icon';

const achievements = [
  { title: 'Учитель года', year: '2023', description: 'Региональный конкурс педагогического мастерства' },
  { title: 'Инновационный проект', year: '2022', description: 'Внедрение цифровых технологий в образование' },
  { title: 'Методическая разработка', year: '2021', description: 'Авторская программа по астрономии' }
];

const studentAchievements = [
  { name: 'Олимпиада по физике', level: 'Всероссийская', year: '2023' },
  { name: 'Научная конференция', level: 'Региональная', year: '2023' },
  { name: 'Конкурс проектов', level: 'Муниципальная', year: '2022' }
];

const courses = [
  { title: 'Современные образовательные технологии', hours: 72, year: '2023' },
  { title: 'Цифровая трансформация образования', hours: 108, year: '2022' },
  { title: 'Астрономия в школе', hours: 36, year: '2021' }
];

const videos = [
  { title: 'Урок физики: Законы Ньютона', duration: '15:30', views: 1250 },
  { title: 'Астрономия: Звездное небо', duration: '22:15', views: 890 },
  { title: 'Методика решения задач', duration: '18:45', views: 2100 }
];

const materials = [
  { title: 'Рабочая программа по физике 10-11 класс', type: 'Программа', downloads: 156 },
  { title: 'Контрольные работы по астрономии', type: 'Материалы', downloads: 89 },
  { title: 'Презентации по квантовой физике', type: 'Презентации', downloads: 234 }
];

export default function Index() {
  const [isAdminMode, setIsAdminMode] = useState(false);

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
              <AvatarImage src="/img/479e2f9e-fc40-4c51-a036-b2552523914d.jpg" alt="Педагог" />
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
          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 border-white/20 mb-8">
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
                Курсы
              </TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid gap-6">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Icon name="Award" className="mr-2 text-nebular-purple" />
                      Достижения педагога
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
                    {videos.map((video, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-12 bg-cosmic-blue/20 rounded flex items-center justify-center">
                            <Icon name="Play" size={20} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{video.title}</h3>
                            <p className="text-gray-300 text-sm">{video.views} просмотров</p>
                          </div>
                        </div>
                        <Badge className="bg-white/20 text-white">
                          {video.duration}
                        </Badge>
                      </div>
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
                    {materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">
                            <Icon name="FileText" size={20} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{material.title}</h3>
                            <p className="text-gray-300 text-sm">{material.downloads} скачиваний</p>
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
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="BookOpen" className="mr-2 text-space-blue" />
                    Повышение квалификации
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Пройденные курсы и сертификации
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {courses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div>
                          <h3 className="font-semibold text-white">{course.title}</h3>
                          <p className="text-gray-300 text-sm">{course.hours} академических часов</p>
                        </div>
                        <Badge className="bg-space-blue/20 text-white border-space-blue/50">
                          {course.year}
                        </Badge>
                      </div>
                    ))}
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