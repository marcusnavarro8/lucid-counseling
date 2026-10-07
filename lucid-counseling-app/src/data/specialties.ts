// Migrated + restructured from the legacy lucidcounselingcenter.com specialty
// pages. Each entry powers both a card on /services and its detail page at
// /services/:slug. Copy is intentionally concise (short phrases over long
// paragraphs) per the redesign brief.

export type Category =
  | 'Emotional'
  | 'Trauma'
  | 'Relationship'
  | 'Behavioral'
  | 'Other Services';

export type Specialty = {
  slug: string;
  name: string;
  category: Category;
  icon: string; // key resolved by ICONS map in the page components
  blurb: string; // one-line card summary
  tagline: string; // detail-page hero subtext
  definition: string;
  signs: string[];
  help: string[]; // how we help / approaches
  therapy: string; // what therapy looks like
  firstSession: string; // what to expect in the first session
  outcome: string; // results / outcome
};

export const CATEGORIES: { name: Category; icon: string; copy: string }[] = [
  {
    name: 'Emotional',
    icon: 'heart',
    copy: 'Support for the feelings that weigh heaviest — worry, sadness, and loss.',
  },
  {
    name: 'Trauma',
    icon: 'shield',
    copy: 'Gentle, evidence-based care to help you heal from what hurt you.',
  },
  {
    name: 'Relationship',
    icon: 'users',
    copy: 'Reconnect, repair, and grow closer — as a couple or a family.',
  },
  {
    name: 'Behavioral',
    icon: 'compass',
    copy: 'Break unhelpful patterns and build steadier, freer habits.',
  },
  {
    name: 'Other Services',
    icon: 'clipboard',
    copy: 'Evaluations and documentation when you need more than therapy.',
  },
];

