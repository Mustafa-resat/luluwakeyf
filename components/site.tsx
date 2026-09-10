'use client';

import Image from 'next/image';
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Facebook, Instagram, MapPin, Menu as MenuIcon, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  ['Ana Sayfa', '#top'], ['Hikâyemiz', '#hikaye'], ['Üst Kat', '#ust-kat'], ['Alt Kat', '#alt-kat'], ['Menü', '#menu'], ['Galeri', '#galeri'], ['İletişim', '#iletisim']
];

const upper = [
  ['/images/upper-01.jpg', 'Deniz manzarası', 'Üst kat teras'],
  ['/images/upper-02.jpg', 'Denize karşı masa', 'Teras deneyimi'],
  ['/images/upper-03.jpg', 'Rattan ışıklar', 'Sıcak iç mekân'],
  ['/images/upper-04.jpg', 'Şömine köşesi', 'Kış akşamları'],
  ['/images/upper-05.jpg', 'Doğal dokular', 'Oturma alanı'],
  ['/images/upper-06.jpg', 'Geniş salon', 'Üst kat atmosferi'],
  ['/images/upper-07.jpg', 'Ahşap masa', 'Keyifli buluşmalar'],
  ['/images/upper-08.jpg', 'İç mekân detayları', 'Luluwa Keyf'],
  ['/images/upper-09.jpg', 'Terraryum', 'Doğadan ilham'],
];

const lower = [
  ['/images/alt-kat/lower-01.jpeg', 'Ana giriş', 'Marina manzarasına açılan kapı'],
  ['/images/alt-kat/lower-02.jpeg', 'Denize karşı masa', 'Alt kat oturma alanı'],
  ['/images/alt-kat/lower-03.jpeg', 'Sıcak iç mekân', 'Rattan ve doğal dokular'],
  ['/images/alt-kat/lower-04.jpeg', 'Açık teras', 'Deniz havası ve keyif'],
  ['/images/alt-kat/lower-05.jpeg', 'Akvaryum barı', 'Renkli su altı dünyası'],
  ['/images/alt-kat/lower-06.jpeg', 'Bar ve akvaryum', 'Alt kat atmosferi'],
  ['/images/alt-kat/lower-07.jpeg', 'Akvaryum detayları', 'Doğadan ilham'],
  ['/images/alt-kat/lower-08.jpeg', 'Deniz manzaralı salon', 'Marinaya karşı oturma'],
  ['/images/alt-kat/lower-09.jpeg', 'Pencere önü', 'Maviye karşı keyif'],
  ['/images/alt-kat/lower-10.jpeg', 'Alt kat manzarası', 'Luluwa Keyf'],
];

const drinkPages = [
  ['ICECEK-01.jpeg', 'Bitki Çayları & Türk Kahveleri'],
  ['ICECEK-02.jpeg', 'Fresh İçecekler & Limonatalar'],
  ['ICECEK-03.jpeg', 'Redbull Kokteyller & Meşrubatlar'],
  ['ICECEK-04.jpeg', 'Soğuk Kahveler & Kokteyller'],
  ['ICECEK-05.jpeg', 'Milkshake & Frappe · Mojito · Frozen'],
  ['ICECEK-06.jpeg', 'Tatlı Çeşitleri'],
];

const featuredMenuPages = [
  ['YEMEK-01.jpeg', 'Hafif Lezzetler & Omlet'],
  ['YEMEK-02.jpeg', 'Tost Çeşitleri'],
  ['YEMEK-03.jpeg', 'Aperatifler'],
  ['YEMEK-04.jpeg', 'Quesadilla & Etli Wraplar'],
  ['YEMEK-05.jpeg', 'Tavuklu Wraplar'],
  ['YEMEK-06.jpeg', 'Tavuklu Sandviç & Çıtır Burger'],
  ['YEMEK-07.jpeg', 'Hamburger Çeşitleri'],
  ['YEMEK-08.jpeg', 'Makarna Çeşitleri'],
  ['YEMEK-09.jpeg', 'Noodle Çeşitleri'],
  ['YEMEK-10.jpeg', 'Pizza Çeşitleri'],
  ['YEMEK-11.jpeg', 'Serpme & Luluwa Keyf Kahvaltı'],
  ['YEMEK-12.jpeg', 'Kırmızı Et Çeşitleri'],
];



