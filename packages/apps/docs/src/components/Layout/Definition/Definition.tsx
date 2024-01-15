import { BottomPageSection } from '@/components/BottomPageSection/BottomPageSection';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { LastModifiedDate } from '@/components/LastModifiedDate/LastModifiedDate';
import { createSlug } from '@/utils/createSlug';
import type { IPageProps } from '@kadena/docs-tools';
import { Heading } from '@kadena/react-ui';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { baseGridClass } from '../basestyles.css';
import {
  articleClass,
  contentClass,
  contentClassVariants,
} from '../components/articleStyles.css';
import { globalClass } from '../global.css';
import { BackgroundGradient } from './BackgroundGradient';
import { AsideList, ListItem } from './components/Aside';
import {
  asideClass,
  pageGridClass,
  stickyAsideClass,
  stickyAsideWrapperClass,
} from './styles.css';

export const Definition: FC<IPageProps> = ({
  children,
  aSideMenuTree = [],
  frontmatter,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [activeItem, setActiveItem] = useState<string>('');
  const contentClassNames = classnames(
    contentClass,
    contentClassVariants[frontmatter.layout] ?? '',
  );

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    const { isIntersecting } = entry;

    if (isIntersecting) {
      setActiveItem(entry.target.getAttribute('href') ?? '');
    }
  };

  useEffect(() => {
    if (activeItem === null) {
      const [, hash] = router.asPath.split('#');
      const hashPath = hash ? `#${hash}` : '';

      setActiveItem(hashPath);
    }

    if (!scrollRef.current) return;

    const observer = new IntersectionObserver(updateEntry, {
      rootMargin: '20% 0% -65% 0px',
    });

    const headings = scrollRef.current.querySelectorAll(
      'h1 > a, h2 > a, h3 > a, h4 > a, h5 > a, h6 > a',
    );

    Array.from(headings).map((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [activeItem, router.asPath]);

  const showSideMenu: boolean =
    aSideMenuTree.length > 1 || aSideMenuTree[0]?.children.length > 0;

  const gridClassNames = classnames(globalClass, baseGridClass, pageGridClass);

  return (
    <div className={gridClassNames}>
        <div className={contentClassNames} id="maincontent">
          <article className={articleClass} ref={scrollRef}>
           
            {children}
           
          </article>
        </div>
        <BackgroundGradient />
    </div>
  );
};

Definition.displayName = 'Definition';