export const SPECIALTIES: Specialty[] = [
  /* ---------------- Emotional ---------------- */
  {
    slug: 'anxiety',
    name: 'Anxiety & Stress',
    category: 'Emotional',
    icon: 'wave',
    blurb: 'When worry and tension start running the day.',
    tagline:
      'When stress stops being temporary and becomes a constant companion, therapy can help you find calm again.',
    definition:
      'Anxiety is when stress becomes a lasting part of everyday life — intense, frequent worry or fear that builds quickly and gets in the way of how you want to live, often out of proportion to the actual threat.',
    signs: [
      'Restlessness, tension, or feeling on edge',
      'Racing heart, rapid breathing, or sweating',
      'Constant worry or rumination',
      'Trouble concentrating or sleeping',
      'Fatigue and stomach upset',
      'Avoiding people, places, or situations',
    ],
    help: [
      'Cognitive Behavioral Therapy (CBT)',
      'Person-centered therapy',
      'Relaxation & nervous-system regulation',
      'Accelerated Resolution Therapy (ART) & EMDR',
      'Coordination with prescribers when medication helps',
    ],
    therapy:
      'Together we slow things down — naming what fuels the worry, learning practical tools to settle your body, and gently loosening the patterns that keep anxiety in charge.',
    firstSession:
      'Your first session is a relaxed conversation. We listen to your story, talk through what brought you in, and shape a plan that feels manageable — no pressure to have it all figured out.',
    outcome:
      'Over time, most people feel calmer, sleep better, and move through their day with more confidence and less dread.',
  },
  {
    slug: 'depression',
    name: 'Depression & Mood',
    category: 'Emotional',
    icon: 'cloud',
    blurb: 'More than sadness — a heaviness that lingers.',
    tagline:
      'Depression can make everything feel harder. You don’t have to carry that weight alone.',
    definition:
      'Depression is a shift in the way the brain processes mood and energy. Unlike passing sadness, it lingers — often two weeks or longer — and touches how you think, feel, sleep, and move through life.',
    signs: [
      'Persistent sadness, numbness, or loss of interest',
      'Low motivation and fatigue',
      'Irritability or anger',
      'Changes in sleep or appetite',
      'Guilt, low self-worth, or hopelessness',
      'Trouble concentrating',
    ],
    help: [
      'Processing past and present stressors',
      'Building practical coping strategies',
      'CBT and solution-focused approaches',
      'Strengthening relationships and routines',
      'Coordination with prescribers when helpful',
    ],
    therapy:
      'We focus on the thoughts, feelings, and stressors shaping your mood right now — making space to be honest, and building small, steady changes that lift the fog.',
    firstSession:
      'We start by getting to know you and what you’re going through, at your pace. From there we map out supportive next steps together.',
    outcome:
      'Clients often rediscover motivation, reconnect with the things they care about, and feel more like themselves again.',
  },
  {
    slug: 'grief',
    name: 'Grief & Bereavement',
    category: 'Emotional',
    icon: 'heart',
    blurb: 'Finding your way through loss, at your own pace.',
    tagline:
      'Grief has no timeline. We’ll walk alongside you as you find your footing again.',
    definition:
      'Grief is the response to any kind of loss; bereavement is the grief that follows the death of someone you love. It looks different for everyone and can take months — sometimes years — to move through.',
    signs: [
      'Waves of sadness, anger, guilt, or longing',
      'Despair or feeling emotionally empty',
      'Rumination about the loss',
      'Yearning to reconnect with who or what is gone',
      'Avoiding reminders',
      'Withdrawing from others and the things you enjoyed',
    ],
    help: [
      'A safe space to feel and be heard',
      'Processing the loss and what it means to you',
      'Recognizing and easing depressive symptoms',
      'Building coping strategies and resilience',
    ],
    therapy:
      'Therapy gives your grief room to breathe. We honor what you’ve lost, make sense of the feelings that come with it, and help you carry it in a way you can live with.',
    firstSession:
      'There’s nothing you need to prepare. We simply make space for your story and meet you exactly where you are.',
    outcome:
      'Healing doesn’t mean forgetting. Over time, the weight softens and room returns for connection, meaning, and even joy.',
  },

  /* ---------------- Trauma ---------------- */
  {
    slug: 'ptsd',
    name: 'Trauma & PTSD',
    category: 'Trauma',
    icon: 'shield',
    blurb: 'A psychological injury that, with care, can heal.',
    tagline:
      'Trauma is a psychological injury — and with the right support, it can heal.',
    definition:
      'PTSD is a response to trauma, whether you lived through it, witnessed it, or learned it happened to someone close to you. It’s an injury to the mind — and like any injury, it can heal with the right care.',
    signs: [
      'Unwanted memories, nightmares, or flashbacks',
      'Avoiding reminders of what happened',
      'Negative beliefs about yourself or the world',
      'Emotional numbness or detachment',
      'Irritability, anger, or recklessness',
      'Hypervigilance, startling easily, poor sleep',
    ],
    help: [
      'Accelerated Resolution Therapy (ART)',
      'Eye Movement Desensitization & Reprocessing (EMDR)',
      'Reconsolidation of Traumatic Memories (RTM)',
      'Trauma-Focused Neuro-Linguistic Programming (TF-NLP)',
      'Coordination with prescribers when needed',
    ],
    therapy:
      'Using proven, body-aware approaches like ART and EMDR, we help your nervous system process what happened — so the memories lose their grip and stop running the show.',
    firstSession:
      'We move at the pace of safety. The first session is about building trust and understanding your history — never forcing you to relive anything before you’re ready.',
    outcome:
      'Many clients find the distressing memories soften, sleep returns, and they feel grounded and present in their lives again.',
  },

  /* ---------------- Relationship ---------------- */
  {
    slug: 'couples-counseling',
    name: 'Couples Counseling',
    category: 'Relationship',
    icon: 'users',
    blurb: 'Rebuild trust, communication, and closeness.',
    tagline:
      'Whether you’re rebuilding trust or simply growing closer, you can do it together.',
    definition:
      'Couples counseling is a space to understand each other again — to work through conflict, rebuild trust, and strengthen the connection that brought you together.',
    signs: [
      'Recurring arguments that never resolve',
      'Feeling distant, unheard, or disconnected',
      'Breakdowns in trust or communication',
      'Navigating infidelity or major transitions',
      'Different needs around intimacy or parenting',
    ],
    help: [
      'Emotionally Focused Therapy (EFT)',
      'The Gottman Method',
      'Communication & conflict-repair skills',
      'Rebuilding trust and emotional safety',
      'Faith-integrated options on request',
    ],
    therapy:
      'We help both partners feel heard, slow down the cycles that pull you apart, and practice new ways of connecting — in session and at home.',
    firstSession:
      'The first session is for both of you to share your perspective. We listen to each side and agree together on what you’d like to build.',
    outcome:
      'Couples often leave with calmer conversations, renewed trust, and a stronger sense of being on the same team.',
  },
  {
    slug: 'family-therapy',
    name: 'Family Therapy',
    category: 'Relationship',
    icon: 'home',
    blurb: 'Deeper connection and healing for the whole family.',
    tagline:
      'Stronger families are built on connection, understanding, and support.',
    definition:
      'Family therapy brings parents, children, and loved ones into the same conversation — promoting deeper connection, supporting healing, and building resilience together.',
    signs: [
      'Frequent conflict or tension at home',
      'Parent–child communication breakdowns',
      'Adjusting to divorce, blending, or loss',
      'A child or teen who is struggling',
      'Feeling disconnected as a family',
    ],
    help: [
      'Marriage & Family Therapy approaches',
      'Improving communication and boundaries',
      'Supporting parents and caregivers',
      'Trauma-informed, child-friendly care',
      'Coping skills for the whole family',
    ],
    therapy:
      'We help your family hear each other, ease the friction, and rebuild the warmth — giving everyone a chance to feel understood.',
    firstSession:
      'We’ll talk about what’s happening at home, who’s involved, and what you’d like to be different — then shape a plan that fits your family.',
    outcome:
      'Families often find calmer homes, healthier communication, and stronger, more connected relationships.',
  },

  /* ---------------- Behavioral ---------------- */
  {
    slug: 'ocd',
    name: 'OCD',
    category: 'Behavioral',
    icon: 'compass',
    blurb: 'Loosening the grip of intrusive thoughts and rituals.',
    tagline:
      'When unwanted thoughts and rituals take over, relief is possible.',
    definition:
      'OCD is an anxiety disorder marked by overwhelming, unwanted thoughts (obsessions) and the behaviors or rituals (compulsions) used to ease the stress they cause.',
    signs: [
      'Intrusive, unwanted thoughts',
      'Repetitive rituals or checking',
      'A need for symmetry or perfection',
      'Excessive cleaning or contamination fears',
      'Rituals that take an hour or more a day',
      'Avoiding triggering situations',
    ],
    help: [
      'Evidence-based psychotherapy',
      'Cognitive and exposure-based strategies',
      'Anxiety and stress regulation',
      'Coordination with prescribers when helpful',
      'Early intervention to protect mood and wellbeing',
    ],
    therapy:
      'We help you respond to intrusive thoughts differently — reducing the pull of the rituals so anxiety no longer sets the terms.',
    firstSession:
      'We start by understanding your patterns and what triggers them, then build a step-by-step plan you feel ready for.',
    outcome:
      'Clients often spend far less time caught in rituals and regain a sense of control over their day.',
  },
  {
    slug: 'substance-abuse',
    name: 'Substance Use',
    category: 'Behavioral',
    icon: 'mind',
    blurb: 'A supportive next step toward freedom.',
    tagline:
      'Choosing to change a pattern of use is a brave step toward a healthier, happier life.',
    definition:
      'Substance use takes hold through both physical dependence and patterns the brain learns to repeat. Changing it is a big step — and you don’t have to take it alone.',
    signs: [
      'Using more, or longer, than intended',
      'Cravings and cycles of relapse',
      'Use that strains relationships or work',
      'Difficulty functioning without it',
      'Wanting to stop but feeling stuck',
    ],
    help: [
      'Cognitive Behavioral Therapy (CBT)',
      'Motivational Interviewing',
      'Family Systems therapy',
      'Trauma and reprocessing techniques',
      'Personalized, whole-person treatment plans',
    ],
    therapy:
      'We start by getting to know you and your story — then address the emotional, relational, and environmental factors underneath the use, and build coping strategies that go beyond simply stopping.',
    firstSession:
      'Whether you’re newly in recovery or still navigating daily life, the first session meets you without judgment and focuses on your next step.',
    outcome:
      'With expert guidance and steady support, clients build the tools and confidence to move toward lasting freedom.',
  },
  {
    slug: 'phobias',
    name: 'Phobias',
    category: 'Behavioral',
    icon: 'body',
    blurb: 'Facing specific fears so they stop limiting you.',
    tagline:
      'When a specific fear starts shrinking your world, it can be unlearned.',
    definition:
      'A phobia is ongoing, out-of-proportion fear triggered by a specific object or situation — strong enough to limit daily life and the experiences you say yes to.',
    signs: [
      'Intense fear around a specific trigger',
      'Shakiness, sweating, racing heart, nausea',
      'Shortness of breath or dizziness',
      'Avoiding activities or places',
      'Social withdrawal and missed opportunities',
    ],
    help: [
      'Cognitive Behavioral Therapy (CBT)',
      'Gradual desensitization',
      'Accelerated Resolution Therapy (ART)',
      'Anxiety regulation skills',
    ],
    therapy:
      'Step by step and at your pace, we help your mind and body learn that the trigger is safe — shrinking the fear instead of letting it shrink your life.',
    firstSession:
      'We talk through the fear, how it shows up, and how it affects you — then design a gentle, gradual plan you feel in control of.',
    outcome:
      'Clients often reclaim activities they’d been avoiding and move through the world with far less fear.',
  },

  /* ---------------- Other Services ---------------- */
  {
    slug: 'psychological-evaluation',
    name: 'Psychological Evaluation',
    category: 'Other Services',
    icon: 'clipboard',
    blurb: 'Clarity through thorough, professional assessment.',
    tagline:
      'Sometimes the first step toward the right support is understanding the full picture.',
    definition:
      'A psychological evaluation is a structured assessment that brings clarity — to diagnosis, treatment planning, or documentation you may need for school, work, or care.',
    signs: [
      'Seeking a diagnosis or clarity',
      'Documentation for school or work',
      'Treatment-planning support',
      'A second professional perspective',
    ],
    help: [
      'Structured clinical assessment',
      'Clear, written findings',
      'Recommendations and next steps',
      'Compassionate, professional process',
    ],
    therapy:
      'We guide you through each step of the assessment, explain what we’re looking at, and translate the results into clear, usable next steps.',
    firstSession:
      'We’ll discuss your goals for the evaluation, what it involves, and what you’ll receive at the end.',
    outcome:
      'You leave with clear answers and concrete recommendations you can act on.',
  },
  {
    slug: 'esa-letters',
    name: 'Emotional Support Animal (ESA) Letters',
    category: 'Other Services',
    icon: 'paw',
    blurb: 'Professional ESA assessment and documentation.',
    tagline:
      'When your companion is part of your wellbeing, we can help document it.',
    definition:
      'An Emotional Support Animal letter is professional documentation that your animal provides meaningful support for a mental-health condition, prepared after a proper clinical assessment.',
    signs: [
      'Your animal eases anxiety or depression',
      'You need housing documentation',
      'You want a legitimate, ethical assessment',
    ],
    help: [
      'Clinical assessment of need',
      'Properly prepared documentation',
      'Honest, ethical guidance',
    ],
    therapy:
      'We complete a genuine assessment of how your animal supports your mental health and provide documentation only when it’s clinically appropriate.',
    firstSession:
      'We talk through your situation and explain the assessment process and what documentation can and can’t do.',
    outcome:
      'When appropriate, you receive clear, professionally prepared documentation.',
  },
  {
    slug: 'immigration-evaluations',
    name: 'Immigration Evaluations',
    category: 'Other Services',
    icon: 'globe',
    blurb: 'Psychological evaluations for immigration cases.',
    tagline:
      'Compassionate, thorough psychological evaluations to support your immigration case.',
    definition:
      'An immigration evaluation is a psychological assessment prepared to support legal cases — such as hardship, asylum, or VAWA petitions — documenting the emotional impact of your circumstances.',
    signs: [
      'Your attorney requested an evaluation',
      'Hardship, asylum, or VAWA petitions',
      'Documentation of emotional impact',
      'Care offered in your language',
    ],
    help: [
      'Thorough clinical interview',
      'Detailed written report for your attorney',
      'Multilingual, culturally responsive process',
      'Timely, professional turnaround',
    ],
    therapy:
      'We listen carefully to your story, conduct a thorough evaluation, and prepare a detailed report your attorney can use — in the language you’re most comfortable in.',
    firstSession:
      'We explain the process, coordinate with your attorney’s needs, and make sure you feel supported throughout.',
    outcome:
      'Your attorney receives a clear, professional report to support your case.',
  },
];

export const getSpecialty = (slug: string) =>
  SPECIALTIES.find((s) => s.slug === slug);

// The six headline cards shown in the homepage "How We Help" section.
export const HOME_SERVICE_SLUGS = [
  'anxiety',
  'ptsd',
  'couples-counseling',
  'family-therapy',
  'depression',
  'ocd',
];
