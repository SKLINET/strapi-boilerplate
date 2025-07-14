import type { Schema, Struct } from '@strapi/strapi';

export interface BlockArticleDetailBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_article_detail_blocks';
  info: {
    description: '';
    displayName: 'Detail \u010Dl\u00E1nku';
    icon: 'book';
  };
  attributes: {};
}

export interface BlockArticlesListBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_articles_list_blocks';
  info: {
    description: '';
    displayName: 'V\u00FDpis \u010Dl\u00E1nk\u016F';
    icon: 'book';
  };
  attributes: {
    countOnPage: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
  };
}

export interface BlockFormBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_form_blocks';
  info: {
    displayName: 'Formul\u00E1\u0159';
    icon: 'envelop';
  };
  attributes: {
    form: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::form-builder.built-form'
    >;
    sendEmail: Schema.Attribute.Component<'complementary.send-email', false>;
  };
}

export interface BlockTemplateBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_template_blocks';
  info: {
    description: '';
    displayName: 'Znovupou\u017Eiteln\u00FD obsah';
    icon: 'rotate';
  };
  attributes: {
    template: Schema.Attribute.Relation<'oneToOne', 'api::template.template'>;
  };
}

export interface BlockVideoBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_video_blocks';
  info: {
    description: '';
    displayName: 'Video';
    icon: 'play';
  };
  attributes: {
    video: Schema.Attribute.Component<'complementary.video', false> &
      Schema.Attribute.Required;
  };
}

export interface ComplementaryButton extends Struct.ComponentSchema {
  collectionName: 'components_complementary_buttons';
  info: {
    description: '';
    displayName: 'Button';
    icon: 'bold';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    linkExternal: Schema.Attribute.String;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
  };
}

export interface ComplementaryEcomail extends Struct.ComponentSchema {
  collectionName: 'components_complementary_ecomails';
  info: {
    displayName: 'Ecomail';
    icon: 'envelope';
  };
  attributes: {
    apiKey: Schema.Attribute.String;
    listId: Schema.Attribute.String;
  };
}

export interface ComplementaryMailchimp extends Struct.ComponentSchema {
  collectionName: 'components_complementary_mailchimps';
  info: {
    displayName: 'Mailchimp';
    icon: 'envelope-square';
  };
  attributes: {
    apiKey: Schema.Attribute.String;
    listId: Schema.Attribute.String;
    serverPrefix: Schema.Attribute.String;
  };
}

export interface ComplementarySendEmail extends Struct.ComponentSchema {
  collectionName: 'components_complementary_send_emails';
  info: {
    displayName: 'SendEmail';
  };
  attributes: {
    emailFrom: Schema.Attribute.Email & Schema.Attribute.Required;
    emailTo: Schema.Attribute.Email & Schema.Attribute.Required;
    subject: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComplementaryVideo extends Struct.ComponentSchema {
  collectionName: 'components_complementary_videos';
  info: {
    description: '';
    displayName: 'Video';
  };
  attributes: {
    externalVideo: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'plugin::video-field.video'>;
    optionalImage: Schema.Attribute.Media<'images'>;
    uploadedVideo: Schema.Attribute.Media<'videos'>;
  };
}

export interface MenuMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_items';
  info: {
    description: '';
    displayName: 'MenuItem';
    icon: 'angle-right';
  };
  attributes: {
    externalUrl: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
  };
}

export interface SharedGlobalSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_global_seos';
  info: {
    description: '';
    displayName: 'GlobalSeo';
    icon: 'address-card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    metaTags: Schema.Attribute.Component<'shared.meta', true>;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    sharingImage: Schema.Attribute.Media<'images'>;
    siteName: Schema.Attribute.String;
    titleSuffix: Schema.Attribute.String;
  };
}

export interface SharedMeta extends Struct.ComponentSchema {
  collectionName: 'components_shared_metas';
  info: {
    displayName: 'Meta';
    icon: 'laptop-medical';
  };
  attributes: {
    content: Schema.Attribute.Text;
    name: Schema.Attribute.String;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'MetaSocial';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    meta: Schema.Attribute.Component<'shared.meta', true>;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    socialNetworks: Schema.Attribute.Component<'shared.social-networks', false>;
    structuredData: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SharedSitemap extends Struct.ComponentSchema {
  collectionName: 'components_shared_sitemaps';
  info: {
    description: '';
    displayName: 'Sitemap';
    icon: 'boxes';
  };
  attributes: {
    changeFrequency: Schema.Attribute.Enumeration<
      ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
    >;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    priority: Schema.Attribute.Decimal;
  };
}

export interface SharedSocialNetworks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_networks';
  info: {
    displayName: 'SocialNetworks';
  };
  attributes: {
    facebookMeta: Schema.Attribute.Component<'shared.meta-social', false>;
    twitterMeta: Schema.Attribute.Component<'shared.meta-social', false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'block.article-detail-block': BlockArticleDetailBlock;
      'block.articles-list-block': BlockArticlesListBlock;
      'block.form-block': BlockFormBlock;
      'block.template-block': BlockTemplateBlock;
      'block.video-block': BlockVideoBlock;
      'complementary.button': ComplementaryButton;
      'complementary.ecomail': ComplementaryEcomail;
      'complementary.mailchimp': ComplementaryMailchimp;
      'complementary.send-email': ComplementarySendEmail;
      'complementary.video': ComplementaryVideo;
      'menu.menu-item': MenuMenuItem;
      'shared.global-seo': SharedGlobalSeo;
      'shared.meta': SharedMeta;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'shared.sitemap': SharedSitemap;
      'shared.social-networks': SharedSocialNetworks;
    }
  }
}
