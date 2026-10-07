import type { ComponentType } from 'react';
import {
  IconWave,
  IconCloud,
  IconHeart,
  IconShield,
  IconUsers,
  IconHome,
  IconCompass,
  IconMind,
  IconBody,
  IconClipboard,
  IconPaw,
  IconGlobe,
} from '../icons';

type IconC = ComponentType<{ className?: string }>;

const MAP: Record<string, IconC> = {
  wave: IconWave,
  cloud: IconCloud,
  heart: IconHeart,
  shield: IconShield,
  users: IconUsers,
  home: IconHome,
  compass: IconCompass,
  mind: IconMind,
  body: IconBody,
  clipboard: IconClipboard,
  paw: IconPaw,
  globe: IconGlobe,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const C = MAP[name] ?? IconHeart;
  return <C className={className} />;
}
