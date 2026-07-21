"use client";

import { ChangeEvent, useState } from "react";

const photos = [
  { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85", author: "Maya Wilson", avatar: "MW", title: "The road less travelled", likes: "2.4k", ratio: "tall", tag: "Travel" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85", author: "Noah Kim", avatar: "NK", title: "Into the wild", likes: "1.8k", ratio: "short", tag: "Nature" },
  { src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=900&q=85", author: "Lea Hart", avatar: "LH", title: "Pink horizons", likes: "3.1k", ratio: "tall", tag: "Landscape" },
  { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85", author: "Sofia Lane", avatar: "SL", title: "City bloom", likes: "916", ratio: "medium", tag: "Lifestyle" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85", author: "Alex Davis", avatar: "AD", title: "Sea glass", likes: "2.1k", ratio: "short", tag: "Travel" },
  { src: "https://images.unsplash.com/photo-1519608487953-e999c86e7453?auto=format&fit=crop&w=900&q=85", author: "Ella Brooks", avatar: "EB", title: "After midnight", likes: "1.2k", ratio: "medium", tag: "Nature" },
];

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    camera: <><path d="M4 7h3l1.5-2h7L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13" r="3.5"/></>,
    upload: <><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 20h16"/></>,
    search: <><circle cx="11" cy="11" r="6"/><path d="m20 20-4.2-4.2"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z"/>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    spark: <path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const [category, setCategory] = useState("All photos");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const visible = category === "All photos" ? photos : photos.filter((p) => p.tag === category);
  const pickFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(URL.createObjectURL(file));
  };

  return <main className={dark ? "site dark" : "site"}>
    <nav className="nav wrap">
      <a href="#top" className="brand" aria-label="ShutterSpace home"><span className="brand-mark"><Icon name="camera" size={17}/></span><span>shutter<span>space</span></span></a>
      <div className="nav-links"><a href="#explore">Explore</a><a href="#gallery">Gallery</a><a href="#about">About</a></div>
      <div className="nav-actions"><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme"><Icon name="sun" size={17}/></button><a href="#upload" className="upload-top"><Icon name="upload" size={16}/> Upload</a><span className="user-avatar">JS</span></div>
    </nav>

    <section id="top" className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse"/> The creative space for photographers</div>
        <h1>Capture. Share.<br/><em>Inspire.</em></h1>
        <p>Join a community where every frame finds its audience. Share your perspective and discover the world through new eyes.</p>
        <div className="hero-buttons"><a href="#upload" className="button primary">Start sharing <Icon name="arrow" size={17}/></a><a href="#gallery" className="button secondary">Explore gallery</a></div>
        <div className="trusted"><div className="face-stack"><span>AW</span><span>MK</span><span>SL</span><span>+</span></div><p><strong>12,000+</strong> photographers are sharing<br/>their world on ShutterSpace</p></div>
      </div>
      <div className="hero-art" aria-label="Featured photograph collage">
        <div className="art-sun"/><div className="art-blur"/>
        <div className="feature-shot"><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=90" alt="Mountain ridge at sunset"/><div className="photo-caption"><span className="caption-avatar">MW</span><span><b>Where earth meets sky</b><small>by Maya Wilson</small></span><button aria-label="Like image"><Icon name="heart" size={17}/></button></div></div>
        <div className="floating-card float-one"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=350&q=80" alt="Coastal landscape"/><span>✦ &nbsp; Curated daily</span></div>
        <div className="floating-card float-two"><span className="mini-avatars">JD &nbsp; LH &nbsp; +</span><b>Made for visual stories</b></div>
      </div>
    </section>

    <section id="explore" className="explore wrap"><div className="section-heading"><div><span className="kicker">EXPLORE THE WORLD</span><h2>Find your next <em>inspiration.</em></h2></div><a className="text-link" href="#gallery">View all photos <Icon name="arrow" size={16}/></a></div>
      <div className="category-grid">{[["⌁","Nature","12.4k photos"],["⌒","Architecture","8.2k photos"],["◉","Portrait","9.6k photos"],["◈","Travel","15.8k photos"],["✦","Street","7.1k photos"]].map(([icon,label,count]) => <button key={label} onClick={() => setCategory(label === "Architecture" || label === "Portrait" || label === "Street" ? "All photos" : label)} className="category"><span>{icon}</span><b>{label}</b><small>{count}</small></button>)}</div>
    </section>

    <section id="gallery" className="gallery-section"><div className="wrap"><div className="gallery-head"><div><span className="kicker">COMMUNITY SHOWCASE</span><h2>Fresh from the <em>community.</em></h2></div><div className="filters"><div className="search"><Icon name="search" size={16}/><input aria-label="Search photos" placeholder="Search photos"/></div><button>{category}<Icon name="chevron" size={15}/></button><button>Trending <Icon name="chevron" size={15}/></button></div></div>
      <div className="photo-grid">{visible.map((photo, index) => <article className={`photo-card ${photo.ratio}`} key={photo.title}><img src={photo.src} alt={photo.title}/><div className="photo-gradient"/><div className="photo-top"><span>{photo.tag}</span><button onClick={() => setLiked(liked.includes(index) ? liked.filter((x) => x !== index) : [...liked, index])} className={liked.includes(index) ? "liked" : ""} aria-label={`Like ${photo.title}`}><Icon name="heart" size={17}/></button></div><div className="photo-bottom"><div><b>{photo.title}</b><span><i>{photo.avatar}</i>{photo.author}</span></div><small>♥ {liked.includes(index) ? "Liked" : photo.likes}</small></div></article>)}</div>
      <button className="load-more">Load more photos <Icon name="arrow" size={17}/></button></div></section>

    <section id="upload" className="upload-section wrap"><div className="upload-copy"><span className="kicker">YOUR TURN</span><h2>Share what you<br/><em>see.</em></h2><p>Every image has a story waiting to be told. Let yours be the next one someone discovers.</p><div className="upload-stat"><span><Icon name="spark" size={20}/></span><p><b>Get discovered</b><small>Connect with a global community that cares about your work.</small></p></div></div>
      <div className="upload-card"><div className="upload-card-head"><span>Upload a photo</span><small>JPG, PNG or WEBP · Max 10MB</small></div>{selectedFile ? <div className="preview"><img src={selectedFile} alt="Selected upload preview"/><button onClick={() => setSelectedFile(null)}>Remove</button></div> : <label className="dropzone"><input type="file" accept="image/*" onChange={pickFile}/><span className="upload-icon"><Icon name="upload" size={22}/></span><b>Drop your photo here</b><small>or <u>browse from your computer</u></small></label>}<div className="upload-fields"><input placeholder="Give your photo a title"/><div><input placeholder="Add a short description"/><button onClick={() => setUploaded(true)} className="send-button" aria-label="Upload photo"><Icon name="arrow" size={18}/></button></div></div>{uploaded && <p className="success">✓ Your photo is ready to share!</p>}</div>
    </section>

    <section id="about" className="stats wrap"><div><strong>48k<span>+</span></strong><p>Photos shared</p></div><div><strong>12k<span>+</span></strong><p>Creative minds</p></div><div><strong>2.4m<span>+</span></strong><p>Moments inspired</p></div><div><strong>92<span>%</span></strong><p>Feel more creative</p></div></section>
    <footer className="footer"><div className="wrap footer-inner"><div><a href="#top" className="brand"><span className="brand-mark"><Icon name="camera" size={17}/></span><span>shutter<span>space</span></span></a><p>A place for every perspective.</p></div><div className="footer-links"><a href="#gallery">Discover</a><a href="#upload">Upload</a><a href="#about">About us</a><a href="#top">Privacy</a></div><small>© 2024 ShutterSpace. Made for creators.</small></div></footer>
  </main>;
}
