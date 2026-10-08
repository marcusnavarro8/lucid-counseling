// Migrated from the legacy lucidcounselingcenter.com /team profiles, plus the
// 2026 roster update. Powers the /team grid cards and each /team/:slug detail
// page.
//
// Two kinds of people live in this list: clinicians, and the non-clinical
// 'Staff' who run the practice (see `isClinician`). Staff have no specialties,
// languages, or booking button — they get a contact email instead.

export type License =
  | 'Director'
  | 'Licensed'
  | 'Registered Intern'
  | 'Student Intern'
  | 'Staff';

export type Member = {
  slug: string;
  name: string;
  credentials: string;
  role: string;
  license: License;
  focus: string; // short specialty line for the card
  specialties: string[];
  languages: string[];
  bio: string[];
  email?: string; // non-clinical staff are contacted directly, not booked
};

export const TEAM: Member[] = [
  {
    slug: 'paula-navarro',
    name: 'Paula Sarai Navarro',
    credentials: 'LMFT',
    role: 'Director · Licensed Marriage and Family Therapist',
    license: 'Director',
    focus: 'Trauma, relationships & couples',
    specialties: [
      'Anxiety & depression',
      'Relationship counseling & infidelity',
      'Sexual trauma & PTSD',
      'Grief',
    ],
    languages: ['English', 'Spanish'],
    bio: [
      'Paula is a Licensed Marriage and Family Therapist and the director of Lucid Counseling Center, providing therapy in both English and Spanish.',
      'She specializes in helping clients heal from traumatic experiences and relationship challenges, combining empathy and attunement to support their move toward healthier, fuller lives.',
      'Her approaches include talk therapy, EMDR, ART, and emotionally focused couples therapy.',
    ],
  },
  {
    slug: 'marcus-navarro',
    name: 'Marcus Navarro',
    credentials: 'Operations & CEO',
    role: 'Operations & Chief Executive Officer',
    license: 'Staff',
    focus: 'Practice operations & leadership',
    specialties: [],
    languages: [],
    email: 'info@lucidcounselingcenter.com',
    bio: [
      'I had a vision that a family-oriented mental health counseling center — one with care available in languages beyond English — would help clients all over the state of Florida. As I watched my wife, Paula, studying to become a licensed marriage and family therapist, I knew this was a vision we could create together.',
      'I humbly run Lucid Counseling Center, making sure all of our clients’ needs are met with confidentiality and professionalism. It is my pleasure to assist clients across the state of Florida with their mental health.',
    ],
  },
  {
    slug: 'hayde-rodriguez',
    name: 'Hayde Rodriguez',
    credentials: 'Administrator',
    role: 'Administrator',
    license: 'Staff',
    focus: 'Scheduling, billing & client support',
    specialties: [],
    languages: [],
    email: 'hayderodriguez@lucidcounselingcenter.com',
    bio: [
      'Hi! I’m the Administrator at Lucid Counseling Center and am often the first person you’ll connect with when reaching out to our practice. I’m here to provide a welcoming first point of contact, assist with scheduling and billing, answer your questions, and help match you with the counselor who best fits your unique needs.',
      'Since joining Lucid Counseling Center in August 2023, I’ve had the privilege of witnessing meaningful growth — not only within our practice but, more importantly, in the lives of the clients who have trusted us with their care. Seeing individuals take steps toward healing and personal growth has been incredibly rewarding.',
      'I understand that reaching out for counseling can feel overwhelming, and taking that first step isn’t always easy. My goal is to make the process as comfortable and stress-free as possible by providing guidance, support, and compassionate assistance every step of the way.',
      'Whether you’re exploring counseling for the first time or returning to continue your journey, I’m here to help you feel informed, supported, and connected from the very beginning.',
    ],
  },
  {
    slug: 'debbye-lopez',
    name: 'Dr. Debbye Lopéz-Ramos',
    credentials: 'LMFT',
    role: 'Licensed Marriage and Family Therapist',
    license: 'Licensed',
    focus: 'Multicultural & holistic counseling',
    specialties: [
      'Multicultural & inner-city counseling',
      'Emotional & behavioral concerns',
      'Holistic, eclectic modalities',
    ],
    languages: ['English', 'Spanish'],
    bio: [
      'Dr. Lopéz-Ramos is a calm, compassionate therapist who brings a wide range of clinical competencies to her work.',
      'She helps clients discover coping skills and problem-solving strategies within a warm, nonjudgmental environment.',
      'She believes every person has the innate potential to thrive and overcome life’s challenges.',
    ],
  },
  {
    slug: 'alexis-lane',
    name: 'Alexis Lane',
    credentials: 'LMHC',
    role: 'Licensed Mental Health Counselor',
    license: 'Licensed',
    focus: 'Teens, young women & self-esteem',
    specialties: [
      'Depression, anxiety & social anxiety',
      'Self-esteem & communication',
      'PTSD, grief & life transitions',
      'DBT & CBT',
    ],
    languages: ['English'],
    bio: [
      'Alexis brings over six years of clinical experience, primarily in community health settings, and works especially with teenage girls and young women — as well as children, adolescents, and adults.',
      'Naturally optimistic, she aims to instill hope so clients can see the light at the end of the tunnel.',
      'She collaborates closely with each client to build a customized, individualized treatment plan.',
    ],
  },
  {
    slug: 'brittaney-gragg',
    name: 'Brittaney Nicole Gragg',
    credentials: 'Registered Intern Marriage and Family Therapist',
    role: 'Registered Intern Marriage and Family Therapist',
    license: 'Registered Intern',
    focus: 'Parents, children & families',
    specialties: [
      'Marriage & family therapy',
      'Parents, children & families',
      'Trauma recovery',
      'Coping-skill development',
    ],
    languages: ['English'],
    bio: [
      'Brittaney focuses on promoting deeper connection, supporting healing, and building resiliency within families.',
      'She brings over 12 years of experience in non-profit Christian ministry and is completing her master’s in Marriage and Family Therapy through Capella University.',
    ],
  },
  {
    slug: 'alma-rojas',
    name: 'Alma Rojas',
    credentials: 'Registered Intern Marriage and Family Therapist',
    role: 'Registered Intern Marriage and Family Therapist',
    license: 'Registered Intern',
    focus: 'Couples & faith-integrated care',
    specialties: [
      'Couples counseling (Gottman & EFT)',
      'Anxiety & post-traumatic stress',
      'Life transitions',
      'Family conflict',
    ],
    languages: ['English', 'Spanish'],
    bio: [
      'Alma specializes in helping couples address marital challenges through proven clinical approaches and, when welcomed, Biblical principles.',
      'She also supports individuals facing anxiety, trauma, and life transitions, integrating faith with clinical practice and emphasizing the link between emotional healing and spiritual growth.',
    ],
  },
  {
    slug: 'loreley-castro',
    name: 'Loreley Castro',
    credentials: 'Registered Intern Mental Health Counselor',
    role: 'Registered Intern Mental Health Counselor',
    license: 'Registered Intern',
    focus: 'Individuals, children & teens',
    specialties: [
      'Relationship issues & emotional neglect',
      'Anxiety & depression',
      'Coping skills for children & teens',
      'Person-centered approach',
    ],
    languages: ['English', 'Spanish'],
    bio: [
      'Loreley is a bilingual counselor dedicated to providing a supportive, inclusive space for personal transformation.',
      'She uses a person-centered approach to guide clients through self-discovery and healing, helping them build resilience and coping skills for life’s challenges.',
    ],
  },
  {
    slug: 'veronica-cavalcante',
    name: 'Veronica Cavalcante',
    credentials: 'Registered Intern Mental Health Counselor',
    role: 'Registered Intern Mental Health Counselor',
    license: 'Registered Intern',
    focus: 'Relationships & faith-based support',
    specialties: [
      'Relationship issues & couples',
      'Personal struggles',
      'Faith-based counseling',
    ],
    languages: ['English', 'Portuguese'],
    bio: [
      'Veronica draws on her own experiences — including marriage challenges and family loss — to guide clients toward healing with compassion and resilience.',
      'She offers support grounded in Christian faith alongside practical counseling tools developed through years of therapeutic and small-group work.',
    ],
  },
  {
    slug: 'paula-zubieta',
    name: 'Paula Zubieta',
    credentials: 'Registered Intern Mental Health Counselor',
    role: 'Registered Intern Mental Health Counselor',
    license: 'Registered Intern',
    focus: 'Individuals, couples & groups',
    specialties: [
      'Anxiety, depression & trauma',
      'Relationships',
      'Career & life transitions',
      'Workshops & groups',
    ],
    languages: ['English', 'Spanish'],
    bio: [
      'Paula is a compassionate, bilingual counselor who develops and implements treatment plans for individuals, couples, and groups.',
      'She brings a blend of empathy, professionalism, and therapeutic skill, and also facilitates workshops on priority management, parenting, and spiritual growth — all under licensed supervision.',
    ],
  },
  {
    slug: 'lauren-pintar',
    name: 'Lauren Pintar',
    credentials: 'Registered Intern Mental Health Counselor',
    role: 'Registered Intern Mental Health Counselor',
    license: 'Registered Intern',
    focus: 'Teens & adults, trauma & emotions',
    specialties: [
      'Mood & personality disorders',
      'Trauma & EMDR',
      'Expressive arts therapy',
      'Emotional processing',
    ],
    languages: ['English'],
    bio: [
      'Lauren helps teens and adults process intense emotions and heal from trauma through deep emotional exploration, EMDR, and expressive arts.',
      'She offers a person-centered, inclusive space focused on building resilience and breaking harmful patterns.',
    ],
  },
  {
    slug: 'lucy-dergarabedian',
    name: 'Lucy M. Dergarabedian',
    credentials: 'Registered Intern Mental Health Counselor',
    role: 'Registered Intern Mental Health Counselor',
    license: 'Registered Intern',
    focus: 'Children & families, culturally aware',
    specialties: [
      'Child & family counseling',
      'Anxiety, depression & trauma',
      'CBT & creative modalities',
      'Cultural humility',
    ],
    languages: ['English', 'Arabic', 'Armenian'],
    bio: [
      'Lucy supports children and families through emotional and relational challenges, pairing CBT with creative tools like art, music, play, and storytelling.',
      'She emphasizes cultural humility — believing culture shapes how families understand their struggles and define healing — and helps clients reframe difficulties and reclaim their strengths.',
    ],
  },
{
    slug: 'elica-almeida',
    name: 'Elica Almeida',
    credentials: 'Registered Intern Marriage and Family Therapist',
    role: 'Registered Intern Marriage and Family Therapist',
    license: 'Registered Intern',
    focus: 'Couples, families & individuals',
    specialties: [
      'Emotionally Focused Therapy (EFT)',
      'EMDR therapy',
      'Hypnotherapy',
      'Attachment-based counseling', 'Elica specializes in helping couples, families, and individuals strengthen relationships, heal emotional wounds, and build lasting emotional connections.',
      'Her approach is compassionate, culturally sensitive, and grounded in attachment-based and Emotionally Focused Therapy (EFT).',
      'Fluent in Portuguese and English, she brings a unique multicultural perspective to therapy, creating a safe and supportive environment where clients feel heard, understood, and empowered to grow.',
    ],
  },
  {
    slug: 'graziela-silva',
    name: 'Graziela D. Silva',
    credentials: 'Registered Intern Marriage and Family Therapist',
    role: 'Registered Intern Marriage and Family Therapist',
    license: 'Registered Intern',
    focus: 'Trauma, anxiety & faith-based healing',
    specialties: [
      'Trauma-informed care',
      'Anxiety, depression & grief',
      'Emotional pain recovery',
      'Faith-based healing',
    ],
    languages: ['English', 'Portuguese'],
    bio: [
      'Graziela offers a compassionate, faith-based approach to healing for clients experiencing anxiety, sadness, and past trauma.',
      'Drawing on 25 years of marriage and raising two teenagers, she creates supportive spaces for people of diverse backgrounds to process difficult experiences and build resilience.',
    ],
  },
  {
    slug: 'natividad-sanchez',
    name: 'Natividad Sánchez',
    credentials: 'Student Intern Mental Health Counselor',
    role: 'Student Intern Mental Health Counselor',
    license: 'Student Intern',
    focus: 'Foster, adoptive & blended families',
    specialties: [
      'Foster, adoptive & blended families',
      'Attachment, trauma & family transitions',
      'Co-parenting & behavioral concerns',
      'CBT, Solution-Focused, Narrative & IFS',
    ],
    languages: ['English', 'Spanish'],
    bio: [
      'Natividad is a bilingual counselor, in English and Spanish, with a special passion for foster, adoptive, and blended families — families often navigating attachment, trauma, transitions, identity, behavioral concerns, co-parenting, and the work of building healthy relationships within a complex family system.',
      'She believes every family has a unique story and deserves a space where they feel seen, supported, and understood. Her goal is to help children, parents, and caregivers strengthen their connections, improve communication, and develop practical tools to meet life’s challenges with confidence.',
      'Drawing on CBT, Solution-Focused Therapy, Narrative Therapy, and Internal Family Systems within a compassionate, trauma-informed approach — all under licensed supervision — she helps families process difficult experiences, build secure relationships, and create healthier patterns that support healing, stability, and long-term growth.',
    ],
  },
  {
    slug: 'laura-delgado',
    name: 'Laura Delgado',
    credentials: 'Student Intern Mental Health Counselor',
    role: 'Student Intern Mental Health Counselor',
    license: 'Student Intern',
    focus: 'Anxiety, relationships & self-esteem',
    specialties: [
      'Anxiety & emotional stress',
      'Relationship issues & divorce',
      'Self-esteem & personal growth',
      'Life transitions & co-parenting',
    ],
    languages: ['English', 'Spanish'],
    bio: [
      'Laura is bilingual in English and Spanish, and works with individuals navigating anxiety, relationship challenges, emotional stress, life transitions, self-esteem struggles, divorce, co-parenting difficulties, and personal growth.',
      'Many clients come to therapy feeling overwhelmed, emotionally exhausted, or disconnected from themselves after difficult life experiences. She provides a warm, supportive, and nonjudgmental space where clients can process emotions, build healthier coping skills, gain self-awareness, and move toward healing, confidence, and emotional balance.',
      'Reaching out for support can feel overwhelming, especially during a difficult season of life — and no one has to navigate it alone. Laura’s approach is compassionate and person-centered, focused on helping clients feel heard, empowered, and supported throughout their healing journey.',
    ],
  },
  {
    slug: 'jonathan-garcia',
    name: 'Jonathan Garcia',
    credentials: 'Student Intern Marriage and Family Therapist',
    role: 'Student Intern Marriage and Family Therapist',
    license: 'Student Intern',
    focus: 'Couples, families & men’s mental health',
    specialties: [
      'Couples & family systems',
      'Attachment & communication',
      'Anger management & emotion regulation',
      'Parenting & men’s mental health',
    ],
    languages: ['English', 'Spanish'],
    bio: [
      'Jonathan works with couples and families who want to build deeper connection and better communication, drawing on a family systems perspective alongside faith-based principles where they are welcomed.',
      'He helps clients understand their attachment style — anxious, disorganized, or fearful — and move toward secure attachment, and also supports anger management and emotional psychoeducation. He holds a Bachelor’s in Psychology and is working toward a Master’s in Marriage and Family Therapy, focusing on family, adolescents, parenting, and men’s mental health.',
      'As a father, husband, and practicing Christian, he understands the influence of family and social connection, and takes a holistic, collaborative approach to problem-solving that encourages personal growth.',
    ],
  },
  {
    slug: 'stephanie-mojica',
    name: 'Stephanie Mojica',
    credentials: 'Student Intern Mental Health Counselor',
    role: 'Student Intern Mental Health Counselor',
    license: 'Student Intern',
    focus: 'Anxiety, couples & self-beliefs',
    specialties: [
      'Anxiety & negative self-beliefs',
      'Couples communication & connection',
      'CBT & Gottman Method',
      'Faith-integrated counseling, when welcomed',
    ],
    languages: ['English'],
    bio: [
      'Stephanie helps individuals and couples overcome anxiety, relationship challenges, and negative self-beliefs. Using CBT and Gottman Method principles, she supports clients in building healthier thoughts, stronger communication, and deeper connections — and, for those who want it, can integrate faith into counseling.',
      'Taking the first step toward counseling can feel difficult, but no one has to face life’s challenges alone. Working under licensed supervision, Stephanie offers a compassionate, supportive space where clients feel heard, gain insight, and build practical tools for change — and she would be honored to walk alongside anyone ready for healing and growth.',
    ],
  },
  {
    slug: 'tatiana-gerhardt',
    name: 'Tatiana Gerhardt',
    credentials: 'Student Intern Mental Health Counselor',
    role: 'Student Intern Mental Health Counselor',
    license: 'Student Intern',
    focus: 'Career, growth & life transitions',
    specialties: [
      'Career development & workplace stress',
      'Life transitions & personal growth',
      'CBT, Solution-Focused & Mindfulness',
      'Faith-informed counseling',
    ],
    languages: ['English', 'Portuguese', 'Spanish'],
    bio: [
      'Tatiana is a Brazilian counseling intern and Master’s student who brings together clinical training and a business background.',
      'Her compassionate, integrative, and faith-informed approach meets clients where they are, tailoring care to each person and to diverse communities.',
    ],
  },
];

export const getMember = (slug: string) => TEAM.find((m) => m.slug === slug);

// Non-clinical staff aren't booked — they're contacted.
export const isClinician = (m: Member) => m.license !== 'Staff';

// Every member has a headshot (see scripts/fetch-team-photos.mjs). The Avatar
// still shows its monogram underneath while the photo loads.
export const photoFor = (slug: string) => `/media/team/${slug}.jpg`;

// Show each language in its own native form (matches the homepage tags).
export const LANG_NATIVE: Record<string, string> = {
  English: 'English',
  Spanish: 'Español',
  Portuguese: 'Português',
  Arabic: 'العربية',
  Armenian: 'Հայերեն',
};
export const nativeLang = (l: string) => LANG_NATIVE[l] ?? l;

// Initials for the monogram avatar (first + last name).
export const initials = (name: string) => {
  const cleaned = name.replace(/^Dr\.\s+/, '');
  const parts = cleaned.split(' ').filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};
