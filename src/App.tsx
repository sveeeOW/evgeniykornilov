import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ALIEN_SELFIE_PATH,
  PROFILE_SELFIE_PATH,
  STREET_CARD_PATH,
  cases,
  praiseCards,
  principles,
  profileBlocks,
  stats,
  teamPhotos,
  videos,
} from "./content";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

const sectionMotion = {
  initial: { opacity: 0.35, y: 72, scale: 0.985, clipPath: "inset(5% 0 0 0 round 32px)" },
  whileInView: { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0 round 0px)" },
  viewport: { once: true, amount: 0.06 },
  transition: { duration: 0.95, ease },
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

const marketingCreativeImages = [
  { src: "/images/marketing/b2c-7.png", alt: "Рекламный креатив Freedom Telecom" },
  { src: "/images/marketing/b2c-4.png", alt: "Рекламный креатив со скоростным интернетом" },
  { src: "/images/marketing/b2c-3.png", alt: "Рекламный креатив с тарифом" },
];

function AnimatedName() {
  const firstName = "Евгений";
  const lastName = "Корнилов";

  return (
    <motion.div
      className="portrait-name"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.65 } } }}
      aria-label={`${firstName} ${lastName}`}
    >
      <div>
        {firstName.split("").map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            variants={{ hidden: { opacity: 0, y: 24, rotate: -8 }, show: { opacity: 1, y: 0, rotate: 0 } }}
            transition={{ duration: 0.55, ease }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div>
        {lastName.split("").map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            variants={{ hidden: { opacity: 0, y: 24, rotate: 8 }, show: { opacity: 1, y: 0, rotate: 0 } }}
            transition={{ duration: 0.55, ease }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1.25, ease }} />
    </motion.div>
  );
}

function MetricStrip() {
  return (
    <div className="metric-strip">
      {stats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: [0, -12, 0], scale: [1, 1.045, 1], filter: ["blur(0px)", "blur(0px)", "blur(0px)"] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.55 + index * 0.1 },
            y: { duration: 2.8, delay: 0.55 + index * 0.18, repeat: Infinity, repeatDelay: 0.25, ease },
            scale: { duration: 2.8, delay: 0.55 + index * 0.18, repeat: Infinity, repeatDelay: 0.25, ease },
            filter: { duration: 2.8, delay: 0.55 + index * 0.18, repeat: Infinity, repeatDelay: 0.25, ease },
          }}
          className="metric"
        >
          <strong><span>{item.value}</span></strong>
          <span>{item.label}</span>
          <motion.i
            aria-hidden="true"
            animate={{ x: ["-150%", "260%"], opacity: [0, 1, 0] }}
            transition={{ duration: 2.8, delay: 0.55 + index * 0.18, repeat: Infinity, repeatDelay: 0.25, ease }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function EditorTyping({ text }: { text: string }) {
  const [started, setStarted] = useState(false);
  const [visibleText, setVisibleText] = useState("");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started || visibleText.length >= text.length) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisibleText(text);
      return;
    }

    timerRef.current = window.setTimeout(() => {
      setVisibleText(text.slice(0, visibleText.length + 1));
    }, visibleText.length < 30 ? 24 : 14);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [started, text, visibleText]);

  return (
    <motion.div
      className="editor-window"
      initial={{ opacity: 0, y: 26, rotateX: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.7, ease }}
      onViewportEnter={() => setStarted(true)}
      aria-label={text}
    >
      <div className="editor-toolbar">
        <div className="editor-dots"><i /><i /><i /></div>
        <span>profile-note.txt</span>
        <small>UTF-8</small>
      </div>
      <div className="editor-body" aria-hidden="true">
        <div className="editor-gutter">01<br />02<br />03<br />04<br />05<br />06</div>
        <p>{visibleText}<span className="typing-cursor" /></p>
      </div>
      <div className="editor-status"><span>ТЕКСТОВЫЙ РЕЖИМ</span><span>{visibleText.length} / {text.length}</span></div>
    </motion.div>
  );
}

