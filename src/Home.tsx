import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Star,
  Users,
  BookOpen,
  Award,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  GraduationCap,
  Building2,
  Target,
  Globe,
  Sparkles,
  Heart,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavigationItem {
  name: string;
  href: string;
}

interface ProgramCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  bgGradient: string;
}

interface TestimonialCard {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

interface NewsItem {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  color: string;
}

const GreenfieldAcademyHomepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigation: NavigationItem[] = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Academics", href: "#academics" },
    { name: "Admissions", href: "#admissions" },
    { name: "Student Life", href: "#student-life" },
    { name: "Contact", href: "#contact" },
  ];

  const programs: ProgramCard[] = [
    {
      title: "Elementary Education",
      description:
        "Foundation years focused on creativity, discovery, and building a love for learning through play-based education.",
      icon: <BookOpen className="w-8 h-8" />,
      features: [
        "Small Class Sizes",
        "Creative Arts",
        "STEAM Learning",
        "Character Building",
      ],
      color: "text-blue-600",
      bgGradient: "from-blue-50 to-indigo-100",
    },
    {
      title: "Middle School Program",
      description:
        "Exciting years of exploration, leadership development, and preparing for advanced academic challenges.",
      icon: <Users className="w-8 h-8" />,
      features: [
        "Project-Based Learning",
        "Leadership Skills",
        "Technology Integration",
        "Social Development",
      ],
      color: "text-green-600",
      bgGradient: "from-green-50 to-emerald-100",
    },
    {
      title: "High School Excellence",
      description:
        "Advanced preparation for college and career success with personalized guidance and innovative programs.",
      icon: <GraduationCap className="w-8 h-8" />,
      features: [
        "AP Courses",
        "College Prep",
        "Career Guidance",
        "Research Projects",
      ],
      color: "text-purple-600",
      bgGradient: "from-purple-50 to-violet-100",
    },
  ];

  const testimonials: TestimonialCard[] = [
    {
      name: "Priya Sharma",
      role: "Happy Parent",
      content:
        "BDS Convent School has been a wonderful choice for our family. The teachers genuinely care and my son loves going to school every day!",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      name: "Rahul Kumar",
      role: "Proud Alumni",
      content:
        "The values and education I received at BDS Convent School have been my foundation for success. The school truly shapes character along with academics!",
      rating: 5,
      avatar: "🎓",
    },
    {
      name: "Sunita Devi",
      role: "Community Member",
      content:
        "The warmth, care, and excellent education provided by BDS Convent School makes it the best choice in Sikandrabad. Highly recommend!",
      rating: 5,
      avatar: "🌟",
    },
  ];

  const news: NewsItem[] = [
    {
      title: "Annual Science Exhibition Success! 🏆",
      date: "August 1, 2025",
      category: "Academic Achievement",
      excerpt:
        "Our talented students showcased amazing science projects and innovation at the annual exhibition!",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
    {
      title: "New Computer Lab Inauguration! 💻",
      date: "July 28, 2025",
      category: "Infrastructure",
      excerpt:
        "State-of-the-art computer lab with latest technology to enhance digital learning experience!",
      color: "bg-gradient-to-r from-pink-500 to-rose-600",
    },
    {
      title: "Cultural Program Grand Success! 🎭",
      date: "July 25, 2025",
      category: "Cultural Activities",
      excerpt:
        "Students presented beautiful cultural performances showcasing talent and creativity!",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
  ];

  const achievements: string[] = [
    "Recognized for Academic Excellence 🏅",
    "Outstanding College Preparation Program 🎯",
    "Award-Winning Arts & Cultural Programs 🎭",
    "Excellence in Sports & Athletics 🏆",
    "Strong Foundation in Science & Technology 🚀",
    "Community Service Leadership 💫",
  ];

  const coreValues: {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      title: "Academic Excellence",
      description:
        "Inspiring curiosity and fostering a genuine love for learning",
      icon: <Target className="w-8 h-8" />,
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "Character Development",
      description: "Building integrity, kindness, and leadership skills",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-400 to-rose-500",
    },
    {
      title: "Creative Innovation",
      description: "Encouraging original thinking and creative problem-solving",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-purple-400 to-violet-500",
    },
    {
      title: "Global Citizenship",
      description: "Preparing compassionate leaders for our connected world",
      icon: <Globe className="w-8 h-8" />,
      color: "from-green-400 to-emerald-500",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50 transition-all duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 max-w-7xl mx-auto">
            <div className="flex items-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">BDS</span>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BDS Convent School
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Excellence in Education ✨
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative py-2 hover:scale-105 transform"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:w-full"></div>
                </a>
              ))}

              {/* Login Button */}
              <button
                onClick={() => navigate("/login")}
                className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Login
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-blue-100 animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md">
                {navigation.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-3 font-medium border-l-4 border-transparent hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 transform hover:translate-x-2"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.name}
                  </a>
                ))}

                {/* Mobile Login Button */}
                <div className="px-3 py-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300 rounded-full animate-ping"></div>
        </div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="mb-8">
                <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/30 transform hover:scale-105 transition-all duration-300">
                  <Award className="w-5 h-5 mr-2 animate-spin" />
                  National Blue Ribbon School 🏆
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Inspiring Excellence,
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
                    Shaping Futures
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                  At BDS Convent School, we create magical learning experiences
                  that ignite curiosity, build confidence, and prepare students
                  for an amazing future! ✨
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl">
                  <span className="flex items-center justify-center">
                    Schedule Campus Tour
                    <Sparkles className="ml-2 w-5 h-5 group-hover:animate-spin" />
                  </span>
                </button>
                <button className="group border-2 border-white/40 text-white hover:bg-white/20 font-bold py-4 px-8 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105">
                  <span className="flex items-center justify-center">
                    Learn More
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-purple-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  number: "1000+",
                  label: "Happy Students",
                  color: "from-blue-500 to-indigo-500",
                  delay: "0ms",
                },
                {
                  number: "50+",
                  label: "Dedicated Teachers",
                  color: "from-green-500 to-emerald-500",
                  delay: "100ms",
                },
                {
                  number: "15+",
                  label: "Years of Service",
                  color: "from-purple-500 to-violet-500",
                  delay: "200ms",
                },
                {
                  number: "100%",
                  label: "Excellence Focus",
                  color: "from-pink-500 to-rose-500",
                  delay: "300ms",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group"
                  style={{ animationDelay: stat.delay }}
                >
                  <div
                    className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transform transition-all duration-300`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                What Makes Us Special ✨
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The magical ingredients that make learning at Greenfield Academy
                an amazing adventure
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-300 text-white`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="transform hover:scale-105 transition-all duration-500">
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                  About Our Amazing School 🏫
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  BDS Convent School has been creating magical learning
                  experiences where every student discovers their unique talents
                  and builds the confidence to shine bright! ⭐
                </p>
                <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                  Located in the heart of Sikandrabad, our passionate educators
                  believe that when learning is joyful and meaningful, students
                  naturally excel and develop a lifelong love for discovery.
                </p>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start group hover:transform hover:translate-x-2 transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0 group-hover:text-green-600 group-hover:scale-110 transition-all duration-300" />
                      <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                  <div className="h-80 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-xl flex items-center justify-center group-hover:animate-pulse">
                    <div className="text-center">
                      <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4 group-hover:text-purple-600 transition-colors duration-300" />
                      <span className="text-blue-700 text-lg font-medium">
                        Beautiful Campus Tour 🌸
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="academics" className="py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Amazing Learning Programs 🚀
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Exciting educational journeys designed to help every student
                discover their passions and achieve their dreams!
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="group bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:border-blue-200"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${program.bgGradient} rounded-xl flex items-center justify-center ${program.color} mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    {program.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="space-y-3 mb-6">
                    {program.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center group-hover:transform group-hover:translate-x-1 transition-all duration-300"
                        style={{ transitionDelay: `${featureIndex * 50}ms` }}
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:scale-125 transition-all duration-300"></div>
                        <span className="text-gray-600 group-hover:text-gray-700 transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="text-blue-600 font-semibold flex items-center hover:text-purple-600 transition-all duration-300 group">
                    Discover More
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                    <Sparkles className="w-4 h-4 ml-1 group-hover:animate-spin" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                Exciting News & Events 📰
              </h2>
              <p className="text-xl text-gray-600">
                Stay connected with all the amazing things happening in our
                vibrant school community!
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <article
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`h-48 ${item.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <Calendar className="w-12 h-12 text-white group-hover:scale-125 transition-all duration-300" />
                    <div className="absolute top-4 right-4 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/50 rounded-full animate-bounce"></div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-gray-500 text-sm ml-4 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {item.excerpt}
                    </p>
                    <button className="text-blue-600 font-semibold flex items-center hover:text-purple-600 transition-all duration-300 group">
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                      <Zap className="w-4 h-4 ml-1 group-hover:animate-pulse" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-6">
                Happy Families & Students 💫
              </h2>
              <p className="text-xl text-gray-600">
                Hear the wonderful stories from our amazing school community!
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-gray-100 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-125 transition-all duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic group-hover:text-gray-800 transition-colors">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-gray-200 pt-6 flex items-center">
                    <div className="text-3xl mr-4 group-hover:animate-bounce">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300 rounded-full animate-ping"></div>
        </div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Let's Connect! 🌟
              </h2>
              <p className="text-xl text-blue-100">
                Ready to start an amazing educational journey? We can't wait to
                meet you!
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Phone className="w-8 h-8" />,
                  title: "Call Us",
                  info: "7037293410",
                  sub: "Mon-Fri, 8:00 AM - 5:00 PM",
                  color: "from-green-400 to-emerald-500",
                },
                {
                  icon: <Mail className="w-8 h-8" />,
                  title: "Email Us",
                  info: "info@bdsconventschool.edu",
                  sub: "Quick response guaranteed!",
                  color: "from-blue-400 to-indigo-500",
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: "Visit Us",
                  info: "SDM Court Sikandrabad",
                  sub: "Bulandshahr, UP",
                  color: "from-purple-400 to-pink-500",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="text-center group transform hover:scale-110 transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-300`}
                  >
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-300 transition-colors">
                    {contact.title}
                  </h3>
                  <p className="text-blue-100 group-hover:text-white transition-colors">
                    {contact.info}
                  </p>
                  <p className="text-blue-200 text-sm mt-1">{contact.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
        </div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center mb-6 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">BDS</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-xl font-bold">
                      BDS Convent School
                    </span>
                    <p className="text-gray-400 text-sm">
                      Excellence in Education ✨
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  Creating magical learning experiences that inspire students to
                  discover their unique talents and build confidence for an
                  amazing future! 🌟
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-6 text-blue-300">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {[
                    "About Us",
                    "Academic Programs",
                    "Admissions Process",
                    "Student Resources",
                  ].map((link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white hover:translate-x-2 transform transition-all duration-200 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-6 text-purple-300">
                  Community
                </h4>
                <ul className="space-y-3">
                  {[
                    "Alumni Network",
                    "Parent Portal",
                    "Faculty Directory",
                    "School Calendar",
                  ].map((link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white hover:translate-x-2 transform transition-all duration-200 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                  <li>
                     <a
                        href="/admin"
                        className="text-gray-400 hover:text-white hover:translate-x-2 transform transition-all duration-200 inline-block"
                      >Admin</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400">
                © 2025 BDS Convent School. Made with 💖 for amazing students and
                families!
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GreenfieldAcademyHomepage;
