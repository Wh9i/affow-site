import React, { useState } from "react";

export default function App() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#a3a3a3] antialiased selection:bg-white selection:text-black pb-20">
      
      {/* Навигационная панель */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/75 backdrop-blur-xl border-b border-white/5 py-5">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-white font-bold text-xl tracking-tighter">AFFOW</span>
          <div className="hidden sm:flex gap-8 text-sm font-medium">
            <a href="#features" className="text-[#8e8e93] hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-[#8e8e93] hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-[#8e8e93] hover:text-white transition-colors">FAQ</a>
          </div>
          <a href="https://t.me/antiscamprjectbot" className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#e5e5ea] transition-all">Get Started</a>
        </div>
      </nav>

      {/* Hero Раздел */}
      <header className="relative pt-44 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-white/[0.03] to-transparent blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-8 text-xs font-medium text-white tracking-wider uppercase">
          <span className="w-1.5 h-1.5 bg-[#34c759] rounded-full shadow-[0_0_10px_#34c759]" />
          v2.4.0 Early Access
        </div>
        
        <h1 className="text-white text-4xl sm:text-6xl font-bold tracking-tight max-w-4xl mx-auto mb-6 leading-[1.1]">
          Будущее соревновательной<br />оптимизации Brawl Stars
        </h1>
        
        <p className="text-[#8e8e93] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Продвинутые интеллектуальные модули внешней визуализации данных, разработанные для глубокого анализа игрового процесса и калибровки отклика.
        </p>
        
        <div className="flex justify-center gap-4 mb-16">
          <a href="https://t.me/enuau" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-7 py-3.5 rounded-xl text-md font-medium hover:bg-white/10 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
            Community
          </a>
          <a href="#features" className="text-[#636366] hover:text-[#aeaeb2] px-7 py-3.5 text-md font-medium transition-colors flex items-center">Learn More →</a>
        </div>

        <div className="flex justify-center gap-12 sm:gap-16 border-t border-white/[0.03] pt-10 max-w-xl mx-auto">
          <div className="flex flex-col gap-1">
            <span className="text-white text-2xl font-semibold tracking-tight">5000+</span>
            <span className="text-[#48484a] text-xs font-semibold uppercase tracking-wider">Downloads</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white text-2xl font-semibold tracking-tight">2940</span>
            <span className="text-[#48484a] text-xs font-semibold uppercase tracking-wider">Live Sessions</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white text-2xl font-semibold tracking-tight">99.9%</span>
            <span className="text-[#48484a] text-xs font-semibold uppercase tracking-wider">Uptime</span>
          </div>
        </div>
      </header>

      {/* Раздел Features (Функции) */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-14">
          <span className="text-xs font-bold text-[#636366] uppercase tracking-widest block mb-2">Capabilities</span>
          <h2 className="text-white text-3xl font-semibold tracking-tight">Интеллектуальные модули системы</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <div className="text-white mb-5 text-lg">✨</div>
            <h3 className="text-white font-medium text-lg mb-2">Auto Dodge</h3>
            <p className="text-[#636366] text-sm leading-relaxed">Высокоточный алгоритм расчета векторов движения для плавного уклонения от летящих объектов в автоматическом режиме.</p>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <div className="text-white mb-5 text-lg">✨</div>
            <h3 className="text-white font-medium text-lg mb-2">Aim Bot & Assist</h3>
            <p className="text-[#636366] text-sm leading-relaxed">Умная корректировка векторов наведения с упреждением траектории движения цели для идеального позиционирования атаки.</p>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <div className="text-white mb-5 text-lg">✨</div>
            <h3 className="text-white font-medium text-lg mb-2">Xray Vision</h3>
            <p className="text-[#636366] text-sm leading-relaxed">Внешнее графическое наложение, отображающее контуры объектов в слепых зонах и зонах растительности.</p>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <div className="text-white mb-5 text-lg">✨</div>
            <h3 className="text-white font-medium text-lg mb-2">Combat Aura</h3>
            <p className="text-[#636366] text-sm leading-relaxed">Автоматическая координация ближнего боя, позволяющая оптимизировать тайминги без необходимости ручного контроля.</p>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <div className="text-white mb-5 text-lg">✨</div>
            <h3 className="text-white font-medium text-lg mb-2">Hide Gadget</h3>
            <p className="text-[#636366] text-sm leading-relaxed">Оптимизация сетевых пакетов анимации для маскировки момента активации ключевых способностей (например, гаджета Dyna).</p>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <div className="text-white mb-5 text-lg">✨</div>
            <h3 className="text-white font-medium text-lg mb-2">Hold2Shoot</h3>
            <p className="text-[#636366] text-sm leading-relaxed">Адаптивный режим ведения непрерывного огня по удержанию триггера для всех классов персонажей, как у Amber.</p>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <div className="text-white mb-5 text-lg">✨</div>
            <h3 className="text-white font-medium text-lg mb-2">Show Ammo</h3>
            <p className="text-[#636366] text-sm leading-relaxed">Дополнительный HUD-оверлей, транслирующий точный уровень шкалы боеприпасов и перезарядки оппонентов.</p>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <div className="text-white mb-5 text-lg">✨</div>
            <h3 className="text-white font-medium text-lg mb-2">AutoFarm System</h3>
            <p className="text-[#636366] text-sm leading-relaxed">Автоматизированный скрипт симуляции игровых сессий для оптимизации рутинных процессов исключительно на низких рангах.</p>
          </div>
        </div>
      </section>

      {/* Раздел Pricing (Цены) */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-[#636366] uppercase tracking-widest block mb-2">Premium Access</span>
          <h2 className="text-white text-3xl font-semibold tracking-tight mb-3">Тарифные планы платформы</h2>
          <p className="text-[#636366] text-sm">Получите автоматический доступ к экосистеме Affow через официального бота.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 flex flex-col transition-all">
            <h3 className="text-white font-medium text-xl mb-4">Starter Access</h3>
            <div className="flex items-baseline gap-1.5 mb-8">
              <span className="text-white text-4xl font-bold tracking-tight">250</span>
              <span className="text-[#8e8e93] text-sm font-medium">Telegram Stars / 30 дней</span>
            </div>
            <ul className="space-y-4 flex-grow mb-10">
              <li className="text-sm text-[#8e8e93] flex items-center gap-2.5">
                <span className="text-white text-xs">✓</span> Полный доступ ко всем модулям
              </li>
              <li className="text-sm text-[#8e8e93] flex items-center gap-2.5">
                <span className="text-white text-xs">✓</span> Фоновые авто-обновления
              </li>
              <li className="text-sm text-[#8e8e93] flex items-center gap-2.5">
                <span className="text-white text-xs">✓</span> Поддержка 24/7
              </li>
            </ul>
            <a href="https://t.me/antiscamprjectbot" className="w-full py-3.5 rounded-xl text-center text-sm font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">Приобрести тариф</a>
          </div>

          <div className="bg-white/[0.02] border border-white/15 rounded-3xl p-8 flex flex-col relative transition-all">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Выгодно</span>
            <h3 className="text-white font-medium text-xl mb-4">Extended Access</h3>
            <div className="flex items-baseline gap-1.5 mb-8">
              <span className="text-white text-4xl font-bold tracking-tight">500</span>
              <span className="text-[#8e8e93] text-sm font-medium">Telegram Stars / 90 дней</span>
            </div>
            <ul className="space-y-4 flex-grow mb-10">
              <li className="text-sm text-[#8e8e93] flex items-center gap-2.5">
                <span className="text-white text-xs">✓</span> Экономия 33% по сравнению со Starter
              </li>
              <li className="text-sm text-[#8e8e93] flex items-center gap-2.5">
                <span className="text-white text-xs">✓</span> Приоритетный доступ к бета-тестам
              </li>
              <li className="text-sm text-[#8e8e93] flex items-center gap-2.5">
                <span className="text-white text-xs">✓</span> Выделенная линия поддержки
              </li>
            </ul>
            <a href="https://t.me/antiscamprjectbot" className="w-full py-3.5 rounded-xl text-center text-sm font-semibold bg-white text-black hover:bg-[#e5e5ea] transition-all">Приобрести тариф</a>
          </div>

          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 flex flex-col transition-all">
            <h3 className="text-white font-medium text-xl mb-4">Infinite Access</h3>
            <div className="flex items-baseline gap-1.5 mb-8">
              <span className="text-white text-4xl font-bold tracking-tight">750</span>
              <span className="text-[#8e8e93] text-sm font-medium">Telegram Stars / Навсегда</span>
            </div>
            <ul className="space-y-4 flex-grow mb-10">
              <li className="text-sm text-[#8e8e93] flex items-center gap-2.5">
                <span className="text-white text-xs">✓</span> Единоразовый платеж без подписок
              </li>
              <li className="text-sm text-[#8e8e93] flex items-center gap-2.5">
                <span className="text-white text-xs">✓</span> Пожизненный доступ ко всем версиям
              </li>
              <li className="text-sm text-[#8e8e93] flex items-center gap-2.5">
                <span className="text-white text-xs">✓</span> VIP-сообщество и чат игроков
              </li>
            </ul>
            <a href="https://t.me/antiscamprjectbot" className="w-full py-3.5 rounded-xl text-center text-sm font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">Приобрести тариф</a>
          </div>
        </div>
      </section>

      {/* Раздел FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-[#636366] uppercase tracking-widest block mb-2">FAQ</span>
          <h2 className="text-white text-3xl font-semibold tracking-tight">Вопросы и ответы</h2>
        </div>
        
        <div className="flex flex-col gap-3">
          {[
            {
              q: "Это безопасно для учетной записи?",
              a: "Да. Наш продукт не является читом или сторонним модифицированным софтом, изменяющим внутреннюю память игры. Это легитимная система внешнего аналитического оверлея (External Overlay), работающая поверх экрана, собирающая данные и помогающая оптимизировать задержку ввода."
            },
            {
              q: "Какие платформы поддерживаются?",
              a: "Модули полностью оптимизированы для мобильных операционных систем iOS, Android, а также адаптированы для стабильной работы на официальных ПК-эмуляторах."
            },
            {
              q: "Как часто происходят обновления?",
              a: "Все алгоритмы трекинга обновляются автоматически в фоновом режиме на стороне наших облачных серверов, поэтому вам не нужно вручную переустанавливать пакеты данных."
            },
            {
              q: "Где отслеживать новости?",
              a: "Все официальные объявления, патчноуты и закрытые розыгрыши доступов публикуются исключительно в нашем Telegram-канале @enuau."
            }
          ].map((item, index) => (
            <div key={index} className="border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden">
              <button className="w-full p-6 bg-transparent text-left cursor-pointer flex justify-between items-center text-white font-medium text-base hover:bg-white/[0.01]" onClick={() => toggleFaq(index)}>
                <span>{item.q}</span>
                <span className="text-[#48484a] transition-transform duration-200" style={{transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0deg)'}}>↓</span>
              </button>
              {activeFaq === index && (
                <div className="px-6 pb-6 text-sm text-[#636366] leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Подвал */}
      <footer className="border-t border-white/5 pt-14 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left text-xs text-[#3a3a3c] leading-relaxed">
            <strong className="text-gray-400">AFFOW SITE</strong><br />
            Платформа внешней оптимизации игровых параметров и аналитики.<br />
            Продукт не нарушает правила пользовательских соглашений игровых платформ.
          </div>
          <div className="text-center sm:text-right text-xs text-[#3a3a3c] leading-relaxed">
            © 2026 Premium Startup Landing.<br />
            Early Access Status: <span className="text-[#34c759] font-semibold">Stable & Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
