import { useState } from "react";

const CATEGORIES = [
  { id: "support", label: "Fonctions Support", icon: "settings", color: "#6366F1" },
  { id: "industrie", label: "Industrie", icon: "building-factory-2", color: "#0891B2" },
  { id: "banque", label: "Banque-Assurance", icon: "building-bank", color: "#059669" },
  { id: "informatique", label: "Informatique", icon: "device-desktop", color: "#7C3AED" },
  { id: "commerce", label: "Commerce", icon: "shopping-bag", color: "#D97706" },
  { id: "btp", label: "BTP-Immo", icon: "crane", color: "#DC2626" },
  { id: "it", label: "IT", icon: "server", color: "#DB2777" },
];

const INITIAL_CANDIDATES = [
  { id: 1, name: "Camille Renard", title: "Développeuse Full Stack", city: "Paris", experience: 5, skills: ["React", "Node.js", "PostgreSQL"], available: true, summary: "5 ans d'expérience en développement web, spécialisée en architecture React et API REST.", email: "c.renard@mail.com", avatar: "CR", category: "informatique", cvUrl: null, pitchUrl: null },
  { id: 2, name: "Thomas Mercier", title: "Data Scientist", city: "Lyon", experience: 3, skills: ["Python", "TensorFlow", "SQL"], available: true, summary: "Passionné de machine learning, j'ai contribué à plusieurs projets de NLP et computer vision.", email: "t.mercier@mail.com", avatar: "TM", category: "it", cvUrl: null, pitchUrl: null },
  { id: 3, name: "Sofia El Amrani", title: "UX / Product Designer", city: "Bordeaux", experience: 7, skills: ["Figma", "Design System", "Prototypage"], available: false, summary: "Experte en design centré utilisateur, j'ai travaillé pour des startups et grands groupes.", email: "s.elamrani@mail.com", avatar: "SE", category: "informatique", cvUrl: null, pitchUrl: null },
  { id: 4, name: "Jules Fontaine", title: "DevOps Engineer", city: "Paris", experience: 4, skills: ["Docker", "Kubernetes", "CI/CD"], available: true, summary: "Infrastructure cloud et automatisation de déploiements, certifié AWS et GCP.", email: "j.fontaine@mail.com", avatar: "JF", category: "it", cvUrl: null, pitchUrl: null },
  { id: 5, name: "Inès Marchand", title: "Cheffe de Projet", city: "Nantes", experience: 8, skills: ["Agile", "Jira", "Gestion d'équipe"], available: true, summary: "Pilotage de projets complexes, coordination d'équipes pluridisciplinaires.", email: "i.marchand@mail.com", avatar: "IM", category: "support", cvUrl: null, pitchUrl: null },
  { id: 6, name: "Romain Bouchard", title: "Développeur Mobile", city: "Toulouse", experience: 2, skills: ["Flutter", "Swift", "Firebase"], available: false, summary: "Junior motivé, j'ai déjà publié 3 applications sur l'App Store et le Play Store.", email: "r.bouchard@mail.com", avatar: "RB", category: "informatique", cvUrl: null, pitchUrl: null },
  { id: 7, name: "Léa Dupuis", title: "Conseillère Bancaire", city: "Paris", experience: 6, skills: ["Gestion de portefeuille", "Crédit", "Assurance-vie"], available: true, summary: "Expérience solide en banque de détail, spécialisée en gestion patrimoniale.", email: "l.dupuis@mail.com", avatar: "LD", category: "banque", cvUrl: null, pitchUrl: null },
  { id: 8, name: "Marc Lévêque", title: "Ingénieur Industriel", city: "Strasbourg", experience: 10, skills: ["Lean", "Six Sigma", "Gestion de production"], available: true, summary: "Expert en optimisation de lignes de production dans le secteur automobile.", email: "m.leveque@mail.com", avatar: "ML", category: "industrie", cvUrl: null, pitchUrl: null },
  { id: 9, name: "Anaïs Petit", title: "Responsable Commercial", city: "Bordeaux", experience: 5, skills: ["Négociation", "CRM", "B2B"], available: false, summary: "Développement de portefeuille clients grands comptes, secteur FMCG.", email: "a.petit@mail.com", avatar: "AP", category: "commerce", cvUrl: null, pitchUrl: null },
  { id: 10, name: "Hugo Brun", title: "Conducteur de Travaux", city: "Lyon", experience: 7, skills: ["Gestion chantier", "AutoCAD", "Normes NF"], available: true, summary: "Pilotage de chantiers gros œuvre et second œuvre, jusqu'à 15M€.", email: "h.brun@mail.com", avatar: "HB", category: "btp", cvUrl: null, pitchUrl: null },
  {
    id: 11,
    name: "Franck Borgniet",
    title: "Secrétaire Général | DAF Groupe | DGA Finance & Risques | Chief of Staff",
    city: "Montbonnot-Saint-Martin",
    experience: 23,
    skills: ["Gouvernance", "Finance de groupe", "Transformation", "Strategic PMO", "ERP", "Solvabilité II", "Management transverse", "Contrôle interne"],
    available: true,
    summary: "Mon ADN professionnel, c'est d'être le dirigeant qui relie la stratégie, les moyens et l'exécution. Mon point fort naturel est de prendre de la hauteur : voir l'ensemble du système, changer l'axe d'analyse, challenger les solutions évidentes, puis transformer cette lecture globale en décisions concrètes et en plan d'action.\n\nJe suis particulièrement utile dans une entreprise qui grandit, se transforme ou se réorganise. J'interviens efficacement lorsque les sujets sont imbriqués — financiers, opérationnels, humains, réglementaires, SI ou gouvernance — et qu'il faut remettre de la clarté, du sens et de l'alignement.\n\nConcrètement, je peux prendre en main un pilotage financier, remettre à plat un reporting, structurer un CODIR, animer un Conseil d'Administration, sécuriser un programme d'investissement, fiabiliser un ERP ou un dispositif data, clarifier les responsabilités, piloter une intégration de filiale ou remettre sous contrôle un portefeuille de projets.\n\nJe le démontre par un parcours de Secrétaire Général, DAF Groupe et Directeur Technique et Financier : pilotage de 50 collaborateurs, structuration d'un PMT à 10 ans, sécurisation d'environ 100 M€ d'investissements annuels, gestion de 120 M€ d'actifs financiers, création d'une foncière de 30 M€, intégration de deux filiales, déploiement ERP et redressement d'un résultat de -0,5 M€ à +2 M€ en trois ans.",
    email: "borgniet.franck@ikmail.com",
    avatar: "FB",
    category: "support",
    cvUrl: "/pdfs/Franck_CV_Master.pdf",
    pitchUrl: "/pdfs/Franck_Pitch.pdf",
  },
  {
    id: 12,
    name: "Christine Chastel",
    title: "Directrice Commerciale | Grands Comptes | B2B International",
    city: "Grenoble",
    experience: 25,
    skills: ["Développement commercial B2B", "Grands Comptes", "Négociation", "Marketing international", "Management multiculturel", "RSE", "Salesforce", "ERP"],
    available: true,
    summary: "Mon ADN professionnel, c'est développer des marchés B2B internationaux et transformer des clients stratégiques en partenaires durables. Ce qui me distingue : je perçois naturellement la globalité d'une situation — marchés, organisation, enjeux humains — avant d'agir. Je sais prendre du recul là où d'autres s'enferment dans l'exécution, changer l'axe d'analyse quand une approche ne produit plus de résultats, et challenger les solutions en place sans dogmatisme.\n\nJe suis particulièrement utile quand une entreprise veut accélérer sa croissance internationale, repositionner son approche grands comptes, ou sortir d'une organisation commerciale qui tourne en rond. Je suis également l'interlocutrice idéale pour les entreprises qui cherchent à intégrer une dimension RSE ou éco-conception dans leur offre commerciale.\n\nDès les premiers mois, j'audite le portefeuille clients, j'identifie les leviers de croissance inexploités et je structure un plan d'actions avec des KPIs lisibles. Je n'impose pas, j'aligne. Je donne du sens aux équipes avant de leur donner des objectifs.\n\nJe le démontre par des faits : 30 M€ de CA grands comptes en 2022 avec +35% de précision des prévisions, rentabilité portefeuille doublée chez Rhodia de 8% à 13%, trois ans de certification EcoVadis Platine sur trois continents. Vingt-cinq ans de résultats, zéro poste sans livrables chiffrés.",
    email: "christinechastel@free.fr",
    avatar: "CC",
    category: "commerce",
    cvUrl: "/pdfs/Christine_CV_master.pdf",
    pitchUrl: "/pdfs/Christine_pitch.pdf",
  },
];

