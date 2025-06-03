import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  UtensilsCrossed, 
  Smartphone, 
  BarChart3, 
  Users, 
  Package, 
  ChefHat,
  Phone,
  Mail,
  MapPin,
  Globe,
  Star,
  Check,
  Clock,
  TrendingUp,
  ShoppingCart,
  Receipt,
  Table,
  ArrowRight,
  Play
} from "lucide-react";

export default function Landing() {
  const [currentLang, setCurrentLang] = useState("en");
  const [activeApp, setActiveApp] = useState("manager");

  const toggleLanguage = () => {
    setCurrentLang(currentLang === "en" ? "bn" : "en");
  };

  const features = [
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Point of Sale (POS)",
      titleBn: "পয়েন্ট অফ সেল (পিওএস)",
      description: "Fast, intuitive POS system with table management, split billing, and offline support.",
      descriptionBn: "টেবিল ব্যবস্থাপনা, বিল ভাগাভাগি এবং অফলাইন সাপোর্ট সহ দ্রুত, সহজবোধ্য পিওএস সিস্টেম।",
      color: "bg-green-500"
    },
    {
      icon: <ChefHat className="h-6 w-6" />,
      title: "Kitchen Display System",
      titleBn: "রান্নাঘর ডিসপ্লে সিস্টেম",
      description: "Real-time order tracking for kitchen staff with preparation timers and priority queues.",
      descriptionBn: "প্রস্তুতির টাইমার এবং অগ্রাধিকার সারি সহ রান্নাঘরের কর্মীদের জন্য রিয়েল-টাইম অর্ডার ট্র্যাকিং।",
      color: "bg-red-500"
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Inventory Management",
      titleBn: "ইনভেন্টরি ব্যবস্থাপনা",
      description: "Track stock levels, set reorder points, and manage suppliers with automated alerts.",
      descriptionBn: "স্টক লেভেল ট্র্যাক করুন, পুনঃঅর্ডার পয়েন্ট সেট করুন এবং স্বয়ংক্রিয় সতর্কতা সহ সরবরাহকারী পরিচালনা করুন।",
      color: "bg-orange-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Staff Management (HRM)",
      titleBn: "কর্মী ব্যবস্থাপনা (এইচআরএম)",
      description: "Manage employee schedules, roles, permissions, and track performance metrics.",
      descriptionBn: "কর্মচারীদের সময়সূচী, ভূমিকা, অনুমতি পরিচালনা করুন এবং কর্মক্ষমতার মেট্রিক্স ট্র্যাক করুন।",
      color: "bg-purple-500"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Customer Relationship (CRM)",
      titleBn: "গ্রাহক সম্পর্ক (সিআরএম)",
      description: "Build customer loyalty with order history, preferences, and targeted promotions.",
      descriptionBn: "অর্ডার ইতিহাস, পছন্দ এবং লক্ষ্যযুক্ত প্রচারণা দিয়ে গ্রাহক আনুগত্য তৈরি করুন।",
      color: "bg-blue-500"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics & Reports",
      titleBn: "অ্যানালিটিক্স এবং রিপোর্ট",
      description: "Comprehensive business insights with sales reports, trends, and performance metrics.",
      descriptionBn: "বিক্রয় রিপোর্ট, ট্রেন্ড এবং কর্মক্ষমতা মেট্রিক্স সহ ব্যাপক ব্যবসায়িক অন্তর্দৃষ্টি।",
      color: "bg-indigo-500"
    }
  ];

  const pricingPlans = [
    {
      name: "Freshly-Mild",
      nameBn: "ফ্রেশলি-মাইল্ড",
      description: "Perfect for small restaurants",
      descriptionBn: "ছোট রেস্তোরাঁর জন্য পারফেক্ট",
      price: "২,৯৯৯",
      features: [
        "Basic POS System",
        "Up to 5 Tables",
        "Kitchen Display",
        "Basic Inventory",
        "Email Support"
      ],
      featuresBn: [
        "মৌলিক পিওএস সিস্টেম",
        "৫টি পর্যন্ত টেবিল",
        "রান্নাঘর ডিসপ্লে",
        "মৌলিক ইনভেন্টরি",
        "ইমেইল সাপোর্ট"
      ],
      popular: false
    },
    {
      name: "Bomb-Spicy",
      nameBn: "বোমা-স্পাইসি",
      description: "Ideal for growing restaurants",
      descriptionBn: "ক্রমবর্ধমান রেস্তোরাঁর জন্য আদর্শ",
      price: "৫,৯৯৯",
      features: [
        "Advanced POS System",
        "Up to 20 Tables",
        "Kitchen Display + KDS",
        "Full Inventory Management",
        "Staff Management",
        "Analytics & Reports",
        "Priority Support"
      ],
      featuresBn: [
        "উন্নত পিওএস সিস্টেম",
        "২০টি পর্যন্ত টেবিল",
        "রান্নাঘর ডিসপ্লে + কেডিএস",
        "সম্পূর্ণ ইনভেন্টরি ব্যবস্থাপনা",
        "কর্মী ব্যবস্থাপনা",
        "অ্যানালিটিক্স এবং রিপোর্ট",
        "অগ্রাধিকার সাপোর্ট"
      ],
      popular: true
    },
    {
      name: "Blast-Spicy",
      nameBn: "ব্লাস্ট-স্পাইসি",
      description: "For large restaurant chains",
      descriptionBn: "বড় রেস্তোরাঁ চেইনের জন্য",
      price: "৯,৯৯৯",
      features: [
        "Enterprise POS System",
        "Unlimited Tables",
        "Multi-location Support",
        "Advanced Analytics",
        "Custom Integrations",
        "24/7 Phone Support",
        "Dedicated Account Manager"
      ],
      featuresBn: [
        "এন্টারপ্রাইজ পিওএস সিস্টেম",
        "সীমাহীন টেবিল",
        "মাল্টি-লোকেশন সাপোর্ট",
        "উন্নত অ্যানালিটিক্স",
        "কাস্টম ইন্টিগ্রেশন",
        "২ৄ/৭ ফোন সাপোর্ট",
        "ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the offline mode work?",
      questionBn: "অফলাইন মোড কীভাবে কাজ করে?",
      answer: "Our system stores data locally on your device when internet connection is lost. All orders, transactions, and changes are automatically synced when connection is restored, ensuring no data loss.",
      answerBn: "ইন্টারনেট সংযোগ হারিয়ে গেলে আমাদের সিস্টেম আপনার ডিভাইসে স্থানীয়ভাবে ডেটা সংরক্ষণ করে। সংযোগ পুনরুদ্ধার হলে সমস্ত অর্ডার, লেনদেন এবং পরিবর্তনগুলি স্বয়ংক্রিয়ভাবে সিঙ্ক হয়, কোনো ডেটা হারানো নিশ্চিত করে না।"
    },
    {
      question: "Can I use my existing payment methods?",
      questionBn: "আমি কি আমার বিদ্যমান পেমেন্ট পদ্ধতি ব্যবহার করতে পারি?",
      answer: "Yes! We support all major payment methods including bKash, Nagad, Rocket, and traditional card payments. Integration with local payment providers ensures smooth transactions.",
      answerBn: "হ্যাঁ! আমরা বিকাশ, নগদ, রকেট এবং ঐতিহ্যবাহী কার্ড পেমেন্ট সহ সমস্ত প্রধান পেমেন্ট পদ্ধতি সমর্থন করি। স্থানীয় পেমেন্ট প্রদানকারীদের সাথে একীকরণ মসৃণ লেনদেন নিশ্চিত করে।"
    },
    {
      question: "Is Bengali language fully supported?",
      questionBn: "বাংলা ভাষা কি সম্পূর্ণভাবে সমর্থিত?",
      answer: "Absolutely! Our system provides complete Bengali language support including menu items, reports, and all interface elements. You can switch between English and Bengali seamlessly.",
      answerBn: "একদম! আমাদের সিস্টেম মেনু আইটেম, রিপোর্ট এবং সমস্ত ইন্টারফেস উপাদান সহ সম্পূর্ণ বাংলা ভাষা সমর্থন প্রদান করে। আপনি ইংরেজি এবং বাংলার মধ্যে নির্বিঘ্নে স্যুইচ করতে পারেন।"
    },
    {
      question: "What kind of support do you provide?",
      questionBn: "আপনারা কী ধরনের সাপোর্ট প্রদান করেন?",
      answer: "We offer 24/7 support via phone, email, and chat. Our team includes Bengali-speaking support staff to assist you in your preferred language. Setup assistance and training are also included.",
      answerBn: "আমরা ফোন, ইমেইল এবং চ্যাটের মাধ্যমে ২৪/৭ সাপোর্ট অফার করি। আমাদের দলে বাংলা-ভাষী সাপোর্ট কর্মী রয়েছে যারা আপনার পছন্দের ভাষায় আপনাকে সহায়তা করবে। সেটআপ সহায়তা এবং প্রশিক্ষণও অন্তর্ভুক্ত।"
    },
    {
      question: "How long does the free trial last?",
      questionBn: "ফ্রি ট্রায়াল কতদিন স্থায়ী?",
      answer: "Our free trial lasts 30 days with full access to all features. No credit card required to start. You can upgrade to a paid plan anytime during or after the trial period.",
      answerBn: "আমাদের ফ্রি ট্রায়াল ৩০ দিন স্থায়ী হয় সমস্ত বৈশিষ্ট্যের সম্পূর্ণ অ্যাক্সেস সহ। শুরু করতে কোনো ক্রেডিট কার্ডের প্রয়োজন নেই। ট্রায়াল পিরিয়ডের সময় বা পরে যেকোনো সময় আপনি একটি পেইড প্ল্যানে আপগ্রেড করতে পারেন।"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <UtensilsCrossed className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-bold text-foreground">RestaurantOS</span>
              <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">BD</Badge>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="nav-link">
                {currentLang === "en" ? "Home" : "হোম"}
              </a>
              <a href="#features" className="nav-link">
                {currentLang === "en" ? "Features" : "বৈশিষ্ট্য"}
              </a>
              <a href="#pricing" className="nav-link">
                {currentLang === "en" ? "Pricing" : "মূল্য"}
              </a>
              <a href="#mobile" className="nav-link">
                {currentLang === "en" ? "Mobile App" : "মোবাইল অ্যাপ"}
              </a>
              <a href="#contact" className="nav-link">
                {currentLang === "en" ? "Contact" : "যোগাযোগ"}
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <span>{currentLang === "en" ? "EN" : "বাং"}</span>
              </Button>
              <Button variant="ghost" onClick={() => window.location.href = "/api/login"}>
                {currentLang === "en" ? "Login" : "লগইন"}
              </Button>
              <Button onClick={() => window.location.href = "/api/login"}>
                {currentLang === "en" ? "Free Trial" : "ফ্রি ট্রায়াল"}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {currentLang === "en" ? (
                  <>
                    Complete Restaurant Management{" "}
                    <span className="text-emerald-200">Made Simple</span>
                  </>
                ) : (
                  <>
                    সম্পূর্ণ রেস্তোরাঁ ব্যবস্থাপনা{" "}
                    <span className="text-emerald-200">সহজ করা হয়েছে</span>
                  </>
                )}
              </h1>
              <p className={`text-xl text-emerald-100 mb-8 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {currentLang === "en" 
                  ? "POS, Kitchen Display, Inventory & Staff Management - All in one powerful platform designed for Bangladesh restaurants."
                  : "পিওএস, রান্নাঘর ডিসপ্লে, ইনভেন্টরি এবং কর্মী ব্যবস্থাপনা - বাংলাদেশের রেস্তোরাঁর জন্য ডিজাইন করা একটি শক্তিশালী প্ল্যাটফর্মে সব কিছু।"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-slate-100"
                  onClick={() => window.location.href = "/api/login"}
                >
                  {currentLang === "en" ? "Start Free Trial" : "ফ্রি ট্রায়াল শুরু করুন"}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {currentLang === "en" ? "Watch Demo" : "ডেমো দেখুন"}
                </Button>
              </div>
              <div className={`mt-8 text-emerald-200 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                <p className="text-sm">
                  {currentLang === "en" 
                    ? "Starting from ৳2,999/month • No Setup Fee • 24/7 Support"
                    : "শুরু ৳২,৯৯৯/মাস থেকে • কোনো সেটআপ ফি নেই • ২৪/৭ সাপোর্ট"
                  }
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="bg-slate-800 rounded-lg p-6 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {currentLang === "en" ? "Restaurant Dashboard" : "রেস্তোরাঁ ড্যাশবোর্ড"}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">Live</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/20 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-300">
                            {currentLang === "en" ? "Today's Sales" : "আজকের বিক্রয়"}
                          </p>
                          <p className="text-lg font-bold">৳45,230</p>
                        </div>
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      </div>
                    </div>
                    <div className="bg-blue-500/20 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-300">
                            {currentLang === "en" ? "Active Orders" : "সক্রিয় অর্ডার"}
                          </p>
                          <p className="text-lg font-bold">24</p>
                        </div>
                        <ShoppingCart className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-5xl font-bold text-foreground mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
              {currentLang === "en" 
                ? "Everything Your Restaurant Needs"
                : "আপনার রেস্তোরাঁর প্রয়োজনীয় সব কিছু"
              }
            </h2>
            <p className={`text-xl text-muted-foreground max-w-3xl mx-auto ${currentLang === "bn" ? "bengali-text" : ""}`}>
              {currentLang === "en"
                ? "From front-of-house to back-of-house, we've got every aspect of your restaurant operations covered."
                : "ফ্রন্ট-অফ-হাউস থেকে ব্যাক-অফ-হাউস পর্যন্ত, আমরা আপনার রেস্তোরাঁ পরিচালনার প্রতিটি দিক কভার করেছি।"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold text-foreground mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {currentLang === "en" ? feature.title : feature.titleBn}
                  </h3>
                  <p className={`text-muted-foreground mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                    {currentLang === "en" ? feature.description : feature.descriptionBn}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>{currentLang === "en" ? "Real-time updates" : "রিয়েল-টাইম আপডেট"}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>{currentLang === "en" ? "Mobile optimized" : "মোবাইল অপ্টিমাইজড"}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>{currentLang === "en" ? "Bengali support" : "বাংলা সাপোর্ট"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-5xl font-bold text-foreground mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
              {currentLang === "en" 
                ? "Choose Your Perfect Plan"
                : "আপনার নিখুঁত প্ল্যান বেছে নিন"
              }
            </h2>
            <p className={`text-xl text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
              {currentLang === "en"
                ? "Flexible pricing that grows with your restaurant business"
                : "নমনীয় মূল্য যা আপনার রেস্তোরাঁ ব্যবসার সাথে বৃদ্ধি পায়"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`p-8 ${plan.popular ? 'border-primary shadow-lg relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      {currentLang === "en" ? "Most Popular" : "সবচেয়ে জনপ্রিয়"}
                    </Badge>
                  </div>
                )}
                <CardContent className="p-0">
                  <div className="text-center mb-8">
                    <h3 className={`text-2xl font-bold text-foreground mb-2 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? plan.name : plan.nameBn}
                    </h3>
                    <p className={`text-muted-foreground mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? plan.description : plan.descriptionBn}
                    </p>
                    <div className="text-4xl font-bold text-primary mb-2">৳{plan.price}</div>
                    <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "per month" : "প্রতি মাসে"}
                    </p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {(currentLang === "en" ? plan.features : plan.featuresBn).map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-center ${currentLang === "bn" ? "bengali-text" : ""}`}>
                        <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary text-primary-foreground' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => window.location.href = "/api/login"}
                  >
                    {currentLang === "en" 
                      ? (index === 2 ? "Contact Sales" : "Start Free Trial")
                      : (index === 2 ? "বিক্রয়ের সাথে যোগাযোগ করুন" : "ফ্রি ট্রায়াল শুরু করুন")
                    }
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section id="mobile" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-5xl font-bold text-foreground mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
              {currentLang === "en" 
                ? "Powerful Mobile Apps for Every Role"
                : "প্রতিটি ভূমিকার জন্য শক্তিশালী মোবাইল অ্যাপস"
              }
            </h2>
            <p className={`text-xl text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
              {currentLang === "en"
                ? "Manage your restaurant from anywhere with our intuitive mobile applications"
                : "আমাদের স্বজ্ঞাত মোবাইল অ্যাপ্লিকেশনগুলির সাথে যেকোনো জায়গা থেকে আপনার রেস্তোরাঁ পরিচালনা করুন"
              }
            </p>
          </div>

          {/* App Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-muted p-1 rounded-lg">
              {["manager", "waiter", "kitchen"].map((app) => (
                <Button
                  key={app}
                  variant={activeApp === app ? "default" : "ghost"}
                  className={`px-6 py-3 ${currentLang === "bn" ? "bengali-text" : ""}`}
                  onClick={() => setActiveApp(app)}
                >
                  {currentLang === "en" 
                    ? (app === "manager" ? "Manager App" : app === "waiter" ? "Waiter App" : "Kitchen App")
                    : (app === "manager" ? "ম্যানেজার অ্যাপ" : app === "waiter" ? "ওয়েটার অ্যাপ" : "রান্নাঘর অ্যাপ")
                  }
                </Button>
              ))}
            </div>
          </div>

          {/* App Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className={`text-3xl font-bold text-foreground mb-6 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {activeApp === "manager" && (currentLang === "en" ? "Manager Dashboard" : "ম্যানেজার ড্যাশবোর্ড")}
                {activeApp === "waiter" && (currentLang === "en" ? "Waiter Mobile App" : "ওয়েটার মোবাইল অ্যাপ")}
                {activeApp === "kitchen" && (currentLang === "en" ? "Kitchen Display System" : "রান্নাঘর ডিসপ্লে সিস্টেম")}
              </h3>
              <p className={`text-lg text-muted-foreground mb-8 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {activeApp === "manager" && (currentLang === "en" 
                  ? "Complete business overview with real-time analytics, sales tracking, and comprehensive management tools."
                  : "রিয়েল-টাইম অ্যানালিটিক্স, বিক্রয় ট্র্যাকিং এবং ব্যাপক ব্যবস্থাপনা সরঞ্জাম সহ সম্পূর্ণ ব্যবসায়িক ওভারভিউ।"
                )}
                {activeApp === "waiter" && (currentLang === "en"
                  ? "Streamlined table management and order taking with real-time synchronization across all devices."
                  : "সমস্ত ডিভাইস জুড়ে রিয়েল-টাইম সিঙ্ক্রোনাইজেশন সহ সুব্যবস্থিত টেবিল ব্যবস্থাপনা এবং অর্ডার নেওয়া।"
                )}
                {activeApp === "kitchen" && (currentLang === "en"
                  ? "Optimize kitchen workflow with real-time order management and preparation tracking."
                  : "রিয়েল-টাইম অর্ডার ব্যবস্থাপনা এবং প্রস্তুতি ট্র্যাকিং দিয়ে রান্নাঘরের কর্মপ্রবাহ অপ্টিমাইজ করুন।"
                )}
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Real-time Analytics" : "রিয়েল-টাইম অ্যানালিটিক্স"}
                    </h4>
                    <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" 
                        ? "Monitor sales, expenses, and top-performing dishes instantly."
                        : "বিক্রয়, খরচ এবং শীর্ষ-পারফর্মিং খাবারগুলি তাৎক্ষণিকভাবে মনিটর করুন।"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Mobile Optimized" : "মোবাইল অপ্টিমাইজড"}
                    </h4>
                    <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" 
                        ? "Works perfectly on tablets and smartphones with touch-friendly interface."
                        : "টাচ-ফ্রেন্ডলি ইন্টারফেস সহ ট্যাবলেট এবং স্মার্টফোনে নিখুঁতভাবে কাজ করে।"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Multi-language Support" : "বহুভাষিক সাপোর্ট"}
                    </h4>
                    <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" 
                        ? "Switch between English and Bengali seamlessly throughout the app."
                        : "অ্যাপ জুড়ে ইংরেজি এবং বাংলার মধ্যে নির্বিঘ্নে স্যুইচ করুন।"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-slate-800 text-white p-8 max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">
                      {activeApp === "manager" && (currentLang === "en" ? "Dashboard Overview" : "ড্যাশবোর্ড ওভারভিউ")}
                      {activeApp === "waiter" && (currentLang === "en" ? "Table Layout" : "টেবিল লেআউট")}
                      {activeApp === "kitchen" && (currentLang === "en" ? "Order Queue" : "অর্ডার সারি")}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">Live</span>
                    </div>
                  </div>
                  {activeApp === "manager" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-primary/20 rounded-lg p-3">
                        <p className="text-xs text-slate-300">{currentLang === "en" ? "Sales" : "বিক্রয়"}</p>
                        <p className="text-lg font-bold">৳45,230</p>
                      </div>
                      <div className="bg-blue-500/20 rounded-lg p-3">
                        <p className="text-xs text-slate-300">{currentLang === "en" ? "Orders" : "অর্ডার"}</p>
                        <p className="text-lg font-bold">127</p>
                      </div>
                    </div>
                  )}
                  {activeApp === "waiter" && (
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((table) => (
                        <div 
                          key={table} 
                          className={`p-3 rounded-lg text-center text-xs ${
                            table <= 3 ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                          }`}
                        >
                          Table {table}
                        </div>
                      ))}
                    </div>
                  )}
                  {activeApp === "kitchen" && (
                    <div className="space-y-3">
                      {["Chicken Biryani x2", "Fish Curry x1", "Beef Kacchi x1"].map((order, index) => (
                        <div key={index} className="bg-orange-500/20 rounded-lg p-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">{order}</p>
                            <p className="text-xs text-slate-400">Table {index + 2}</p>
                          </div>
                          <div className="text-xs text-orange-300">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {15 - index * 3}m
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-5xl font-bold text-foreground mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
              {currentLang === "en" 
                ? "Frequently Asked Questions"
                : "প্রায়শই জিজ্ঞাসিত প্রশ্ন"
              }
            </h2>
            <p className={`text-xl text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
              {currentLang === "en"
                ? "Everything you need to know about RestaurantOS"
                : "RestaurantOS সম্পর্কে আপনার জানা প্রয়োজন সব কিছু"
              }
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className={`text-left ${currentLang === "bn" ? "bengali-text" : ""}`}>
                  {currentLang === "en" ? faq.question : faq.questionBn}
                </AccordionTrigger>
                <AccordionContent className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                  {currentLang === "en" ? faq.answer : faq.answerBn}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className={`text-3xl lg:text-5xl font-bold text-foreground mb-6 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {currentLang === "en" 
                  ? "Ready to Transform Your Restaurant?"
                  : "আপনার রেস্তোরাঁ রূপান্তরিত করতে প্রস্তুত?"
                }
              </h2>
              <p className={`text-xl text-muted-foreground mb-8 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {currentLang === "en"
                  ? "Get started with RestaurantOS today and see the difference in your operations."
                  : "আজই RestaurantOS দিয়ে শুরু করুন এবং আপনার অপারেশনে পার্থক্য দেখুন।"
                }
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Phone Support" : "ফোন সাপোর্ট"}
                    </h4>
                    <p className="text-muted-foreground">+880 1234-567890</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Email Support" : "ইমেইল সাপোর্ট"}
                    </h4>
                    <p className="text-muted-foreground">support@restaurantos.bd</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Office Address" : "অফিস ঠিকানা"}
                    </h4>
                    <p className={`text-muted-foreground ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" 
                        ? "Dhanmondi, Dhaka 1205, Bangladesh"
                        : "ধানমন্ডি, ঢাকা ১২০৫, বাংলাদেশ"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className={`text-2xl font-bold text-foreground mb-6 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                  {currentLang === "en" ? "Get Started Today" : "আজই শুরু করুন"}
                </h3>
                <form className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Restaurant Name" : "রেস্তোরাঁর নাম"}
                    </label>
                    <Input placeholder={currentLang === "en" ? "Enter your restaurant name" : "আপনার রেস্তোরাঁর নাম লিখুন"} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Contact Person" : "যোগাযোগকারী ব্যক্তি"}
                    </label>
                    <Input placeholder={currentLang === "en" ? "Your full name" : "আপনার পূর্ণ নাম"} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Phone Number" : "ফোন নম্বর"}
                    </label>
                    <Input placeholder="+880 1XXX-XXXXXX" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Email Address" : "ইমেইল ঠিকানা"}
                    </label>
                    <Input placeholder="your@email.com" type="email" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Number of Tables" : "টেবিলের সংখ্যা"}
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={currentLang === "en" ? "Select table count" : "টেবিল সংখ্যা নির্বাচন করুন"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 Tables</SelectItem>
                        <SelectItem value="6-15">6-15 Tables</SelectItem>
                        <SelectItem value="16-30">16-30 Tables</SelectItem>
                        <SelectItem value="30+">30+ Tables</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                      {currentLang === "en" ? "Message" : "বার্তা"}
                    </label>
                    <Textarea 
                      rows={4} 
                      placeholder={currentLang === "en" 
                        ? "Tell us about your restaurant and requirements..."
                        : "আপনার রেস্তোরাঁ এবং প্রয়োজনীয়তা সম্পর্কে বলুন..."
                      } 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    onClick={() => window.location.href = "/api/login"}
                  >
                    {currentLang === "en" ? "Start Free Trial" : "ফ্রি ট্রায়াল শুরু করুন"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <UtensilsCrossed className="h-8 w-8 text-primary mr-3" />
                <span className="text-xl font-bold">RestaurantOS</span>
              </div>
              <p className={`text-slate-300 mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {currentLang === "en"
                  ? "Complete restaurant management solution designed for Bangladesh businesses."
                  : "বাংলাদেশের ব্যবসার জন্য ডিজাইন করা সম্পূর্ণ রেস্তোরাঁ ব্যবস্থাপনা সমাধান।"
                }
              </p>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {currentLang === "en" ? "Product" : "পণ্য"}
              </h4>
              <ul className={`space-y-2 text-slate-300 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                <li><a href="#features" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Features" : "বৈশিষ্ট্য"}
                </a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Pricing" : "মূল্য"}
                </a></li>
                <li><a href="#mobile" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Mobile Apps" : "মোবাইল অ্যাপস"}
                </a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {currentLang === "en" ? "Support" : "সাপোর্ট"}
              </h4>
              <ul className={`space-y-2 text-slate-300 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Help Center" : "সহায়তা কেন্দ্র"}
                </a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Contact Us" : "যোগাযোগ করুন"}
                </a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                {currentLang === "en" ? "Company" : "কোম্পানি"}
              </h4>
              <ul className={`space-y-2 text-slate-300 ${currentLang === "bn" ? "bengali-text" : ""}`}>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "About Us" : "আমাদের সম্পর্কে"}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {currentLang === "en" ? "Privacy Policy" : "গোপনীয়তা নীতি"}
                </a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t border-slate-700 mt-12 pt-8 text-center text-slate-400 ${currentLang === "bn" ? "bengali-text" : ""}`}>
            <p>
              {currentLang === "en"
                ? "© 2024 RestaurantOS. All rights reserved. Made in Bangladesh with ❤️"
                : "© ২০২৪ RestaurantOS। সকল অধিকার সংরক্ষিত। বাংলাদেশে ❤️ দিয়ে তৈরি"
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
