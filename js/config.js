/* =====================================================================
   Smart Online Service — site configuration
   ---------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT for prices, services, reviews,
   contact details and coming-soon cards. No build step — save and refresh.

   Rules of thumb:
     • Keep the quotes " " around text and the commas at line ends.
     • Prices are text, so you can write "₹349*" or "₹1,299" freely.
     • `original` is the struck-through price; the "% OFF" pill is worked
       out automatically from original vs price.
   ===================================================================== */
const SITE_CONFIG = {
  /* --- Contact & socials ----------------------------------------------
     `whatsapp` must be the NUMBER in international format with no "+",
     because every "Get this" button opens WhatsApp with a pre-written
     message, and only number links accept pre-written text.
     The vanity link wa.me/smartonlineservicetop is used for the community
     / channel join button below (`whatsappGroupUrl`).                   */
  whatsapp: "917355670856",
  whatsappDisplay: "+91 73556 70856",
  email: "10xdropgrow@gmail.com",              // support / enquiries
  grievanceEmail: "10xdropgrow@gmail.com",     // privacy grievances / breach
  domain: "smartonlineservice.in",
  instagram: "https://www.instagram.com/smartonlineservice.in",

  /* Leave a link empty ("") and its icon simply will not be shown. */
  youtube: "",
  linkedin: "",
  facebook: "",
  twitter: "",
  store: "",

  /* --- WhatsApp community ---------------------------------------------
     Group / channel info → Invite via link. Used by the community page
     and the Coming Soon "Notify me" links.                              */
  whatsappGroupUrl: "https://wa.me/smartonlineservicetop",

  /* --- Free HR contact list (follow-to-unlock) ------------------------
     Paste a "anyone with the link" Google Sheet / OneDrive URL here.
     Until you do, the button opens WhatsApp so nobody hits a dead end.  */
  hrContactsUrl: "https://wa.me/smartonlineservicetop",

  /* --- Google review link (Rate us) -----------------------------------
     Google Business Profile → Ask for reviews → copy link. Leave empty
     until you have one.                                                 */
  googleReviewUrl: "",

  /* --- Hero stats ------------------------------------------------------
     Replace these with your real numbers as they build up.              */
  stats: [
    { value: "₹349",   label: "ATS resume rewrite", sub: "per page" },
    { value: "24–48h", label: "Resume delivery",    sub: "fast turnaround" },
    { value: "66",     label: "Sample templates",   sub: "free to browse" },
    { value: "4",      label: "Profiles covered",   sub: "resume · LinkedIn · Naukri · Indeed" }
  ],

  /* --- Rolling highlights ticker (under the header) -------------------- */
  highlights: [
    "Resume Rewrites", "LinkedIn Makeovers", "Naukri Optimization",
    "Indeed Optimization", "Cover Letters", "ATS Templates"
  ],

  /* --- Reviews ticker (in the Services section) ------------------------ */
  reviews: [
    "“Loved it!” ⭐⭐⭐⭐⭐", "Got 3 interview calls in a week",
    "Finally cleared the ATS bots", "Recruiters started reaching out",
    "Worth every rupee", "My LinkedIn reach blew up",
    "Delivered in under 48 hours", "Naukri profile views doubled"
  ],

  /* --- Landing rolling review tiles ------------------------------------
     avatar: any emoji · linkedin: optional profile URL (shows a chip)
     Replace these with your own clients as reviews come in.             */
  landingReviews: [
    { avatar: "🧑‍💻", text: "Spot-on rewrite. Cleared ATS easily and I started getting shortlists within days.", name: "Rohit S.", role: "Software Engineer" },
    { avatar: "👩‍💼", text: "Clean, recruiter-friendly ATS templates — super easy to edit in Word.", name: "Priya M.", role: "Product Analyst" },
    { avatar: "🧑‍💻", text: "Honest, quick work. My resume finally reflects my real impact and skills.", name: "Vikram T.", role: "Java Developer" },
    { avatar: "👩‍💻", text: "Took the combo — resume plus Naukri and LinkedIn, all done together. Delivered fast and my profile finally reads like one story.", name: "V. Sindhuja", role: "ServiceNow Developer" },
    { avatar: "🧑‍💻", text: "My LinkedIn finally looks professional — reach and recruiter views improved a lot.", name: "Karthik V.", role: "Software Engineer" },
    { avatar: "👩‍💻", text: "The Naukri optimization worked — more profile views and calls in two weeks.", name: "Pooja Nair", role: "Systems Engineer" },
    { avatar: "🧑‍🎓", text: "As a fresher I had no proper resume. They built one from scratch that got me calls.", name: "Aditya Sharma", role: "Fresher · B.Tech" },
    { avatar: "👩‍💼", text: "Resume + Naukri combo got recruiters reaching out to me directly.", name: "Sneha Reddy", role: "Consultant" },
    { avatar: "👷", text: "A professional ATS template that actually fit my field. Worth every rupee.", name: "Anil K.", role: "Civil Engineer" },
    { avatar: "👩‍💻", text: "My empty LinkedIn was made recruiter-ready — started getting connection requests.", name: "Neha Kulkarni", role: "Fresher · Data Analyst" }
  ],

  /* --- Headline service used by the homepage "Rewrite my resume" CTA --- */
  rewriteServiceId: "01",
  rewritePrice: "₹349",
  buildPrice: "₹3999",                    // "Build my resume" service
  buildPriceOriginal: "₹5999",            // struck-through original
  buildOffer: "33% off · limited period",

  /* --- Welcome popup (shows once per visit) ----------------------------
     The logo marquee shows the companies our resumes are written for.
     Once you have real placements you can change the title/sub below to
     say "Our clients got placed at".                                    */
  launchOffer: {
    enabled: true,
    badge: "✦ Built for the roles you want",
    title: "Written for hiring at",
    sub: "Resumes, LinkedIn and Naukri profiles formatted for the screening systems these companies actually use.",
    validTill: ""
  },

  /* --- Paid services (cards on the Services page) ----------------------
     LinkedIn (₹499) and Naukri (₹499) also get their own dedicated
     sections further down services.html — see `linkedinSection` and
     `naukriSection` below.                                              */
  services: [
    { id: "00", title: "Existing Resume Modify", price: "₹299*", original: "₹499", priceNote: "per page · polish what you have",
      feats: ["Update & polish your existing resume", "Fix formatting, keywords & ATS safety", "Layout and section cleanup"],
      whatsappMsg: "Hi! I want the Existing Resume Modify service (₹299 per page)." },

    { id: "01", title: "ATS Resume Rewrite", price: "₹349*", original: "₹699", priceNote: "per page · our main service", featured: true, tagLabel: "MOST POPULAR", bonus: "Free AI job-hunting prompts",
      feats: ["Professionally rewritten content", "Keyword + impact optimization", "Quantified achievement bullets", "Clean, parseable ATS formatting"],
      whatsappMsg: "Hi! I want the ATS Resume Rewrite service (₹349 per page)." },

    { id: "02", title: "Indeed Optimization", price: "₹299", original: "₹499", priceNote: "Indeed profile only",
      feats: ["Complete Indeed profile optimization", "Headline & summary rewrite", "Search-friendly keywords"],
      whatsappMsg: "Hi! I want the Indeed Optimization service (₹299)." },

    { id: "03", title: "Resume + LinkedIn Optimization", price: "₹799", original: "₹1199", priceNote: "combo · best for switchers", bonus: "Free AI job-hunting prompts",
      feats: ["Everything in ATS Resume Rewrite", "LinkedIn profile optimization", "One consistent story across both"],
      whatsappMsg: "Hi! I want Resume + LinkedIn Optimization (₹799)." },

    { id: "04", title: "Resume + Naukri Optimization", price: "₹799", original: "₹1199", priceNote: "combo · best for India roles", bonus: "Free AI job-hunting prompts",
      feats: ["Everything in ATS Resume Rewrite", "Naukri profile optimization", "More recruiter visibility"],
      whatsappMsg: "Hi! I want Resume + Naukri Optimization (₹799)." },

    { id: "05", title: "LinkedIn Optimization", price: "₹499", original: "₹799", priceNote: "LinkedIn profile only", bonus: "Free AI job-hunting prompts",
      feats: ["Complete LinkedIn profile makeover", "Headline, About & keyword optimization", "More recruiter views & reach"],
      whatsappMsg: "Hi! I want the LinkedIn Optimization service (₹499)." },

    { id: "06", title: "Naukri Optimization", price: "₹499", original: "₹799", priceNote: "Naukri profile only", bonus: "Free AI job-hunting prompts",
      feats: ["Complete Naukri profile optimization", "Recruiter-search keywords & headline", "More profile views & calls"],
      whatsappMsg: "Hi! I want the Naukri Optimization service (₹499)." },

    { id: "07", title: "Complete Career Boost", price: "₹1,299", original: "₹2499", priceNote: "everything, one payment", featured: true, tagLabel: "BEST VALUE", flagship: true, bonus: "Free AI job-hunting prompts",
      feats: ["ATS resume rewrite", "LinkedIn profile optimization", "Naukri profile optimization", "Indeed profile optimization", "Custom cover letter", "Delivered in 24–48 hours"],
      whatsappMsg: "Hi! I want the Complete Career Boost pack — resume + LinkedIn + Naukri + Indeed + cover letter (₹1,299)." }
  ],

  /* --- Dedicated LinkedIn section (services.html) ---------------------- */
  linkedinSection: {
    title: "LinkedIn Optimization",
    price: "₹499",
    original: "₹799",
    priceNote: "complete profile",
    headline: "Make the profile recruiters already open actually convert.",
    body: "A strong resume still stalls if LinkedIn looks half-finished. We rewrite the headline, About, experience and featured section so recruiter search puts you in front of the right people — and so the profile holds up once they arrive.",
    feats: [
      "Keyword-rich headline built for recruiter search",
      "An About section that sounds like you, not a template",
      "Experience bullets that match the resume line for line",
      "Banner, featured and skills guidance"
    ],
    whatsappMsg: "Hi! I want the LinkedIn Optimization service (₹499)."
  },

  /* --- Dedicated Naukri section (services.html) ------------------------ */
  naukriSection: {
    title: "Naukri Optimization",
    price: "₹499",
    original: "₹799",
    priceNote: "complete profile",
    headline: "Show up on India's most-used job board for the roles you want.",
    body: "Naukri rewards completeness and the right skill language. We rebuild the profile end to end so recruiters filtering by title, city and notice period actually find you in the list.",
    feats: [
      "Headline and professional summary",
      "Key skills mapped to your target roles",
      "Employment history cleaned and ordered",
      "Notice period and location preferences set correctly"
    ],
    whatsappMsg: "Hi! I want the Naukri Optimization service (₹499)."
  },

  /* --- Service page: Premium tools ------------------------------------- */
  toolsPage: [
    { name: "Canva Pro", note: "Design like a pro — templates, brand kit, magic tools." },
    { name: "ChatGPT Plus", note: "Priority access to the most capable AI models." },
    { name: "Gemini Pro", note: "Google's advanced AI — long context & deep reasoning." },
    { name: "Coursera Plus", note: "Unlimited courses & professional certificates." },
    { name: "Udemy Pro", note: "Top-rated courses across tech, business & design." },
    { name: "LinkedIn Premium", note: "InMail, insights and recruiter visibility." }
    /* add more tools here — they appear automatically */
  ],

  /* --- Service page: Social media services ----------------------------- */
  socialPage: {
    instagram: [
      { name: "Instagram Followers", note: "Real, gradual follower growth." },
      { name: "Instagram Likes", note: "Boost likes on your posts & reels." },
      { name: "Instagram Shares", note: "More shares for wider reach." },
      { name: "Instagram Engagement", note: "Comments, saves & overall engagement." }
    ],
    youtube: [
      { name: "YouTube Shorts Views", note: "Views for your Shorts." },
      { name: "YouTube Video Views", note: "Views for long-form videos." },
      { name: "YouTube Subscribers", note: "Grow your subscriber base." }
    ]
  },

  /* --- Prompt packs / exams / certifications --------------------------- */
  aiPromptPacks: [
    { title: "AI Job-Hunting Prompt Pack", price: "₹19",
      desc: "100+ prompts for resumes, cover letters, interview prep, LinkedIn & cold emails.",
      whatsappMsg: "Hi! I want the AI Job-Hunting Prompt Pack (₹19)." },
    { title: "Thumbnail & Reel-Cover Prompt Pack", price: "₹19",
      desc: "Prompts to create scroll-stopping YouTube thumbnails & reel / cover pages.",
      whatsappMsg: "Hi! I want the Thumbnail & Reel-Cover Prompt Pack (₹19)." },
    { title: "Photo & Poster Design Prompt Pack", price: "₹19*",
      desc: "Prompts for photo editing, poster & graphic design — plus a free website.",
      whatsappMsg: "Hi! I want the Photo & Poster Design Prompt Pack + free website (₹19)." }
  ],
  examPacks: [
    { title: "SSC CGL Pack", price: "₹49*",
      desc: "Study material, a study plan, notes, reference videos & suggested course sites — all included.",
      whatsappMsg: "Hi! I want the SSC CGL exam pack (₹49)." }
  ],
  certifications: [
    { code: "ISO 27001:2022 LA", name: "Lead Auditor", desc: "Roadmap, study materials & guidance to clear the exam." },
    { code: "ISO 27001:2022 LI", name: "Lead Implementer", desc: "Roadmap, study materials & guidance to clear the exam." },
    { code: "CompTIA Security+", name: "SY0-701", desc: "Roadmap, study materials & AI prompt cheat sheets." }
  ],

  /* --- Results page: impact timeline + target companies ---------------- */
  impactTimeline: [
    { when: "Week 1", text: "Interview calls start landing in the inbox." },
    { when: "Week 2–3", text: "2–3 calls a week + recruiters reaching out directly." },
    { when: "Ongoing", text: "LinkedIn profile views & reach climb steadily." }
  ],
  companies: [
    "Deloitte", "PwC", "EY", "KPMG", "Accenture", "Tech Mahindra",
    "TCS", "Infosys", "Wipro", "Deutsche Bank", "Capgemini", "Cognizant"
  ],

  /* --- Samples page (samples.html) -------------------------------------
     Drop a new image in assets/samples/ and add a line here — it appears
     automatically. Every preview is watermarked "Smart Online Service".
       tier : "basic" or "premium" — a label on the tile (prices are
              quoted on WhatsApp)
       tag  : "intl" (🌍 International), "lead" (👑 Leadership), or both  */
  sampleTemplates: [
    { img: "assets/samples/template-01.jpg", name: "ATS · GRC / Security", tier: "basic" },
    { img: "assets/samples/template-02.jpg", name: "ATS · Developer", tier: "premium" },
    { img: "assets/samples/template-03.jpg", name: "Modern · Black & White", tier: "premium" },
    { img: "assets/samples/template-04.jpg", name: "Simple Professional · A4", tier: "basic" },
    { img: "assets/samples/template-05.jpg", name: "Simple Professional", tier: "basic" },
    { img: "assets/samples/template-06.jpg", name: "Standard Professional", tier: "basic" },
    { img: "assets/samples/template-07.jpg", name: "Modern Professional · Gold", tier: "premium" },
    { img: "assets/samples/template-08.jpg", name: "Software Engineer", tier: "premium" },
    { img: "assets/samples/template-09.jpg", name: "Simple CV · Blue", tier: "premium", tag: "intl" },
    { img: "assets/samples/template-10.jpg", name: "Nursing / Healthcare", tier: "basic" },
    { img: "assets/samples/template-11.jpg", name: "Fresh Graduate", tier: "basic" },
    { img: "assets/samples/template-12.jpg", name: "Corporate ATS · Minimalist", tier: "basic" },
    { img: "assets/samples/template-13.jpg", name: "Accountant · Minimalist", tier: "basic" },
    { img: "assets/samples/template-14.jpg", name: "Modern Professional · Navy", tier: "basic" },
    { img: "assets/samples/template-15.jpg", name: "Professional Modern CV", tier: "basic" },
    { img: "assets/samples/template-16.jpg", name: "Accounting Executive CV", tier: "basic" },
    { img: "assets/samples/template-17.jpg", name: "Accountant · Dark Sidebar", tier: "premium" },
    { img: "assets/samples/template-18.jpg", name: "Marketing Manager · Blue", tier: "basic" },
    { img: "assets/samples/template-19.jpg", name: "System Analyst · Classic", tier: "basic" },
    { img: "assets/samples/template-20.jpg", name: "Web Developer · Minimalist", tier: "premium" },
    { img: "assets/samples/template-21.jpg", name: "Governance & Transformation Consultant", tier: "premium", tag: "lead" },
    { img: "assets/samples/template-22.jpg", name: "IT Service Management · SIAM", tier: "premium", tag: "lead" },
    { img: "assets/samples/template-23.jpg", name: "Pharma · Regulatory Affairs", tier: "basic", tag: "intl" },
    { img: "assets/samples/template-24.jpg", name: "Banking Operations Leader", tier: "premium", tag: "lead" },
    { img: "assets/samples/template-25.jpg", name: "Office Support · Non-Tech", tier: "basic" },
    { img: "assets/samples/template-26.jpg", name: "Accounts & Office Admin", tier: "basic" },
    { img: "assets/samples/template-27.jpg", name: "Oil & Gas · Rig Operations", tier: "premium" },
    { img: "assets/samples/template-28.jpg", name: "Backend Engineer · Java", tier: "basic" },
    { img: "assets/samples/template-29.jpg", name: "IT Delivery Leader · Life Sciences", tier: "premium", tag: "intl lead" },
    { img: "assets/samples/template-30.jpg", name: "UX Designer · Modern", tier: "basic" },
    { img: "assets/samples/template-31.jpg", name: "Senior Financial Analyst", tier: "basic" },
    { img: "assets/samples/template-32.jpg", name: "Fraud & Claims · AML / KYC", tier: "premium", tag: "intl" },
    { img: "assets/samples/template-33.jpg", name: "Enterprise Delivery Leader", tier: "premium", tag: "lead" },
    { img: "assets/samples/template-34.jpg", name: "Engineering Executive", tier: "basic" },
    { img: "assets/samples/template-35.jpg", name: "Mechanical Engineer", tier: "premium" },
    { img: "assets/samples/template-36.jpg", name: "Delivery Driver · Australia", tier: "basic", tag: "intl" },
    { img: "assets/samples/template-37.jpg", name: "General Helper · Support Staff", tier: "basic" },
    { img: "assets/samples/template-38.jpg", name: "HR & Recruitment Professional", tier: "basic" },
    { img: "assets/samples/template-39.jpg", name: "Business Admin Undergraduate", tier: "basic" },
    { img: "assets/samples/template-40.jpg", name: "Aspiring Software Developer", tier: "basic" },
    { img: "assets/samples/template-41.jpg", name: "Design Director · Editorial", tier: "basic" },
    { img: "assets/samples/template-42.jpg", name: "Junior Software Engineer", tier: "basic" },
    { img: "assets/samples/template-43.png", name: "Sales & Business Development", tier: "premium", tag: "intl" },
    { img: "assets/samples/template-44.jpg", name: "VP Design & Brand · Executive", tier: "premium", tag: "lead" },
    { img: "assets/samples/template-45.jpg", name: "Operations & Safety Officer", tier: "premium", tag: "intl" },
    { img: "assets/samples/template-46.jpg", name: "Marketing Manager · Green Sidebar", tier: "premium" },
    { img: "assets/samples/template-47.jpg", name: "CEO & Founder · Startup", tier: "basic", tag: "lead" },
    { img: "assets/samples/template-48.jpg", name: "Chief Operating Officer", tier: "premium", tag: "intl lead" },
    { img: "assets/samples/template-49.jpg", name: "Business Admin Graduate · EU", tier: "premium", tag: "intl" },
    { img: "assets/samples/template-50.jpg", name: "Marketing Manager · Maroon Sidebar", tier: "premium" },
    { img: "assets/samples/template-51.jpg", name: "Senior HR Business Partner", tier: "premium", tag: "intl" },
    { img: "assets/samples/template-52.jpg", name: "Marketing Manager · Maroon Banner", tier: "basic" },
    { img: "assets/samples/template-53.jpg", name: "Marketing Manager · Green Classic", tier: "basic" },
    { img: "assets/samples/template-54.jpg", name: "Marketing Manager · Navy Banner", tier: "basic" },
    { img: "assets/samples/template-55.jpg", name: "Marketing Manager · Navy Serif", tier: "basic" },
    { img: "assets/samples/template-56.jpg", name: "Europass-Style CV · Europe", tier: "premium", tag: "intl" },
    { img: "assets/samples/template-57.jpg", name: "Marketing Manager · Blue Sidebar", tier: "basic" },
    { img: "assets/samples/template-58.jpg", name: "UX Designer · Dark Sidebar", tier: "premium" },
    { img: "assets/samples/template-59.jpg", name: "UX Designer · Minimal", tier: "basic" },
    { img: "assets/samples/template-60.jpg", name: "Accounting Executive · Navy", tier: "premium" },
    { img: "assets/samples/template-61.png", name: "Marketing Specialist · Europe", tier: "basic", tag: "intl" },
    { img: "assets/samples/template-62.png", name: "Logistics & Supply Chain · Gulf", tier: "premium", tag: "intl" },
    { img: "assets/samples/template-63.jpg", name: "Head of Sales · Insurance & Banking", tier: "premium" },
    { img: "assets/samples/template-64.jpg", name: "Accountant · Accounts Assistant", tier: "premium", tag: "intl" },
    { img: "assets/samples/template-65.jpg", name: "CTO · AI / ML Engineering", tier: "premium", tag: "intl" },
    { img: "assets/samples/template-66.jpg", name: "Food Safety & Hygiene Officer", tier: "premium", tag: "intl" }
  ],
  sampleReports: [],

  /* --- Coming soon ------------------------------------------------------ */
  comingSoon: [
    { tag: "CC", title: "Corporate Connect", sub: "1:1 with industry mentors",
      desc: "Like AstroTalk, but for your career. Book real conversations with verified industry mentors & SMEs — not generic advice." },
    { tag: "ATS", title: "ATS Resume Checker", sub: "Free · coming soon",
      desc: "A private pre-flight check that flags missing keywords, broken sections and parsing errors before you apply — in testing until the results are accurate enough to stand behind." },
    { tag: "MI", title: "Mock Interview", sub: "Coming soon",
      desc: "Timed, role-specific practice rounds with written feedback on your answers, structure and follow-up questions — so the first real interview is not your first rehearsal." }
  ]
};
