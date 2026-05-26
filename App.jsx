import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Утилиты и иконки ---
const Ic = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
const IcCheck = () => <Ic d="M20 6 9 17l-5-5" size={16} />;
const IcTg = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>;

const SectionTitle = ({ subtitle, title }) => (
  <div className="mb-12">
    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xs uppercase tracking-widest text-gray-500 font-medium">{subtitle}</motion.span>
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 0, y: 0 }} className="text-3xl md:text-4xl font-semibold mt-2 text-white">{title}</motion.h2>
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-gray-300 font-sans selection:bg-white selection:text-black">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent border-transparent py-6"}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className="text-white font-bold text-xl tracking-tighter">AFFOW</span>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://t.me/antiscamprjectbot" className="text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-all">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-44 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">v2.4.0 Early Access</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
            Будущее соревновательной <br /> аналитики Brawl Stars
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Продвинутые системы на базе ИИ, спроектированные для глубокой оптимизации игрового процесса и адаптивной производительности.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://t.me/enuau" className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all">
              <IcTg /> Community
            </a>
            <a href="#features" className="bg-transparent border border-white/5 text-gray-500 px-8 py-4 rounded-xl font-medium hover:text-gray-300 transition-all">
              Learn More →
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 flex justify-center gap-12 text-sm text-gray-600 font-medium">
            <div className="flex flex-col gap-1">
              <span className="text-white text-2xl font-semibold">5000+</span>
              <span>Downloads</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white text-2xl font-semibold">2400</span>
              <span>Live Sessions</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white text-2xl font-semibold">99.9%</span>
              <span>Uptime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Affow - Features */}
      <section id="features" className="py-32 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle subtitle="Capabilities" title="Превосходство в деталях" />
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Adaptive Dodge", d: "Мировое лидерство в алгоритмах автоматического уклонения от снарядов." },
              { t: "Intelligent Aim", d: "Система умного наведения и ассиста, работающая на опережение траектории." },
              { t: "Hidden Vision", d: "Визуализация противников в кустах и скрытых зонах для тактического преимущества." },
              { t: "Combat Aura", d: "Автоматизация ведения огня в ближнем бою без необходимости ручного ввода." },
              { t: "Gadget Stealth", d: "Скрытие визуальных эффектов использования гаджетов для внезапных атак." },
              { t: "Resource Tracker", d: "В режиме реального времени отображает шкалу боеприпасов оппонентов." },
              { t: "Fluid Interface", d: "Минималистичный оверлей, который не нагружает систему и зрение." },
              { t: "Hold2Shoot", d: "Механика непрерывной стрельбы одним удержанием для всех персонажей." },
              { t: "Safe Architecture", d: "Уникальная модульная система, исключающая прямое вмешательство в код игры." }
            ].map((f, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                  <IcCheck />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">{f.t}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionTitle subtitle="Pricing" title="Выберите свой уровень" />
            <p className="text-gray-500 -mt-8">Получите полный доступ к экосистеме Affow через официального бота.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "250", period: "30 Дней", link: "https://t.me/antiscamprjectbot", feat: ["Все функции в комплекте", "Обновления 24/7", "Базовая поддержка"] },
              { name: "Pro", price: "500", period: "90 Дней", popular: true, link: "https://t.me/antiscamprjectbot", feat: ["Экономия 25%", "Приоритетные обновления", "Community Access", "Все функции"] },
              { name: "Lifetime", price: "750", period: "Навсегда", link: "https://t.me/antiscamprjectbot", feat: ["Единоразовый платеж", "Пожизненный доступ", "VIP Поддержка", "Эксклюзивные модули"] }
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-3xl border ${plan.popular ? "border-white/20 bg-white/[0.04]" : "border-white/5 bg-white/[0.01]"} flex flex-col`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Most Popular</span>}
                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-500 text-sm">Stars / {plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.feat.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-400">
                      <IcCheck /> {item}
                    </li>
                  ))}
                </ul>
                <a href={plan.link} className={`w-full py-4 rounded-xl font-semibold text-center transition-all ${plan.popular ? "bg-white text-black hover:bg-gray-200" : "bg-white/5 text-white hover:bg-white/10"}`}>
                  Оформить через Bot
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionTitle subtitle="FAQ" title="Часто задаваемые вопросы" />
          <div className="space-y-4 text-left">
            {[
              { q: "Это безопасно для аккаунта?", a: "Мы используем уникальную архитектуру 'External Overlay'. Система работает поверх интерфейса, не внедряясь в исполняемые файлы игры, что делает использование максимально безопасным." },
              { q: "Какие устройства поддерживаются?", a: "Платформа полностью оптимизирована для iOS, Android, а также поддерживает все современные эмуляторы для PC." },
              { q: "Как часто выходят обновления?", a: "Наша система мониторинга работает 24/7. Обновления выходят автоматически в течение нескольких часов после любого патча игры." },
              { q: "Где я могу получить помощь?", a: "У нас есть активный Telegram-канал @enuau и выделенная служба поддержки в боте покупки." }
            ].map((item, i) => (
              <details key={i} className="group border border-white/5 rounded-2xl bg-white/[0.01] overflow-hidden">
                <summary className="p-6 cursor-pointer list-none flex justify-between items-center hover:bg-white/[0.03] transition-all">
                  <span className="text-white font-medium">{item.q}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-white font-bold tracking-tighter">AFFOW</span>
            <p className="text-xs text-gray-600 mt-2">© 2024 Next-Gen Optimization Platform. <br /> Не является игровым софтом.</p>
          </div>
          <div className="flex gap-8 items-center">
            <a href="https://t.me/enuau" className="text-gray-500 hover:text-white transition-colors"><IcTg /></a>
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Early Access Status</p>
              <p className="text-xs text-green-500 font-medium">Stable & Online</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