const COLORS_MAP = ["#4F46E5", "#0891B2", "#059669", "#D97706", "#DC2626", "#7C3AED", "#DB2777", "#065F46"];
const getAvatarColor = (name) => COLORS_MAP[name.charCodeAt(0) % COLORS_MAP.length];

const matchesSearch = (c, q) => {
  if (!q) return true;
  const s = q.toLowerCase();
  return (
    c.name.toLowerCase().includes(s) ||
    c.title.toLowerCase().includes(s) ||
    c.city.toLowerCase().includes(s) ||
    c.summary.toLowerCase().includes(s) ||
    c.skills.some(sk => sk.toLowerCase().includes(s))
  );
};

function Avatar({ initials, name, size = 44 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: getAvatarColor(name), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: size * 0.3, flexShrink: 0, letterSpacing: 0.5 }}>
      {initials}
    </div>
  );
}

function SkillBadge({ skill }) {
  return (
    <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-secondary)", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>
      {skill}
    </span>
  );
}

function SearchBar({ value, onChange, placeholder, accentColor }) {
  return (
    <div style={{ position: "relative" }}>
      <i className="ti ti-search" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--color-text-tertiary)", pointerEvents: "none" }} aria-hidden="true" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", padding: "10px 36px", borderRadius: 10, fontSize: 14, border: `1px solid ${value ? (accentColor || "#4F46E5") : "var(--color-border-secondary)"}`, background: "var(--color-background-primary)", color: "var(--color-text-primary)", outline: "none", transition: "border-color 0.15s" }}
      />
      {value && (
        <button onClick={() => onChange("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 2, color: "var(--color-text-tertiary)" }}>
          <i className="ti ti-x" style={{ fontSize: 14 }} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function CandidateCard({ c, onClick, catColor }) {
  return (
    <div onClick={() => onClick(c)} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 16, padding: "1.25rem", cursor: "pointer", transition: "border-color 0.15s, box-shadow 0.15s", display: "flex", flexDirection: "column", gap: 12 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = catColor; e.currentTarget.style.boxShadow = `0 0 0 1px ${catColor}22`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-border-tertiary)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar initials={c.avatar} name={c.name} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <p style={{ fontWeight: 500, fontSize: 15, margin: 0, color: "var(--color-text-primary)" }}>{c.name}</p>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.available ? "#10B981" : "#9CA3AF", flexShrink: 0 }} title={c.available ? "Disponible" : "Non disponible"} />
          </div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>{c.title}</p>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.summary}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
          <i className="ti ti-map-pin" style={{ fontSize: 13, verticalAlign: "-2px", marginRight: 3 }} aria-hidden="true" />{c.city}
        </span>
        <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
          <i className="ti ti-briefcase" style={{ fontSize: 13, verticalAlign: "-2px", marginRight: 3 }} aria-hidden="true" />{c.experience} an{c.experience > 1 ? "s" : ""}
        </span>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {c.skills.map(s => <SkillBadge key={s} skill={s} />)}
      </div>
    </div>
  );
}