function PhotoRail() {
  const rail = [...teamPhotos, ...teamPhotos];
  return (
    <div className="photo-rail" aria-label="Фотографии с командой">
      <motion.div
        className="photo-rail-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        {rail.map((photo, index) => (
          <figure className="rail-photo" key={`${photo.src}-${index}`} aria-hidden={index >= teamPhotos.length}>
            <img src={photo.src} alt={index < teamPhotos.length ? photo.alt : ""} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
}

function SceneCow() {
  return (
    <div
      className="scene-cow"
      aria-hidden="true"
    >
      <span className="cow-moo cow-moo-1">мууу</span>
      <span className="cow-moo cow-moo-2">мууу</span>
      <span className="cow-body" /><span className="cow-head" /><span className="cow-mouth" /><span className="cow-leg cow-leg-1" /><span className="cow-leg cow-leg-2" />
    </div>
  );
}

function ChatCloud() {
  return (
    <div className="praise-wall" aria-label="Фрагменты переписок с коллегами">
      {praiseCards.map((card, cardIndex) => (
        <motion.article
          key={`praise-${cardIndex}`}
          initial={{ opacity: 0, y: 45, rotate: cardIndex % 2 ? 5 : -5, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, rotate: [-4, 3, -2, 4, -3][cardIndex], scale: 1 }}
          whileHover={{ y: -12, rotate: 0, scale: 1.025, zIndex: 10 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: cardIndex * 0.08, duration: 0.65, ease }}
          className={`praise-window praise-window-${cardIndex + 1}`}
        >
          <header>
            <div><span className="online-dot" /> Telegram</div>
            <small>фрагмент 0{cardIndex + 1}</small>
          </header>
          <div className="praise-chat">
            {card.messages.map((message, messageIndex) => (
              <div className="praise-message" key={`${message.time}-${messageIndex}`}>
                <div className="chat-avatar">{message.avatar || "Ж"}</div>
                <div>
                  {message.name && <strong>{message.name}</strong>}
                  <p>{message.text}</p>
                  <small>{message.time} <b>✓✓</b></small>
                </div>
              </div>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function WorkCardIcon({ index }: { index: number }) {
  const icons = [
    <path key="strategy" d="M18 74 C28 32 56 20 88 28 C124 37 134 70 116 96 C96 124 48 122 31 93 M50 72 H105 M76 45 V103" />,
    <path key="companies" d="M25 112 V35 H72 V112 M72 56 H119 V112 M39 52 H54 M39 73 H54 M39 94 H54 M88 73 H103 M88 94 H103" />,
    <path key="result" d="M25 92 C42 64 58 78 73 52 C87 30 103 35 119 20 M34 104 H118 M92 21 H119 V48" />,
  ];

  return (
    <svg className="profile-card-icon" viewBox="0 0 144 144" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        {icons[index] ?? icons[0]}
      </g>
    </svg>
  );
}

function AlienAbductionScene({ active }: { active: boolean }) {
  return (
    <div
      className={`alien-scene ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <div className="ufo">
        <span className="ufo-dome" />
        <span className="ufo-body" />
        <span className="ufo-light ufo-light-1" />
        <span className="ufo-light ufo-light-2" />
        <span className="ufo-light ufo-light-3" />
      </div>
      <div className="scan-beam" />
      <SceneCow />
      <span className="warp-streak warp-streak-1" />
      <span className="warp-streak warp-streak-2" />
    </div>
  );
}

function MarketingDecisionVisual() {
  return (
    <motion.figure
      whileHover={{ scale: 1.012, rotate: -0.25 }}
      transition={{ duration: 0.45, ease }}
      className="decision-visual"
    >
      <img src="/images/marketing/decision-handshake-cat.png" alt="" loading="lazy" />
    </motion.figure>
  );

  /*
  return (
    <motion.div
      whileHover={{ scale: 1.018, rotate: -0.4 }}
      transition={{ duration: 0.45, ease }}
      className="decision-visual"
      aria-label="Коллаж: маркетинговые отчёты, рекламные креативы и портрет"
    >
      <div className="decision-grid">
        {marketingCreativeImages.map((image, index) => (
          <figure className={`creative-card creative-card-${index + 1}`} key={image.src}>
            <img src={image.src} alt={image.alt} loading="lazy" />
          </figure>
        ))}
      </div>
      <div className="report-card report-card-main">
        <small>ROMI / funnel / MQL</small>
        <strong>+117%</strong>
        <span>рост клиентской базы</span>
        <i />
      </div>
      <div className="report-card report-card-side">
        <small>dashboard</small>
        <div><b style={{ height: "64%" }} /><b style={{ height: "88%" }} /><b style={{ height: "46%" }} /><b style={{ height: "76%" }} /></div>
      </div>
      <div className="decision-face">
        <img src={PROFILE_SELFIE_PATH} alt="Евгений Корнилов" loading="lazy" />
      </div>
      <span className="decision-glow decision-glow-1" />
      <span className="decision-glow decision-glow-2" />
      <p>Решения рождаются там, где цифры, креативы и здравый смысл наконец-то разговаривают друг с другом.</p>
    </motion.div>
  );
  */
}

function CaseDeck() {
  const [active, setActive] = useState(0);
  const item = cases[active];

  return (
    <div className="case-deck">
      <div className="case-tabs" role="tablist" aria-label="Кейсы">
        {cases.map((entry, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            key={entry.title}
          >
            <span>{entry.index}</span>
            <b>{entry.logoAlt}</b>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.article
          key={item.index}
          initial={{ opacity: 0, y: 30, clipPath: "inset(0 0 18% 0 round 28px)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 28px)" }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.65, ease }}
          className="case-panel"
        >
          <div className={`case-logo-wrap case-logo-${item.index}`}>
            <img src={item.logo} alt={item.logoAlt} loading="lazy" />
          </div>
          <div className="case-copy">
            <p className="case-kicker">{item.subtitle}</p>
            <h3>{item.title}</h3>
            <div className="case-highlights" aria-label="Ключевые результаты">
              {item.highlights.map((highlight) => (
                <div className="case-highlight" key={`${highlight.value}-${highlight.label}`}>
                  <strong>{highlight.value}</strong>
                  <span>{highlight.label}</span>
                </div>
              ))}
            </div>
            <p>{item.text}</p>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

function VideoStory() {
  const [open, setOpen] = useState(false);
  const video = videos.find((item) => item.url);
  if (!video?.url) return null;

  return (
    <>
      <button type="button" className="video-poster" onClick={() => setOpen(true)}>
        <img src="/images/team/kmc-group-large.jpg" alt="Команда на KMC" />
        <span className="video-shade" />
        <span className="play-button">▶</span>
        <span className="video-caption"><b>{video.title}</b><small>Видеоотзыв коллеги · открыть</small></span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="video-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.88, y: 35 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92 }} transition={{ duration: 0.5, ease }} className="video-frame" onClick={(event) => event.stopPropagation()}>
              <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть видео">×</button>
              <iframe src={video.url} title={video.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function VoiceSection() {
  const [ufoActive, setUfoActive] = useState(false);

  return (
    <motion.section
      {...sectionMotion}
      className="voice"
      id="voice"
      onViewportEnter={() => setUfoActive(true)}
    >
      <div className="voice-copy">
        <SectionLabel index="04">Голос команды</SectionLabel>
        <div className="voice-portrait-wrap">
          <img src={ALIEN_SELFIE_PATH} alt="Евгений Корнилов" loading="lazy" />
          <AlienAbductionScene active={ufoActive} />
        </div>
        <h2>Люди говорят лучше любого <span>self‑promo</span></h2>
        <p>Неформальные сообщения и честный видеоотзыв коллег.</p>
      </div>
      <ChatCloud />
    </motion.section>
  );
}

type ContactKey = "phone" | "telegram" | "email";

const contacts: Array<{ key: ContactKey; label: string; value: string; href: string; note: string }> = [
  { key: "telegram", label: "Telegram", value: "@sveeeow", href: "https://t.me/sveeeow", note: "Предпочтительный способ связи" },
  { key: "phone", label: "Телефон", value: "+7 965 206-84-64", href: "tel:+79652068464", note: "Для звонков и быстрого контакта" },
  { key: "email", label: "Email", value: "eteground@gmail.com", href: "mailto:eteground@gmail.com", note: "Для вакансий и интервью" },
];

function ContactVault() {
  const [revealed, setRevealed] = useState<ContactKey | null>(null);
  return (
    <div className="contact-vault">
      {contacts.map((contact, index) => {
        const isOpen = revealed === contact.key;
        return (
          <motion.div key={contact.key} className={`contact-row ${isOpen ? "is-open" : ""}`}>
            <button type="button" onClick={() => setRevealed(isOpen ? null : contact.key)} aria-expanded={isOpen}>
              <span>0{index + 1}</span><b>{contact.label}</b><span>{isOpen ? "−" : "+"}</span>
            </button>
            <motion.div
              initial={false}
              animate={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.58, ease }}
              className="contact-reveal"
              aria-hidden={!isOpen}
            >
              <div className="contact-reveal-inner">
                <small>{contact.note}</small>
                <a href={contact.href} target={contact.key === "telegram" ? "_blank" : undefined} rel={contact.key === "telegram" ? "noreferrer" : undefined}>{contact.value}<Arrow /></a>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });

  useEffect(() => {
    document.title = "Евгений Корнилов — маркетинг, который влияет на бизнес";
  }, []);

  return (
    <div className="cv-shell">
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <header className="topbar">
        <a className="identity" href="#top" aria-label="В начало"><span>ЕК</span><b>Евгений Корнилов</b></a>
        <nav>
          <a href="#profile">Профиль</a><a href="#cases">Опыт</a><a href="#voice">Отзывы</a>
        </nav>
        <a className="availability" href="#contact"><i /> Открыт к предложениям</a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-noise" />
          <div className="hero-copy">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="hero-eyebrow">CMO · Head of Marketing · Москва / Remote</motion.p>
            <h1>
              <motion.span initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease }}>Head</motion.span>
              <motion.span initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.1, ease }}>of</motion.span>
              <motion.span initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2, ease }}><em>Marketing</em></motion.span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }} className="hero-lead">
              Соединяю стратегию, аналитику, продажи, команду и процессы — до измеримого результата в выручке.
              <span className="job-search-mark">Ищу работу</span>
            </motion.p>
            <div className="hero-actions"><a href="#cases">Смотреть результаты <Arrow /></a><a href="#contact">Связаться</a></div>
          </div>
          <div className="hero-portrait-stack">
            <div className="hero-photo-cluster">
              <motion.div className="hero-portrait" initial={{ opacity: 0, scale: 1.08, clipPath: "inset(15% 0 0 18% round 40px)" }} animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0 round 40px)" }} transition={{ duration: 1.2, delay: 0.2, ease }}>
                <img src={PROFILE_SELFIE_PATH} alt="Евгений Корнилов" />
                <div className="portrait-badge"><span>9+</span><small>лет<br />в маркетинге</small></div>
                <div className="portrait-orbit"><span>strategy · growth · revenue · </span></div>
              </motion.div>
              <motion.div className="hero-side-card" initial={{ opacity: 0, x: 44, rotate: 9, scale: 0.9 }} animate={{ opacity: 1, x: 0, rotate: 3, scale: 1 }} transition={{ duration: 1, delay: 0.5, ease }}>
                <img src={STREET_CARD_PATH} alt="Евгений Корнилов на улице с коллегами" />
              </motion.div>
            </div>
            <AnimatedName />
          </div>
          <MetricStrip />
        </section>

        <motion.section {...sectionMotion} className="profile" id="profile">
          <Reveal><SectionLabel index="01">Профиль</SectionLabel></Reveal>
          <div className="profile-intro">
            <Reveal><h2>Не «делаю рекламу». Строю <span>бизнес-функцию</span></h2></Reveal>
            <EditorTyping text={profileBlocks[0].text} />
          </div>
          <div className="profile-visuals">
            <Reveal className="profile-photo profile-photo-main">
              <img src={teamPhotos[2].src} alt={teamPhotos[2].alt} loading="lazy" />
              <span>Команда / коммуникация / общий результат</span>
            </Reveal>
            <Reveal className="profile-photo profile-photo-side" delay={0.08}>
              <img src={teamPhotos[3].src} alt={teamPhotos[3].alt} loading="lazy" />
            </Reveal>
            <Reveal className="profile-visual-note" delay={0.14}>
              <small>Рабочая среда</small>
              <strong>Маркетинг редко выигрывает в одиночку</strong>
              <p>{teamPhotos[6].caption}</p>
            </Reveal>
          </div>
          <div className="profile-grid">
            {profileBlocks.slice(1).map((block, index) => (
              <Reveal key={block.title} delay={index * 0.08} className={`profile-card profile-card-${index + 1}`}>
                <WorkCardIcon index={index} />
                <span>0{index + 1}</span><small>{block.label}</small><h3>{block.title}</h3><p>{block.text}</p>
              </Reveal>
            ))}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} className="principles">
          <div className="principles-sticky">
            <SectionLabel index="02">Рабочий подход</SectionLabel>
            <h2>Как я принимаю <i>решения</i></h2>
            <MarketingDecisionVisual />
          </div>
          <div className="principle-list">
            {principles.map((principle) => (
              <Reveal key={principle.number} className="principle">
                <span>{principle.number}</span><h3>{principle.title}</h3><p>{principle.text}</p>
              </Reveal>
            ))}
          </div>
        </motion.section>

        <PhotoRail />

        <motion.section {...sectionMotion} className="cases" id="cases">
          <Reveal><SectionLabel index="03">Результаты</SectionLabel><h2>Работа, которую видно <em>в цифрах</em></h2></Reveal>
          <CaseDeck />
        </motion.section>

        <VoiceSection />

        <motion.section {...sectionMotion} className="video-story"><VideoStory /></motion.section>

        <motion.section {...sectionMotion} className="contact" id="contact">
          <Reveal><SectionLabel index="05">Контакты</SectionLabel><h2><span className="nowrap">Давайте соберём следующую</span> <em>историю роста</em></h2><p>Ищу роль руководителя маркетинга / Head of Marketing / CMO. Полная занятость, Москва, hybrid или remote.</p></Reveal>
          <ContactVault />
          <footer><span>© 2026 Евгений Корнилов</span><a href="#top">Наверх ↑</a></footer>
        </motion.section>
      </main>
    </div>
  );
}
