import type { Struct, Schema } from '@strapi/strapi';

export interface ComplementaryVideo extends Struct.ComponentSchema {
  collectionName: 'components_complementary_videos';
  info: {
    displayName: 'Video';
    description: '';
  };
  attributes: {
    uploadedVideo: Schema.Attribute.Media<'videos'>;
    externalVideo: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'plugin::video-field.video'>;
    optionalImage: Schema.Attribute.Media<'images'>;
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

export interface ComplementaryMailchimp extends Struct.ComponentSchema {
  collectionName: 'components_complementary_mailchimps';
  info: {
    displayName: 'Mailchimp';
    icon: 'envelope-square';
  };
  attributes: {
    serverPrefix: Schema.Attribute.String;
    apiKey: Schema.Attribute.String;
    listId: Schema.Attribute.String;
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

export interface ComplementaryButton extends Struct.ComponentSchema {
  collectionName: 'components_complementary_buttons';
  info: {
    displayName: 'Button';
    icon: 'bold';
    description: '';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    linkExternal: Schema.Attribute.String;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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

export interface SharedSitemap extends Struct.ComponentSchema {
  collectionName: 'components_shared_sitemaps';
  info: {
    displayName: 'Sitemap';
    icon: 'boxes';
    description: '';
  };
  attributes: {
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    changeFrequency: Schema.Attribute.Enumeration<
      ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
    >;
    priority: Schema.Attribute.Decimal;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
    description: '';
  };
  attributes: {
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    socialNetworks: Schema.Attribute.Component<'shared.social-networks', false>;
    keywords: Schema.Attribute.Text;
    metaRobots: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
    metaViewport: Schema.Attribute.String;
    canonicalURL: Schema.Attribute.String;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    meta: Schema.Attribute.Component<'shared.meta', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedMeta extends Struct.ComponentSchema {
  collectionName: 'components_shared_metas';
  info: {
    displayName: 'Meta';
    icon: 'laptop-medical';
  };
  attributes: {
    name: Schema.Attribute.String;
    content: Schema.Attribute.Text;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'MetaSocial';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SharedGlobalSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_global_seos';
  info: {
    displayName: 'GlobalSeo';
    icon: 'address-card';
    description: '';
  };
  attributes: {
    siteName: Schema.Attribute.String;
    titleSuffix: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    sharingImage: Schema.Attribute.Media<'images'>;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    metaTags: Schema.Attribute.Component<'shared.meta', true>;
  };
}

export interface MenuMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_items';
  info: {
    displayName: 'MenuItem';
    icon: 'angle-right';
    description: '';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    externalUrl: Schema.Attribute.String;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface BlockVideoBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_video_blocks';
  info: {
    displayName: 'Video';
    icon: 'play';
    description: '';
  };
  attributes: {
    video: Schema.Attribute.Component<'complementary.video', false> &
      Schema.Attribute.Required;
  };
}

export interface BlockTemplateBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_template_blocks';
  info: {
    displayName: 'Znovupou\u017Eiteln\u00FD obsah';
    icon: 'rotate';
    description: '';
  };
  attributes: {
    template: Schema.Attribute.Relation<'oneToOne', 'api::template.template'>;
  };
}

export interface BlockContactFormBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_contact_form_blocks';
  info: {
    displayName: 'Kontaktn\u00ED formul\u00E1\u0159';
    icon: 'envelop';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockArticlesListBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_articles_list_blocks';
  info: {
    displayName: 'V\u00FDpis \u010Dl\u00E1nk\u016F';
    icon: 'paintBrush';
    description: '';
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

export interface BlockArticleDetailBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_article_detail_blocks';
  info: {
    displayName: 'Detail \u010Dl\u00E1nku';
    icon: 'paintBrush';
    description: '';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'complementary.video': ComplementaryVideo;
      'complementary.send-email': ComplementarySendEmail;
      'complementary.mailchimp': ComplementaryMailchimp;
      'complementary.ecomail': ComplementaryEcomail;
      'complementary.button': ComplementaryButton;
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
    }
  }
}
