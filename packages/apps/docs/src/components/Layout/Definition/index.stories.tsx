import { Heading2 } from '@/components/Markdown/Heading/Heading2';
import { Paragraph } from '@/components/Markdown/Paragraph/Paragraph';
import type { IPageProps, TagNameType } from '@kadena/docs-tools';
import type { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';
import React from 'react';
import { fullLayoutFrontMatter } from '../__fixtures__/frontmatter';
import { fullLayoutLeftMenuTree } from '../__fixtures__/leftMenuTree';
import { Definition } from './Definition';

const meta: Meta<IPageProps> = {
  title: 'Layout/Definition',
  component: Definition,
};

export default meta;

const props: IPageProps = {
  frontmatter: fullLayoutFrontMatter,
  menuItems: [],
  aSideMenuTree: [],
  topDocs: [],
  leftMenuTree: fullLayoutLeftMenuTree,
};