function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`} style={{ '--delay': `${delay}s` } as React.CSSProperties}>{children}</div>;
}

export default function Site() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hero, setHero] = useState(0);
  const [featuredLightbox, setFeaturedLightbox] = useState<number | null>(null);
  const [drinkLightbox, setDrinkLightbox] = useState<number | null>(null);
  const [upperLightbox, setUpperLightbox] = useState<number | null>(null);
  const [lowerLightbox, setLowerLightbox] = useState<number | null>(null);
  const [menuQrUrl, setMenuQrUrl] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 30);
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const menuUrl = `${window.location.origin}/#menu`;
    setMenuQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=16&data=${encodeURIComponent(menuUrl)}`);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setHero(v => (v + 1) % 2), 6500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (upperLightbox === null && lowerLightbox === null && featuredLightbox === null && drinkLightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setFeaturedLightbox(null); setDrinkLightbox(null); setUpperLightbox(null); setLowerLightbox(null); }
      if (featuredLightbox !== null) {
        if (event.key === 'ArrowRight') setFeaturedLightbox(v => v === null ? null : (v + 1) % featuredMenuPages.length);
        if (event.key === 'ArrowLeft') setFeaturedLightbox(v => v === null ? null : (v - 1 + featuredMenuPages.length) % featuredMenuPages.length);
      }
      if (drinkLightbox !== null) {
        if (event.key === 'ArrowRight') setDrinkLightbox(v => v === null ? null : (v + 1) % drinkPages.length);
        if (event.key === 'ArrowLeft') setDrinkLightbox(v => v === null ? null : (v - 1 + drinkPages.length) % drinkPages.length);
      }
      if (upperLightbox !== null) {
        if (event.key === 'ArrowRight') setUpperLightbox(v => v === null ? null : (v + 1) % upper.length);
        if (event.key === 'ArrowLeft') setUpperLightbox(v => v === null ? null : (v - 1 + upper.length) % upper.length);
      }
      if (lowerLightbox !== null) {
        if (event.key === 'ArrowRight') setLowerLightbox(v => v === null ? null : (v + 1) % lower.length);
        if (event.key === 'ArrowLeft') setLowerLightbox(v => v === null ? null : (v - 1 + lower.length) % lower.length);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [upperLightbox, lowerLightbox, featuredLightbox, drinkLightbox]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#top" className="brand" onClick={closeMobile}>
          <Image src="/luluwa-logo-clean.png" alt="Luluwa Keyf" width={62} height={62} priority />
        </a>
        <nav className="desktop-nav">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="nav-call" href="tel:+902268130877"><Phone size={15} /><span>Rezervasyon</span><b>0226 813 08 77</b></a>
        <button className="menu-btn" onClick={() => setMobileOpen(v => !v)} aria-label="Menüyü aç/kapat">{mobileOpen ? <X /> : <MenuIcon />}</button>
      </header>
      {mobileOpen && <div className="mobile-menu">
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMobile}>{label}</a>)}
        <a className="mobile-call" href="tel:+902268130877">0226 813 08 77 · Hemen Ara</a>
      </div>}

      <main id="top">
        <section className="hero">
          <div className={`hero-slide ${hero === 0 ? 'show' : ''}`}><Image src="/images/hero-exterior.png" alt="Luluwa Keyf dış cephe" fill priority sizes="100vw" className="hero-img" /></div>
          <div className={`hero-slide ${hero === 1 ? 'show' : ''}`}><Image src="/images/facade.png" alt="Luluwa Keyf restoran" fill sizes="100vw" className="hero-img" /></div>
          <div className="hero-shade" />
          <div className="hero-content">
            <Reveal><p className="eyebrow">YALOVA · DENİZE KARŞI</p><h1>İyi yemek.<br /><em>Güzel sohbet.</em><br />Her zaman keyif.</h1><p className="hero-copy">Marina manzarası, sıcak ahşap dokular ve günün her saatine eşlik eden bir sofra.</p><div className="hero-actions"><a className="btn light" href="#menu">Menüyü keşfet <ArrowDown size={16} /></a><a className="hero-phone" href="tel:+902268130877"><Phone size={15} /> 0226 813 08 77</a></div></Reveal>
          </div>
          <div className="hero-meta"><span>0{hero + 1} / 02</span><span>RÜSTEM PAŞA · YALOVA</span><span>SCROLL ↓</span></div>
          <div className="hero-dots"><button onClick={() => setHero(0)} className={hero === 0 ? 'active' : ''} aria-label="İlk görsel" /><button onClick={() => setHero(1)} className={hero === 1 ? 'active' : ''} aria-label="İkinci görsel" /></div>
        </section>

        <section className="intro section" id="hikaye">
          <Reveal><div className="section-kicker">LULUWA KEYF</div><div className="intro-grid"><div><h2>Manzaradan<br /><em>daha fazlası.</em></h2></div><div><p className="lead">Denizin mavisi, ahşabın sıcaklığı ve iyi bir sofranın etrafında biriken sohbetler.</p><p>Luluwa Keyf, Yalova'da günün ritmine göre değişen bir buluşma noktası. Sabah kahvesinden uzun akşam sofralarına kadar her detay; rahat, doğal ve samimi bir deneyim için düşünüldü.</p></div></div></Reveal>
          <div className="feature-strip"><div><span>01</span><b>Deniz</b><small>Marina manzarası</small></div><div><span>02</span><b>Doğal</b><small>Ahşap & rattan</small></div><div><span>03</span><b>Keyif</b><small>Günün her saati</small></div><div><span>04</span><b>Sohbet</b><small>Uzun sofralar</small></div></div>
        </section>

        <section className="wide-photo"><Image src="/images/facade.png" alt="Luluwa Keyf dış cephe" fill sizes="100vw" /><div className="wide-caption"><span>01</span><h3>Kapıdan içeri girince<br /><em>keyif başlar.</em></h3></div></section>

        <section className="section upper" id="ust-kat">
          <Reveal><div className="section-head"><div><div className="section-kicker">ÜST KAT · 09 FOTOĞRAF</div><h2>Gökyüzü, deniz<br /><em>ve sıcak bir masa.</em></h2></div><p>Üst kattaki gerçek fotoğrafları aynı ölçü ve oran sisteminde düzenledik. Teras, iç mekân, şömine ve terraryum detayları tek bir profesyonel galeri içinde.</p></div></Reveal>
          <div className="upper-grid">{upper.map(([src, title, sub], i) => <Reveal key={src} delay={i * 0.035}><button className="photo-card" onClick={() => setUpperLightbox(i)} aria-label={`${title} fotoğrafını büyüt`}><div className="photo-frame"><Image src={src} alt={`${title} — ${sub}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div><div className="photo-caption"><span>{String(i + 1).padStart(2, '0')}</span><div><b>{title}</b><small>{sub}</small></div></div></button></Reveal>)}</div>
        </section>

        <section className="section lower" id="alt-kat">
          <Reveal><div className="section-head"><div><div className="section-kicker">ALT KAT · 10 FOTOĞRAF</div><h2>Akvaryum, rattan<br /><em>ve marina manzarası.</em></h2></div><p>Alt kattaki yeni gerçek fotoğrafları da aynı 4:5 oranında hazırladık. Giriş, denize karşı oturma alanları, geniş iç mekân, akvaryum barı ve pencere önü manzaraları artık sitede ayrı bir bölüm olarak yer alıyor.</p></div></Reveal>
          <div className="upper-grid">{lower.map(([src, title, sub], i) => <Reveal key={src} delay={i * 0.035}><button className="photo-card" onClick={() => setLowerLightbox(i)} aria-label={`${title} fotoğrafını büyüt`}><div className="photo-frame"><Image src={src} alt={`${title} — ${sub}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div><div className="photo-caption"><span>{String(i + 1).padStart(2, '0')}</span><div><b>{title}</b><small>{sub}</small></div></div></button></Reveal>)}</div>
        </section>

        <section className="quote"><Reveal><span className="quote-mark">“</span><blockquote>Bir masa, güzel bir manzara,<br /><em>biraz da keyif.</em></blockquote><small>LULUWA KEYF · YALOVA</small></Reveal></section>

        <section className="menu section" id="menu">
          <Reveal><div className="section-kicker">MENÜ · YEMEKLER & İÇECEKLER</div><div className="section-head menu-head"><div><h2>Menünün<br /><em>tamamı burada.</em></h2></div><p>Yemekler ve içecekler ayrı klasörler halinde düzenlendi. Bir klasöre dokunduğunda o kategoriye ait tüm menü sayfaları tam ekran açılır; sağ-sol oklarla veya kaydırarak tek tek ilerleyebilirsin.</p></div></Reveal>
          <div className="menu-subhead"><div><span>GÜNCEL MENÜ</span><b>Yemekler ve içecekler</b></div><p>Her kategori kendi klasöründe. Menü sayfaları kesilmeden, yüksek çözünürlükte ve tam ekran görüntülenir.</p></div>
          <div className="menu-folder-grid">
            <Reveal><button className="menu-folder-card" onClick={() => setFeaturedLightbox(0)} aria-label="Yemekler klasörünü aç"><div className="menu-folder-image"><Image src="/images/yemekler/YEMEK-11.jpeg" alt="Luluwa Keyf yemek menüsü — Serpme Kahvaltı" fill sizes="(max-width: 700px) 90vw, 520px" /></div><div className="menu-folder-overlay"><span>12 SAYFA</span><strong>Yemekler</strong><small>Menüyü aç · Tek tek ilerle</small><ArrowRight size={22} /></div></button></Reveal>
            <Reveal delay={0.08}><button className="menu-folder-card" onClick={() => setDrinkLightbox(0)} aria-label="İçecekler klasörünü aç"><div className="menu-folder-image"><Image src="/images/icecekler/ICECEK-01.jpeg" alt="Luluwa Keyf içecek menüsü — Bitki Çayları ve Türk Kahveleri" fill sizes="(max-width: 700px) 90vw, 520px" /></div><div className="menu-folder-overlay"><span>6 SAYFA</span><strong>İçecekler</strong><small>Menüyü aç · Tek tek ilerle</small><ArrowRight size={22} /></div></button></Reveal>
          </div>
        </section>

        <section className="qr-section section" aria-labelledby="qr-title">
          <Reveal>
            <div className="qr-card">
              <div className="qr-copy">
                <div className="section-kicker">TELEFONDAN HEMEN · QR MENÜ</div>
                <h2 id="qr-title">Menüyü<br /><em>telefonunda aç.</em></h2>
                <p>Masada veya girişte bu QR kodu okut. Luluwa Keyf menüsünün yemekler ve içecekler bölümüne doğrudan ulaş.</p>
                <span className="qr-url">LULUWA KEYF · DİJİTAL MENÜ</span>
              </div>
              <div className="qr-code-box">
                {menuQrUrl ? <img src={menuQrUrl} alt="Luluwa Keyf dijital menü QR kodu" /> : <div className="qr-loading">QR</div>}
                <small>KAMERANLA OKUT</small>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section gallery" id="galeri">
          <Reveal><div className="section-head"><div><div className="section-kicker">KAFE GALERİSİ · 19 FOTOĞRAF</div><h2>Luluwa Keyf'i<br /><em>yakından görün.</em></h2></div><p>Kafenin gerçek fotoğraflarını tek tip ölçüde ve temiz bir grid içinde topladık. Böylece sayfada her görsel aynı hizada duruyor; hiçbir fotoğraf ezilmiyor veya farklı boyutta görünmüyor.</p></div></Reveal>
          <div className="cafe-grid">{[...upper, ...lower].map(([src, title, sub], i) => <Reveal key={`gallery-${src}`} delay={(i % 3) * 0.04}><div className="cafe-card"><div className="cafe-frame"><Image src={src} alt={`${title} — ${sub}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div><div><span>{String(i + 1).padStart(2, '0')}</span><b>{title}</b></div></div></Reveal>)}</div>
        </section>

        <section className="contact" id="iletisim"><Image src="/images/upper-01.jpg" alt="Deniz manzarası" fill sizes="100vw" /><div className="contact-overlay" /><div className="contact-content"><Reveal><div className="section-kicker">BİZE ULAŞIN</div><h2>Denize karşı<br /><em>bir masa ayırın.</em></h2><div className="contact-grid"><a href="tel:+902268130877"><small>TELEFON</small><b><Phone size={15} /> 0226 813 08 77</b></a><div><small>ADRES</small><b><MapPin size={15} /> Rüstem Paşa Mah. Mihenk Sk. No:21/1<br />Merkez / Yalova</b></div><div><small>SAATLER</small><b>Her gün<br />08:00 — 01:00</b></div></div><div className="contact-map-wrap">
              <div className="contact-map-head">
                <div><small>HARİTADA KONUM</small><b><MapPin size={15} /> Luluwa Keyf · Rüstem Paşa, Yalova</b></div>
                <a href="https://www.google.com/maps/search/?api=1&query=Luluwa%20Keyf%20R%C3%BCstem%20Pa%C5%9Fa%20Mihenk%20Sk%20No%3A21%2F1%20Yalova" target="_blank" rel="noreferrer">Google Maps'te aç <ArrowRight size={15} /></a>
              </div>
              <div className="contact-map">
                <iframe
                  title="Luluwa Keyf konum haritası"
                  src="https://www.google.com/maps?q=Luluwa%20Keyf%20R%C3%BCstem%20Pa%C5%9Fa%20Mihenk%20Sk%20No%3A21%2F1%20Yalova&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <a className="btn light" href="tel:+902268130877">Hemen ara <ArrowRight size={15} /></a></Reveal></div></section>
      </main>

      <footer>
        <div className="footer-brand"><Image src="/luluwa-logo-clean.png" alt="Luluwa Keyf" width={92} height={92} /></div>
        <div className="footer-center">
          <p>İyi yemek, güzel sohbet,<br />her zaman keyif.</p>
          <div className="social-links" aria-label="Sosyal medya hesapları">
            <a href="https://www.instagram.com/luluwakeyfyalova/" target="_blank" rel="noreferrer" aria-label="Luluwa Keyf Instagram">
              <Instagram size={18} /><span>Instagram</span>
            </a>
            <a href="https://www.facebook.com/luluwakeyfyalova" target="_blank" rel="noreferrer" aria-label="Luluwa Keyf Facebook">
              <Facebook size={18} /><span>Facebook</span>
            </a>
          </div>
        </div>
        <div className="footer-right"><span>© 2026 LULUWA KEYF · YALOVA</span><a href="#top">Yukarı çık ↑</a></div>
      </footer>

      {upperLightbox !== null && <div className="lightbox gallery-lightbox" onClick={() => setUpperLightbox(null)} role="dialog" aria-modal="true" aria-label="Üst kat fotoğrafı">
        <button className="lightbox-close" onClick={() => setUpperLightbox(null)} aria-label="Kapat"><X /></button>
        <button className="lightbox-arrow left" onClick={e => { e.stopPropagation(); setUpperLightbox(v => v === null ? null : (v - 1 + upper.length) % upper.length); }} aria-label="Önceki fotoğraf"><ChevronLeft /></button>
        <div className="lightbox-content upper-lightbox-content" onClick={e => e.stopPropagation()}>
          <div className="lightbox-title"><span>{String(upperLightbox + 1).padStart(2, '0')} / {String(upper.length).padStart(2, '0')}</span><b>{upper[upperLightbox][1]}</b></div>
          <div className="lightbox-image"><Image src={upper[upperLightbox][0]} alt={`${upper[upperLightbox][1]} — ${upper[upperLightbox][2]}`} fill sizes="min(90vw, 760px)" /></div>
        </div>
        <button className="lightbox-arrow right" onClick={e => { e.stopPropagation(); setUpperLightbox(v => v === null ? null : (v + 1) % upper.length); }} aria-label="Sonraki fotoğraf"><ChevronRight /></button>
      </div>}


      {lowerLightbox !== null && <div className="lightbox gallery-lightbox" onClick={() => setLowerLightbox(null)} role="dialog" aria-modal="true" aria-label="Alt kat fotoğrafı">
        <button className="lightbox-close" onClick={() => setLowerLightbox(null)} aria-label="Kapat"><X /></button>
        <button className="lightbox-arrow left" onClick={e => { e.stopPropagation(); setLowerLightbox(v => v === null ? null : (v - 1 + lower.length) % lower.length); }} aria-label="Önceki fotoğraf"><ChevronLeft /></button>
        <div className="lightbox-content upper-lightbox-content" onClick={e => e.stopPropagation()}>
          <div className="lightbox-title"><span>{String(lowerLightbox + 1).padStart(2, '0')} / {String(lower.length).padStart(2, '0')}</span><b>{lower[lowerLightbox][1]}</b></div>
          <div className="lightbox-image"><Image src={lower[lowerLightbox][0]} alt={`${lower[lowerLightbox][1]} — ${lower[lowerLightbox][2]}`} fill sizes="min(90vw, 760px)" /></div>
        </div>
        <button className="lightbox-arrow right" onClick={e => { e.stopPropagation(); setLowerLightbox(v => v === null ? null : (v + 1) % lower.length); }} aria-label="Sonraki fotoğraf"><ChevronRight /></button>
      </div>}

      {drinkLightbox !== null && <div className="lightbox" onClick={() => setDrinkLightbox(null)} role="dialog" aria-modal="true" aria-label="İçecek menüsü">
        <button className="lightbox-close" onClick={() => setDrinkLightbox(null)} aria-label="Kapat"><X /></button>
        <button className="lightbox-arrow left" onClick={e => { e.stopPropagation(); setDrinkLightbox(v => v === null ? null : (v - 1 + drinkPages.length) % drinkPages.length); }} aria-label="Önceki içecek menüsü"><ChevronLeft /></button>
        <div className="lightbox-content" onClick={e => e.stopPropagation()}>
          <div className="lightbox-title"><span>{String(drinkLightbox + 1).padStart(2, '0')} / {String(drinkPages.length).padStart(2, '0')}</span><b>{drinkPages[drinkLightbox][1]}</b></div>
          <div className="lightbox-image"><Image src={`/images/icecekler/${drinkPages[drinkLightbox][0]}`} alt={drinkPages[drinkLightbox][1]} fill sizes="min(90vw, 620px)" /></div>
          <div className="menu-thumbs" aria-label="İçecek menüsü sayfaları">{drinkPages.map(([file, title], i) => <button key={file} className={`menu-thumb ${i === drinkLightbox ? 'active' : ''}`} onClick={() => setDrinkLightbox(i)} aria-label={`${i + 1}. sayfa: ${title}`}><Image src={`/images/icecekler/${file}`} alt="" fill sizes="70px" /></button>)}</div>
        </div>
        <button className="lightbox-arrow right" onClick={e => { e.stopPropagation(); setDrinkLightbox(v => v === null ? null : (v + 1) % drinkPages.length); }} aria-label="Sonraki içecek menüsü"><ChevronRight /></button>
      </div>}

      {featuredLightbox !== null && <div className="lightbox" onClick={() => setFeaturedLightbox(null)} role="dialog" aria-modal="true" aria-label="Yeni yemek menüsü">
        <button className="lightbox-close" onClick={() => setFeaturedLightbox(null)} aria-label="Kapat"><X /></button>
        <button className="lightbox-arrow left" onClick={e => { e.stopPropagation(); setFeaturedLightbox(v => v === null ? null : (v - 1 + featuredMenuPages.length) % featuredMenuPages.length); }} aria-label="Önceki yemek menüsü"><ChevronLeft /></button>
        <div className="lightbox-content" onClick={e => e.stopPropagation()}>
          <div className="lightbox-title"><span>{String(featuredLightbox + 1).padStart(2, '0')} / {String(featuredMenuPages.length).padStart(2, '0')}</span><b>{featuredMenuPages[featuredLightbox][1]}</b></div>
          <div className="lightbox-image"><Image src={`/images/yemekler/${featuredMenuPages[featuredLightbox][0]}`} alt={featuredMenuPages[featuredLightbox][1]} fill sizes="min(90vw, 620px)" /></div>
          <div className="menu-thumbs" aria-label="Yemek menüsü sayfaları">{featuredMenuPages.map(([file, title], i) => <button key={file} className={`menu-thumb ${i === featuredLightbox ? 'active' : ''}`} onClick={() => setFeaturedLightbox(i)} aria-label={`${i + 1}. sayfa: ${title}`}><Image src={`/images/yemekler/${file}`} alt="" fill sizes="70px" /></button>)}</div>
        </div>
        <button className="lightbox-arrow right" onClick={e => { e.stopPropagation(); setFeaturedLightbox(v => v === null ? null : (v + 1) % featuredMenuPages.length); }} aria-label="Sonraki yemek menüsü"><ChevronRight /></button>
      </div>}

    </>
  );
}
