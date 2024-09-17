import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedSocialNetworks extends Schema.Component {
  collectionName: 'components_shared_social_networks';
  info: {
    displayName: 'SocialNetworks';
  };
  attributes: {
    facebookMeta: Attribute.Component<'shared.meta-social'>;
    twitterMeta: Attribute.Component<'shared.meta-social'>;
  };
}

export interface SharedSitemap extends Schema.Component {
  collectionName: 'components_shared_sitemaps';
  info: {
    displayName: 'Sitemap';
    icon: 'boxes';
    description: '';
  };
  attributes: {
    enabled: Attribute.Boolean & Attribute.DefaultTo<true>;
    changeFrequency: Attribute.Enumeration<
      ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
    >;
    priority: Attribute.Decimal;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    socialNetworks: Attribute.Component<'shared.social-networks'>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
    preventIndexing: Attribute.Boolean & Attribute.DefaultTo<false>;
    meta: Attribute.Component<'shared.meta', true>;
    title: Attribute.String;
  };
}

export interface SharedMeta extends Schema.Component {
  collectionName: 'components_shared_metas';
  info: {
    displayName: 'Meta';
    icon: 'laptop-medical';
  };
  attributes: {
    name: Attribute.String;
    content: Attribute.Text;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'MetaSocial';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    image: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface SharedGlobalSeo extends Schema.Component {
  collectionName: 'components_shared_global_seos';
  info: {
    displayName: 'GlobalSeo';
    icon: 'address-card';
    description: '';
  };
  attributes: {
    siteName: Attribute.String;
    titleSuffix: Attribute.String;
    description: Attribute.Text;
    sharingImage: Attribute.Media<'images'>;
    preventIndexing: Attribute.Boolean & Attribute.DefaultTo<false>;
    metaTags: Attribute.Component<'shared.meta', true>;
  };
}

export interface MenuMenuItem extends Schema.Component {
  collectionName: 'components_menu_menu_items';
  info: {
    displayName: 'MenuItem';
    icon: 'angle-right';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    page: Attribute.Relation<'menu.menu-item', 'oneToOne', 'api::page.page'>;
    externalUrl: Attribute.String;
    openInNewTab: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface BlockVideoBlock extends Schema.Component {
  collectionName: 'components_block_video_blocks';
  info: {
    displayName: 'Video';
    icon: 'play';
  };
  attributes: {
    video: Attribute.Component<'complementary.video'> & Attribute.Required;
  };
}

export interface BlockTemplateBlock extends Schema.Component {
  collectionName: 'components_block_template_blocks';
  info: {
    displayName: 'Znovupou\u017Eiteln\u00FD obsah';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    template: Attribute.Relation<
      'block.template-block',
      'oneToOne',
      'api::template.template'
    >;
  };
}

export interface BlockContactFormBlock extends Schema.Component {
  collectionName: 'components_block_contact_form_blocks';
  info: {
    displayName: 'Kontaktn\u00ED formul\u00E1\u0159';
    icon: 'envelop';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

export interface BlockArticlesListBlock extends Schema.Component {
  collectionName: 'components_block_articles_list_blocks';
  info: {
    displayName: 'V\u00FDpis \u010Dl\u00E1nk\u016F';
    icon: 'grid';
    description: '';
  };
  attributes: {
    countOnPage: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<5>;
  };
}

export interface BlockArticleDetailBlock extends Schema.Component {
  collectionName: 'components_block_article_detail_blocks';
  info: {
    displayName: 'Detail \u010Dl\u00E1nku';
    icon: 'layer';
    description: '';
  };
  attributes: {};
}

export interface ComplementaryVideo extends Schema.Component {
  collectionName: 'components_complementary_videos';
  info: {
    displayName: 'Video';
    description: '';
  };
  attributes: {
    uploadedVideo: Attribute.Media<'videos'>;
    externalVideo: Attribute.JSON &
      Attribute.CustomField<'plugin::video-field.video'>;
    optionalImage: Attribute.Media<'images'>;
  };
}

export interface ComplementarySendEmail extends Schema.Component {
  collectionName: 'components_complementary_send_emails';
  info: {
    displayName: 'SendEmail';
  };
  attributes: {
    emailFrom: Attribute.Email & Attribute.Required;
    emailTo: Attribute.Email & Attribute.Required;
    subject: Attribute.String & Attribute.Required;
  };
}

export interface ComplementaryMailchimp extends Schema.Component {
  collectionName: 'components_complementary_mailchimps';
  info: {
    displayName: 'Mailchimp';
    icon: 'envelope-square';
  };
  attributes: {
    serverPrefix: Attribute.String;
    apiKey: Attribute.String;
    listId: Attribute.String;
  };
}

export interface ComplementaryEcomail extends Schema.Component {
  collectionName: 'components_complementary_ecomails';
  info: {
    displayName: 'Ecomail';
    icon: 'envelope';
  };
  attributes: {
    apiKey: Attribute.String;
    listId: Attribute.String;
  };
}

export interface ComplementaryButton extends Schema.Component {
  collectionName: 'components_complementary_buttons';
  info: {
    displayName: 'Button';
    icon: 'bold';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    page: Attribute.Relation<
      'complementary.button',
      'oneToOne',
      'api::page.page'
    >;
    linkExternal: Attribute.String;
    openInNewTab: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.social-networks': SharedSocialNetworks;
      'shared.sitemap': SharedSitemap;
      'shared.seo': SharedSeo;
      'shared.meta': SharedMeta;
      'shared.meta-social': SharedMetaSocial;
      'shared.global-seo': SharedGlobalSeo;
      'menu.menu-item': MenuMenuItem;
      'block.video-block': BlockVideoBlock;
      'block.template-block': BlockTemplateBlock;
      'block.contact-form-block': BlockContactFormBlock;
      'block.articles-list-block': BlockArticlesListBlock;
      'block.article-detail-block': BlockArticleDetailBlock;
      'complementary.video': ComplementaryVideo;
      'complementary.send-email': ComplementarySendEmail;
      'complementary.mailchimp': ComplementaryMailchimp;
      'complementary.ecomail': ComplementaryEcomail;
      'complementary.button': ComplementaryButton;
    }
  }
}
