import { FaPenNib } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';
import { IoMdMail } from 'react-icons/io';
import type { IconType } from 'react-icons/lib';

export const SITE = {
  title: 'ORIK Blog',
  description: '개발자 오릭의 블로그입니다.',
  domain: import.meta.env.DEV ? 'http://localhost:4321/' : 'https://orik.me/',
  img: '/main.jpg',
  logo: '/logo.png',
  author: {
    name: '오릭',
    email: 'ateals@icloud.com',
    github: 'https://github.com/ATeals'
  },
  HREF: {
    POST: 'posts',
    OG: 'og'
  }
} as const;

export const CONTENT_TYPE = {
  dev: {
    title: '개발',
    description: '개발하면서 느낀 인사이트',
    icon: '👾'
  },
  docs: {
    title: '문서',
    description: '보기 편한 형태로 정리한 유용한 자료',
    icon: '📚'
  },
  snippet: {
    title: '조각',
    description: '짧은 생각, 코드 조각',
    icon: '📦'
  },
  book: {
    title: '독서',
    description: '읽은 책에 대한 인상과 정리',
    icon: '📖'
  },
  life: {
    title: '일상',
    description: '기록하고 싶은 소소한 일상',
    icon: '☕️'
  }
} as const;

export const CONTENT_TYPE_LIST = Object.entries(CONTENT_TYPE).flatMap(([type, value]) => ({
  type: type as CONTENT_TYPE_KEYS,
  ...value
}));

export type CONTENT_TYPE_KEYS = keyof typeof CONTENT_TYPE;

export interface LinkIcon {
  name: string;
  href: string;
  Icon: string | IconType;
}

export const SOCIAL_LINKS: LinkIcon[] = [
  {
    name: 'Blog',
    href: SITE.domain,
    Icon: FaPenNib
  },
  {
    name: 'Github',
    href: 'https://github.com/ATeals',
    Icon: IoLogoGithub
  },
  {
    name: 'Mail',
    href: 'mailto:ateals@icloud.com',
    Icon: IoMdMail
  }
];