function Modal({ c, onClose, catColor }) {
  if (!c) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }} onClick={onClose}>
      <div style={{ background: "var(--color-background-primary)", borderRadius: 20, border: `1px solid ${catColor}44`, padding: "2rem", maxWidth: 480, width: "100%", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Avatar initials={c.avatar} name={c.name} size={56} />
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500, color: "var(--color-text-primary)" }}>{c.name}</h2>
              <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>{c.title}</p>
              <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 20, background: c.available ? "#D1FAE5" : "#F3F4F6", color: c.available ? "#065F46" : "#6B7280", marginTop: 6, display: "inline-block" }}>
                {c.available ? "Disponible" : "Non disponible"}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }} aria-label="Fermer">
            <i className="ti ti-x" style={{ fontSize: 20, color: "var(--color-text-secondary)" }} />
          </button>
        </div>
        <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.8 }}>Résumé</p>
            {c.summary.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontSize: 14, color: "var(--color-text-primary)", margin: i === 0 ? 0 : "10px 0 0", lineHeight: 1.7 }}>{para}</p>
            ))}
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <div><p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.8 }}>Ville</p><p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{c.city}</p></div>
            <div><p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.8 }}>Expérience</p><p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{c.experience} an{c.experience > 1 ? "s" : ""}</p></div>
          </div>
          <div>
            <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.8 }}>Compétences</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{c.skills.map(s => <SkillBadge key={s} skill={s} />)}</div>
          </div>
          <div>
            <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.8 }}>Contact</p>
            <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>{c.email}</p>
          </div>
          {(c.cvUrl || c.pitchUrl) && (
            <div>
              <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.8 }}>Documents</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {c.cvUrl && (
                  <a href={c.cvUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: `1px solid ${catColor}55`, background: `${catColor}10`, color: catColor, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                    <i className="ti ti-file-cv" style={{ fontSize: 15 }} aria-hidden="true" />
                    CV complet
                  </a>
                )}
                {c.pitchUrl && (
                  <a href={c.pitchUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: `1px solid ${catColor}55`, background: `${catColor}10`, color: catColor, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                    <i className="ti ti-presentation" style={{ fontSize: 15 }} aria-hidden="true" />
                    Pitch
                  </a>
                )}
              </div>
            </div>
          )}
          <a href={`mailto:${c.email}`} style={{ display: "block", textAlign: "center", padding: "10px 0", borderRadius: 10, background: catColor, color: "#fff", fontWeight: 500, fontSize: 14, textDecoration: "none", marginTop: 4 }}>
            <i className="ti ti-mail" style={{ verticalAlign: "-2px", marginRight: 6 }} aria-hidden="true" />
            Contacter {c.name.split(" ")[0]}
          </a>
        </div>
      </div>
    </div>
  );
}

function DepotForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", title: "", city: "", experience: "", skills: "", email: "", summary: "", available: true, category: "informatique" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.name || !form.title || !form.city || !form.email) return;
    const initials = form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    onAdd({ ...form, id: Date.now(), experience: parseInt(form.experience) || 0, skills: form.skills.split(",").map(s => s.trim()).filter(Boolean), avatar: initials });
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", title: "", city: "", experience: "", skills: "", email: "", summary: "", available: true, category: "informatique" }); }, 3000);
  };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <i className="ti ti-circle-check" style={{ fontSize: 48, color: "#10B981", display: "block", marginBottom: 12 }} aria-hidden="true" />
      <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 8px" }}>CV déposé avec succès !</p>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>Votre profil est maintenant visible par les recruteurs.</p>
    </div>
  );

  const field = (label, key, type = "text", placeholder = "") => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>{label}</label>
      <input type={type} placeholder={placeholder} value={form[key]} onChange={e => set(key, e.target.value)} style={{ borderRadius: 10, padding: "9px 12px", fontSize: 14, background: "var(--color-background-primary)" }} />
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {field("Nom complet *", "name", "text", "ex. Camille Renard")}
        {field("Intitulé du poste *", "title", "text", "ex. Développeuse Full Stack")}
        {field("Ville *", "city", "text", "ex. Paris")}
        {field("Années d'expérience", "experience", "number", "ex. 4")}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>Secteur *</label>
        <select value={form.category} onChange={e => set("category", e.target.value)} style={{ borderRadius: 10, fontSize: 14, padding: "9px 12px" }}>
          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>
      {field("Email de contact *", "email", "email", "ex. vous@mail.com")}
      {field("Compétences (séparées par des virgules)", "skills", "text", "ex. React, Node.js, SQL")}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>Résumé / Présentation</label>
        <textarea value={form.summary} onChange={e => set("summary", e.target.value)} placeholder="Décrivez votre parcours en quelques phrases..." rows={4}
          style={{ borderRadius: 10, padding: "9px 12px", fontSize: 14, resize: "vertical", fontFamily: "inherit", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-secondary)", color: "var(--color-text-primary)" }} />
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, cursor: "pointer", color: "var(--color-text-primary)" }}>
        <input type="checkbox" checked={form.available} onChange={e => set("available", e.target.checked)} />
        Je suis disponible pour de nouvelles opportunités
      </label>
      <button onClick={handleSubmit} style={{ padding: "11px 0", borderRadius: 12, background: "#4F46E5", color: "#fff", fontWeight: 500, fontSize: 15, border: "none", cursor: "pointer", marginTop: 4 }}>
        <i className="ti ti-upload" style={{ verticalAlign: "-2px", marginRight: 6 }} aria-hidden="true" />
        Déposer mon CV
      </button>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("recruiter");
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const addCandidate = (c) => setCandidates(prev => [c, ...prev]);

  const activeCat = CATEGORIES.find(c => c.id === activeCategory);

  // Résultats de recherche globale (page principale, sans catégorie sélectionnée)
  const globalResults = search ? candidates.filter(c => matchesSearch(c, search)) : [];

  // Résultats dans une catégorie (avec filtre de recherche)
  const filtered = activeCategory
    ? candidates.filter(c => c.category === activeCategory && matchesSearch(c, search))
    : [];

  const TabBtn = ({ id, label, icon }) => (
    <button onClick={() => setTab(id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 10, border: tab === id ? "0.5px solid var(--color-border-secondary)" : "0.5px solid transparent", background: tab === id ? "var(--color-background-primary)" : "transparent", color: tab === id ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontWeight: tab === id ? 500 : 400, fontSize: 14, cursor: "pointer", transition: "all 0.15s" }}>
      <i className={`ti ti-${icon}`} style={{ fontSize: 16 }} aria-hidden="true" />
      {label}
    </button>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem 1rem", fontFamily: "var(--font-sans)" }}>
      <h2 className="sr-only">CVthèque — Plateforme de recrutement</h2>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)" }}>
            <i className="ti ti-users" style={{ fontSize: 20, verticalAlign: "-2px", marginRight: 8, color: "#4F46E5" }} aria-hidden="true" />
            CVthèque
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>{candidates.length} profil{candidates.length > 1 ? "s" : ""} dans la base</p>
        </div>
        <div style={{ display: "flex", gap: 4, background: "var(--color-background-secondary)", borderRadius: 12, padding: 4 }}>
          <TabBtn id="recruiter" label="Recruteur" icon="search" />
          <TabBtn id="deposit" label="Déposer un CV" icon="upload" />
        </div>
      </div>

      {tab === "recruiter" && (
        <>
          {!activeCategory ? (
            <div>
              {/* Barre de recherche globale */}
              <div style={{ marginBottom: "1.5rem" }}>
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Rechercher un profil par nom, poste, compétence, ville, bio…"
                  accentColor="#4F46E5"
                />
              </div>

              {/* Résultats de recherche globale */}
              {search ? (
                globalResults.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--color-text-secondary)" }}>
                    <i className="ti ti-mood-sad" style={{ fontSize: 36, display: "block", marginBottom: 12 }} aria-hidden="true" />
                    <p style={{ margin: 0 }}>Aucun profil ne correspond à votre recherche.</p>
                  </div>
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 1rem" }}>
                      {globalResults.length} résultat{globalResults.length > 1 ? "s" : ""} pour « {search} »
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                      {globalResults.map(c => {
                        const cat = CATEGORIES.find(cat => cat.id === c.category);
                        return <CandidateCard key={c.id} c={c} onClick={setSelected} catColor={cat?.color || "#4F46E5"} />;
                      })}
                    </div>
                  </>
                )
              ) : (
                /* Grille des catégories */
                <>
                  <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 1.25rem" }}>Sélectionnez un secteur pour consulter les profils disponibles.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
                    {CATEGORIES.map(cat => {
                      const count = candidates.filter(c => c.category === cat.id).length;
                      return (
                        <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, padding: "1.25rem", borderRadius: 16, border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)", cursor: "pointer", textAlign: "left", transition: "border-color 0.15s, transform 0.1s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-border-tertiary)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                          <div style={{ width: 42, height: 42, borderRadius: 12, background: cat.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <i className={`ti ti-${cat.icon}`} style={{ fontSize: 22, color: cat.color }} aria-hidden="true" />
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>{cat.label}</p>
                            <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--color-text-tertiary)" }}>{count} profil{count !== 1 ? "s" : ""}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Back + category header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem", flexWrap: "wrap" }}>
                <button onClick={() => { setActiveCategory(null); setSearch(""); }}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-secondary)", fontSize: 13, cursor: "pointer" }}>
                  <i className="ti ti-arrow-left" style={{ fontSize: 14 }} aria-hidden="true" />
                  Retour
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: activeCat.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className={`ti ti-${activeCat.icon}`} style={{ fontSize: 18, color: activeCat.color }} aria-hidden="true" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)" }}>{activeCat.label}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-tertiary)" }}>{filtered.length} profil{filtered.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>
              </div>

              {/* Barre de recherche dans la catégorie */}
              <div style={{ marginBottom: "1.5rem" }}>
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Rechercher par nom, poste, compétence, ville, bio…"
                  accentColor={activeCat.color}
                />
              </div>

              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--color-text-secondary)" }}>
                  <i className="ti ti-mood-sad" style={{ fontSize: 36, display: "block", marginBottom: 12 }} aria-hidden="true" />
                  <p style={{ margin: 0 }}>Aucun profil {search ? "ne correspond à votre recherche" : "dans cette catégorie pour le moment"}.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                  {filtered.map(c => <CandidateCard key={c.id} c={c} onClick={setSelected} catColor={activeCat.color} />)}
                </div>
              )}
            </>
          )}
        </>
      )}

      {tab === "deposit" && (
        <div>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)" }}>Déposer votre CV</h2>
            <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>Remplissez le formulaire ci-dessous pour apparaître dans la CVthèque.</p>
          </div>
          <DepotForm onAdd={addCandidate} />
        </div>
      )}

      <Modal c={selected} onClose={() => setSelected(null)} catColor={activeCat?.color || "#4F46E5"} />
    </div>
  );
}
