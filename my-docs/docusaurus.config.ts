import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'DarkForest Protocol',
  tagline: 'Manage and redirect AI bot traffic',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://docs.darkforest.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'darkforest', // Usually your GitHub org/user name.
  projectName: 'darkforest-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Set docs as the root
          editUrl: undefined,
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/darkforest-social-card.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'DarkForest Protocol',
      logo: {
        alt: 'DarkForest Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://darkforestprotocol.com/dashboard',
          label: 'Dashboard',
          position: 'right',
        },
        {
          href: 'https://github.com/darkforest/darkforest-protocol',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/darkforest-blocker',
          label: 'NPM',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
            {
              label: 'Getting Started',
              to: '/category/getting-started',
            },
            {
              label: 'Integration Guides',
              to: '/category/integration-guides',
            },
            {
              label: 'Reference',
              to: '/category/reference',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/darkforest',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/darkforest',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/darkforest/darkforest-protocol',
            },
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/package/darkforest-blocker',
            },
            {
              label: 'Dashboard',
              href: 'https://darkforestprotocol.com/dashboard',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DarkForest Protocol. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['nginx', 'bash', 'php', 'ruby', 'java', 'csharp', 'go'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
