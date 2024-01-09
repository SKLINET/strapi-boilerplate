-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 09, 2024 at 09:27 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `boilerplate`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_permissions`
--

CREATE TABLE `admin_permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `properties` json DEFAULT NULL,
  `conditions` json DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `action_parameters` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_permissions`
--

INSERT INTO `admin_permissions` (`id`, `action`, `subject`, `properties`, `conditions`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`, `action_parameters`) VALUES
(1, 'plugin::content-manager.explorer.create', 'plugin::block-gallery.block', '{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}', '[]', '2023-08-16 10:30:51.951000', '2023-08-16 10:30:51.951000', NULL, NULL, NULL),
(2, 'plugin::content-manager.explorer.create', 'api::article.article', '{\"fields\": [\"title\", \"image\", \"publishDate\", \"content\", \"slug\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[]', '2023-08-16 10:30:51.956000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(3, 'plugin::content-manager.explorer.create', 'api::icon.icon', '{\"fields\": [\"title\", \"codename\"]}', '[]', '2023-08-16 10:30:51.969000', '2023-08-16 10:30:51.969000', NULL, NULL, NULL),
(4, 'plugin::content-manager.explorer.create', 'api::menu.menu', '{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"]}', '[]', '2023-08-16 10:30:51.971000', '2023-08-16 10:30:51.971000', NULL, NULL, NULL),
(5, 'plugin::content-manager.explorer.create', 'api::message.message', '{\"fields\": [\"name\", \"phone\", \"email\", \"message\"]}', '[]', '2023-08-16 10:30:51.973000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(6, 'plugin::content-manager.explorer.create', 'api::newsletter-subscriber.newsletter-subscriber', '{\"fields\": [\"email\"]}', '[]', '2023-08-16 10:30:51.975000', '2023-08-16 10:30:51.975000', NULL, NULL, NULL),
(7, 'plugin::content-manager.explorer.create', 'api::page.page', '{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[]', '2023-08-16 10:30:51.976000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(8, 'plugin::content-manager.explorer.create', 'api::redirect.redirect', '{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}', '[]', '2023-08-16 10:30:51.977000', '2023-08-16 10:30:51.977000', NULL, NULL, NULL),
(9, 'plugin::content-manager.explorer.create', 'api::system-resource.system-resource', '{\"fields\": [\"name\", \"codename\", \"value\"]}', '[]', '2023-08-16 10:30:51.978000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(10, 'plugin::content-manager.explorer.create', 'api::template.template', '{\"fields\": [\"title\", \"content\"]}', '[]', '2023-08-16 10:30:51.980000', '2023-08-16 10:30:51.980000', NULL, NULL, NULL),
(11, 'plugin::content-manager.explorer.create', 'api::web-setting.web-setting', '{\"fields\": [\"gtmCode\", \"homePage\", \"articleDetailPage\", \"mainMenu\", \"articlesPage\", \"globalSeo.siteName\", \"globalSeo.titleSuffix\", \"globalSeo.description\", \"globalSeo.sharingImage\", \"globalSeo.favicon\", \"globalSeo.preventIndexing\", \"globalSeo.metaTags.name\", \"globalSeo.metaTags.content\"]}', '[]', '2023-08-16 10:30:51.981000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(12, 'plugin::content-manager.explorer.read', 'plugin::block-gallery.block', '{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}', '[]', '2023-08-16 10:30:51.983000', '2023-08-16 10:30:51.983000', NULL, NULL, NULL),
(13, 'plugin::content-manager.explorer.read', 'api::article.article', '{\"fields\": [\"title\", \"image\", \"publishDate\", \"content\", \"slug\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[]', '2023-08-16 10:30:51.984000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(14, 'plugin::content-manager.explorer.read', 'api::icon.icon', '{\"fields\": [\"title\", \"codename\"]}', '[]', '2023-08-16 10:30:51.985000', '2023-08-16 10:30:51.985000', NULL, NULL, NULL),
(15, 'plugin::content-manager.explorer.read', 'api::menu.menu', '{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"]}', '[]', '2023-08-16 10:30:51.987000', '2023-08-16 10:30:51.987000', NULL, NULL, NULL),
(16, 'plugin::content-manager.explorer.read', 'api::message.message', '{\"fields\": [\"name\", \"phone\", \"email\", \"message\"]}', '[]', '2023-08-16 10:30:51.988000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(17, 'plugin::content-manager.explorer.read', 'api::newsletter-subscriber.newsletter-subscriber', '{\"fields\": [\"email\"]}', '[]', '2023-08-16 10:30:51.991000', '2023-08-16 10:30:51.991000', NULL, NULL, NULL),
(18, 'plugin::content-manager.explorer.read', 'api::page.page', '{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[]', '2023-08-16 10:30:51.993000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(19, 'plugin::content-manager.explorer.read', 'api::redirect.redirect', '{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}', '[]', '2023-08-16 10:30:51.995000', '2023-08-16 10:30:51.995000', NULL, NULL, NULL),
(20, 'plugin::content-manager.explorer.read', 'api::system-resource.system-resource', '{\"fields\": [\"name\", \"codename\", \"value\"]}', '[]', '2023-08-16 10:30:51.998000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(21, 'plugin::content-manager.explorer.read', 'api::template.template', '{\"fields\": [\"title\", \"content\"]}', '[]', '2023-08-16 10:30:52.003000', '2023-08-16 10:30:52.003000', NULL, NULL, NULL),
(22, 'plugin::content-manager.explorer.read', 'api::web-setting.web-setting', '{\"fields\": [\"gtmCode\", \"homePage\", \"articleDetailPage\", \"mainMenu\", \"articlesPage\", \"globalSeo.siteName\", \"globalSeo.titleSuffix\", \"globalSeo.description\", \"globalSeo.sharingImage\", \"globalSeo.favicon\", \"globalSeo.preventIndexing\", \"globalSeo.metaTags.name\", \"globalSeo.metaTags.content\"]}', '[]', '2023-08-16 10:30:52.005000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(23, 'plugin::content-manager.explorer.update', 'plugin::block-gallery.block', '{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}', '[]', '2023-08-16 10:30:52.007000', '2023-08-16 10:30:52.007000', NULL, NULL, NULL),
(24, 'plugin::content-manager.explorer.update', 'api::article.article', '{\"fields\": [\"title\", \"image\", \"publishDate\", \"content\", \"slug\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[]', '2023-08-16 10:30:52.009000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(25, 'plugin::content-manager.explorer.update', 'api::icon.icon', '{\"fields\": [\"title\", \"codename\"]}', '[]', '2023-08-16 10:30:52.010000', '2023-08-16 10:30:52.010000', NULL, NULL, NULL),
(26, 'plugin::content-manager.explorer.update', 'api::menu.menu', '{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"]}', '[]', '2023-08-16 10:30:52.012000', '2023-08-16 10:30:52.012000', NULL, NULL, NULL),
(27, 'plugin::content-manager.explorer.update', 'api::message.message', '{\"fields\": [\"name\", \"phone\", \"email\", \"message\"]}', '[]', '2023-08-16 10:30:52.013000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(28, 'plugin::content-manager.explorer.update', 'api::newsletter-subscriber.newsletter-subscriber', '{\"fields\": [\"email\"]}', '[]', '2023-08-16 10:30:52.014000', '2023-08-16 10:30:52.014000', NULL, NULL, NULL),
(29, 'plugin::content-manager.explorer.update', 'api::page.page', '{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[]', '2023-08-16 10:30:52.015000', '2024-01-08 12:02:36.703000', NULL, NULL, NULL),
(30, 'plugin::content-manager.explorer.update', 'api::redirect.redirect', '{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}', '[]', '2023-08-16 10:30:52.017000', '2023-08-16 10:30:52.017000', NULL, NULL, NULL),
(31, 'plugin::content-manager.explorer.update', 'api::system-resource.system-resource', '{\"fields\": [\"name\", \"codename\", \"value\"]}', '[]', '2023-08-16 10:30:52.018000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(32, 'plugin::content-manager.explorer.update', 'api::template.template', '{\"fields\": [\"title\", \"content\"]}', '[]', '2023-08-16 10:30:52.019000', '2023-08-16 10:30:52.019000', NULL, NULL, NULL),
(33, 'plugin::content-manager.explorer.update', 'api::web-setting.web-setting', '{\"fields\": [\"gtmCode\", \"homePage\", \"articleDetailPage\", \"mainMenu\", \"articlesPage\", \"globalSeo.siteName\", \"globalSeo.titleSuffix\", \"globalSeo.description\", \"globalSeo.sharingImage\", \"globalSeo.favicon\", \"globalSeo.preventIndexing\", \"globalSeo.metaTags.name\", \"globalSeo.metaTags.content\"]}', '[]', '2023-08-16 10:30:52.020000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(34, 'plugin::content-manager.explorer.delete', 'plugin::block-gallery.block', '{}', '[]', '2023-08-16 10:30:52.021000', '2023-08-16 10:30:52.021000', NULL, NULL, NULL),
(36, 'plugin::content-manager.explorer.delete', 'api::icon.icon', '{}', '[]', '2023-08-16 10:30:52.023000', '2023-08-16 10:30:52.023000', NULL, NULL, NULL),
(38, 'plugin::content-manager.explorer.delete', 'api::message.message', '{}', '[]', '2023-08-16 10:30:52.026000', '2023-08-16 10:30:52.026000', NULL, NULL, NULL),
(39, 'plugin::content-manager.explorer.delete', 'api::newsletter-subscriber.newsletter-subscriber', '{}', '[]', '2023-08-16 10:30:52.027000', '2023-08-16 10:30:52.027000', NULL, NULL, NULL),
(41, 'plugin::content-manager.explorer.delete', 'api::redirect.redirect', '{}', '[]', '2023-08-16 10:30:52.030000', '2023-08-16 10:30:52.030000', NULL, NULL, NULL),
(51, 'plugin::content-manager.explorer.publish', 'api::redirect.redirect', '{}', '[]', '2023-08-16 10:30:52.042000', '2023-08-16 10:30:52.042000', NULL, NULL, NULL),
(55, 'plugin::upload.read', NULL, '{}', '[]', '2023-08-16 10:30:52.046000', '2023-08-16 10:30:52.046000', NULL, NULL, NULL),
(56, 'plugin::upload.configure-view', NULL, '{}', '[]', '2023-08-16 10:30:52.047000', '2023-08-16 10:30:52.047000', NULL, NULL, NULL),
(57, 'plugin::upload.assets.create', NULL, '{}', '[]', '2023-08-16 10:30:52.048000', '2023-08-16 10:30:52.048000', NULL, NULL, NULL),
(58, 'plugin::upload.assets.update', NULL, '{}', '[]', '2023-08-16 10:30:52.049000', '2023-08-16 10:30:52.049000', NULL, NULL, NULL),
(59, 'plugin::upload.assets.download', NULL, '{}', '[]', '2023-08-16 10:30:52.050000', '2023-08-16 10:30:52.050000', NULL, NULL, NULL),
(60, 'plugin::upload.assets.copy-link', NULL, '{}', '[]', '2023-08-16 10:30:52.051000', '2023-08-16 10:30:52.051000', NULL, NULL, NULL),
(61, 'plugin::content-manager.explorer.create', 'plugin::block-gallery.block', '{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.053000', '2023-08-16 10:30:52.053000', NULL, NULL, NULL),
(62, 'plugin::content-manager.explorer.create', 'api::article.article', '{\"fields\": [\"title\", \"image\", \"publishDate\", \"content\", \"slug\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.054000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(63, 'plugin::content-manager.explorer.create', 'api::icon.icon', '{\"fields\": [\"title\", \"codename\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.056000', '2023-08-16 10:30:52.056000', NULL, NULL, NULL),
(64, 'plugin::content-manager.explorer.create', 'api::menu.menu', '{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.057000', '2023-08-16 10:30:52.057000', NULL, NULL, NULL),
(65, 'plugin::content-manager.explorer.create', 'api::message.message', '{\"fields\": [\"name\", \"phone\", \"email\", \"message\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.058000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(66, 'plugin::content-manager.explorer.create', 'api::newsletter-subscriber.newsletter-subscriber', '{\"fields\": [\"email\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.059000', '2023-08-16 10:30:52.059000', NULL, NULL, NULL),
(67, 'plugin::content-manager.explorer.create', 'api::page.page', '{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.060000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(68, 'plugin::content-manager.explorer.create', 'api::redirect.redirect', '{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.061000', '2023-08-16 10:30:52.061000', NULL, NULL, NULL),
(69, 'plugin::content-manager.explorer.create', 'api::system-resource.system-resource', '{\"fields\": [\"name\", \"codename\", \"value\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.062000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(70, 'plugin::content-manager.explorer.create', 'api::template.template', '{\"fields\": [\"title\", \"content\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.063000', '2023-08-16 10:30:52.063000', NULL, NULL, NULL),
(71, 'plugin::content-manager.explorer.create', 'api::web-setting.web-setting', '{\"fields\": [\"gtmCode\", \"homePage\", \"articleDetailPage\", \"mainMenu\", \"articlesPage\", \"globalSeo.siteName\", \"globalSeo.titleSuffix\", \"globalSeo.description\", \"globalSeo.sharingImage\", \"globalSeo.favicon\", \"globalSeo.preventIndexing\", \"globalSeo.metaTags.name\", \"globalSeo.metaTags.content\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.064000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(72, 'plugin::content-manager.explorer.read', 'plugin::block-gallery.block', '{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.065000', '2023-08-16 10:30:52.065000', NULL, NULL, NULL),
(73, 'plugin::content-manager.explorer.read', 'api::article.article', '{\"fields\": [\"title\", \"image\", \"publishDate\", \"content\", \"slug\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.066000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(74, 'plugin::content-manager.explorer.read', 'api::icon.icon', '{\"fields\": [\"title\", \"codename\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.068000', '2023-08-16 10:30:52.068000', NULL, NULL, NULL),
(75, 'plugin::content-manager.explorer.read', 'api::menu.menu', '{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.068000', '2023-08-16 10:30:52.068000', NULL, NULL, NULL),
(76, 'plugin::content-manager.explorer.read', 'api::message.message', '{\"fields\": [\"name\", \"phone\", \"email\", \"message\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.070000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(77, 'plugin::content-manager.explorer.read', 'api::newsletter-subscriber.newsletter-subscriber', '{\"fields\": [\"email\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.071000', '2023-08-16 10:30:52.071000', NULL, NULL, NULL),
(78, 'plugin::content-manager.explorer.read', 'api::page.page', '{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.072000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(79, 'plugin::content-manager.explorer.read', 'api::redirect.redirect', '{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.074000', '2023-08-16 10:30:52.074000', NULL, NULL, NULL),
(80, 'plugin::content-manager.explorer.read', 'api::system-resource.system-resource', '{\"fields\": [\"name\", \"codename\", \"value\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.076000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(81, 'plugin::content-manager.explorer.read', 'api::template.template', '{\"fields\": [\"title\", \"content\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.077000', '2023-08-16 10:30:52.077000', NULL, NULL, NULL),
(82, 'plugin::content-manager.explorer.read', 'api::web-setting.web-setting', '{\"fields\": [\"gtmCode\", \"homePage\", \"articleDetailPage\", \"mainMenu\", \"articlesPage\", \"globalSeo.siteName\", \"globalSeo.titleSuffix\", \"globalSeo.description\", \"globalSeo.sharingImage\", \"globalSeo.favicon\", \"globalSeo.preventIndexing\", \"globalSeo.metaTags.name\", \"globalSeo.metaTags.content\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.078000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(83, 'plugin::content-manager.explorer.update', 'plugin::block-gallery.block', '{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.079000', '2023-08-16 10:30:52.079000', NULL, NULL, NULL),
(84, 'plugin::content-manager.explorer.update', 'api::article.article', '{\"fields\": [\"title\", \"image\", \"publishDate\", \"content\", \"slug\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.080000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(85, 'plugin::content-manager.explorer.update', 'api::icon.icon', '{\"fields\": [\"title\", \"codename\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.081000', '2023-08-16 10:30:52.081000', NULL, NULL, NULL),
(86, 'plugin::content-manager.explorer.update', 'api::menu.menu', '{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.083000', '2023-08-16 10:30:52.083000', NULL, NULL, NULL),
(87, 'plugin::content-manager.explorer.update', 'api::message.message', '{\"fields\": [\"name\", \"phone\", \"email\", \"message\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.084000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(88, 'plugin::content-manager.explorer.update', 'api::newsletter-subscriber.newsletter-subscriber', '{\"fields\": [\"email\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.085000', '2023-08-16 10:30:52.085000', NULL, NULL, NULL),
(89, 'plugin::content-manager.explorer.update', 'api::page.page', '{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.086000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(90, 'plugin::content-manager.explorer.update', 'api::redirect.redirect', '{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.087000', '2023-08-16 10:30:52.087000', NULL, NULL, NULL),
(91, 'plugin::content-manager.explorer.update', 'api::system-resource.system-resource', '{\"fields\": [\"name\", \"codename\", \"value\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.088000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(92, 'plugin::content-manager.explorer.update', 'api::template.template', '{\"fields\": [\"title\", \"content\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.089000', '2023-08-16 10:30:52.089000', NULL, NULL, NULL),
(93, 'plugin::content-manager.explorer.update', 'api::web-setting.web-setting', '{\"fields\": [\"gtmCode\", \"homePage\", \"articleDetailPage\", \"mainMenu\", \"articlesPage\", \"globalSeo.siteName\", \"globalSeo.titleSuffix\", \"globalSeo.description\", \"globalSeo.sharingImage\", \"globalSeo.favicon\", \"globalSeo.preventIndexing\", \"globalSeo.metaTags.name\", \"globalSeo.metaTags.content\"]}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.090000', '2024-01-08 12:02:36.704000', NULL, NULL, NULL),
(94, 'plugin::content-manager.explorer.delete', 'plugin::block-gallery.block', '{}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.091000', '2023-08-16 10:30:52.091000', NULL, NULL, NULL),
(96, 'plugin::content-manager.explorer.delete', 'api::icon.icon', '{}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.094000', '2023-08-16 10:30:52.094000', NULL, NULL, NULL),
(98, 'plugin::content-manager.explorer.delete', 'api::message.message', '{}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.096000', '2023-08-16 10:30:52.096000', NULL, NULL, NULL),
(99, 'plugin::content-manager.explorer.delete', 'api::newsletter-subscriber.newsletter-subscriber', '{}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.097000', '2023-08-16 10:30:52.097000', NULL, NULL, NULL),
(101, 'plugin::content-manager.explorer.delete', 'api::redirect.redirect', '{}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.099000', '2023-08-16 10:30:52.099000', NULL, NULL, NULL),
(105, 'plugin::upload.read', NULL, '{}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.104000', '2023-08-16 10:30:52.104000', NULL, NULL, NULL),
(106, 'plugin::upload.configure-view', NULL, '{}', '[]', '2023-08-16 10:30:52.105000', '2023-08-16 10:30:52.105000', NULL, NULL, NULL),
(107, 'plugin::upload.assets.create', NULL, '{}', '[]', '2023-08-16 10:30:52.106000', '2023-08-16 10:30:52.106000', NULL, NULL, NULL),
(108, 'plugin::upload.assets.update', NULL, '{}', '[\"admin::is-creator\"]', '2023-08-16 10:30:52.107000', '2023-08-16 10:30:52.107000', NULL, NULL, NULL),
(109, 'plugin::upload.assets.download', NULL, '{}', '[]', '2023-08-16 10:30:52.108000', '2023-08-16 10:30:52.108000', NULL, NULL, NULL),
(110, 'plugin::upload.assets.copy-link', NULL, '{}', '[]', '2023-08-16 10:30:52.109000', '2023-08-16 10:30:52.109000', NULL, NULL, NULL),
(248, 'plugin::content-manager.explorer.create', 'plugin::block-gallery.block', '{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}', '[]', '2024-01-08 12:02:36.494000', '2024-01-08 12:02:36.494000', NULL, NULL, '{}'),
(249, 'plugin::content-manager.explorer.create', 'plugin::users-permissions.user', '{\"fields\": [\"username\", \"email\", \"provider\", \"password\", \"resetPasswordToken\", \"confirmationToken\", \"confirmed\", \"blocked\", \"role\"]}', '[]', '2024-01-08 12:02:36.496000', '2024-01-08 12:02:36.496000', NULL, NULL, '{}'),
(250, 'plugin::content-manager.explorer.create', 'api::article.article', '{\"fields\": [\"title\", \"image\", \"publishDate\", \"content\", \"slug\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\", \"category\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.476000', '2024-01-08 12:05:06.476000', NULL, NULL, '{}'),
(251, 'plugin::content-manager.explorer.create', 'api::article-category.article-category', '{\"fields\": [\"title\", \"articles\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.480000', '2024-01-08 12:05:06.480000', NULL, NULL, '{}'),
(253, 'plugin::content-manager.explorer.create', 'api::icon.icon', '{\"fields\": [\"title\", \"codename\"]}', '[]', '2024-01-08 12:02:36.504000', '2024-01-08 12:02:36.504000', NULL, NULL, '{}'),
(254, 'plugin::content-manager.explorer.create', 'api::menu.menu', '{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.485000', '2024-01-08 12:05:06.485000', NULL, NULL, '{}'),
(255, 'plugin::content-manager.explorer.create', 'api::message.message', '{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"company\"]}', '[]', '2024-01-08 12:02:36.508000', '2024-01-08 12:02:36.508000', NULL, NULL, '{}'),
(256, 'plugin::content-manager.explorer.create', 'api::newsletter-subscriber.newsletter-subscriber', '{\"fields\": [\"email\"]}', '[]', '2024-01-08 12:02:36.509000', '2024-01-08 12:02:36.509000', NULL, NULL, '{}'),
(257, 'plugin::content-manager.explorer.create', 'api::page.page', '{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.487000', '2024-01-08 12:05:06.487000', NULL, NULL, '{}'),
(258, 'plugin::content-manager.explorer.create', 'api::redirect.redirect', '{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}', '[]', '2024-01-08 12:02:36.512000', '2024-01-08 12:02:36.512000', NULL, NULL, '{}'),
(259, 'plugin::content-manager.explorer.create', 'api::system-resource.system-resource', '{\"fields\": [\"name\", \"codename\", \"value\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.489000', '2024-01-08 12:05:06.489000', NULL, NULL, '{}'),
(260, 'plugin::content-manager.explorer.create', 'api::template.template', '{\"fields\": [\"title\", \"content\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.491000', '2024-01-08 12:05:06.491000', NULL, NULL, '{}'),
(261, 'plugin::content-manager.explorer.create', 'api::web-setting.web-setting', '{\"fields\": [\"gtmCode\", \"homePage\", \"articleDetailPage\", \"mainMenu\", \"articlesPage\", \"globalSeo.siteName\", \"globalSeo.titleSuffix\", \"globalSeo.description\", \"globalSeo.sharingImage\", \"globalSeo.favicon\", \"globalSeo.preventIndexing\", \"globalSeo.metaTags.name\", \"globalSeo.metaTags.content\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.493000', '2024-01-08 12:05:06.493000', NULL, NULL, '{}'),
(262, 'plugin::content-manager.explorer.read', 'plugin::block-gallery.block', '{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}', '[]', '2024-01-08 12:02:36.520000', '2024-01-08 12:02:36.520000', NULL, NULL, '{}'),
(263, 'plugin::content-manager.explorer.read', 'plugin::users-permissions.user', '{\"fields\": [\"username\", \"email\", \"provider\", \"password\", \"resetPasswordToken\", \"confirmationToken\", \"confirmed\", \"blocked\", \"role\"]}', '[]', '2024-01-08 12:02:36.522000', '2024-01-08 12:02:36.522000', NULL, NULL, '{}'),
(264, 'plugin::content-manager.explorer.read', 'api::article.article', '{\"fields\": [\"title\", \"image\", \"publishDate\", \"content\", \"slug\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\", \"category\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.497000', '2024-01-08 12:05:06.497000', NULL, NULL, '{}'),
(265, 'plugin::content-manager.explorer.read', 'api::article-category.article-category', '{\"fields\": [\"title\", \"articles\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.499000', '2024-01-08 12:05:06.499000', NULL, NULL, '{}'),
(267, 'plugin::content-manager.explorer.read', 'api::icon.icon', '{\"fields\": [\"title\", \"codename\"]}', '[]', '2024-01-08 12:02:36.528000', '2024-01-08 12:02:36.528000', NULL, NULL, '{}'),
(268, 'plugin::content-manager.explorer.read', 'api::menu.menu', '{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.503000', '2024-01-08 12:05:06.503000', NULL, NULL, '{}'),
(269, 'plugin::content-manager.explorer.read', 'api::message.message', '{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"company\"]}', '[]', '2024-01-08 12:02:36.531000', '2024-01-08 12:02:36.531000', NULL, NULL, '{}'),
(270, 'plugin::content-manager.explorer.read', 'api::newsletter-subscriber.newsletter-subscriber', '{\"fields\": [\"email\"]}', '[]', '2024-01-08 12:02:36.532000', '2024-01-08 12:02:36.532000', NULL, NULL, '{}'),
(271, 'plugin::content-manager.explorer.read', 'api::page.page', '{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.506000', '2024-01-08 12:05:06.506000', NULL, NULL, '{}'),
(272, 'plugin::content-manager.explorer.read', 'api::redirect.redirect', '{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}', '[]', '2024-01-08 12:02:36.535000', '2024-01-08 12:02:36.535000', NULL, NULL, '{}'),
(273, 'plugin::content-manager.explorer.read', 'api::system-resource.system-resource', '{\"fields\": [\"name\", \"codename\", \"value\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.508000', '2024-01-08 12:05:06.508000', NULL, NULL, '{}'),
(274, 'plugin::content-manager.explorer.read', 'api::template.template', '{\"fields\": [\"title\", \"content\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.510000', '2024-01-08 12:05:06.510000', NULL, NULL, '{}'),
(275, 'plugin::content-manager.explorer.read', 'api::web-setting.web-setting', '{\"fields\": [\"gtmCode\", \"homePage\", \"articleDetailPage\", \"mainMenu\", \"articlesPage\", \"globalSeo.siteName\", \"globalSeo.titleSuffix\", \"globalSeo.description\", \"globalSeo.sharingImage\", \"globalSeo.favicon\", \"globalSeo.preventIndexing\", \"globalSeo.metaTags.name\", \"globalSeo.metaTags.content\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.514000', '2024-01-08 12:05:06.514000', NULL, NULL, '{}'),
(276, 'plugin::content-manager.explorer.update', 'plugin::block-gallery.block', '{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}', '[]', '2024-01-08 12:02:36.539000', '2024-01-08 12:02:36.539000', NULL, NULL, '{}'),
(277, 'plugin::content-manager.explorer.update', 'plugin::users-permissions.user', '{\"fields\": [\"username\", \"email\", \"provider\", \"password\", \"resetPasswordToken\", \"confirmationToken\", \"confirmed\", \"blocked\", \"role\"]}', '[]', '2024-01-08 12:02:36.540000', '2024-01-08 12:02:36.540000', NULL, NULL, '{}'),
(278, 'plugin::content-manager.explorer.update', 'api::article.article', '{\"fields\": [\"title\", \"image\", \"publishDate\", \"content\", \"slug\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\", \"category\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.517000', '2024-01-08 12:05:06.517000', NULL, NULL, '{}'),
(279, 'plugin::content-manager.explorer.update', 'api::article-category.article-category', '{\"fields\": [\"title\", \"articles\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.519000', '2024-01-08 12:05:06.519000', NULL, NULL, '{}'),
(281, 'plugin::content-manager.explorer.update', 'api::icon.icon', '{\"fields\": [\"title\", \"codename\"]}', '[]', '2024-01-08 12:02:36.545000', '2024-01-08 12:02:36.545000', NULL, NULL, '{}'),
(282, 'plugin::content-manager.explorer.update', 'api::menu.menu', '{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.524000', '2024-01-08 12:05:06.524000', NULL, NULL, '{}'),
(283, 'plugin::content-manager.explorer.update', 'api::message.message', '{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"company\"]}', '[]', '2024-01-08 12:02:36.548000', '2024-01-08 12:02:36.548000', NULL, NULL, '{}'),
(284, 'plugin::content-manager.explorer.update', 'api::newsletter-subscriber.newsletter-subscriber', '{\"fields\": [\"email\"]}', '[]', '2024-01-08 12:02:36.549000', '2024-01-08 12:02:36.549000', NULL, NULL, '{}'),
(285, 'plugin::content-manager.explorer.update', 'api::page.page', '{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.527000', '2024-01-08 12:05:06.527000', NULL, NULL, '{}'),
(286, 'plugin::content-manager.explorer.update', 'api::redirect.redirect', '{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}', '[]', '2024-01-08 12:02:36.552000', '2024-01-08 12:02:36.552000', NULL, NULL, '{}'),
(287, 'plugin::content-manager.explorer.update', 'api::system-resource.system-resource', '{\"fields\": [\"name\", \"codename\", \"value\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.529000', '2024-01-08 12:05:06.529000', NULL, NULL, '{}'),
(288, 'plugin::content-manager.explorer.update', 'api::template.template', '{\"fields\": [\"title\", \"content\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.531000', '2024-01-08 12:05:06.531000', NULL, NULL, '{}'),
(289, 'plugin::content-manager.explorer.update', 'api::web-setting.web-setting', '{\"fields\": [\"gtmCode\", \"homePage\", \"articleDetailPage\", \"mainMenu\", \"articlesPage\", \"globalSeo.siteName\", \"globalSeo.titleSuffix\", \"globalSeo.description\", \"globalSeo.sharingImage\", \"globalSeo.favicon\", \"globalSeo.preventIndexing\", \"globalSeo.metaTags.name\", \"globalSeo.metaTags.content\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.533000', '2024-01-08 12:05:06.533000', NULL, NULL, '{}'),
(290, 'plugin::content-manager.explorer.delete', 'plugin::block-gallery.block', '{}', '[]', '2024-01-08 12:02:36.556000', '2024-01-08 12:02:36.556000', NULL, NULL, '{}'),
(291, 'plugin::content-manager.explorer.delete', 'plugin::users-permissions.user', '{}', '[]', '2024-01-08 12:02:36.558000', '2024-01-08 12:02:36.558000', NULL, NULL, '{}'),
(292, 'plugin::content-manager.explorer.delete', 'api::article.article', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.535000', '2024-01-08 12:05:06.535000', NULL, NULL, '{}'),
(293, 'plugin::content-manager.explorer.delete', 'api::article-category.article-category', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.538000', '2024-01-08 12:05:06.538000', NULL, NULL, '{}'),
(294, 'plugin::content-manager.explorer.delete', 'api::contact-form.contact-form', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.540000', '2024-01-08 12:05:06.540000', NULL, NULL, '{}'),
(295, 'plugin::content-manager.explorer.delete', 'api::icon.icon', '{}', '[]', '2024-01-08 12:02:36.563000', '2024-01-08 12:02:36.563000', NULL, NULL, '{}'),
(296, 'plugin::content-manager.explorer.delete', 'api::menu.menu', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.542000', '2024-01-08 12:05:06.542000', NULL, NULL, '{}'),
(297, 'plugin::content-manager.explorer.delete', 'api::message.message', '{}', '[]', '2024-01-08 12:02:36.565000', '2024-01-08 12:02:36.565000', NULL, NULL, '{}'),
(298, 'plugin::content-manager.explorer.delete', 'api::newsletter-subscriber.newsletter-subscriber', '{}', '[]', '2024-01-08 12:02:36.566000', '2024-01-08 12:02:36.566000', NULL, NULL, '{}'),
(299, 'plugin::content-manager.explorer.delete', 'api::page.page', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.544000', '2024-01-08 12:05:06.544000', NULL, NULL, '{}'),
(300, 'plugin::content-manager.explorer.delete', 'api::redirect.redirect', '{}', '[]', '2024-01-08 12:02:36.570000', '2024-01-08 12:02:36.570000', NULL, NULL, '{}'),
(301, 'plugin::content-manager.explorer.delete', 'api::system-resource.system-resource', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.548000', '2024-01-08 12:05:06.548000', NULL, NULL, '{}'),
(302, 'plugin::content-manager.explorer.delete', 'api::template.template', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.551000', '2024-01-08 12:05:06.551000', NULL, NULL, '{}'),
(303, 'plugin::content-manager.explorer.delete', 'api::web-setting.web-setting', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.553000', '2024-01-08 12:05:06.553000', NULL, NULL, '{}'),
(304, 'plugin::content-manager.explorer.publish', 'api::article.article', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.555000', '2024-01-08 12:05:06.555000', NULL, NULL, '{}'),
(305, 'plugin::content-manager.explorer.publish', 'api::article-category.article-category', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.557000', '2024-01-08 12:05:06.557000', NULL, NULL, '{}'),
(306, 'plugin::content-manager.explorer.publish', 'api::contact-form.contact-form', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.561000', '2024-01-08 12:05:06.561000', NULL, NULL, '{}'),
(307, 'plugin::content-manager.explorer.publish', 'api::menu.menu', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.563000', '2024-01-08 12:05:06.563000', NULL, NULL, '{}'),
(308, 'plugin::content-manager.explorer.publish', 'api::page.page', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.565000', '2024-01-08 12:05:06.565000', NULL, NULL, '{}'),
(309, 'plugin::content-manager.explorer.publish', 'api::redirect.redirect', '{}', '[]', '2024-01-08 12:02:36.581000', '2024-01-08 12:02:36.581000', NULL, NULL, '{}'),
(310, 'plugin::content-manager.explorer.publish', 'api::system-resource.system-resource', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.566000', '2024-01-08 12:05:06.566000', NULL, NULL, '{}'),
(311, 'plugin::content-manager.explorer.publish', 'api::template.template', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.568000', '2024-01-08 12:05:06.568000', NULL, NULL, '{}'),
(312, 'plugin::content-manager.explorer.publish', 'api::web-setting.web-setting', '{\"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-08 12:05:06.570000', '2024-01-08 12:05:06.570000', NULL, NULL, '{}'),
(313, 'plugin::content-manager.single-types.configure-view', NULL, '{}', '[]', '2024-01-08 12:02:36.585000', '2024-01-08 12:02:36.585000', NULL, NULL, '{}'),
(314, 'plugin::content-manager.collection-types.configure-view', NULL, '{}', '[]', '2024-01-08 12:02:36.586000', '2024-01-08 12:02:36.586000', NULL, NULL, '{}'),
(315, 'plugin::content-manager.components.configure-layout', NULL, '{}', '[]', '2024-01-08 12:02:36.587000', '2024-01-08 12:02:36.587000', NULL, NULL, '{}'),
(316, 'plugin::content-type-builder.read', NULL, '{}', '[]', '2024-01-08 12:02:36.588000', '2024-01-08 12:02:36.588000', NULL, NULL, '{}'),
(317, 'plugin::email.settings.read', NULL, '{}', '[]', '2024-01-08 12:02:36.589000', '2024-01-08 12:02:36.589000', NULL, NULL, '{}'),
(318, 'plugin::upload.read', NULL, '{}', '[]', '2024-01-08 12:02:36.591000', '2024-01-08 12:02:36.591000', NULL, NULL, '{}'),
(319, 'plugin::upload.assets.create', NULL, '{}', '[]', '2024-01-08 12:02:36.591000', '2024-01-08 12:02:36.591000', NULL, NULL, '{}'),
(320, 'plugin::upload.assets.update', NULL, '{}', '[]', '2024-01-08 12:02:36.593000', '2024-01-08 12:02:36.593000', NULL, NULL, '{}'),
(321, 'plugin::upload.assets.download', NULL, '{}', '[]', '2024-01-08 12:02:36.594000', '2024-01-08 12:02:36.594000', NULL, NULL, '{}'),
(322, 'plugin::upload.assets.copy-link', NULL, '{}', '[]', '2024-01-08 12:02:36.595000', '2024-01-08 12:02:36.595000', NULL, NULL, '{}'),
(323, 'plugin::upload.configure-view', NULL, '{}', '[]', '2024-01-08 12:02:36.596000', '2024-01-08 12:02:36.596000', NULL, NULL, '{}'),
(324, 'plugin::upload.settings.read', NULL, '{}', '[]', '2024-01-08 12:02:36.597000', '2024-01-08 12:02:36.597000', NULL, NULL, '{}'),
(325, 'plugin::seo.read', NULL, '{}', '[]', '2024-01-08 12:02:36.599000', '2024-01-08 12:02:36.599000', NULL, NULL, '{}'),
(326, 'plugin::tinymce.settings.read', NULL, '{}', '[]', '2024-01-08 12:02:36.600000', '2024-01-08 12:02:36.600000', NULL, NULL, '{}'),
(327, 'plugin::tinymce.menu-link', NULL, '{}', '[]', '2024-01-08 12:02:36.601000', '2024-01-08 12:02:36.601000', NULL, NULL, '{}'),
(328, 'plugin::i18n.locale.create', NULL, '{}', '[]', '2024-01-08 12:02:36.603000', '2024-01-08 12:02:36.603000', NULL, NULL, '{}'),
(329, 'plugin::i18n.locale.read', NULL, '{}', '[]', '2024-01-08 12:02:36.606000', '2024-01-08 12:02:36.606000', NULL, NULL, '{}'),
(330, 'plugin::i18n.locale.update', NULL, '{}', '[]', '2024-01-08 12:02:36.608000', '2024-01-08 12:02:36.608000', NULL, NULL, '{}'),
(331, 'plugin::i18n.locale.delete', NULL, '{}', '[]', '2024-01-08 12:02:36.609000', '2024-01-08 12:02:36.609000', NULL, NULL, '{}'),
(332, 'plugin::users-permissions.roles.create', NULL, '{}', '[]', '2024-01-08 12:02:36.611000', '2024-01-08 12:02:36.611000', NULL, NULL, '{}'),
(333, 'plugin::users-permissions.roles.read', NULL, '{}', '[]', '2024-01-08 12:02:36.613000', '2024-01-08 12:02:36.613000', NULL, NULL, '{}'),
(334, 'plugin::users-permissions.roles.update', NULL, '{}', '[]', '2024-01-08 12:02:36.615000', '2024-01-08 12:02:36.615000', NULL, NULL, '{}'),
(335, 'plugin::users-permissions.roles.delete', NULL, '{}', '[]', '2024-01-08 12:02:36.617000', '2024-01-08 12:02:36.617000', NULL, NULL, '{}'),
(336, 'plugin::users-permissions.providers.read', NULL, '{}', '[]', '2024-01-08 12:02:36.618000', '2024-01-08 12:02:36.618000', NULL, NULL, '{}'),
(337, 'plugin::users-permissions.providers.update', NULL, '{}', '[]', '2024-01-08 12:02:36.619000', '2024-01-08 12:02:36.619000', NULL, NULL, '{}'),
(338, 'plugin::users-permissions.email-templates.read', NULL, '{}', '[]', '2024-01-08 12:02:36.620000', '2024-01-08 12:02:36.620000', NULL, NULL, '{}'),
(339, 'plugin::users-permissions.email-templates.update', NULL, '{}', '[]', '2024-01-08 12:02:36.621000', '2024-01-08 12:02:36.621000', NULL, NULL, '{}'),
(340, 'plugin::users-permissions.advanced-settings.read', NULL, '{}', '[]', '2024-01-08 12:02:36.622000', '2024-01-08 12:02:36.622000', NULL, NULL, '{}'),
(341, 'plugin::users-permissions.advanced-settings.update', NULL, '{}', '[]', '2024-01-08 12:02:36.623000', '2024-01-08 12:02:36.623000', NULL, NULL, '{}'),
(342, 'plugin::config-sync.settings.read', NULL, '{}', '[]', '2024-01-08 12:02:36.625000', '2024-01-08 12:02:36.625000', NULL, NULL, '{}'),
(343, 'plugin::config-sync.menu-link', NULL, '{}', '[]', '2024-01-08 12:02:36.626000', '2024-01-08 12:02:36.626000', NULL, NULL, '{}'),
(344, 'admin::marketplace.read', NULL, '{}', '[]', '2024-01-08 12:02:36.627000', '2024-01-08 12:02:36.627000', NULL, NULL, '{}'),
(345, 'admin::webhooks.create', NULL, '{}', '[]', '2024-01-08 12:02:36.628000', '2024-01-08 12:02:36.628000', NULL, NULL, '{}'),
(346, 'admin::webhooks.read', NULL, '{}', '[]', '2024-01-08 12:02:36.629000', '2024-01-08 12:02:36.629000', NULL, NULL, '{}'),
(347, 'admin::webhooks.update', NULL, '{}', '[]', '2024-01-08 12:02:36.632000', '2024-01-08 12:02:36.632000', NULL, NULL, '{}'),
(348, 'admin::webhooks.delete', NULL, '{}', '[]', '2024-01-08 12:02:36.634000', '2024-01-08 12:02:36.634000', NULL, NULL, '{}'),
(349, 'admin::users.create', NULL, '{}', '[]', '2024-01-08 12:02:36.636000', '2024-01-08 12:02:36.636000', NULL, NULL, '{}'),
(350, 'admin::users.read', NULL, '{}', '[]', '2024-01-08 12:02:36.637000', '2024-01-08 12:02:36.637000', NULL, NULL, '{}'),
(351, 'admin::users.update', NULL, '{}', '[]', '2024-01-08 12:02:36.638000', '2024-01-08 12:02:36.638000', NULL, NULL, '{}'),
(352, 'admin::users.delete', NULL, '{}', '[]', '2024-01-08 12:02:36.639000', '2024-01-08 12:02:36.639000', NULL, NULL, '{}'),
(353, 'admin::roles.create', NULL, '{}', '[]', '2024-01-08 12:02:36.640000', '2024-01-08 12:02:36.640000', NULL, NULL, '{}'),
(354, 'admin::roles.read', NULL, '{}', '[]', '2024-01-08 12:02:36.641000', '2024-01-08 12:02:36.641000', NULL, NULL, '{}'),
(355, 'admin::roles.update', NULL, '{}', '[]', '2024-01-08 12:02:36.644000', '2024-01-08 12:02:36.644000', NULL, NULL, '{}'),
(356, 'admin::roles.delete', NULL, '{}', '[]', '2024-01-08 12:02:36.645000', '2024-01-08 12:02:36.645000', NULL, NULL, '{}'),
(357, 'admin::api-tokens.access', NULL, '{}', '[]', '2024-01-08 12:02:36.647000', '2024-01-08 12:02:36.647000', NULL, NULL, '{}'),
(358, 'admin::api-tokens.create', NULL, '{}', '[]', '2024-01-08 12:02:36.648000', '2024-01-08 12:02:36.648000', NULL, NULL, '{}'),
(359, 'admin::api-tokens.read', NULL, '{}', '[]', '2024-01-08 12:02:36.650000', '2024-01-08 12:02:36.650000', NULL, NULL, '{}'),
(360, 'admin::api-tokens.update', NULL, '{}', '[]', '2024-01-08 12:02:36.652000', '2024-01-08 12:02:36.652000', NULL, NULL, '{}'),
(361, 'admin::api-tokens.regenerate', NULL, '{}', '[]', '2024-01-08 12:02:36.653000', '2024-01-08 12:02:36.653000', NULL, NULL, '{}'),
(362, 'admin::api-tokens.delete', NULL, '{}', '[]', '2024-01-08 12:02:36.654000', '2024-01-08 12:02:36.654000', NULL, NULL, '{}'),
(363, 'admin::project-settings.update', NULL, '{}', '[]', '2024-01-08 12:02:36.656000', '2024-01-08 12:02:36.656000', NULL, NULL, '{}');
INSERT INTO `admin_permissions` (`id`, `action`, `subject`, `properties`, `conditions`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`, `action_parameters`) VALUES
(364, 'admin::project-settings.read', NULL, '{}', '[]', '2024-01-08 12:02:36.657000', '2024-01-08 12:02:36.657000', NULL, NULL, '{}'),
(365, 'admin::transfer.tokens.access', NULL, '{}', '[]', '2024-01-08 12:02:36.658000', '2024-01-08 12:02:36.658000', NULL, NULL, '{}'),
(366, 'admin::transfer.tokens.create', NULL, '{}', '[]', '2024-01-08 12:02:36.659000', '2024-01-08 12:02:36.659000', NULL, NULL, '{}'),
(367, 'admin::transfer.tokens.read', NULL, '{}', '[]', '2024-01-08 12:02:36.661000', '2024-01-08 12:02:36.661000', NULL, NULL, '{}'),
(368, 'admin::transfer.tokens.update', NULL, '{}', '[]', '2024-01-08 12:02:36.662000', '2024-01-08 12:02:36.662000', NULL, NULL, '{}'),
(369, 'admin::transfer.tokens.regenerate', NULL, '{}', '[]', '2024-01-08 12:02:36.664000', '2024-01-08 12:02:36.664000', NULL, NULL, '{}'),
(370, 'admin::transfer.tokens.delete', NULL, '{}', '[]', '2024-01-08 12:02:36.665000', '2024-01-08 12:02:36.665000', NULL, NULL, '{}'),
(374, 'plugin::content-manager.explorer.create', 'api::contact-form.contact-form', '{\"fields\": [\"mailFrom\", \"mailTo\", \"mailSubject\", \"successMessage\", \"errorMessage\", \"checkboxLabel\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-09 08:54:48.319000', '2024-01-09 08:54:48.319000', NULL, NULL, '{}'),
(375, 'plugin::content-manager.explorer.read', 'api::contact-form.contact-form', '{\"fields\": [\"mailFrom\", \"mailTo\", \"mailSubject\", \"successMessage\", \"errorMessage\", \"checkboxLabel\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-09 08:54:48.323000', '2024-01-09 08:54:48.323000', NULL, NULL, '{}'),
(376, 'plugin::content-manager.explorer.update', 'api::contact-form.contact-form', '{\"fields\": [\"mailFrom\", \"mailTo\", \"mailSubject\", \"successMessage\", \"errorMessage\", \"checkboxLabel\"], \"locales\": [\"cs\", \"en\"]}', '[]', '2024-01-09 08:54:48.327000', '2024-01-09 08:54:48.327000', NULL, NULL, '{}');

-- --------------------------------------------------------

--
-- Table structure for table `admin_permissions_role_links`
--

CREATE TABLE `admin_permissions_role_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED DEFAULT NULL,
  `role_id` int(10) UNSIGNED DEFAULT NULL,
  `permission_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_permissions_role_links`
--

INSERT INTO `admin_permissions_role_links` (`id`, `permission_id`, `role_id`, `permission_order`) VALUES
(1, 1, 2, 1),
(2, 2, 2, 2),
(3, 3, 2, 3),
(4, 4, 2, 4),
(5, 5, 2, 5),
(6, 6, 2, 6),
(7, 7, 2, 7),
(8, 8, 2, 8),
(9, 9, 2, 9),
(10, 10, 2, 10),
(11, 11, 2, 11),
(12, 12, 2, 12),
(13, 13, 2, 13),
(14, 14, 2, 14),
(15, 15, 2, 15),
(16, 16, 2, 16),
(17, 17, 2, 17),
(18, 18, 2, 18),
(19, 19, 2, 19),
(20, 20, 2, 20),
(21, 21, 2, 21),
(22, 22, 2, 22),
(23, 23, 2, 23),
(24, 24, 2, 24),
(25, 25, 2, 25),
(26, 26, 2, 26),
(27, 27, 2, 27),
(28, 28, 2, 28),
(29, 29, 2, 29),
(30, 30, 2, 30),
(31, 31, 2, 31),
(32, 32, 2, 32),
(33, 33, 2, 33),
(34, 34, 2, 34),
(36, 36, 2, 36),
(38, 38, 2, 38),
(39, 39, 2, 39),
(41, 41, 2, 41),
(51, 51, 2, 51),
(55, 55, 2, 55),
(56, 56, 2, 56),
(57, 57, 2, 57),
(58, 58, 2, 58),
(59, 59, 2, 59),
(60, 60, 2, 60),
(61, 61, 3, 1),
(62, 62, 3, 2),
(63, 63, 3, 3),
(64, 64, 3, 4),
(65, 65, 3, 5),
(66, 66, 3, 6),
(67, 67, 3, 7),
(68, 68, 3, 8),
(69, 69, 3, 9),
(70, 70, 3, 10),
(71, 71, 3, 11),
(72, 72, 3, 12),
(73, 73, 3, 13),
(74, 74, 3, 14),
(75, 75, 3, 15),
(76, 76, 3, 16),
(77, 77, 3, 17),
(78, 78, 3, 18),
(79, 79, 3, 19),
(80, 80, 3, 20),
(81, 81, 3, 21),
(82, 82, 3, 22),
(83, 83, 3, 23),
(84, 84, 3, 24),
(85, 85, 3, 25),
(86, 86, 3, 26),
(87, 87, 3, 27),
(88, 88, 3, 28),
(89, 89, 3, 29),
(90, 90, 3, 30),
(91, 91, 3, 31),
(92, 92, 3, 32),
(93, 93, 3, 33),
(94, 94, 3, 34),
(96, 96, 3, 36),
(98, 98, 3, 38),
(99, 99, 3, 39),
(101, 101, 3, 41),
(105, 105, 3, 45),
(106, 106, 3, 46),
(107, 107, 3, 47),
(108, 108, 3, 48),
(109, 109, 3, 49),
(110, 110, 3, 50),
(308, 248, 1, 1),
(309, 249, 1, 2),
(313, 253, 1, 6),
(315, 255, 1, 8),
(316, 256, 1, 9),
(318, 258, 1, 11),
(322, 262, 1, 15),
(323, 263, 1, 16),
(327, 267, 1, 20),
(329, 269, 1, 22),
(330, 270, 1, 23),
(332, 272, 1, 25),
(336, 276, 1, 29),
(337, 277, 1, 30),
(341, 281, 1, 34),
(343, 283, 1, 36),
(344, 284, 1, 37),
(346, 286, 1, 39),
(350, 290, 1, 43),
(351, 291, 1, 44),
(355, 295, 1, 48),
(357, 297, 1, 50),
(358, 298, 1, 51),
(360, 300, 1, 53),
(369, 309, 1, 62),
(373, 313, 1, 66),
(374, 314, 1, 67),
(375, 315, 1, 68),
(376, 316, 1, 69),
(377, 317, 1, 70),
(378, 318, 1, 71),
(379, 319, 1, 72),
(380, 320, 1, 73),
(381, 321, 1, 74),
(382, 322, 1, 75),
(383, 323, 1, 76),
(384, 324, 1, 77),
(385, 325, 1, 78),
(386, 326, 1, 79),
(387, 327, 1, 80),
(388, 328, 1, 81),
(389, 329, 1, 82),
(390, 330, 1, 83),
(391, 331, 1, 84),
(392, 332, 1, 85),
(393, 333, 1, 86),
(394, 334, 1, 87),
(395, 335, 1, 88),
(396, 336, 1, 89),
(397, 337, 1, 90),
(398, 338, 1, 91),
(399, 339, 1, 92),
(400, 340, 1, 93),
(401, 341, 1, 94),
(402, 342, 1, 95),
(403, 343, 1, 96),
(404, 344, 1, 97),
(405, 345, 1, 98),
(406, 346, 1, 99),
(407, 347, 1, 100),
(408, 348, 1, 101),
(409, 349, 1, 102),
(410, 350, 1, 103),
(411, 351, 1, 104),
(412, 352, 1, 105),
(413, 353, 1, 106),
(414, 354, 1, 107),
(415, 355, 1, 108),
(416, 356, 1, 109),
(417, 357, 1, 110),
(418, 358, 1, 111),
(419, 359, 1, 112),
(420, 360, 1, 113),
(421, 361, 1, 114),
(422, 362, 1, 115),
(423, 363, 1, 116),
(424, 364, 1, 117),
(425, 365, 1, 118),
(426, 366, 1, 119),
(427, 367, 1, 120),
(428, 368, 1, 121),
(429, 369, 1, 122),
(430, 370, 1, 123),
(431, 250, 1, 124),
(432, 251, 1, 125),
(434, 254, 1, 127),
(435, 257, 1, 128),
(436, 259, 1, 129),
(437, 260, 1, 130),
(438, 261, 1, 131),
(439, 264, 1, 132),
(440, 265, 1, 133),
(442, 268, 1, 135),
(443, 271, 1, 136),
(444, 273, 1, 137),
(445, 274, 1, 138),
(446, 275, 1, 139),
(447, 278, 1, 140),
(448, 279, 1, 141),
(450, 282, 1, 143),
(451, 285, 1, 144),
(452, 287, 1, 145),
(453, 288, 1, 146),
(454, 289, 1, 147),
(455, 292, 1, 148),
(456, 293, 1, 149),
(457, 294, 1, 150),
(458, 296, 1, 151),
(459, 299, 1, 152),
(460, 301, 1, 153),
(461, 302, 1, 154),
(462, 303, 1, 155),
(463, 304, 1, 156),
(464, 305, 1, 157),
(465, 306, 1, 158),
(466, 307, 1, 159),
(467, 308, 1, 160),
(468, 310, 1, 161),
(469, 311, 1, 162),
(470, 312, 1, 163),
(474, 374, 1, 164),
(475, 375, 1, 165),
(476, 376, 1, 166);

-- --------------------------------------------------------

--
-- Table structure for table `admin_roles`
--

CREATE TABLE `admin_roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_roles`
--

INSERT INTO `admin_roles` (`id`, `name`, `code`, `description`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`) VALUES
(1, 'Super Admin', 'strapi-super-admin', 'Super Admins can access and manage all features and settings.', '2023-08-16 10:30:51.933000', '2023-08-16 10:30:51.933000', NULL, NULL),
(2, 'Editor', 'strapi-editor', 'Editors can manage and publish contents including those of other users.', '2023-08-16 10:30:51.942000', '2023-08-16 10:30:51.942000', NULL, NULL),
(3, 'Author', 'strapi-author', 'Authors can manage the content they have created.', '2023-08-16 10:30:51.944000', '2023-08-16 10:30:51.944000', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `registration_token` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `prefered_language` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `firstname`, `lastname`, `username`, `email`, `password`, `reset_password_token`, `registration_token`, `is_active`, `blocked`, `prefered_language`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`) VALUES
(1, 'Michal', 'Sklenar', NULL, 'dev@sklinet.com', '$2a$10$pveifGpfwHn8FdQaaIlaAOeq.OFFQfLX5eYfMItTcG2iHt/lG/FM2', NULL, NULL, 1, 0, NULL, '2023-08-16 10:31:15.445000', '2023-08-16 10:31:15.445000', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin_users_roles_links`
--

CREATE TABLE `admin_users_roles_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `role_id` int(10) UNSIGNED DEFAULT NULL,
  `role_order` double UNSIGNED DEFAULT NULL,
  `user_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_users_roles_links`
--

INSERT INTO `admin_users_roles_links` (`id`, `user_id`, `role_id`, `role_order`, `user_order`) VALUES
(1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `publish_date` datetime(6) DEFAULT NULL,
  `content` longtext,
  `slug` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `publish_date`, `content`, `slug`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `locale`) VALUES
(3, 'Článek 1', '2024-01-07 00:00:00.000000', '<p>adsdsadsadsadsa</p>', 'clanek-1', '2024-01-08 12:53:18.660000', '2024-01-08 14:23:44.446000', '2024-01-08 12:53:31.685000', 1, 1, 'cs'),
(4, 'Article 1', '2024-01-05 00:00:00.000000', '<p>dasdsasda</p>', 'article-1', '2024-01-08 12:53:46.033000', '2024-01-08 14:24:18.889000', '2024-01-08 12:53:46.842000', 1, 1, 'en'),
(5, 'Článek 2', '2024-01-04 00:00:00.000000', '<p>sasadasd</p>', 'clanek-2', '2024-01-08 14:24:52.758000', '2024-01-08 14:25:01.225000', '2024-01-08 14:24:57.880000', 1, 1, 'cs'),
(6, 'Article 2', '2024-01-04 00:00:00.000000', '<p>sasadasd</p>', 'article-2', '2024-01-08 14:25:01.216000', '2024-01-08 14:25:15.844000', '2024-01-08 14:25:15.840000', 1, 1, 'en');

-- --------------------------------------------------------

--
-- Table structure for table `articles_category_links`
--

CREATE TABLE `articles_category_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `article_id` int(10) UNSIGNED DEFAULT NULL,
  `article_category_id` int(10) UNSIGNED DEFAULT NULL,
  `article_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articles_category_links`
--

INSERT INTO `articles_category_links` (`id`, `article_id`, `article_category_id`, `article_order`) VALUES
(1, 3, 1, 1),
(2, 4, 3, 1),
(4, 5, 2, 1),
(5, 6, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `articles_components`
--

CREATE TABLE `articles_components` (
  `id` int(10) UNSIGNED NOT NULL,
  `entity_id` int(10) UNSIGNED DEFAULT NULL,
  `component_id` int(10) UNSIGNED DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `articles_localizations_links`
--

CREATE TABLE `articles_localizations_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `article_id` int(10) UNSIGNED DEFAULT NULL,
  `inv_article_id` int(10) UNSIGNED DEFAULT NULL,
  `article_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articles_localizations_links`
--

INSERT INTO `articles_localizations_links` (`id`, `article_id`, `inv_article_id`, `article_order`) VALUES
(1, 4, 3, 1),
(2, 3, 4, 1),
(3, 6, 5, 1),
(4, 5, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `article_categories`
--

CREATE TABLE `article_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `article_categories`
--

INSERT INTO `article_categories` (`id`, `title`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `locale`) VALUES
(1, 'Webový design', '2024-01-08 14:23:20.274000', '2024-01-08 14:24:29.048000', '2024-01-08 14:23:20.841000', 1, 1, 'cs'),
(2, 'Vývoj', '2024-01-08 14:23:28.154000', '2024-01-08 14:24:35.730000', '2024-01-08 14:23:28.656000', 1, 1, 'cs'),
(3, 'Webdesign', '2024-01-08 14:23:59.817000', '2024-01-08 14:24:00.384000', '2024-01-08 14:24:00.380000', 1, 1, 'en'),
(4, 'Development', '2024-01-08 14:24:07.602000', '2024-01-08 14:24:08.246000', '2024-01-08 14:24:08.243000', 1, 1, 'en');

-- --------------------------------------------------------

--
-- Table structure for table `article_categories_localizations_links`
--

CREATE TABLE `article_categories_localizations_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `article_category_id` int(10) UNSIGNED DEFAULT NULL,
  `inv_article_category_id` int(10) UNSIGNED DEFAULT NULL,
  `article_category_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `article_categories_localizations_links`
--

INSERT INTO `article_categories_localizations_links` (`id`, `article_category_id`, `inv_article_category_id`, `article_category_order`) VALUES
(1, 3, 1, 1),
(2, 1, 3, 1),
(3, 4, 2, 1),
(4, 2, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `id` int(10) UNSIGNED NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `block_name` varchar(255) DEFAULT NULL,
  `external_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_block_articles_list_blocks`
--

CREATE TABLE `components_block_articles_list_blocks` (
  `id` int(10) UNSIGNED NOT NULL,
  `count_on_page` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `components_block_articles_list_blocks`
--

INSERT INTO `components_block_articles_list_blocks` (`id`, `count_on_page`) VALUES
(3, 5),
(4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `components_block_article_detail_blocks`
--

CREATE TABLE `components_block_article_detail_blocks` (
  `id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `components_block_article_detail_blocks`
--

INSERT INTO `components_block_article_detail_blocks` (`id`) VALUES
(2),
(3);

-- --------------------------------------------------------

--
-- Table structure for table `components_block_contact_form_blocks`
--

CREATE TABLE `components_block_contact_form_blocks` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `components_block_contact_form_blocks`
--

INSERT INTO `components_block_contact_form_blocks` (`id`, `title`) VALUES
(1, 'Kontaktní formulář'),
(2, 'Contact form');

-- --------------------------------------------------------

--
-- Table structure for table `components_block_template_blocks`
--

CREATE TABLE `components_block_template_blocks` (
  `id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_block_template_blocks_template_links`
--

CREATE TABLE `components_block_template_blocks_template_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `template_block_id` int(10) UNSIGNED DEFAULT NULL,
  `template_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_block_video_blocks`
--

CREATE TABLE `components_block_video_blocks` (
  `id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `components_block_video_blocks`
--

INSERT INTO `components_block_video_blocks` (`id`) VALUES
(1),
(2);

-- --------------------------------------------------------

--
-- Table structure for table `components_block_video_blocks_components`
--

CREATE TABLE `components_block_video_blocks_components` (
  `id` int(10) UNSIGNED NOT NULL,
  `entity_id` int(10) UNSIGNED DEFAULT NULL,
  `component_id` int(10) UNSIGNED DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `components_block_video_blocks_components`
--

INSERT INTO `components_block_video_blocks_components` (`id`, `entity_id`, `component_id`, `component_type`, `field`, `order`) VALUES
(1, 1, 2, 'complementary.video', 'video', NULL),
(2, 2, 3, 'complementary.video', 'video', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `components_complementary_buttons`
--

CREATE TABLE `components_complementary_buttons` (
  `id` int(10) UNSIGNED NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `link_external` varchar(255) DEFAULT NULL,
  `open_in_new_tab` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_complementary_buttons_page_links`
--

CREATE TABLE `components_complementary_buttons_page_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `button_id` int(10) UNSIGNED DEFAULT NULL,
  `page_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_complementary_ecomails`
--

CREATE TABLE `components_complementary_ecomails` (
  `id` int(10) UNSIGNED NOT NULL,
  `api_key` varchar(255) DEFAULT NULL,
  `list_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_complementary_mailchimps`
--

CREATE TABLE `components_complementary_mailchimps` (
  `id` int(10) UNSIGNED NOT NULL,
  `server_prefix` varchar(255) DEFAULT NULL,
  `api_key` varchar(255) DEFAULT NULL,
  `list_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_complementary_videos`
--

CREATE TABLE `components_complementary_videos` (
  `id` int(10) UNSIGNED NOT NULL,
  `external_video` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `components_complementary_videos`
--

INSERT INTO `components_complementary_videos` (`id`, `external_video`) VALUES
(1, '{\"url\": \"\"}'),
(2, '{\"url\": \"https://www.youtube.com/watch?v=0pg_Y41waaE\", \"provider\": \"youtube\", \"providerUid\": \"0pg_Y41waaE\"}'),
(3, '{\"url\": \"https://www.youtube.com/watch?v=0pg_Y41waaE\", \"provider\": \"youtube\", \"providerUid\": \"0pg_Y41waaE\"}');

-- --------------------------------------------------------

--
-- Table structure for table `components_menu_menu_items`
--

CREATE TABLE `components_menu_menu_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `external_url` varchar(255) DEFAULT NULL,
  `open_in_new_tab` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `components_menu_menu_items`
--

INSERT INTO `components_menu_menu_items` (`id`, `label`, `external_url`, `open_in_new_tab`) VALUES
(3, 'Úvod', NULL, 0),
(4, 'O nás', NULL, 0),
(5, 'Homepage', NULL, 0),
(6, 'About us', NULL, 0),
(7, 'Články', NULL, 0),
(8, 'Blog', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `components_menu_menu_items_page_links`
--

CREATE TABLE `components_menu_menu_items_page_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `menu_item_id` int(10) UNSIGNED DEFAULT NULL,
  `page_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `components_menu_menu_items_page_links`
--

INSERT INTO `components_menu_menu_items_page_links` (`id`, `menu_item_id`, `page_id`) VALUES
(3, 3, 7),
(4, 4, 11),
(5, 5, 8),
(6, 6, 12),
(7, 7, 13),
(8, 8, 14);

-- --------------------------------------------------------

--
-- Table structure for table `components_shared_global_seos`
--

CREATE TABLE `components_shared_global_seos` (
  `id` int(10) UNSIGNED NOT NULL,
  `site_name` varchar(255) DEFAULT NULL,
  `title_suffix` varchar(255) DEFAULT NULL,
  `description` longtext,
  `prevent_indexing` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_shared_global_seos_components`
--

CREATE TABLE `components_shared_global_seos_components` (
  `id` int(10) UNSIGNED NOT NULL,
  `entity_id` int(10) UNSIGNED DEFAULT NULL,
  `component_id` int(10) UNSIGNED DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_shared_metas`
--

CREATE TABLE `components_shared_metas` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `content` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_shared_meta_socials`
--

CREATE TABLE `components_shared_meta_socials` (
  `id` int(10) UNSIGNED NOT NULL,
  `social_network` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_shared_seos`
--

CREATE TABLE `components_shared_seos` (
  `id` int(10) UNSIGNED NOT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(255) DEFAULT NULL,
  `keywords` longtext,
  `meta_robots` varchar(255) DEFAULT NULL,
  `structured_data` json DEFAULT NULL,
  `meta_viewport` varchar(255) DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `prevent_indexing` tinyint(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_shared_seos_components`
--

CREATE TABLE `components_shared_seos_components` (
  `id` int(10) UNSIGNED NOT NULL,
  `entity_id` int(10) UNSIGNED DEFAULT NULL,
  `component_id` int(10) UNSIGNED DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `components_shared_sitemaps`
--

CREATE TABLE `components_shared_sitemaps` (
  `id` int(10) UNSIGNED NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `change_frequency` varchar(255) DEFAULT NULL,
  `priority` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contact_forms`
--

CREATE TABLE `contact_forms` (
  `id` int(10) UNSIGNED NOT NULL,
  `mail_from` varchar(255) DEFAULT NULL,
  `mail_to` varchar(255) DEFAULT NULL,
  `mail_subject` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL,
  `success_message` varchar(255) DEFAULT NULL,
  `error_message` varchar(255) DEFAULT NULL,
  `checkbox_label` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_forms`
--

INSERT INTO `contact_forms` (`id`, `mail_from`, `mail_to`, `mail_subject`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `locale`, `success_message`, `error_message`, `checkbox_label`) VALUES
(1, NULL, NULL, NULL, '2024-01-08 15:36:55.670000', '2024-01-09 08:56:07.854000', '2024-01-08 15:36:56.176000', 1, 1, 'cs', 'Zpráva byla úspěšně odeslána', 'Při odesílání zprávy nastala chyba', 'Souhlasím se zpracováním osobních údajů'),
(2, NULL, NULL, NULL, '2024-01-08 16:10:11.497000', '2024-01-09 08:56:27.319000', '2024-01-08 16:10:14.176000', 1, 1, 'en', 'Message sent successfully', 'An error occurred while sending a message', 'I agree to the processing of personal data');

-- --------------------------------------------------------

--
-- Table structure for table `contact_forms_localizations_links`
--

CREATE TABLE `contact_forms_localizations_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `contact_form_id` int(10) UNSIGNED DEFAULT NULL,
  `inv_contact_form_id` int(10) UNSIGNED DEFAULT NULL,
  `contact_form_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_forms_localizations_links`
--

INSERT INTO `contact_forms_localizations_links` (`id`, `contact_form_id`, `inv_contact_form_id`, `contact_form_order`) VALUES
(1, 2, 1, 1),
(2, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `alternative_text` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `formats` json DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  `ext` varchar(255) DEFAULT NULL,
  `mime` varchar(255) DEFAULT NULL,
  `size` decimal(10,2) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `preview_url` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_metadata` json DEFAULT NULL,
  `folder_path` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `alternative_text`, `caption`, `width`, `height`, `formats`, `hash`, `ext`, `mime`, `size`, `url`, `preview_url`, `provider`, `provider_metadata`, `folder_path`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`) VALUES
(1, 'img.png', NULL, NULL, 453, 258, '{\"thumbnail\": {\"ext\": \".png\", \"url\": \"/uploads/thumbnail_img_9ae9c4d94e.png\", \"hash\": \"thumbnail_img_9ae9c4d94e\", \"mime\": \"image/png\", \"name\": \"thumbnail_img.png\", \"path\": null, \"size\": 28.52, \"width\": 245, \"height\": 140}}', 'img_9ae9c4d94e', '.png', 'image/png', '20.70', '/uploads/img_9ae9c4d94e.png', NULL, 'local', NULL, '/', '2023-08-16 12:01:11.287000', '2023-08-16 12:01:11.287000', 1, 1),
(2, 'video.mp4', NULL, NULL, NULL, NULL, NULL, 'video_71e37da196', '.mp4', 'video/mp4', '1864.58', '/uploads/video_71e37da196.mp4', NULL, 'local', NULL, '/', '2023-08-16 14:20:00.869000', '2023-08-16 14:20:00.869000', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `files_folder_links`
--

CREATE TABLE `files_folder_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `file_id` int(10) UNSIGNED DEFAULT NULL,
  `folder_id` int(10) UNSIGNED DEFAULT NULL,
  `file_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `files_related_morphs`
--

CREATE TABLE `files_related_morphs` (
  `id` int(10) UNSIGNED NOT NULL,
  `file_id` int(10) UNSIGNED DEFAULT NULL,
  `related_id` int(10) UNSIGNED DEFAULT NULL,
  `related_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `files_related_morphs`
--

INSERT INTO `files_related_morphs` (`id`, `file_id`, `related_id`, `related_type`, `field`, `order`) VALUES
(1, 1, 1, 'api::article.article', 'image', 1),
(2, 1, 2, 'api::article.article', 'image', 1),
(8, 2, 1, 'complementary.video', 'uploadedVideo', 1),
(9, 1, 1, 'complementary.video', 'optionalImage', 1),
(12, 1, 3, 'api::article.article', 'image', 1),
(13, 1, 4, 'api::article.article', 'image', 1),
(15, 1, 5, 'api::article.article', 'image', 1),
(16, 1, 6, 'api::article.article', 'image', 1);

-- --------------------------------------------------------

--
-- Table structure for table `i18n_locale`
--

CREATE TABLE `i18n_locale` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `i18n_locale`
--

INSERT INTO `i18n_locale` (`id`, `name`, `code`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`) VALUES
(2, 'Czech (cs)', 'cs', '2023-08-16 11:55:28.095000', '2023-08-16 11:55:28.095000', 1, 1),
(3, 'English (en)', 'en', '2024-01-08 12:05:06.354000', '2024-01-08 12:05:06.354000', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `icons`
--

CREATE TABLE `icons` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `codename` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `title`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `locale`) VALUES
(2, 'Menu', '2024-01-08 12:54:45.822000', '2024-01-08 14:31:13.927000', '2024-01-08 12:54:46.402000', 1, 1, 'cs'),
(3, 'Menu', '2024-01-08 12:55:45.069000', '2024-01-08 14:31:20.779000', '2024-01-08 12:55:45.696000', 1, 1, 'en');

-- --------------------------------------------------------

--
-- Table structure for table `menus_components`
--

CREATE TABLE `menus_components` (
  `id` int(10) UNSIGNED NOT NULL,
  `entity_id` int(10) UNSIGNED DEFAULT NULL,
  `component_id` int(10) UNSIGNED DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menus_components`
--

INSERT INTO `menus_components` (`id`, `entity_id`, `component_id`, `component_type`, `field`, `order`) VALUES
(3, 2, 3, 'menu.menu-item', 'items', 1),
(4, 2, 4, 'menu.menu-item', 'items', 2),
(6, 3, 5, 'menu.menu-item', 'items', 1),
(7, 3, 6, 'menu.menu-item', 'items', 2),
(9, 2, 7, 'menu.menu-item', 'items', 3),
(12, 3, 8, 'menu.menu-item', 'items', 3);

-- --------------------------------------------------------

--
-- Table structure for table `menus_localizations_links`
--

CREATE TABLE `menus_localizations_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `menu_id` int(10) UNSIGNED DEFAULT NULL,
  `inv_menu_id` int(10) UNSIGNED DEFAULT NULL,
  `menu_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menus_localizations_links`
--

INSERT INTO `menus_localizations_links` (`id`, `menu_id`, `inv_menu_id`, `menu_order`) VALUES
(1, 3, 2, 1),
(2, 2, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` longtext,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `phone`, `email`, `message`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`, `company`) VALUES
(1, 'Jakub Vávra', '+420 722 188 913', 'jakub.vavra1123@gmail.com', 'Ahoj', '2024-01-09 09:00:09.244000', '2024-01-09 09:00:09.244000', NULL, NULL, 'SYMBIO');

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `url`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `locale`) VALUES
(7, 'Hlavní stránka', 'homepage', '2024-01-08 12:51:30.892000', '2024-01-08 15:34:09.869000', '2024-01-08 12:51:33.350000', 1, 1, 'cs'),
(8, 'Homepage', 'homepage-en', '2024-01-08 12:51:58.606000', '2024-01-08 15:43:18.166000', '2024-01-08 12:51:59.309000', 1, 1, 'en'),
(9, 'Detail článku', 'clanky/:slug', '2024-01-08 12:52:18.807000', '2024-01-08 12:52:37.393000', '2024-01-08 12:52:19.627000', 1, 1, 'cs'),
(10, 'Article detail', 'blog/:slug', '2024-01-08 12:52:37.379000', '2024-01-08 12:52:45.184000', '2024-01-08 12:52:38.051000', 1, 1, 'en'),
(11, 'O nás', 'o-nas', '2024-01-08 12:52:55.921000', '2024-01-08 13:56:54.123000', '2024-01-08 12:52:56.548000', 1, 1, 'cs'),
(12, 'About us', 'about-us', '2024-01-08 12:53:06.804000', '2024-01-08 13:57:08.560000', '2024-01-08 12:53:07.450000', 1, 1, 'en'),
(13, 'Články', 'clanky', '2024-01-08 14:29:48.052000', '2024-01-08 15:42:52.991000', '2024-01-08 14:29:48.635000', 1, 1, 'cs'),
(14, 'Blog', 'blog', '2024-01-08 14:29:59.370000', '2024-01-08 14:37:30.766000', '2024-01-08 14:29:59.990000', 1, 1, 'en');

-- --------------------------------------------------------

--
-- Table structure for table `pages_components`
--

CREATE TABLE `pages_components` (
  `id` int(10) UNSIGNED NOT NULL,
  `entity_id` int(10) UNSIGNED DEFAULT NULL,
  `component_id` int(10) UNSIGNED DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pages_components`
--

INSERT INTO `pages_components` (`id`, `entity_id`, `component_id`, `component_type`, `field`, `order`) VALUES
(24, 9, 2, 'block.article-detail-block', 'blocks', 1),
(25, 10, 3, 'block.article-detail-block', 'blocks', 1),
(27, 11, 1, 'block.video-block', 'blocks', 1),
(28, 12, 2, 'block.video-block', 'blocks', 1),
(36, 14, 4, 'block.articles-list-block', 'blocks', 1),
(40, 7, 1, 'block.contact-form-block', 'blocks', 1),
(42, 13, 3, 'block.articles-list-block', 'blocks', 1),
(43, 8, 2, 'block.contact-form-block', 'blocks', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pages_localizations_links`
--

CREATE TABLE `pages_localizations_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `page_id` int(10) UNSIGNED DEFAULT NULL,
  `inv_page_id` int(10) UNSIGNED DEFAULT NULL,
  `page_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pages_localizations_links`
--

INSERT INTO `pages_localizations_links` (`id`, `page_id`, `inv_page_id`, `page_order`) VALUES
(1, 8, 7, 1),
(2, 7, 8, 1),
(3, 10, 9, 1),
(4, 9, 10, 1),
(5, 12, 11, 1),
(6, 11, 12, 1),
(7, 14, 13, 1),
(8, 13, 14, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pages_parent_links`
--

CREATE TABLE `pages_parent_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `page_id` int(10) UNSIGNED DEFAULT NULL,
  `inv_page_id` int(10) UNSIGNED DEFAULT NULL,
  `page_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pages_parent_links`
--

INSERT INTO `pages_parent_links` (`id`, `page_id`, `inv_page_id`, `page_order`) VALUES
(1, 13, 7, 2),
(2, 11, 7, 1),
(3, 14, 8, 2),
(4, 12, 8, 1),
(5, 9, 13, 1),
(6, 10, 14, 1);

-- --------------------------------------------------------

--
-- Table structure for table `redirects`
--

CREATE TABLE `redirects` (
  `id` int(10) UNSIGNED NOT NULL,
  `redirect_from` varchar(255) DEFAULT NULL,
  `redirect_to` varchar(255) DEFAULT NULL,
  `status_code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `slugs`
--

CREATE TABLE `slugs` (
  `id` int(10) UNSIGNED NOT NULL,
  `slug` longtext,
  `count` int(11) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slugs`
--

INSERT INTO `slugs` (`id`, `slug`, `count`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`) VALUES
(1, 'test', 2, '2024-01-08 12:02:36.035000', '2024-01-08 12:02:36.035000', NULL, NULL),
(2, 'clanek-1', 1, '2024-01-08 12:53:18.665000', '2024-01-08 12:53:18.665000', NULL, NULL),
(3, 'article-1', 1, '2024-01-08 12:53:46.035000', '2024-01-08 12:53:46.035000', NULL, NULL),
(4, 'clanek-2', 1, '2024-01-08 14:24:52.761000', '2024-01-08 14:24:52.761000', NULL, NULL),
(5, 'article-2', 1, '2024-01-08 14:25:14.434000', '2024-01-08 14:25:14.434000', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `strapi_api_tokens`
--

CREATE TABLE `strapi_api_tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `access_key` varchar(255) DEFAULT NULL,
  `last_used_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `lifespan` bigint(20) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `strapi_api_token_permissions`
--

CREATE TABLE `strapi_api_token_permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `strapi_api_token_permissions_token_links`
--

CREATE TABLE `strapi_api_token_permissions_token_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `api_token_permission_id` int(10) UNSIGNED DEFAULT NULL,
  `api_token_id` int(10) UNSIGNED DEFAULT NULL,
  `api_token_permission_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `strapi_core_store_settings`
--

CREATE TABLE `strapi_core_store_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `value` longtext,
  `type` varchar(255) DEFAULT NULL,
  `environment` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `strapi_core_store_settings`
--

INSERT INTO `strapi_core_store_settings` (`id`, `key`, `value`, `type`, `environment`, `tag`) VALUES
(1, 'strapi_content_types_schema', '{\"admin::permission\":{\"collectionName\":\"admin_permissions\",\"info\":{\"name\":\"Permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"actionParameters\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"subject\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false},\"properties\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"conditions\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":[]},\"role\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::role\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_permissions\",\"info\":{\"name\":\"Permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"actionParameters\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"subject\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false},\"properties\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"conditions\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":[]},\"role\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::role\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"permission\",\"connection\":\"default\",\"uid\":\"admin::permission\",\"plugin\":\"admin\",\"globalId\":\"AdminPermission\"},\"admin::user\":{\"collectionName\":\"admin_users\",\"info\":{\"name\":\"User\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"firstname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"lastname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"username\":{\"type\":\"string\",\"unique\":false,\"configurable\":false,\"required\":false},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true,\"unique\":true,\"private\":true},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"required\":false,\"private\":true,\"searchable\":false},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"registrationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"isActive\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"roles\":{\"configurable\":false,\"private\":true,\"type\":\"relation\",\"relation\":\"manyToMany\",\"inversedBy\":\"users\",\"target\":\"admin::role\",\"collectionName\":\"strapi_users_roles\"},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"preferedLanguage\":{\"type\":\"string\",\"configurable\":false,\"required\":false,\"searchable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"config\":{\"attributes\":{\"resetPasswordToken\":{\"hidden\":true},\"registrationToken\":{\"hidden\":true}}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_users\",\"info\":{\"name\":\"User\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"firstname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"lastname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"username\":{\"type\":\"string\",\"unique\":false,\"configurable\":false,\"required\":false},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true,\"unique\":true,\"private\":true},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"required\":false,\"private\":true,\"searchable\":false},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"registrationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"isActive\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"roles\":{\"configurable\":false,\"private\":true,\"type\":\"relation\",\"relation\":\"manyToMany\",\"inversedBy\":\"users\",\"target\":\"admin::role\",\"collectionName\":\"strapi_users_roles\"},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"preferedLanguage\":{\"type\":\"string\",\"configurable\":false,\"required\":false,\"searchable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"user\",\"connection\":\"default\",\"uid\":\"admin::user\",\"plugin\":\"admin\",\"globalId\":\"AdminUser\"},\"admin::role\":{\"collectionName\":\"admin_roles\",\"info\":{\"name\":\"Role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"code\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"configurable\":false},\"users\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"mappedBy\":\"roles\",\"target\":\"admin::user\"},\"permissions\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"mappedBy\":\"role\",\"target\":\"admin::permission\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_roles\",\"info\":{\"name\":\"Role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"code\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"configurable\":false},\"users\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"mappedBy\":\"roles\",\"target\":\"admin::user\"},\"permissions\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"mappedBy\":\"role\",\"target\":\"admin::permission\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"role\",\"connection\":\"default\",\"uid\":\"admin::role\",\"plugin\":\"admin\",\"globalId\":\"AdminRole\"},\"admin::api-token\":{\"collectionName\":\"strapi_api_tokens\",\"info\":{\"name\":\"Api Token\",\"singularName\":\"api-token\",\"pluralName\":\"api-tokens\",\"displayName\":\"Api Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"unique\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"type\":{\"type\":\"enumeration\",\"enum\":[\"read-only\",\"full-access\",\"custom\"],\"configurable\":false,\"required\":true,\"default\":\"read-only\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"searchable\":false},\"lastUsedAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"permissions\":{\"type\":\"relation\",\"target\":\"admin::api-token-permission\",\"relation\":\"oneToMany\",\"mappedBy\":\"token\",\"configurable\":false,\"required\":false},\"expiresAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"lifespan\":{\"type\":\"biginteger\",\"configurable\":false,\"required\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_api_tokens\",\"info\":{\"name\":\"Api Token\",\"singularName\":\"api-token\",\"pluralName\":\"api-tokens\",\"displayName\":\"Api Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"unique\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"type\":{\"type\":\"enumeration\",\"enum\":[\"read-only\",\"full-access\",\"custom\"],\"configurable\":false,\"required\":true,\"default\":\"read-only\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"searchable\":false},\"lastUsedAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"permissions\":{\"type\":\"relation\",\"target\":\"admin::api-token-permission\",\"relation\":\"oneToMany\",\"mappedBy\":\"token\",\"configurable\":false,\"required\":false},\"expiresAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"lifespan\":{\"type\":\"biginteger\",\"configurable\":false,\"required\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"api-token\",\"connection\":\"default\",\"uid\":\"admin::api-token\",\"plugin\":\"admin\",\"globalId\":\"AdminApiToken\"},\"admin::api-token-permission\":{\"collectionName\":\"strapi_api_token_permissions\",\"info\":{\"name\":\"API Token Permission\",\"description\":\"\",\"singularName\":\"api-token-permission\",\"pluralName\":\"api-token-permissions\",\"displayName\":\"API Token Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"token\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::api-token\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_api_token_permissions\",\"info\":{\"name\":\"API Token Permission\",\"description\":\"\",\"singularName\":\"api-token-permission\",\"pluralName\":\"api-token-permissions\",\"displayName\":\"API Token Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"token\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::api-token\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"api-token-permission\",\"connection\":\"default\",\"uid\":\"admin::api-token-permission\",\"plugin\":\"admin\",\"globalId\":\"AdminApiTokenPermission\"},\"admin::transfer-token\":{\"collectionName\":\"strapi_transfer_tokens\",\"info\":{\"name\":\"Transfer Token\",\"singularName\":\"transfer-token\",\"pluralName\":\"transfer-tokens\",\"displayName\":\"Transfer Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"unique\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"lastUsedAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"permissions\":{\"type\":\"relation\",\"target\":\"admin::transfer-token-permission\",\"relation\":\"oneToMany\",\"mappedBy\":\"token\",\"configurable\":false,\"required\":false},\"expiresAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"lifespan\":{\"type\":\"biginteger\",\"configurable\":false,\"required\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_transfer_tokens\",\"info\":{\"name\":\"Transfer Token\",\"singularName\":\"transfer-token\",\"pluralName\":\"transfer-tokens\",\"displayName\":\"Transfer Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"unique\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"lastUsedAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"permissions\":{\"type\":\"relation\",\"target\":\"admin::transfer-token-permission\",\"relation\":\"oneToMany\",\"mappedBy\":\"token\",\"configurable\":false,\"required\":false},\"expiresAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"lifespan\":{\"type\":\"biginteger\",\"configurable\":false,\"required\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"transfer-token\",\"connection\":\"default\",\"uid\":\"admin::transfer-token\",\"plugin\":\"admin\",\"globalId\":\"AdminTransferToken\"},\"admin::transfer-token-permission\":{\"collectionName\":\"strapi_transfer_token_permissions\",\"info\":{\"name\":\"Transfer Token Permission\",\"description\":\"\",\"singularName\":\"transfer-token-permission\",\"pluralName\":\"transfer-token-permissions\",\"displayName\":\"Transfer Token Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"token\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::transfer-token\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_transfer_token_permissions\",\"info\":{\"name\":\"Transfer Token Permission\",\"description\":\"\",\"singularName\":\"transfer-token-permission\",\"pluralName\":\"transfer-token-permissions\",\"displayName\":\"Transfer Token Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"token\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::transfer-token\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"transfer-token-permission\",\"connection\":\"default\",\"uid\":\"admin::transfer-token-permission\",\"plugin\":\"admin\",\"globalId\":\"AdminTransferTokenPermission\"},\"plugin::upload.file\":{\"collectionName\":\"files\",\"info\":{\"singularName\":\"file\",\"pluralName\":\"files\",\"displayName\":\"File\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"alternativeText\":{\"type\":\"string\",\"configurable\":false},\"caption\":{\"type\":\"string\",\"configurable\":false},\"width\":{\"type\":\"integer\",\"configurable\":false},\"height\":{\"type\":\"integer\",\"configurable\":false},\"formats\":{\"type\":\"json\",\"configurable\":false},\"hash\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"ext\":{\"type\":\"string\",\"configurable\":false},\"mime\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"size\":{\"type\":\"decimal\",\"configurable\":false,\"required\":true},\"url\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"previewUrl\":{\"type\":\"string\",\"configurable\":false},\"provider\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider_metadata\":{\"type\":\"json\",\"configurable\":false},\"related\":{\"type\":\"relation\",\"relation\":\"morphToMany\",\"configurable\":false},\"folder\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"files\",\"private\":true},\"folderPath\":{\"type\":\"string\",\"min\":1,\"required\":true,\"private\":true,\"searchable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"indexes\":[{\"name\":\"upload_files_folder_path_index\",\"columns\":[\"folder_path\"],\"type\":null},{\"name\":\"upload_files_created_at_index\",\"columns\":[\"created_at\"],\"type\":null},{\"name\":\"upload_files_updated_at_index\",\"columns\":[\"updated_at\"],\"type\":null},{\"name\":\"upload_files_name_index\",\"columns\":[\"name\"],\"type\":null},{\"name\":\"upload_files_size_index\",\"columns\":[\"size\"],\"type\":null},{\"name\":\"upload_files_ext_index\",\"columns\":[\"ext\"],\"type\":null}],\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"files\",\"info\":{\"singularName\":\"file\",\"pluralName\":\"files\",\"displayName\":\"File\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"alternativeText\":{\"type\":\"string\",\"configurable\":false},\"caption\":{\"type\":\"string\",\"configurable\":false},\"width\":{\"type\":\"integer\",\"configurable\":false},\"height\":{\"type\":\"integer\",\"configurable\":false},\"formats\":{\"type\":\"json\",\"configurable\":false},\"hash\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"ext\":{\"type\":\"string\",\"configurable\":false},\"mime\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"size\":{\"type\":\"decimal\",\"configurable\":false,\"required\":true},\"url\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"previewUrl\":{\"type\":\"string\",\"configurable\":false},\"provider\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider_metadata\":{\"type\":\"json\",\"configurable\":false},\"related\":{\"type\":\"relation\",\"relation\":\"morphToMany\",\"configurable\":false},\"folder\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"files\",\"private\":true},\"folderPath\":{\"type\":\"string\",\"min\":1,\"required\":true,\"private\":true,\"searchable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"file\",\"connection\":\"default\",\"uid\":\"plugin::upload.file\",\"plugin\":\"upload\",\"globalId\":\"UploadFile\"},\"plugin::upload.folder\":{\"collectionName\":\"upload_folders\",\"info\":{\"singularName\":\"folder\",\"pluralName\":\"folders\",\"displayName\":\"Folder\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"required\":true},\"pathId\":{\"type\":\"integer\",\"unique\":true,\"required\":true},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"children\"},\"children\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.folder\",\"mappedBy\":\"parent\"},\"files\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.file\",\"mappedBy\":\"folder\"},\"path\":{\"type\":\"string\",\"min\":1,\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"indexes\":[{\"name\":\"upload_folders_path_id_index\",\"columns\":[\"path_id\"],\"type\":\"unique\"},{\"name\":\"upload_folders_path_index\",\"columns\":[\"path\"],\"type\":\"unique\"}],\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"upload_folders\",\"info\":{\"singularName\":\"folder\",\"pluralName\":\"folders\",\"displayName\":\"Folder\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"required\":true},\"pathId\":{\"type\":\"integer\",\"unique\":true,\"required\":true},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"children\"},\"children\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.folder\",\"mappedBy\":\"parent\"},\"files\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.file\",\"mappedBy\":\"folder\"},\"path\":{\"type\":\"string\",\"min\":1,\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"folder\",\"connection\":\"default\",\"uid\":\"plugin::upload.folder\",\"plugin\":\"upload\",\"globalId\":\"UploadFolder\"},\"plugin::slugify.slug\":{\"kind\":\"collectionType\",\"collectionName\":\"slugs\",\"info\":{\"singularName\":\"slug\",\"pluralName\":\"slugs\",\"displayName\":\"slug\"},\"options\":{\"draftAndPublish\":false,\"comment\":\"\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"slug\":{\"type\":\"text\"},\"count\":{\"type\":\"integer\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"slugs\",\"info\":{\"singularName\":\"slug\",\"pluralName\":\"slugs\",\"displayName\":\"slug\"},\"options\":{\"draftAndPublish\":false,\"comment\":\"\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"slug\":{\"type\":\"text\"},\"count\":{\"type\":\"integer\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"slug\",\"connection\":\"default\",\"uid\":\"plugin::slugify.slug\",\"plugin\":\"slugify\",\"globalId\":\"SlugifySlug\"},\"plugin::i18n.locale\":{\"info\":{\"singularName\":\"locale\",\"pluralName\":\"locales\",\"collectionName\":\"locales\",\"displayName\":\"Locale\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"max\":50,\"configurable\":false},\"code\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"info\":{\"singularName\":\"locale\",\"pluralName\":\"locales\",\"collectionName\":\"locales\",\"displayName\":\"Locale\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"max\":50,\"configurable\":false},\"code\":{\"type\":\"string\",\"unique\":true,\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"locale\",\"connection\":\"default\",\"uid\":\"plugin::i18n.locale\",\"plugin\":\"i18n\",\"collectionName\":\"i18n_locale\",\"globalId\":\"I18NLocale\"},\"plugin::block-gallery.block\":{\"kind\":\"collectionType\",\"collectionName\":\"blocks\",\"info\":{\"singularName\":\"block\",\"pluralName\":\"blocks\",\"displayName\":\"🔨 Bloky\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"attributes\":{\"image\":{\"type\":\"media\",\"multiple\":false,\"required\":false,\"allowedTypes\":[\"images\"]},\"displayName\":{\"type\":\"string\"},\"blockName\":{\"type\":\"string\"},\"externalUrl\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__filename__\":\"schema.json\",\"__schema__\":{\"collectionName\":\"blocks\",\"info\":{\"singularName\":\"block\",\"pluralName\":\"blocks\",\"displayName\":\"🔨 Bloky\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"attributes\":{\"image\":{\"type\":\"media\",\"multiple\":false,\"required\":false,\"allowedTypes\":[\"images\"]},\"displayName\":{\"type\":\"string\"},\"blockName\":{\"type\":\"string\"},\"externalUrl\":{\"type\":\"string\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"block\",\"connection\":\"default\",\"uid\":\"plugin::block-gallery.block\",\"plugin\":\"block-gallery\",\"globalId\":\"BlockGalleryBlock\"},\"plugin::users-permissions.permission\":{\"collectionName\":\"up_permissions\",\"info\":{\"name\":\"permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"permissions\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"up_permissions\",\"info\":{\"name\":\"permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"permissions\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"permission\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.permission\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsPermission\"},\"plugin::users-permissions.role\":{\"collectionName\":\"up_roles\",\"info\":{\"name\":\"role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":3,\"required\":true,\"configurable\":false},\"description\":{\"type\":\"string\",\"configurable\":false},\"type\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"permissions\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.permission\",\"mappedBy\":\"role\",\"configurable\":false},\"users\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.user\",\"mappedBy\":\"role\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"up_roles\",\"info\":{\"name\":\"role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":3,\"required\":true,\"configurable\":false},\"description\":{\"type\":\"string\",\"configurable\":false},\"type\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"permissions\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.permission\",\"mappedBy\":\"role\",\"configurable\":false},\"users\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.user\",\"mappedBy\":\"role\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"role\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.role\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsRole\"},\"plugin::users-permissions.user\":{\"collectionName\":\"up_users\",\"info\":{\"name\":\"user\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"🙍 Uživatelé\"},\"options\":{\"draftAndPublish\":false},\"attributes\":{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true,\"searchable\":false},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"confirmationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"confirmed\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"users\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"config\":{\"attributes\":{\"resetPasswordToken\":{\"hidden\":true},\"confirmationToken\":{\"hidden\":true},\"provider\":{\"hidden\":true}}},\"kind\":\"collectionType\",\"__filename__\":\"schema.json\",\"__schema__\":{\"collectionName\":\"up_users\",\"info\":{\"name\":\"user\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"🙍 Uživatelé\"},\"options\":{\"draftAndPublish\":false},\"attributes\":{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true,\"searchable\":false},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"confirmationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"confirmed\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"users\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"user\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.user\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsUser\"},\"api::article.article\":{\"kind\":\"collectionType\",\"collectionName\":\"articles\",\"info\":{\"singularName\":\"article\",\"pluralName\":\"articles\",\"displayName\":\"📙 Články\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"required\":true},\"image\":{\"type\":\"media\",\"multiple\":false,\"required\":true,\"allowedTypes\":[\"images\"],\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"publishDate\":{\"type\":\"datetime\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"content\":{\"type\":\"richtext\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"slug\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":false},\"seo\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"shared.seo\"},\"sitemap\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"shared.sitemap\"},\"category\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::article-category.article-category\",\"inversedBy\":\"articles\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::article.article\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"articles\",\"info\":{\"singularName\":\"article\",\"pluralName\":\"articles\",\"displayName\":\"📙 Články\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"required\":true},\"image\":{\"type\":\"media\",\"multiple\":false,\"required\":true,\"allowedTypes\":[\"images\"],\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"publishDate\":{\"type\":\"datetime\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"content\":{\"type\":\"richtext\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"slug\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":false},\"seo\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"shared.seo\"},\"sitemap\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"shared.sitemap\"},\"category\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::article-category.article-category\",\"inversedBy\":\"articles\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"article\",\"connection\":\"default\",\"uid\":\"api::article.article\",\"apiName\":\"article\",\"globalId\":\"Article\",\"actions\":{},\"lifecycles\":{}},\"api::article-category.article-category\":{\"kind\":\"collectionType\",\"collectionName\":\"article_categories\",\"info\":{\"singularName\":\"article-category\",\"pluralName\":\"article-categories\",\"displayName\":\"📙 Kategorie článků\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"articles\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::article.article\",\"mappedBy\":\"category\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::article-category.article-category\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"article_categories\",\"info\":{\"singularName\":\"article-category\",\"pluralName\":\"article-categories\",\"displayName\":\"📙 Kategorie článků\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"articles\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::article.article\",\"mappedBy\":\"category\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"article-category\",\"connection\":\"default\",\"uid\":\"api::article-category.article-category\",\"apiName\":\"article-category\",\"globalId\":\"ArticleCategory\",\"actions\":{},\"lifecycles\":{}},\"api::contact-form.contact-form\":{\"kind\":\"singleType\",\"collectionName\":\"contact_forms\",\"info\":{\"singularName\":\"contact-form\",\"pluralName\":\"contact-forms\",\"displayName\":\"📩 Kontaktní formulář\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"mailFrom\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"mailTo\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"mailSubject\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"successMessage\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"errorMessage\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"checkboxLabel\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::contact-form.contact-form\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"contact_forms\",\"info\":{\"singularName\":\"contact-form\",\"pluralName\":\"contact-forms\",\"displayName\":\"📩 Kontaktní formulář\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"mailFrom\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"mailTo\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"mailSubject\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"successMessage\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"errorMessage\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"checkboxLabel\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true}},\"kind\":\"singleType\"},\"modelType\":\"contentType\",\"modelName\":\"contact-form\",\"connection\":\"default\",\"uid\":\"api::contact-form.contact-form\",\"apiName\":\"contact-form\",\"globalId\":\"ContactForm\",\"actions\":{},\"lifecycles\":{}},\"api::icon.icon\":{\"kind\":\"collectionType\",\"collectionName\":\"icons\",\"info\":{\"singularName\":\"icon\",\"pluralName\":\"icons\",\"displayName\":\"🧩 Ikony\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{},\"attributes\":{\"title\":{\"type\":\"string\",\"required\":true},\"codename\":{\"type\":\"string\",\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"icons\",\"info\":{\"singularName\":\"icon\",\"pluralName\":\"icons\",\"displayName\":\"🧩 Ikony\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{},\"attributes\":{\"title\":{\"type\":\"string\",\"required\":true},\"codename\":{\"type\":\"string\",\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"icon\",\"connection\":\"default\",\"uid\":\"api::icon.icon\",\"apiName\":\"icon\",\"globalId\":\"Icon\",\"actions\":{},\"lifecycles\":{}},\"api::menu.menu\":{\"kind\":\"collectionType\",\"collectionName\":\"menus\",\"info\":{\"singularName\":\"menu\",\"pluralName\":\"menus\",\"displayName\":\"🧭 Menu\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"items\":{\"displayName\":\"MenuItem\",\"type\":\"component\",\"repeatable\":true,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"menu.menu-item\",\"min\":1,\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::menu.menu\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"menus\",\"info\":{\"singularName\":\"menu\",\"pluralName\":\"menus\",\"displayName\":\"🧭 Menu\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"items\":{\"displayName\":\"MenuItem\",\"type\":\"component\",\"repeatable\":true,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"menu.menu-item\",\"min\":1,\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"menu\",\"connection\":\"default\",\"uid\":\"api::menu.menu\",\"apiName\":\"menu\",\"globalId\":\"Menu\",\"actions\":{},\"lifecycles\":{}},\"api::message.message\":{\"kind\":\"collectionType\",\"collectionName\":\"messages\",\"info\":{\"singularName\":\"message\",\"pluralName\":\"messages\",\"displayName\":\"📩 Odeslané zprávy\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{},\"attributes\":{\"name\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"message\":{\"type\":\"text\"},\"company\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"messages\",\"info\":{\"singularName\":\"message\",\"pluralName\":\"messages\",\"displayName\":\"📩 Odeslané zprávy\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{},\"attributes\":{\"name\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"message\":{\"type\":\"text\"},\"company\":{\"type\":\"string\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"message\",\"connection\":\"default\",\"uid\":\"api::message.message\",\"apiName\":\"message\",\"globalId\":\"Message\",\"actions\":{},\"lifecycles\":{}},\"api::newsletter-subscriber.newsletter-subscriber\":{\"kind\":\"collectionType\",\"collectionName\":\"newsletter_subscribers\",\"info\":{\"singularName\":\"newsletter-subscriber\",\"pluralName\":\"newsletter-subscribers\",\"displayName\":\"📩 Prihlášky k NL\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{},\"attributes\":{\"email\":{\"type\":\"email\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"newsletter_subscribers\",\"info\":{\"singularName\":\"newsletter-subscriber\",\"pluralName\":\"newsletter-subscribers\",\"displayName\":\"📩 Prihlášky k NL\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{},\"attributes\":{\"email\":{\"type\":\"email\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"newsletter-subscriber\",\"connection\":\"default\",\"uid\":\"api::newsletter-subscriber.newsletter-subscriber\",\"apiName\":\"newsletter-subscriber\",\"globalId\":\"NewsletterSubscriber\",\"actions\":{},\"lifecycles\":{}},\"api::page.page\":{\"kind\":\"collectionType\",\"collectionName\":\"pages\",\"info\":{\"singularName\":\"page\",\"pluralName\":\"pages\",\"displayName\":\"📝 Stránky\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"url\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"blocks\":{\"type\":\"dynamiczone\",\"components\":[\"block.article-detail-block\",\"block.articles-list-block\",\"block.template-block\",\"block.video-block\",\"block.contact-form-block\"],\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"pages\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::page.page\",\"mappedBy\":\"parent\"},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::page.page\",\"inversedBy\":\"pages\"},\"seo\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"shared.seo\"},\"sitemap\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"shared.sitemap\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::page.page\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"pages\",\"info\":{\"singularName\":\"page\",\"pluralName\":\"pages\",\"displayName\":\"📝 Stránky\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"url\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"blocks\":{\"type\":\"dynamiczone\",\"components\":[\"block.article-detail-block\",\"block.articles-list-block\",\"block.template-block\",\"block.video-block\",\"block.contact-form-block\"],\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"pages\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::page.page\",\"mappedBy\":\"parent\"},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::page.page\",\"inversedBy\":\"pages\"},\"seo\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"shared.seo\"},\"sitemap\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"shared.sitemap\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"page\",\"connection\":\"default\",\"uid\":\"api::page.page\",\"apiName\":\"page\",\"globalId\":\"Page\",\"actions\":{},\"lifecycles\":{}},\"api::redirect.redirect\":{\"kind\":\"collectionType\",\"collectionName\":\"redirects\",\"info\":{\"singularName\":\"redirect\",\"pluralName\":\"redirects\",\"displayName\":\"🔀 Přesměrování\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"redirectFrom\":{\"type\":\"string\"},\"redirectTo\":{\"type\":\"string\"},\"statusCode\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"redirects\",\"info\":{\"singularName\":\"redirect\",\"pluralName\":\"redirects\",\"displayName\":\"🔀 Přesměrování\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"redirectFrom\":{\"type\":\"string\"},\"redirectTo\":{\"type\":\"string\"},\"statusCode\":{\"type\":\"string\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"redirect\",\"connection\":\"default\",\"uid\":\"api::redirect.redirect\",\"apiName\":\"redirect\",\"globalId\":\"Redirect\",\"actions\":{},\"lifecycles\":{}},\"api::system-resource.system-resource\":{\"kind\":\"collectionType\",\"collectionName\":\"system_resources\",\"info\":{\"singularName\":\"system-resource\",\"pluralName\":\"system-resources\",\"displayName\":\"🧩 Všeobecné texty\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"name\":{\"pluginOptions\":{\"i18n\":{\"localized\":false}},\"type\":\"string\",\"required\":true},\"codename\":{\"pluginOptions\":{\"i18n\":{\"localized\":false}},\"type\":\"string\",\"required\":true},\"value\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"text\",\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::system-resource.system-resource\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"system_resources\",\"info\":{\"singularName\":\"system-resource\",\"pluralName\":\"system-resources\",\"displayName\":\"🧩 Všeobecné texty\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"name\":{\"pluginOptions\":{\"i18n\":{\"localized\":false}},\"type\":\"string\",\"required\":true},\"codename\":{\"pluginOptions\":{\"i18n\":{\"localized\":false}},\"type\":\"string\",\"required\":true},\"value\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"text\",\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"system-resource\",\"connection\":\"default\",\"uid\":\"api::system-resource.system-resource\",\"apiName\":\"system-resource\",\"globalId\":\"SystemResource\",\"actions\":{},\"lifecycles\":{}},\"api::template.template\":{\"kind\":\"collectionType\",\"collectionName\":\"templates\",\"info\":{\"singularName\":\"template\",\"pluralName\":\"templates\",\"displayName\":\"📝 Znovupoužitelný obsah\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"content\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"dynamiczone\",\"components\":[\"block.video-block\",\"block.contact-form-block\"],\"required\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::template.template\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"templates\",\"info\":{\"singularName\":\"template\",\"pluralName\":\"templates\",\"displayName\":\"📝 Znovupoužitelný obsah\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"content\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"dynamiczone\",\"components\":[\"block.video-block\",\"block.contact-form-block\"],\"required\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"template\",\"connection\":\"default\",\"uid\":\"api::template.template\",\"apiName\":\"template\",\"globalId\":\"Template\",\"actions\":{},\"lifecycles\":{}},\"api::web-setting.web-setting\":{\"kind\":\"singleType\",\"collectionName\":\"web_settings\",\"info\":{\"singularName\":\"web-setting\",\"pluralName\":\"web-settings\",\"displayName\":\"⚙️ Nastavení webu\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"gtmCode\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"homePage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"articleDetailPage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"mainMenu\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::menu.menu\"},\"articlesPage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"globalSeo\":{\"displayName\":\"GlobalSeo\",\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"shared.global-seo\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::web-setting.web-setting\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"web_settings\",\"info\":{\"singularName\":\"web-setting\",\"pluralName\":\"web-settings\",\"displayName\":\"⚙️ Nastavení webu\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"gtmCode\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"homePage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"articleDetailPage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"mainMenu\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::menu.menu\"},\"articlesPage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"globalSeo\":{\"displayName\":\"GlobalSeo\",\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"shared.global-seo\"}},\"kind\":\"singleType\"},\"modelType\":\"contentType\",\"modelName\":\"web-setting\",\"connection\":\"default\",\"uid\":\"api::web-setting.web-setting\",\"apiName\":\"web-setting\",\"globalId\":\"WebSetting\",\"actions\":{},\"lifecycles\":{}}}', 'object', NULL, NULL);
INSERT INTO `strapi_core_store_settings` (`id`, `key`, `value`, `type`, `environment`, `tag`) VALUES
(2, 'plugin_content_manager_configuration_components::block.articles-list-block', '{\"uid\":\"block.articles-list-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"countOnPage\":{\"edit\":{\"label\":\"Počet článků na stránku\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"countOnPage\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"countOnPage\"],\"edit\":[[{\"name\":\"countOnPage\",\"size\":6}]]},\"isComponent\":true}', 'object', NULL, NULL),
(8, 'plugin_content_manager_configuration_components::block.article-detail-block', '{\"uid\":\"block.article-detail-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\"],\"edit\":[]},\"isComponent\":true}', 'object', NULL, NULL),
(10, 'plugin_content_manager_configuration_components::block.template-block', '{\"uid\":\"block.template-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"template\":{\"edit\":{\"label\":\"Obsah\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"template\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"template\"],\"edit\":[[{\"name\":\"template\",\"size\":6}]]},\"isComponent\":true}', 'object', NULL, NULL),
(14, 'plugin_content_manager_configuration_components::complementary.button', '{\"uid\":\"complementary.button\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"label\",\"defaultSortBy\":\"label\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"label\":{\"edit\":{\"label\":\"label\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"label\",\"searchable\":true,\"sortable\":true}},\"page\":{\"edit\":{\"label\":\"page\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"page\",\"searchable\":true,\"sortable\":true}},\"linkExternal\":{\"edit\":{\"label\":\"linkExternal\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"linkExternal\",\"searchable\":true,\"sortable\":true}},\"openInNewTab\":{\"edit\":{\"label\":\"openInNewTab\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"openInNewTab\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"label\",\"page\",\"linkExternal\"],\"edit\":[[{\"name\":\"label\",\"size\":6},{\"name\":\"page\",\"size\":6}],[{\"name\":\"linkExternal\",\"size\":6},{\"name\":\"openInNewTab\",\"size\":4}]]},\"isComponent\":true}', 'object', NULL, NULL),
(16, 'plugin_content_manager_configuration_components::complementary.ecomail', '{\"uid\":\"complementary.ecomail\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"apiKey\",\"defaultSortBy\":\"apiKey\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"apiKey\":{\"edit\":{\"label\":\"apiKey\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"apiKey\",\"searchable\":true,\"sortable\":true}},\"listId\":{\"edit\":{\"label\":\"listId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"listId\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"apiKey\",\"listId\"],\"edit\":[[{\"name\":\"apiKey\",\"size\":6},{\"name\":\"listId\",\"size\":6}]]},\"isComponent\":true}', 'object', NULL, NULL),
(18, 'plugin_content_manager_configuration_components::shared.meta', '{\"uid\":\"shared.meta\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"name\":{\"edit\":{\"label\":\"Název\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"content\":{\"edit\":{\"label\":\"Hodnota\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"content\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"content\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"content\",\"size\":6}]]},\"isComponent\":true}', 'object', NULL, NULL),
(22, 'plugin_content_manager_configuration_components::complementary.mailchimp', '{\"uid\":\"complementary.mailchimp\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"serverPrefix\",\"defaultSortBy\":\"serverPrefix\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"serverPrefix\":{\"edit\":{\"label\":\"serverPrefix\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"serverPrefix\",\"searchable\":true,\"sortable\":true}},\"apiKey\":{\"edit\":{\"label\":\"apiKey\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"apiKey\",\"searchable\":true,\"sortable\":true}},\"listId\":{\"edit\":{\"label\":\"listId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"listId\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"serverPrefix\",\"apiKey\",\"listId\"],\"edit\":[[{\"name\":\"serverPrefix\",\"size\":6},{\"name\":\"apiKey\",\"size\":6}],[{\"name\":\"listId\",\"size\":6}]]},\"isComponent\":true}', 'object', NULL, NULL),
(23, 'plugin_content_manager_configuration_components::shared.global-seo', '{\"uid\":\"shared.global-seo\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"siteName\",\"defaultSortBy\":\"siteName\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"siteName\":{\"edit\":{\"label\":\"Název webové aplikace\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"siteName\",\"searchable\":true,\"sortable\":true}},\"titleSuffix\":{\"edit\":{\"label\":\"Suffix nadpisu\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"titleSuffix\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"Popisek\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"sharingImage\":{\"edit\":{\"label\":\"Obrázek v odkazu\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"sharingImage\",\"searchable\":false,\"sortable\":false}},\"favicon\":{\"edit\":{\"label\":\"favicon\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"favicon\",\"searchable\":false,\"sortable\":false}},\"preventIndexing\":{\"edit\":{\"label\":\"Zabránit indexování\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"preventIndexing\",\"searchable\":true,\"sortable\":true}},\"metaTags\":{\"edit\":{\"label\":\"Meta tagy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaTags\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"siteName\",\"titleSuffix\",\"description\"],\"edit\":[[{\"name\":\"siteName\",\"size\":6},{\"name\":\"titleSuffix\",\"size\":6}],[{\"name\":\"description\",\"size\":6},{\"name\":\"sharingImage\",\"size\":6}],[{\"name\":\"metaTags\",\"size\":12}],[{\"name\":\"preventIndexing\",\"size\":6}]]},\"isComponent\":true}', 'object', NULL, NULL),
(24, 'plugin_content_manager_configuration_components::menu.menu-item', '{\"uid\":\"menu.menu-item\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"label\",\"defaultSortBy\":\"label\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"label\":{\"edit\":{\"label\":\"Text odkazu\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"label\",\"searchable\":true,\"sortable\":true}},\"page\":{\"edit\":{\"label\":\"Interní stránka\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"page\",\"searchable\":true,\"sortable\":true}},\"externalUrl\":{\"edit\":{\"label\":\"Externí odkaz\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"externalUrl\",\"searchable\":true,\"sortable\":true}},\"openInNewTab\":{\"edit\":{\"label\":\"Otevřít v novém okně?\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"openInNewTab\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"label\",\"page\",\"externalUrl\"],\"edit\":[[{\"name\":\"label\",\"size\":6},{\"name\":\"openInNewTab\",\"size\":6}],[{\"name\":\"page\",\"size\":6},{\"name\":\"externalUrl\",\"size\":6}]]},\"isComponent\":true}', 'object', NULL, NULL),
(25, 'plugin_content_manager_configuration_components::shared.meta-social', '{\"uid\":\"shared.meta-social\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"socialNetwork\":{\"edit\":{\"label\":\"Sociální síť\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"socialNetwork\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"Nadpis\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"Popisek\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"image\":{\"edit\":{\"label\":\"Obrázek\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"image\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"socialNetwork\",\"title\",\"description\"],\"edit\":[[{\"name\":\"socialNetwork\",\"size\":6},{\"name\":\"image\",\"size\":6}],[{\"name\":\"title\",\"size\":6},{\"name\":\"description\",\"size\":6}]]},\"isComponent\":true}', 'object', NULL, NULL),
(26, 'plugin_content_manager_configuration_components::shared.seo', '{\"uid\":\"shared.seo\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"metaTitle\",\"defaultSortBy\":\"metaTitle\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"metaTitle\":{\"edit\":{\"label\":\"Meta nadpis\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaTitle\",\"searchable\":true,\"sortable\":true}},\"metaDescription\":{\"edit\":{\"label\":\"Meta popisek\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaDescription\",\"searchable\":true,\"sortable\":true}},\"metaSocial\":{\"edit\":{\"label\":\"Sociální sítě\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaSocial\",\"searchable\":false,\"sortable\":false}},\"keywords\":{\"edit\":{\"label\":\"Klíčová slova\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"keywords\",\"searchable\":true,\"sortable\":true}},\"metaRobots\":{\"edit\":{\"label\":\"Robots\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaRobots\",\"searchable\":true,\"sortable\":true}},\"structuredData\":{\"edit\":{\"label\":\"Strukturovaná data\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"structuredData\",\"searchable\":false,\"sortable\":false}},\"metaViewport\":{\"edit\":{\"label\":\"Viewport\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaViewport\",\"searchable\":true,\"sortable\":true}},\"canonicalURL\":{\"edit\":{\"label\":\"Canonical URL\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"canonicalURL\",\"searchable\":true,\"sortable\":true}},\"preventIndexing\":{\"edit\":{\"label\":\"Zabránit indexování\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"preventIndexing\",\"searchable\":true,\"sortable\":true}},\"meta\":{\"edit\":{\"label\":\"Meta tagy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"meta\",\"searchable\":false,\"sortable\":false}},\"title\":{\"edit\":{\"label\":\"Nadpis\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"metaTitle\",\"metaDescription\",\"metaSocial\"],\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"metaTitle\",\"size\":6}],[{\"name\":\"metaDescription\",\"size\":12}],[{\"name\":\"metaSocial\",\"size\":12}],[{\"name\":\"keywords\",\"size\":6},{\"name\":\"metaRobots\",\"size\":6}],[{\"name\":\"metaViewport\",\"size\":6},{\"name\":\"canonicalURL\",\"size\":6}],[{\"name\":\"meta\",\"size\":12}],[{\"name\":\"preventIndexing\",\"size\":6}],[{\"name\":\"structuredData\",\"size\":12}]]},\"isComponent\":true}', 'object', NULL, NULL),
(27, 'plugin_content_manager_configuration_components::shared.sitemap', '{\"uid\":\"shared.sitemap\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"enabled\":{\"edit\":{\"label\":\"Povolit\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"enabled\",\"searchable\":true,\"sortable\":true}},\"changeFrequency\":{\"edit\":{\"label\":\"Frekvence změny\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"changeFrequency\",\"searchable\":true,\"sortable\":true}},\"priority\":{\"edit\":{\"label\":\"Priorita\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"priority\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"enabled\",\"changeFrequency\",\"priority\"],\"edit\":[[{\"name\":\"changeFrequency\",\"size\":6},{\"name\":\"priority\",\"size\":6}],[{\"name\":\"enabled\",\"size\":6}]]},\"isComponent\":true}', 'object', NULL, NULL),
(28, 'plugin_content_manager_configuration_content_types::admin::permission', '{\"uid\":\"admin::permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"actionParameters\":{\"edit\":{\"label\":\"actionParameters\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"actionParameters\",\"searchable\":false,\"sortable\":false}},\"subject\":{\"edit\":{\"label\":\"subject\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"subject\",\"searchable\":true,\"sortable\":true}},\"properties\":{\"edit\":{\"label\":\"properties\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"properties\",\"searchable\":false,\"sortable\":false}},\"conditions\":{\"edit\":{\"label\":\"conditions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"conditions\",\"searchable\":false,\"sortable\":false}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"subject\",\"role\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"subject\",\"size\":6}],[{\"name\":\"properties\",\"size\":12}],[{\"name\":\"conditions\",\"size\":12}],[{\"name\":\"role\",\"size\":6}],[{\"name\":\"actionParameters\",\"size\":12}]]}}', 'object', NULL, NULL),
(29, 'plugin_content_manager_configuration_content_types::plugin::i18n.locale', '{\"uid\":\"plugin::i18n.locale\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"code\":{\"edit\":{\"label\":\"code\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"code\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"code\",\"createdAt\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"code\",\"size\":6}]]}}', 'object', NULL, NULL),
(30, 'plugin_content_manager_configuration_content_types::admin::api-token-permission', '{\"uid\":\"admin::api-token-permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"token\":{\"edit\":{\"label\":\"token\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"token\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"token\",\"createdAt\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"token\",\"size\":6}]]}}', 'object', NULL, NULL),
(31, 'plugin_content_manager_configuration_content_types::admin::transfer-token-permission', '{\"uid\":\"admin::transfer-token-permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"token\":{\"edit\":{\"label\":\"token\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"token\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"token\",\"createdAt\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"token\",\"size\":6}]]}}', 'object', NULL, NULL),
(32, 'plugin_content_manager_configuration_content_types::admin::transfer-token', '{\"uid\":\"admin::transfer-token\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"accessKey\":{\"edit\":{\"label\":\"accessKey\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"accessKey\",\"searchable\":true,\"sortable\":true}},\"lastUsedAt\":{\"edit\":{\"label\":\"lastUsedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lastUsedAt\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"expiresAt\":{\"edit\":{\"label\":\"expiresAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"expiresAt\",\"searchable\":true,\"sortable\":true}},\"lifespan\":{\"edit\":{\"label\":\"lifespan\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lifespan\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"accessKey\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"accessKey\",\"size\":6},{\"name\":\"lastUsedAt\",\"size\":6}],[{\"name\":\"permissions\",\"size\":6},{\"name\":\"expiresAt\",\"size\":6}],[{\"name\":\"lifespan\",\"size\":4}]]}}', 'object', NULL, NULL),
(33, 'plugin_content_manager_configuration_content_types::plugin::upload.folder', '{\"uid\":\"plugin::upload.folder\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"pathId\":{\"edit\":{\"label\":\"pathId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"pathId\",\"searchable\":true,\"sortable\":true}},\"parent\":{\"edit\":{\"label\":\"parent\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"parent\",\"searchable\":true,\"sortable\":true}},\"children\":{\"edit\":{\"label\":\"children\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"children\",\"searchable\":false,\"sortable\":false}},\"files\":{\"edit\":{\"label\":\"files\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"files\",\"searchable\":false,\"sortable\":false}},\"path\":{\"edit\":{\"label\":\"path\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"path\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"pathId\",\"parent\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"pathId\",\"size\":4}],[{\"name\":\"parent\",\"size\":6},{\"name\":\"children\",\"size\":6}],[{\"name\":\"files\",\"size\":6},{\"name\":\"path\",\"size\":6}]]}}', 'object', NULL, NULL),
(34, 'plugin_content_manager_configuration_content_types::plugin::upload.file', '{\"uid\":\"plugin::upload.file\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"alternativeText\":{\"edit\":{\"label\":\"alternativeText\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"alternativeText\",\"searchable\":true,\"sortable\":true}},\"caption\":{\"edit\":{\"label\":\"caption\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"caption\",\"searchable\":true,\"sortable\":true}},\"width\":{\"edit\":{\"label\":\"width\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"width\",\"searchable\":true,\"sortable\":true}},\"height\":{\"edit\":{\"label\":\"height\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"height\",\"searchable\":true,\"sortable\":true}},\"formats\":{\"edit\":{\"label\":\"formats\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"formats\",\"searchable\":false,\"sortable\":false}},\"hash\":{\"edit\":{\"label\":\"hash\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"hash\",\"searchable\":true,\"sortable\":true}},\"ext\":{\"edit\":{\"label\":\"ext\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"ext\",\"searchable\":true,\"sortable\":true}},\"mime\":{\"edit\":{\"label\":\"mime\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mime\",\"searchable\":true,\"sortable\":true}},\"size\":{\"edit\":{\"label\":\"size\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"size\",\"searchable\":true,\"sortable\":true}},\"url\":{\"edit\":{\"label\":\"url\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"url\",\"searchable\":true,\"sortable\":true}},\"previewUrl\":{\"edit\":{\"label\":\"previewUrl\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"previewUrl\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"provider\",\"searchable\":true,\"sortable\":true}},\"provider_metadata\":{\"edit\":{\"label\":\"provider_metadata\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"provider_metadata\",\"searchable\":false,\"sortable\":false}},\"folder\":{\"edit\":{\"label\":\"folder\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"folder\",\"searchable\":true,\"sortable\":true}},\"folderPath\":{\"edit\":{\"label\":\"folderPath\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"folderPath\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"alternativeText\",\"caption\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"alternativeText\",\"size\":6}],[{\"name\":\"caption\",\"size\":6},{\"name\":\"width\",\"size\":4}],[{\"name\":\"height\",\"size\":4}],[{\"name\":\"formats\",\"size\":12}],[{\"name\":\"hash\",\"size\":6},{\"name\":\"ext\",\"size\":6}],[{\"name\":\"mime\",\"size\":6},{\"name\":\"size\",\"size\":4}],[{\"name\":\"url\",\"size\":6},{\"name\":\"previewUrl\",\"size\":6}],[{\"name\":\"provider\",\"size\":6}],[{\"name\":\"provider_metadata\",\"size\":12}],[{\"name\":\"folder\",\"size\":6},{\"name\":\"folderPath\",\"size\":6}]]}}', 'object', NULL, NULL),
(35, 'plugin_content_manager_configuration_content_types::plugin::slugify.slug', '{\"uid\":\"plugin::slugify.slug\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"slug\":{\"edit\":{\"label\":\"slug\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"slug\",\"searchable\":true,\"sortable\":true}},\"count\":{\"edit\":{\"label\":\"count\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"count\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"slug\",\"count\",\"createdAt\"],\"edit\":[[{\"name\":\"slug\",\"size\":6},{\"name\":\"count\",\"size\":4}]]}}', 'object', NULL, NULL),
(36, 'plugin_content_manager_configuration_content_types::admin::user', '{\"uid\":\"admin::user\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"firstname\",\"defaultSortBy\":\"firstname\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"firstname\":{\"edit\":{\"label\":\"firstname\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"firstname\",\"searchable\":true,\"sortable\":true}},\"lastname\":{\"edit\":{\"label\":\"lastname\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lastname\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"resetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"resetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"registrationToken\":{\"edit\":{\"label\":\"registrationToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"registrationToken\",\"searchable\":true,\"sortable\":true}},\"isActive\":{\"edit\":{\"label\":\"isActive\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"isActive\",\"searchable\":true,\"sortable\":true}},\"roles\":{\"edit\":{\"label\":\"roles\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"roles\",\"searchable\":false,\"sortable\":false}},\"blocked\":{\"edit\":{\"label\":\"blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blocked\",\"searchable\":true,\"sortable\":true}},\"preferedLanguage\":{\"edit\":{\"label\":\"preferedLanguage\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"preferedLanguage\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"firstname\",\"lastname\",\"username\"],\"edit\":[[{\"name\":\"firstname\",\"size\":6},{\"name\":\"lastname\",\"size\":6}],[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"password\",\"size\":6},{\"name\":\"isActive\",\"size\":4}],[{\"name\":\"roles\",\"size\":6},{\"name\":\"blocked\",\"size\":4}],[{\"name\":\"preferedLanguage\",\"size\":6}]]}}', 'object', NULL, NULL),
(37, 'plugin_content_manager_configuration_content_types::admin::role', '{\"uid\":\"admin::role\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"code\":{\"edit\":{\"label\":\"code\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"code\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"users\":{\"edit\":{\"label\":\"users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"users\",\"searchable\":false,\"sortable\":false}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"code\",\"description\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"code\",\"size\":6}],[{\"name\":\"description\",\"size\":6},{\"name\":\"users\",\"size\":6}],[{\"name\":\"permissions\",\"size\":6}]]}}', 'object', NULL, NULL),
(38, 'plugin_content_manager_configuration_content_types::admin::api-token', '{\"uid\":\"admin::api-token\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"type\",\"searchable\":true,\"sortable\":true}},\"accessKey\":{\"edit\":{\"label\":\"accessKey\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"accessKey\",\"searchable\":true,\"sortable\":true}},\"lastUsedAt\":{\"edit\":{\"label\":\"lastUsedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lastUsedAt\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"expiresAt\":{\"edit\":{\"label\":\"expiresAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"expiresAt\",\"searchable\":true,\"sortable\":true}},\"lifespan\":{\"edit\":{\"label\":\"lifespan\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lifespan\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"type\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"type\",\"size\":6},{\"name\":\"accessKey\",\"size\":6}],[{\"name\":\"lastUsedAt\",\"size\":6},{\"name\":\"permissions\",\"size\":6}],[{\"name\":\"expiresAt\",\"size\":6},{\"name\":\"lifespan\",\"size\":4}]]}}', 'object', NULL, NULL),
(39, 'plugin_content_manager_configuration_content_types::plugin::users-permissions.role', '{\"uid\":\"plugin::users-permissions.role\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"type\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"users\":{\"edit\":{\"label\":\"users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"users\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"type\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"type\",\"size\":6},{\"name\":\"permissions\",\"size\":6}],[{\"name\":\"users\",\"size\":6}]]}}', 'object', NULL, NULL);
INSERT INTO `strapi_core_store_settings` (`id`, `key`, `value`, `type`, `environment`, `tag`) VALUES
(40, 'plugin_content_manager_configuration_content_types::plugin::users-permissions.user', '{\"uid\":\"plugin::users-permissions.user\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"username\",\"defaultSortBy\":\"username\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"Uživatelské jméno\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"E-mail\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"provider\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"Heslo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"resetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"resetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"confirmationToken\":{\"edit\":{\"label\":\"confirmationToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"confirmationToken\",\"searchable\":true,\"sortable\":true}},\"confirmed\":{\"edit\":{\"label\":\"Potvrzen\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"confirmed\",\"searchable\":true,\"sortable\":true}},\"blocked\":{\"edit\":{\"label\":\"Zablokován\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blocked\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"Role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"username\",\"size\":6},{\"name\":\"role\",\"size\":6}],[{\"name\":\"email\",\"size\":6},{\"name\":\"password\",\"size\":6}],[{\"name\":\"confirmed\",\"size\":6},{\"name\":\"blocked\",\"size\":6}]],\"list\":[\"id\",\"username\",\"email\",\"confirmed\"]}}', 'object', NULL, NULL),
(41, 'plugin_content_manager_configuration_content_types::api::icon.icon', '{\"uid\":\"api::icon.icon\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"Název\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"codename\":{\"edit\":{\"label\":\"Kódové označení\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"codename\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"codename\",\"size\":6}]],\"list\":[\"id\",\"title\",\"codename\",\"createdAt\"]}}', 'object', NULL, NULL),
(42, 'plugin_content_manager_configuration_content_types::api::article.article', '{\"uid\":\"api::article.article\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"Název\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"image\":{\"edit\":{\"label\":\"Obrázek\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"image\",\"searchable\":false,\"sortable\":false}},\"publishDate\":{\"edit\":{\"label\":\"Datum publikace\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"publishDate\",\"searchable\":true,\"sortable\":true}},\"content\":{\"edit\":{\"label\":\"Obsah\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"content\",\"searchable\":false,\"sortable\":false}},\"slug\":{\"edit\":{\"label\":\"URL\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"slug\",\"searchable\":true,\"sortable\":true}},\"seo\":{\"edit\":{\"label\":\"SEO\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"seo\",\"searchable\":false,\"sortable\":false}},\"sitemap\":{\"edit\":{\"label\":\"Sitemap\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"sitemap\",\"searchable\":false,\"sortable\":false}},\"category\":{\"edit\":{\"label\":\"Kategorie\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"category\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"title\",\"size\":12}],[{\"name\":\"slug\",\"size\":6},{\"name\":\"publishDate\",\"size\":6}],[{\"name\":\"image\",\"size\":6},{\"name\":\"category\",\"size\":6}],[{\"name\":\"content\",\"size\":12}],[{\"name\":\"seo\",\"size\":12}],[{\"name\":\"sitemap\",\"size\":12}]],\"list\":[\"id\",\"title\",\"publishDate\",\"image\"]}}', 'object', NULL, NULL),
(43, 'plugin_content_manager_configuration_content_types::api::menu.menu', '{\"uid\":\"api::menu.menu\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"Název\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"items\":{\"edit\":{\"label\":\"Položky\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"items\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"title\",\"size\":12}],[{\"name\":\"items\",\"size\":12}]],\"list\":[\"id\",\"title\",\"items\",\"createdAt\"]}}', 'object', NULL, NULL),
(44, 'plugin_content_manager_configuration_content_types::api::message.message', '{\"uid\":\"api::message.message\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Jméno a příjmení\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"phone\":{\"edit\":{\"label\":\"Mobilní číslo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"phone\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"E-mail\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"message\":{\"edit\":{\"label\":\"Zpráva\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"message\",\"searchable\":true,\"sortable\":true}},\"company\":{\"edit\":{\"label\":\"Společnost\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"company\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"name\",\"size\":12}],[{\"name\":\"company\",\"size\":12}],[{\"name\":\"email\",\"size\":12}],[{\"name\":\"phone\",\"size\":12}],[{\"name\":\"message\",\"size\":12}]],\"list\":[\"id\",\"name\",\"phone\",\"email\"]}}', 'object', NULL, NULL),
(45, 'plugin_content_manager_configuration_content_types::api::newsletter-subscriber.newsletter-subscriber', '{\"uid\":\"api::newsletter-subscriber.newsletter-subscriber\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"E-mail\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"email\",\"size\":12}]],\"list\":[\"id\",\"email\",\"createdAt\",\"updatedAt\"]}}', 'object', NULL, NULL),
(46, 'plugin_content_manager_configuration_content_types::plugin::block-gallery.block', '{\"uid\":\"plugin::block-gallery.block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"displayName\",\"defaultSortBy\":\"displayName\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"image\":{\"edit\":{\"label\":\"Obrázek\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"image\",\"searchable\":false,\"sortable\":false}},\"displayName\":{\"edit\":{\"label\":\"Název\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"displayName\",\"searchable\":true,\"sortable\":true}},\"blockName\":{\"edit\":{\"label\":\"Název bloku\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blockName\",\"searchable\":true,\"sortable\":true}},\"externalUrl\":{\"edit\":{\"label\":\"Externí URL\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"externalUrl\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"image\",\"size\":6},{\"name\":\"displayName\",\"size\":6}],[{\"name\":\"blockName\",\"size\":6},{\"name\":\"externalUrl\",\"size\":6}]],\"list\":[\"id\",\"image\",\"displayName\",\"blockName\"]}}', 'object', NULL, NULL),
(47, 'plugin_content_manager_configuration_content_types::plugin::users-permissions.permission', '{\"uid\":\"plugin::users-permissions.permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"role\",\"createdAt\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"role\",\"size\":6}]]}}', 'object', NULL, NULL),
(48, 'plugin_content_manager_configuration_content_types::api::system-resource.system-resource', '{\"uid\":\"api::system-resource.system-resource\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Název\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"codename\":{\"edit\":{\"label\":\"Kódové označení\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"codename\",\"searchable\":true,\"sortable\":true}},\"value\":{\"edit\":{\"label\":\"Hodnota\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"value\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"codename\",\"size\":6}],[{\"name\":\"value\",\"size\":12}]],\"list\":[\"id\",\"name\",\"codename\",\"value\"]}}', 'object', NULL, NULL),
(49, 'plugin_content_manager_configuration_content_types::api::template.template', '{\"uid\":\"api::template.template\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"Název\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"content\":{\"edit\":{\"label\":\"Bloky\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"content\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"title\",\"size\":12}],[{\"name\":\"content\",\"size\":12}]],\"list\":[\"id\",\"title\",\"createdAt\",\"updatedAt\"]}}', 'object', NULL, NULL),
(50, 'plugin_content_manager_configuration_content_types::api::web-setting.web-setting', '{\"uid\":\"api::web-setting.web-setting\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"gtmCode\",\"defaultSortBy\":\"gtmCode\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"gtmCode\":{\"edit\":{\"label\":\"GTM Kód\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"gtmCode\",\"searchable\":true,\"sortable\":true}},\"homePage\":{\"edit\":{\"label\":\"Hlavní stránka\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"homePage\",\"searchable\":true,\"sortable\":true}},\"articleDetailPage\":{\"edit\":{\"label\":\"Detail článku\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"articleDetailPage\",\"searchable\":true,\"sortable\":true}},\"mainMenu\":{\"edit\":{\"label\":\"Hlavní menu\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"mainMenu\",\"searchable\":true,\"sortable\":true}},\"articlesPage\":{\"edit\":{\"label\":\"Výpis článků\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"articlesPage\",\"searchable\":true,\"sortable\":true}},\"globalSeo\":{\"edit\":{\"label\":\"Globální SEO\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"globalSeo\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"mainMenu\",\"size\":6}],[{\"name\":\"homePage\",\"size\":6}],[{\"name\":\"articlesPage\",\"size\":6},{\"name\":\"articleDetailPage\",\"size\":6}],[{\"name\":\"globalSeo\",\"size\":12}],[{\"name\":\"gtmCode\",\"size\":6}]],\"list\":[\"id\",\"gtmCode\",\"createdBy\",\"updatedBy\"]}}', 'object', NULL, NULL),
(51, 'plugin_content_manager_configuration_content_types::api::redirect.redirect', '{\"uid\":\"api::redirect.redirect\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"redirectFrom\",\"defaultSortBy\":\"redirectFrom\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"redirectFrom\":{\"edit\":{\"label\":\"Přesměrování ze\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"redirectFrom\",\"searchable\":true,\"sortable\":true}},\"redirectTo\":{\"edit\":{\"label\":\"Přesměrování do\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"redirectTo\",\"searchable\":true,\"sortable\":true}},\"statusCode\":{\"edit\":{\"label\":\"Stavový kód\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"statusCode\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"redirectFrom\",\"size\":6},{\"name\":\"redirectTo\",\"size\":6}],[{\"name\":\"statusCode\",\"size\":6}]],\"list\":[\"id\",\"redirectFrom\",\"redirectTo\",\"statusCode\"]}}', 'object', NULL, NULL),
(52, 'plugin_content_manager_configuration_content_types::api::page.page', '{\"uid\":\"api::page.page\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"Název\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"url\":{\"edit\":{\"label\":\"URL\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"url\",\"searchable\":true,\"sortable\":true}},\"blocks\":{\"edit\":{\"label\":\"Bloky\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blocks\",\"searchable\":false,\"sortable\":false}},\"pages\":{\"edit\":{\"label\":\"Podřazené stránky\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"pages\",\"searchable\":false,\"sortable\":false}},\"parent\":{\"edit\":{\"label\":\"Nadřazená stránka\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"parent\",\"searchable\":true,\"sortable\":true}},\"seo\":{\"edit\":{\"label\":\"SEO\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"seo\",\"searchable\":false,\"sortable\":false}},\"sitemap\":{\"edit\":{\"label\":\"Sitemap\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"sitemap\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"url\",\"size\":6}],[{\"name\":\"parent\",\"size\":6},{\"name\":\"pages\",\"size\":6}],[{\"name\":\"seo\",\"size\":12}],[{\"name\":\"sitemap\",\"size\":12}],[{\"name\":\"blocks\",\"size\":12}]],\"list\":[\"id\",\"title\",\"url\",\"pages\"]}}', 'object', NULL, NULL),
(53, 'plugin_upload_settings', '{\"sizeOptimization\":true,\"responsiveDimensions\":true,\"autoOrientation\":false}', 'object', NULL, NULL),
(54, 'plugin_upload_view_configuration', '{\"pageSize\":10,\"sort\":\"createdAt:DESC\"}', 'object', NULL, NULL),
(55, 'plugin_upload_metrics', '{\"weeklySchedule\":\"36 7 12 * * 1\",\"lastWeeklyUpdate\":1704712056024}', 'object', NULL, NULL),
(56, 'plugin_i18n_default_locale', '\"cs\"', 'string', NULL, NULL),
(57, 'plugin_users-permissions_grant', '{\"email\":{\"enabled\":true,\"icon\":\"envelope\"},\"discord\":{\"enabled\":false,\"icon\":\"discord\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/discord/callback\",\"scope\":[\"identify\",\"email\"]},\"facebook\":{\"enabled\":false,\"icon\":\"facebook-square\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/facebook/callback\",\"scope\":[\"email\"]},\"google\":{\"enabled\":false,\"icon\":\"google\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/google/callback\",\"scope\":[\"email\"]},\"github\":{\"enabled\":false,\"icon\":\"github\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/github/callback\",\"scope\":[\"user\",\"user:email\"]},\"microsoft\":{\"enabled\":false,\"icon\":\"windows\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/microsoft/callback\",\"scope\":[\"user.read\"]},\"twitter\":{\"enabled\":false,\"icon\":\"twitter\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/twitter/callback\"},\"instagram\":{\"enabled\":false,\"icon\":\"instagram\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/instagram/callback\",\"scope\":[\"user_profile\"]},\"vk\":{\"enabled\":false,\"icon\":\"vk\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/vk/callback\",\"scope\":[\"email\"]},\"twitch\":{\"enabled\":false,\"icon\":\"twitch\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/twitch/callback\",\"scope\":[\"user:read:email\"]},\"linkedin\":{\"enabled\":false,\"icon\":\"linkedin\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/linkedin/callback\",\"scope\":[\"r_liteprofile\",\"r_emailaddress\"]},\"cognito\":{\"enabled\":false,\"icon\":\"aws\",\"key\":\"\",\"secret\":\"\",\"subdomain\":\"my.subdomain.com\",\"callback\":\"api/auth/cognito/callback\",\"scope\":[\"email\",\"openid\",\"profile\"]},\"reddit\":{\"enabled\":false,\"icon\":\"reddit\",\"key\":\"\",\"secret\":\"\",\"state\":true,\"callback\":\"api/auth/reddit/callback\",\"scope\":[\"identity\"]},\"auth0\":{\"enabled\":false,\"icon\":\"\",\"key\":\"\",\"secret\":\"\",\"subdomain\":\"my-tenant.eu\",\"callback\":\"api/auth/auth0/callback\",\"scope\":[\"openid\",\"email\",\"profile\"]},\"cas\":{\"enabled\":false,\"icon\":\"book\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/cas/callback\",\"scope\":[\"openid email\"],\"subdomain\":\"my.subdomain.com/cas\"},\"patreon\":{\"enabled\":false,\"icon\":\"\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/patreon/callback\",\"scope\":[\"identity\",\"identity[email]\"]}}', 'object', NULL, NULL),
(58, 'plugin_users-permissions_email', '{\"reset_password\":{\"display\":\"Email.template.reset_password\",\"icon\":\"sync\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Reset password\",\"message\":\"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>\"}},\"email_confirmation\":{\"display\":\"Email.template.email_confirmation\",\"icon\":\"check-square\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Account confirmation\",\"message\":\"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>\"}}}', 'object', NULL, NULL),
(59, 'plugin_users-permissions_advanced', '{\"unique_email\":true,\"allow_register\":true,\"email_confirmation\":false,\"email_reset_password\":null,\"email_confirmation_redirection\":null,\"default_role\":\"authenticated\"}', 'object', NULL, NULL),
(60, 'core_admin_auth', '{\"providers\":{\"autoRegister\":false,\"defaultRole\":null,\"ssoLockedRoles\":null}}', 'object', NULL, NULL),
(62, 'plugin_seo_settings', '{\"api::article.article\":{\"collectionName\":\"article\",\"seoChecks\":{\"metaTitle\":true,\"metaDescription\":true,\"metaRobots\":true,\"metaSocial\":true,\"wordCount\":true,\"canonicalUrl\":true,\"keywordDensity\":true,\"structuredData\":true,\"alternativeText\":true,\"lastUpdatedAt\":true}},\"api::icon.icon\":{\"collectionName\":\"icon\",\"seoChecks\":{\"metaTitle\":true,\"metaDescription\":true,\"metaRobots\":true,\"metaSocial\":true,\"wordCount\":true,\"canonicalUrl\":true,\"keywordDensity\":true,\"structuredData\":true,\"alternativeText\":true,\"lastUpdatedAt\":true}},\"api::menu.menu\":{\"collectionName\":\"menu\",\"seoChecks\":{\"metaTitle\":true,\"metaDescription\":true,\"metaRobots\":true,\"metaSocial\":true,\"wordCount\":true,\"canonicalUrl\":true,\"keywordDensity\":true,\"structuredData\":true,\"alternativeText\":true,\"lastUpdatedAt\":true}},\"api::message.message\":{\"collectionName\":\"message\",\"seoChecks\":{\"metaTitle\":true,\"metaDescription\":true,\"metaRobots\":true,\"metaSocial\":true,\"wordCount\":true,\"canonicalUrl\":true,\"keywordDensity\":true,\"structuredData\":true,\"alternativeText\":true,\"lastUpdatedAt\":true}},\"api::newsletter-subscriber.newsletter-subscriber\":{\"collectionName\":\"newsletter-subscriber\",\"seoChecks\":{\"metaTitle\":true,\"metaDescription\":true,\"metaRobots\":true,\"metaSocial\":true,\"wordCount\":true,\"canonicalUrl\":true,\"keywordDensity\":true,\"structuredData\":true,\"alternativeText\":true,\"lastUpdatedAt\":true}},\"api::page.page\":{\"collectionName\":\"page\",\"seoChecks\":{\"metaTitle\":true,\"metaDescription\":true,\"metaRobots\":true,\"metaSocial\":true,\"wordCount\":true,\"canonicalUrl\":true,\"keywordDensity\":true,\"structuredData\":true,\"alternativeText\":true,\"lastUpdatedAt\":true}},\"api::redirect.redirect\":{\"collectionName\":\"redirect\",\"seoChecks\":{\"metaTitle\":true,\"metaDescription\":true,\"metaRobots\":true,\"metaSocial\":true,\"wordCount\":true,\"canonicalUrl\":true,\"keywordDensity\":true,\"structuredData\":true,\"alternativeText\":true,\"lastUpdatedAt\":true}},\"api::system-resource.system-resource\":{\"collectionName\":\"system-resource\",\"seoChecks\":{\"metaTitle\":true,\"metaDescription\":true,\"metaRobots\":true,\"metaSocial\":true,\"wordCount\":true,\"canonicalUrl\":true,\"keywordDensity\":true,\"structuredData\":true,\"alternativeText\":true,\"lastUpdatedAt\":true}},\"api::template.template\":{\"collectionName\":\"template\",\"seoChecks\":{\"metaTitle\":true,\"metaDescription\":true,\"metaRobots\":true,\"metaSocial\":true,\"wordCount\":true,\"canonicalUrl\":true,\"keywordDensity\":true,\"structuredData\":true,\"alternativeText\":true,\"lastUpdatedAt\":true}},\"api::web-setting.web-setting\":{\"collectionName\":\"web-setting\",\"seoChecks\":{\"metaTitle\":true,\"metaDescription\":true,\"metaRobots\":true,\"metaSocial\":true,\"wordCount\":true,\"canonicalUrl\":true,\"keywordDensity\":true,\"structuredData\":true,\"alternativeText\":true,\"lastUpdatedAt\":true}}}', 'object', NULL, NULL),
(63, 'plugin_tinymce_settings', '{\"apiKey\":\"\"}', 'object', NULL, NULL),
(64, 'plugin_content_manager_configuration_components::complementary.video', '{\"uid\":\"complementary.video\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"uploadedVideo\":{\"edit\":{\"label\":\"Nahrané video\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"uploadedVideo\",\"searchable\":false,\"sortable\":false}},\"externalVideo\":{\"edit\":{\"label\":\"Externí video\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"externalVideo\",\"searchable\":false,\"sortable\":false}},\"optionalImage\":{\"edit\":{\"label\":\"Obrázek\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"optionalImage\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"uploadedVideo\",\"optionalImage\"],\"edit\":[[{\"name\":\"uploadedVideo\",\"size\":6},{\"name\":\"optionalImage\",\"size\":6}],[{\"name\":\"externalVideo\",\"size\":12}]]},\"isComponent\":true}', 'object', NULL, NULL),
(65, 'plugin_content_manager_configuration_content_types::api::contact-form.contact-form', '{\"uid\":\"api::contact-form.contact-form\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"mailFrom\",\"defaultSortBy\":\"mailFrom\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"mailFrom\":{\"edit\":{\"label\":\"E-mail odesilatele\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mailFrom\",\"searchable\":true,\"sortable\":true}},\"mailTo\":{\"edit\":{\"label\":\"E-mail příjemce\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mailTo\",\"searchable\":true,\"sortable\":true}},\"mailSubject\":{\"edit\":{\"label\":\"Předmět e-mailu\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mailSubject\",\"searchable\":true,\"sortable\":true}},\"successMessage\":{\"edit\":{\"label\":\"Úspěšná zprává\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"successMessage\",\"searchable\":true,\"sortable\":true}},\"errorMessage\":{\"edit\":{\"label\":\"Chybná zpráva\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"errorMessage\",\"searchable\":true,\"sortable\":true}},\"checkboxLabel\":{\"edit\":{\"label\":\"Text checkboxu\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"checkboxLabel\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"successMessage\",\"size\":12}],[{\"name\":\"errorMessage\",\"size\":12}],[{\"name\":\"checkboxLabel\",\"size\":12}],[{\"name\":\"mailFrom\",\"size\":6},{\"name\":\"mailTo\",\"size\":6}],[{\"name\":\"mailSubject\",\"size\":6}]],\"list\":[\"id\",\"mailFrom\",\"mailTo\",\"mailSubject\"]}}', 'object', NULL, NULL),
(66, 'plugin_content_manager_configuration_content_types::api::article-category.article-category', '{\"uid\":\"api::article-category.article-category\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"Název\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"articles\":{\"edit\":{\"label\":\"Články\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":false,\"mainField\":\"title\"},\"list\":{\"label\":\"articles\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"articles\",\"size\":6}]],\"list\":[\"id\",\"title\",\"articles\",\"createdAt\"]}}', 'object', NULL, NULL),
(67, 'plugin_content_manager_configuration_components::block.video-block', '{\"uid\":\"block.video-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"video\":{\"edit\":{\"label\":\"Video\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"video\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"video\"],\"edit\":[[{\"name\":\"video\",\"size\":12}]]},\"isComponent\":true}', 'object', NULL, NULL),
(69, 'plugin_content_manager_configuration_components::block.contact-form-block', '{\"uid\":\"block.contact-form-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"title\"],\"edit\":[[{\"name\":\"title\",\"size\":6}]]},\"isComponent\":true}', 'object', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `strapi_database_schema`
--

CREATE TABLE `strapi_database_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `schema` json DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `strapi_database_schema`
--

INSERT INTO `strapi_database_schema` (`id`, `schema`, `time`, `hash`) VALUES
(22, '{\"tables\": [{\"name\": \"strapi_core_store_settings\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"key\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [\"longtext\"], \"name\": \"value\", \"type\": \"text\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"environment\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"tag\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"strapi_webhooks\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [\"longtext\"], \"name\": \"url\", \"type\": \"text\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"headers\", \"type\": \"jsonb\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"events\", \"type\": \"jsonb\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"enabled\", \"type\": \"boolean\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"admin_permissions\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"action\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"action_parameters\", \"type\": \"jsonb\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"subject\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"properties\", \"type\": \"jsonb\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"conditions\", \"type\": \"jsonb\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"admin_permissions_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"admin_permissions_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"admin_permissions_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"admin_permissions_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"admin_users\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"firstname\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"lastname\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"username\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"email\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"password\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"reset_password_token\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"registration_token\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"is_active\", \"type\": \"boolean\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"blocked\", \"type\": \"boolean\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"prefered_language\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"admin_users_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"admin_users_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"admin_users_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"admin_users_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"admin_roles\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"code\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"description\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"admin_roles_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"admin_roles_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"admin_roles_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"admin_roles_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"strapi_api_tokens\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"description\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"access_key\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"last_used_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"expires_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"lifespan\", \"type\": \"bigInteger\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"strapi_api_tokens_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"strapi_api_tokens_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"strapi_api_tokens_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"strapi_api_tokens_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"strapi_api_token_permissions\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"action\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"strapi_api_token_permissions_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"strapi_api_token_permissions_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"strapi_api_token_permissions_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"strapi_api_token_permissions_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"strapi_transfer_tokens\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"description\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"access_key\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"last_used_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"expires_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"lifespan\", \"type\": \"bigInteger\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"strapi_transfer_tokens_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"strapi_transfer_tokens_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"strapi_transfer_tokens_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"strapi_transfer_tokens_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"strapi_transfer_token_permissions\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"action\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"strapi_transfer_token_permissions_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"strapi_transfer_token_permissions_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"strapi_transfer_token_permissions_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"strapi_transfer_token_permissions_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"files\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"alternative_text\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"caption\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"width\", \"type\": \"integer\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"height\", \"type\": \"integer\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"formats\", \"type\": \"jsonb\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"hash\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"ext\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"mime\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [10, 2], \"name\": \"size\", \"type\": \"decimal\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"url\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"preview_url\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"provider\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"provider_metadata\", \"type\": \"jsonb\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"folder_path\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"upload_files_folder_path_index\", \"type\": null, \"columns\": [\"folder_path\"]}, {\"name\": \"upload_files_created_at_index\", \"type\": null, \"columns\": [\"created_at\"]}, {\"name\": \"upload_files_updated_at_index\", \"type\": null, \"columns\": [\"updated_at\"]}, {\"name\": \"upload_files_name_index\", \"type\": null, \"columns\": [\"name\"]}, {\"name\": \"upload_files_size_index\", \"type\": null, \"columns\": [\"size\"]}, {\"name\": \"upload_files_ext_index\", \"type\": null, \"columns\": [\"ext\"]}, {\"name\": \"files_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"files_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"files_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"files_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"upload_folders\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"path_id\", \"type\": \"integer\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"path\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"upload_folders_path_id_index\", \"type\": \"unique\", \"columns\": [\"path_id\"]}, {\"name\": \"upload_folders_path_index\", \"type\": \"unique\", \"columns\": [\"path\"]}, {\"name\": \"upload_folders_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"upload_folders_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"upload_folders_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"upload_folders_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"slugs\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [\"longtext\"], \"name\": \"slug\", \"type\": \"text\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"count\", \"type\": \"integer\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"slugs_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"slugs_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"slugs_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"slugs_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"i18n_locale\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"code\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"i18n_locale_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"i18n_locale_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"i18n_locale_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"i18n_locale_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"blocks\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"display_name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"block_name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"external_url\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"blocks_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"blocks_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"blocks_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"blocks_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"up_permissions\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"action\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"up_permissions_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"up_permissions_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"up_permissions_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"up_permissions_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"up_roles\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"description\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"up_roles_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"up_roles_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"up_roles_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"up_roles_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"up_users\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"username\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"email\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"provider\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"password\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"reset_password_token\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"confirmation_token\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"confirmed\", \"type\": \"boolean\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"blocked\", \"type\": \"boolean\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"up_users_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"up_users_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"up_users_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"up_users_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"articles\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"title\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"publish_date\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [\"longtext\"], \"name\": \"content\", \"type\": \"text\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"slug\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"published_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"locale\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"articles_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"articles_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"articles_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"articles_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"article_categories\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"title\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"published_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"locale\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"article_categories_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"article_categories_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"article_categories_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"article_categories_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"contact_forms\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"mail_from\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"mail_to\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"mail_subject\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"success_message\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"error_message\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"checkbox_label\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"published_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"locale\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"contact_forms_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"contact_forms_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"contact_forms_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"contact_forms_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"icons\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"title\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"codename\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"icons_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"icons_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"icons_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"icons_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"menus\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"title\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"published_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"locale\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"menus_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"menus_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"menus_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"menus_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"messages\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"phone\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"email\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [\"longtext\"], \"name\": \"message\", \"type\": \"text\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"company\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"messages_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"messages_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"messages_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"messages_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"newsletter_subscribers\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"email\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"newsletter_subscribers_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"newsletter_subscribers_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"newsletter_subscribers_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"newsletter_subscribers_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"pages\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"title\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"url\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"published_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"locale\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"pages_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"pages_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"pages_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"pages_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"redirects\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"redirect_from\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"redirect_to\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"status_code\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"published_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"redirects_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"redirects_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"redirects_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"redirects_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"system_resources\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"codename\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [\"longtext\"], \"name\": \"value\", \"type\": \"text\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"published_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"locale\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"system_resources_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"system_resources_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"system_resources_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"system_resources_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"templates\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"title\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"published_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"locale\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"templates_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"templates_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"templates_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"templates_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"web_settings\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"gtm_code\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"created_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"updated_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [{\"useTz\": false, \"precision\": 6}], \"name\": \"published_at\", \"type\": \"datetime\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"created_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"updated_by_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"locale\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"web_settings_created_by_id_fk\", \"columns\": [\"created_by_id\"]}, {\"name\": \"web_settings_updated_by_id_fk\", \"columns\": [\"updated_by_id\"]}], \"foreignKeys\": [{\"name\": \"web_settings_created_by_id_fk\", \"columns\": [\"created_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"web_settings_updated_by_id_fk\", \"columns\": [\"updated_by_id\"], \"onDelete\": \"SET NULL\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"components_block_article_detail_blocks\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_block_articles_list_blocks\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"count_on_page\", \"type\": \"integer\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_block_contact_form_blocks\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"title\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_block_template_blocks\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_block_video_blocks\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_complementary_buttons\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"label\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"link_external\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"open_in_new_tab\", \"type\": \"boolean\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_complementary_ecomails\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"api_key\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"list_id\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_complementary_mailchimps\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"server_prefix\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"api_key\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"list_id\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_complementary_videos\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"external_video\", \"type\": \"jsonb\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_menu_menu_items\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"label\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"external_url\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"open_in_new_tab\", \"type\": \"boolean\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_shared_global_seos\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"site_name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"title_suffix\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [\"longtext\"], \"name\": \"description\", \"type\": \"text\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"prevent_indexing\", \"type\": \"boolean\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_shared_meta_socials\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"social_network\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"title\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"description\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_shared_metas\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"name\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [\"longtext\"], \"name\": \"content\", \"type\": \"text\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_shared_seos\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"meta_title\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"meta_description\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [\"longtext\"], \"name\": \"keywords\", \"type\": \"text\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"meta_robots\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"structured_data\", \"type\": \"jsonb\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"meta_viewport\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"canonical_url\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"prevent_indexing\", \"type\": \"boolean\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"title\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"components_shared_sitemaps\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"enabled\", \"type\": \"boolean\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"change_frequency\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [10, 2], \"name\": \"priority\", \"type\": \"decimal\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [], \"foreignKeys\": []}, {\"name\": \"admin_permissions_role_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"permission_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"role_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"permission_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"admin_permissions_role_links_fk\", \"columns\": [\"permission_id\"]}, {\"name\": \"admin_permissions_role_links_inv_fk\", \"columns\": [\"role_id\"]}, {\"name\": \"admin_permissions_role_links_unique\", \"type\": \"unique\", \"columns\": [\"permission_id\", \"role_id\"]}, {\"name\": \"admin_permissions_role_links_order_inv_fk\", \"columns\": [\"permission_order\"]}], \"foreignKeys\": [{\"name\": \"admin_permissions_role_links_fk\", \"columns\": [\"permission_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"admin_permissions\", \"referencedColumns\": [\"id\"]}, {\"name\": \"admin_permissions_role_links_inv_fk\", \"columns\": [\"role_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"admin_roles\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"admin_users_roles_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"user_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"role_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"role_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"user_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"admin_users_roles_links_fk\", \"columns\": [\"user_id\"]}, {\"name\": \"admin_users_roles_links_inv_fk\", \"columns\": [\"role_id\"]}, {\"name\": \"admin_users_roles_links_unique\", \"type\": \"unique\", \"columns\": [\"user_id\", \"role_id\"]}, {\"name\": \"admin_users_roles_links_order_fk\", \"columns\": [\"role_order\"]}, {\"name\": \"admin_users_roles_links_order_inv_fk\", \"columns\": [\"user_order\"]}], \"foreignKeys\": [{\"name\": \"admin_users_roles_links_fk\", \"columns\": [\"user_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"admin_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"admin_users_roles_links_inv_fk\", \"columns\": [\"role_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"admin_roles\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"strapi_api_token_permissions_token_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"api_token_permission_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"api_token_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"api_token_permission_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"strapi_api_token_permissions_token_links_fk\", \"columns\": [\"api_token_permission_id\"]}, {\"name\": \"strapi_api_token_permissions_token_links_inv_fk\", \"columns\": [\"api_token_id\"]}, {\"name\": \"strapi_api_token_permissions_token_links_unique\", \"type\": \"unique\", \"columns\": [\"api_token_permission_id\", \"api_token_id\"]}, {\"name\": \"strapi_api_token_permissions_token_links_order_inv_fk\", \"columns\": [\"api_token_permission_order\"]}], \"foreignKeys\": [{\"name\": \"strapi_api_token_permissions_token_links_fk\", \"columns\": [\"api_token_permission_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"strapi_api_token_permissions\", \"referencedColumns\": [\"id\"]}, {\"name\": \"strapi_api_token_permissions_token_links_inv_fk\", \"columns\": [\"api_token_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"strapi_api_tokens\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"strapi_transfer_token_permissions_token_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"transfer_token_permission_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"transfer_token_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"transfer_token_permission_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"strapi_transfer_token_permissions_token_links_fk\", \"columns\": [\"transfer_token_permission_id\"]}, {\"name\": \"strapi_transfer_token_permissions_token_links_inv_fk\", \"columns\": [\"transfer_token_id\"]}, {\"name\": \"strapi_transfer_token_permissions_token_links_unique\", \"type\": \"unique\", \"columns\": [\"transfer_token_permission_id\", \"transfer_token_id\"]}, {\"name\": \"strapi_transfer_token_permissions_token_links_order_inv_fk\", \"columns\": [\"transfer_token_permission_order\"]}], \"foreignKeys\": [{\"name\": \"strapi_transfer_token_permissions_token_links_fk\", \"columns\": [\"transfer_token_permission_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"strapi_transfer_token_permissions\", \"referencedColumns\": [\"id\"]}, {\"name\": \"strapi_transfer_token_permissions_token_links_inv_fk\", \"columns\": [\"transfer_token_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"strapi_transfer_tokens\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"files_related_morphs\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"file_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"related_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"related_type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"field\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"files_related_morphs_fk\", \"columns\": [\"file_id\"]}, {\"name\": \"files_related_morphs_order_index\", \"type\": null, \"columns\": [\"order\"]}, {\"name\": \"files_related_morphs_id_column_index\", \"type\": null, \"columns\": [\"related_id\"]}], \"foreignKeys\": [{\"name\": \"files_related_morphs_fk\", \"columns\": [\"file_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"files\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"files_folder_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"file_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"folder_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"file_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"files_folder_links_fk\", \"columns\": [\"file_id\"]}, {\"name\": \"files_folder_links_inv_fk\", \"columns\": [\"folder_id\"]}, {\"name\": \"files_folder_links_unique\", \"type\": \"unique\", \"columns\": [\"file_id\", \"folder_id\"]}, {\"name\": \"files_folder_links_order_inv_fk\", \"columns\": [\"file_order\"]}], \"foreignKeys\": [{\"name\": \"files_folder_links_fk\", \"columns\": [\"file_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"files\", \"referencedColumns\": [\"id\"]}, {\"name\": \"files_folder_links_inv_fk\", \"columns\": [\"folder_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"upload_folders\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"upload_folders_parent_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"folder_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"inv_folder_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"folder_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"upload_folders_parent_links_fk\", \"columns\": [\"folder_id\"]}, {\"name\": \"upload_folders_parent_links_inv_fk\", \"columns\": [\"inv_folder_id\"]}, {\"name\": \"upload_folders_parent_links_unique\", \"type\": \"unique\", \"columns\": [\"folder_id\", \"inv_folder_id\"]}, {\"name\": \"upload_folders_parent_links_order_inv_fk\", \"columns\": [\"folder_order\"]}], \"foreignKeys\": [{\"name\": \"upload_folders_parent_links_fk\", \"columns\": [\"folder_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"upload_folders\", \"referencedColumns\": [\"id\"]}, {\"name\": \"upload_folders_parent_links_inv_fk\", \"columns\": [\"inv_folder_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"upload_folders\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"up_permissions_role_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"permission_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"role_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"permission_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"up_permissions_role_links_fk\", \"columns\": [\"permission_id\"]}, {\"name\": \"up_permissions_role_links_inv_fk\", \"columns\": [\"role_id\"]}, {\"name\": \"up_permissions_role_links_unique\", \"type\": \"unique\", \"columns\": [\"permission_id\", \"role_id\"]}, {\"name\": \"up_permissions_role_links_order_inv_fk\", \"columns\": [\"permission_order\"]}], \"foreignKeys\": [{\"name\": \"up_permissions_role_links_fk\", \"columns\": [\"permission_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"up_permissions\", \"referencedColumns\": [\"id\"]}, {\"name\": \"up_permissions_role_links_inv_fk\", \"columns\": [\"role_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"up_roles\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"up_users_role_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"user_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"role_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"user_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"up_users_role_links_fk\", \"columns\": [\"user_id\"]}, {\"name\": \"up_users_role_links_inv_fk\", \"columns\": [\"role_id\"]}, {\"name\": \"up_users_role_links_unique\", \"type\": \"unique\", \"columns\": [\"user_id\", \"role_id\"]}, {\"name\": \"up_users_role_links_order_inv_fk\", \"columns\": [\"user_order\"]}], \"foreignKeys\": [{\"name\": \"up_users_role_links_fk\", \"columns\": [\"user_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"up_users\", \"referencedColumns\": [\"id\"]}, {\"name\": \"up_users_role_links_inv_fk\", \"columns\": [\"role_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"up_roles\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"articles_components\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"entity_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"field\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"articles_field_index\", \"type\": null, \"columns\": [\"field\"]}, {\"name\": \"articles_component_type_index\", \"type\": null, \"columns\": [\"component_type\"]}, {\"name\": \"articles_entity_fk\", \"columns\": [\"entity_id\"]}, {\"name\": \"articles_unique\", \"type\": \"unique\", \"columns\": [\"entity_id\", \"component_id\", \"field\", \"component_type\"]}], \"foreignKeys\": [{\"name\": \"articles_entity_fk\", \"columns\": [\"entity_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"articles\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"articles_category_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"article_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"article_category_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"article_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"articles_category_links_fk\", \"columns\": [\"article_id\"]}, {\"name\": \"articles_category_links_inv_fk\", \"columns\": [\"article_category_id\"]}, {\"name\": \"articles_category_links_unique\", \"type\": \"unique\", \"columns\": [\"article_id\", \"article_category_id\"]}, {\"name\": \"articles_category_links_order_inv_fk\", \"columns\": [\"article_order\"]}], \"foreignKeys\": [{\"name\": \"articles_category_links_fk\", \"columns\": [\"article_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"articles\", \"referencedColumns\": [\"id\"]}, {\"name\": \"articles_category_links_inv_fk\", \"columns\": [\"article_category_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"article_categories\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"articles_localizations_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"article_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"inv_article_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"article_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"articles_localizations_links_fk\", \"columns\": [\"article_id\"]}, {\"name\": \"articles_localizations_links_inv_fk\", \"columns\": [\"inv_article_id\"]}, {\"name\": \"articles_localizations_links_unique\", \"type\": \"unique\", \"columns\": [\"article_id\", \"inv_article_id\"]}, {\"name\": \"articles_localizations_links_order_fk\", \"columns\": [\"article_order\"]}], \"foreignKeys\": [{\"name\": \"articles_localizations_links_fk\", \"columns\": [\"article_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"articles\", \"referencedColumns\": [\"id\"]}, {\"name\": \"articles_localizations_links_inv_fk\", \"columns\": [\"inv_article_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"articles\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"article_categories_localizations_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"article_category_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"inv_article_category_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"article_category_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"article_categories_localizations_links_fk\", \"columns\": [\"article_category_id\"]}, {\"name\": \"article_categories_localizations_links_inv_fk\", \"columns\": [\"inv_article_category_id\"]}, {\"name\": \"article_categories_localizations_links_unique\", \"type\": \"unique\", \"columns\": [\"article_category_id\", \"inv_article_category_id\"]}, {\"name\": \"article_categories_localizations_links_order_fk\", \"columns\": [\"article_category_order\"]}], \"foreignKeys\": [{\"name\": \"article_categories_localizations_links_fk\", \"columns\": [\"article_category_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"article_categories\", \"referencedColumns\": [\"id\"]}, {\"name\": \"article_categories_localizations_links_inv_fk\", \"columns\": [\"inv_article_category_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"article_categories\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"contact_forms_localizations_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"contact_form_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"inv_contact_form_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"contact_form_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"contact_forms_localizations_links_fk\", \"columns\": [\"contact_form_id\"]}, {\"name\": \"contact_forms_localizations_links_inv_fk\", \"columns\": [\"inv_contact_form_id\"]}, {\"name\": \"contact_forms_localizations_links_unique\", \"type\": \"unique\", \"columns\": [\"contact_form_id\", \"inv_contact_form_id\"]}, {\"name\": \"contact_forms_localizations_links_order_fk\", \"columns\": [\"contact_form_order\"]}], \"foreignKeys\": [{\"name\": \"contact_forms_localizations_links_fk\", \"columns\": [\"contact_form_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"contact_forms\", \"referencedColumns\": [\"id\"]}, {\"name\": \"contact_forms_localizations_links_inv_fk\", \"columns\": [\"inv_contact_form_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"contact_forms\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"menus_components\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"entity_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"field\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"menus_field_index\", \"type\": null, \"columns\": [\"field\"]}, {\"name\": \"menus_component_type_index\", \"type\": null, \"columns\": [\"component_type\"]}, {\"name\": \"menus_entity_fk\", \"columns\": [\"entity_id\"]}, {\"name\": \"menus_unique\", \"type\": \"unique\", \"columns\": [\"entity_id\", \"component_id\", \"field\", \"component_type\"]}], \"foreignKeys\": [{\"name\": \"menus_entity_fk\", \"columns\": [\"entity_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"menus\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"menus_localizations_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"menu_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"inv_menu_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"menu_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"menus_localizations_links_fk\", \"columns\": [\"menu_id\"]}, {\"name\": \"menus_localizations_links_inv_fk\", \"columns\": [\"inv_menu_id\"]}, {\"name\": \"menus_localizations_links_unique\", \"type\": \"unique\", \"columns\": [\"menu_id\", \"inv_menu_id\"]}, {\"name\": \"menus_localizations_links_order_fk\", \"columns\": [\"menu_order\"]}], \"foreignKeys\": [{\"name\": \"menus_localizations_links_fk\", \"columns\": [\"menu_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"menus\", \"referencedColumns\": [\"id\"]}, {\"name\": \"menus_localizations_links_inv_fk\", \"columns\": [\"inv_menu_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"menus\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"pages_components\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"entity_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"field\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"pages_field_index\", \"type\": null, \"columns\": [\"field\"]}, {\"name\": \"pages_component_type_index\", \"type\": null, \"columns\": [\"component_type\"]}, {\"name\": \"pages_entity_fk\", \"columns\": [\"entity_id\"]}, {\"name\": \"pages_unique\", \"type\": \"unique\", \"columns\": [\"entity_id\", \"component_id\", \"field\", \"component_type\"]}], \"foreignKeys\": [{\"name\": \"pages_entity_fk\", \"columns\": [\"entity_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"pages\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"pages_parent_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"page_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"inv_page_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"page_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"pages_parent_links_fk\", \"columns\": [\"page_id\"]}, {\"name\": \"pages_parent_links_inv_fk\", \"columns\": [\"inv_page_id\"]}, {\"name\": \"pages_parent_links_unique\", \"type\": \"unique\", \"columns\": [\"page_id\", \"inv_page_id\"]}, {\"name\": \"pages_parent_links_order_inv_fk\", \"columns\": [\"page_order\"]}], \"foreignKeys\": [{\"name\": \"pages_parent_links_fk\", \"columns\": [\"page_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"pages\", \"referencedColumns\": [\"id\"]}, {\"name\": \"pages_parent_links_inv_fk\", \"columns\": [\"inv_page_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"pages\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"pages_localizations_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"page_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"inv_page_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"page_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"pages_localizations_links_fk\", \"columns\": [\"page_id\"]}, {\"name\": \"pages_localizations_links_inv_fk\", \"columns\": [\"inv_page_id\"]}, {\"name\": \"pages_localizations_links_unique\", \"type\": \"unique\", \"columns\": [\"page_id\", \"inv_page_id\"]}, {\"name\": \"pages_localizations_links_order_fk\", \"columns\": [\"page_order\"]}], \"foreignKeys\": [{\"name\": \"pages_localizations_links_fk\", \"columns\": [\"page_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"pages\", \"referencedColumns\": [\"id\"]}, {\"name\": \"pages_localizations_links_inv_fk\", \"columns\": [\"inv_page_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"pages\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"system_resources_localizations_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"system_resource_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"inv_system_resource_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"system_resource_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"system_resources_localizations_links_fk\", \"columns\": [\"system_resource_id\"]}, {\"name\": \"system_resources_localizations_links_inv_fk\", \"columns\": [\"inv_system_resource_id\"]}, {\"name\": \"system_resources_localizations_links_unique\", \"type\": \"unique\", \"columns\": [\"system_resource_id\", \"inv_system_resource_id\"]}, {\"name\": \"system_resources_localizations_links_order_fk\", \"columns\": [\"system_resource_order\"]}], \"foreignKeys\": [{\"name\": \"system_resources_localizations_links_fk\", \"columns\": [\"system_resource_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"system_resources\", \"referencedColumns\": [\"id\"]}, {\"name\": \"system_resources_localizations_links_inv_fk\", \"columns\": [\"inv_system_resource_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"system_resources\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"templates_components\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"entity_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"field\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"templates_field_index\", \"type\": null, \"columns\": [\"field\"]}, {\"name\": \"templates_component_type_index\", \"type\": null, \"columns\": [\"component_type\"]}, {\"name\": \"templates_entity_fk\", \"columns\": [\"entity_id\"]}, {\"name\": \"templates_unique\", \"type\": \"unique\", \"columns\": [\"entity_id\", \"component_id\", \"field\", \"component_type\"]}], \"foreignKeys\": [{\"name\": \"templates_entity_fk\", \"columns\": [\"entity_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"templates\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"templates_localizations_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"template_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"inv_template_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"template_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"templates_localizations_links_fk\", \"columns\": [\"template_id\"]}, {\"name\": \"templates_localizations_links_inv_fk\", \"columns\": [\"inv_template_id\"]}, {\"name\": \"templates_localizations_links_unique\", \"type\": \"unique\", \"columns\": [\"template_id\", \"inv_template_id\"]}, {\"name\": \"templates_localizations_links_order_fk\", \"columns\": [\"template_order\"]}], \"foreignKeys\": [{\"name\": \"templates_localizations_links_fk\", \"columns\": [\"template_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"templates\", \"referencedColumns\": [\"id\"]}, {\"name\": \"templates_localizations_links_inv_fk\", \"columns\": [\"inv_template_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"templates\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"web_settings_components\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"entity_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"field\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"web_settings_field_index\", \"type\": null, \"columns\": [\"field\"]}, {\"name\": \"web_settings_component_type_index\", \"type\": null, \"columns\": [\"component_type\"]}, {\"name\": \"web_settings_entity_fk\", \"columns\": [\"entity_id\"]}, {\"name\": \"web_settings_unique\", \"type\": \"unique\", \"columns\": [\"entity_id\", \"component_id\", \"field\", \"component_type\"]}], \"foreignKeys\": [{\"name\": \"web_settings_entity_fk\", \"columns\": [\"entity_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"web_settings\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"web_settings_home_page_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"web_setting_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"page_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"web_settings_home_page_links_fk\", \"columns\": [\"web_setting_id\"]}, {\"name\": \"web_settings_home_page_links_inv_fk\", \"columns\": [\"page_id\"]}, {\"name\": \"web_settings_home_page_links_unique\", \"type\": \"unique\", \"columns\": [\"web_setting_id\", \"page_id\"]}], \"foreignKeys\": [{\"name\": \"web_settings_home_page_links_fk\", \"columns\": [\"web_setting_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"web_settings\", \"referencedColumns\": [\"id\"]}, {\"name\": \"web_settings_home_page_links_inv_fk\", \"columns\": [\"page_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"pages\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"web_settings_article_detail_page_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"web_setting_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"page_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"web_settings_article_detail_page_links_fk\", \"columns\": [\"web_setting_id\"]}, {\"name\": \"web_settings_article_detail_page_links_inv_fk\", \"columns\": [\"page_id\"]}, {\"name\": \"web_settings_article_detail_page_links_unique\", \"type\": \"unique\", \"columns\": [\"web_setting_id\", \"page_id\"]}], \"foreignKeys\": [{\"name\": \"web_settings_article_detail_page_links_fk\", \"columns\": [\"web_setting_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"web_settings\", \"referencedColumns\": [\"id\"]}, {\"name\": \"web_settings_article_detail_page_links_inv_fk\", \"columns\": [\"page_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"pages\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"web_settings_main_menu_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"web_setting_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"menu_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"web_settings_main_menu_links_fk\", \"columns\": [\"web_setting_id\"]}, {\"name\": \"web_settings_main_menu_links_inv_fk\", \"columns\": [\"menu_id\"]}, {\"name\": \"web_settings_main_menu_links_unique\", \"type\": \"unique\", \"columns\": [\"web_setting_id\", \"menu_id\"]}], \"foreignKeys\": [{\"name\": \"web_settings_main_menu_links_fk\", \"columns\": [\"web_setting_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"web_settings\", \"referencedColumns\": [\"id\"]}, {\"name\": \"web_settings_main_menu_links_inv_fk\", \"columns\": [\"menu_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"menus\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"web_settings_articles_page_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"web_setting_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"page_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"web_settings_articles_page_links_fk\", \"columns\": [\"web_setting_id\"]}, {\"name\": \"web_settings_articles_page_links_inv_fk\", \"columns\": [\"page_id\"]}, {\"name\": \"web_settings_articles_page_links_unique\", \"type\": \"unique\", \"columns\": [\"web_setting_id\", \"page_id\"]}], \"foreignKeys\": [{\"name\": \"web_settings_articles_page_links_fk\", \"columns\": [\"web_setting_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"web_settings\", \"referencedColumns\": [\"id\"]}, {\"name\": \"web_settings_articles_page_links_inv_fk\", \"columns\": [\"page_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"pages\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"web_settings_localizations_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"web_setting_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"inv_web_setting_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"web_setting_order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"web_settings_localizations_links_fk\", \"columns\": [\"web_setting_id\"]}, {\"name\": \"web_settings_localizations_links_inv_fk\", \"columns\": [\"inv_web_setting_id\"]}, {\"name\": \"web_settings_localizations_links_unique\", \"type\": \"unique\", \"columns\": [\"web_setting_id\", \"inv_web_setting_id\"]}, {\"name\": \"web_settings_localizations_links_order_fk\", \"columns\": [\"web_setting_order\"]}], \"foreignKeys\": [{\"name\": \"web_settings_localizations_links_fk\", \"columns\": [\"web_setting_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"web_settings\", \"referencedColumns\": [\"id\"]}, {\"name\": \"web_settings_localizations_links_inv_fk\", \"columns\": [\"inv_web_setting_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"web_settings\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"components_block_template_blocks_template_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"template_block_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"template_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"components_block_template_blocks_template_links_fk\", \"columns\": [\"template_block_id\"]}, {\"name\": \"components_block_template_blocks_template_links_inv_fk\", \"columns\": [\"template_id\"]}, {\"name\": \"components_block_template_blocks_template_links_unique\", \"type\": \"unique\", \"columns\": [\"template_block_id\", \"template_id\"]}], \"foreignKeys\": [{\"name\": \"components_block_template_blocks_template_links_fk\", \"columns\": [\"template_block_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"components_block_template_blocks\", \"referencedColumns\": [\"id\"]}, {\"name\": \"components_block_template_blocks_template_links_inv_fk\", \"columns\": [\"template_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"templates\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"components_block_video_blocks_components\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"entity_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"field\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"components_block_video_blocks_field_index\", \"type\": null, \"columns\": [\"field\"]}, {\"name\": \"components_block_video_blocks_component_type_index\", \"type\": null, \"columns\": [\"component_type\"]}, {\"name\": \"components_block_video_blocks_entity_fk\", \"columns\": [\"entity_id\"]}, {\"name\": \"components_block_video_blocks_unique\", \"type\": \"unique\", \"columns\": [\"entity_id\", \"component_id\", \"field\", \"component_type\"]}], \"foreignKeys\": [{\"name\": \"components_block_video_blocks_entity_fk\", \"columns\": [\"entity_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"components_block_video_blocks\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"components_complementary_buttons_page_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"button_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"page_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"components_complementary_buttons_page_links_fk\", \"columns\": [\"button_id\"]}, {\"name\": \"components_complementary_buttons_page_links_inv_fk\", \"columns\": [\"page_id\"]}, {\"name\": \"components_complementary_buttons_page_links_unique\", \"type\": \"unique\", \"columns\": [\"button_id\", \"page_id\"]}], \"foreignKeys\": [{\"name\": \"components_complementary_buttons_page_links_fk\", \"columns\": [\"button_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"components_complementary_buttons\", \"referencedColumns\": [\"id\"]}, {\"name\": \"components_complementary_buttons_page_links_inv_fk\", \"columns\": [\"page_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"pages\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"components_menu_menu_items_page_links\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"menu_item_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"page_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"components_menu_menu_items_page_links_fk\", \"columns\": [\"menu_item_id\"]}, {\"name\": \"components_menu_menu_items_page_links_inv_fk\", \"columns\": [\"page_id\"]}, {\"name\": \"components_menu_menu_items_page_links_unique\", \"type\": \"unique\", \"columns\": [\"menu_item_id\", \"page_id\"]}], \"foreignKeys\": [{\"name\": \"components_menu_menu_items_page_links_fk\", \"columns\": [\"menu_item_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"components_menu_menu_items\", \"referencedColumns\": [\"id\"]}, {\"name\": \"components_menu_menu_items_page_links_inv_fk\", \"columns\": [\"page_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"pages\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"components_shared_global_seos_components\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"entity_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"field\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"components_shared_global_seos_field_index\", \"type\": null, \"columns\": [\"field\"]}, {\"name\": \"components_shared_global_seos_component_type_index\", \"type\": null, \"columns\": [\"component_type\"]}, {\"name\": \"components_shared_global_seos_entity_fk\", \"columns\": [\"entity_id\"]}, {\"name\": \"components_shared_global_seos_unique\", \"type\": \"unique\", \"columns\": [\"entity_id\", \"component_id\", \"field\", \"component_type\"]}], \"foreignKeys\": [{\"name\": \"components_shared_global_seos_entity_fk\", \"columns\": [\"entity_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"components_shared_global_seos\", \"referencedColumns\": [\"id\"]}]}, {\"name\": \"components_shared_seos_components\", \"columns\": [{\"args\": [{\"primary\": true, \"primaryKey\": true}], \"name\": \"id\", \"type\": \"increments\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": true}, {\"args\": [], \"name\": \"entity_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_id\", \"type\": \"integer\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"component_type\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"field\", \"type\": \"string\", \"unsigned\": false, \"defaultTo\": null, \"notNullable\": false}, {\"args\": [], \"name\": \"order\", \"type\": \"double\", \"unsigned\": true, \"defaultTo\": null, \"notNullable\": false}], \"indexes\": [{\"name\": \"components_shared_seos_field_index\", \"type\": null, \"columns\": [\"field\"]}, {\"name\": \"components_shared_seos_component_type_index\", \"type\": null, \"columns\": [\"component_type\"]}, {\"name\": \"components_shared_seos_entity_fk\", \"columns\": [\"entity_id\"]}, {\"name\": \"components_shared_seos_unique\", \"type\": \"unique\", \"columns\": [\"entity_id\", \"component_id\", \"field\", \"component_type\"]}], \"foreignKeys\": [{\"name\": \"components_shared_seos_entity_fk\", \"columns\": [\"entity_id\"], \"onDelete\": \"CASCADE\", \"referencedTable\": \"components_shared_seos\", \"referencedColumns\": [\"id\"]}]}]}', '2024-01-09 08:54:48', 'd018261e0298dce23617d79502120e5b');

-- --------------------------------------------------------

--
-- Table structure for table `strapi_migrations`
--

CREATE TABLE `strapi_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `strapi_transfer_tokens`
--

CREATE TABLE `strapi_transfer_tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `access_key` varchar(255) DEFAULT NULL,
  `last_used_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `lifespan` bigint(20) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `strapi_transfer_token_permissions`
--

CREATE TABLE `strapi_transfer_token_permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `strapi_transfer_token_permissions_token_links`
--

CREATE TABLE `strapi_transfer_token_permissions_token_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `transfer_token_permission_id` int(10) UNSIGNED DEFAULT NULL,
  `transfer_token_id` int(10) UNSIGNED DEFAULT NULL,
  `transfer_token_permission_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `strapi_webhooks`
--

CREATE TABLE `strapi_webhooks` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` longtext,
  `headers` json DEFAULT NULL,
  `events` json DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `system_resources`
--

CREATE TABLE `system_resources` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `codename` varchar(255) DEFAULT NULL,
  `value` longtext,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system_resources`
--

INSERT INTO `system_resources` (`id`, `name`, `codename`, `value`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `locale`) VALUES
(1, 'Povinné pole', 'required_field', 'Povinné pole', '2024-01-08 15:59:08.439000', '2024-01-08 15:59:36.100000', '2024-01-08 15:59:09.141000', 1, 1, 'cs'),
(2, 'Povinné pole', 'required_field', 'Required field', '2024-01-08 15:59:35.560000', '2024-01-08 15:59:36.094000', '2024-01-08 15:59:36.092000', 1, 1, 'en'),
(3, 'Špatný formát e-mailu', 'invalid_email', 'Špatný formát e-mailu', '2024-01-08 15:59:55.484000', '2024-01-08 16:00:22.317000', '2024-01-08 15:59:56.058000', 1, 1, 'cs'),
(4, 'Špatný formát e-mailu', 'invalid_email', 'Wrong email format', '2024-01-08 16:00:21.505000', '2024-01-08 16:00:22.309000', '2024-01-08 16:00:22.306000', 1, 1, 'en'),
(5, 'Špatný formát mobilního čísla', 'invalid_phone_number', 'Špatný formát mobilního čísla', '2024-01-08 16:00:37.694000', '2024-01-08 16:00:44.955000', '2024-01-08 16:00:38.211000', 1, 1, 'cs'),
(6, 'Špatný formát mobilního čísla', 'invalid_phone_number', 'Špatný formát mobilního čísla', '2024-01-08 16:00:44.397000', '2024-01-08 16:00:44.946000', '2024-01-08 16:00:44.944000', 1, 1, 'en'),
(7, 'Zpět na formulář', 'back_to_the_form', 'Zpět na formulář', '2024-01-08 16:00:59.894000', '2024-01-08 16:01:15.487000', '2024-01-08 16:01:00.361000', 1, 1, 'cs'),
(8, 'Zpět na formulář', 'back_to_the_form', 'Back to the form', '2024-01-08 16:01:14.918000', '2024-01-08 16:01:15.481000', '2024-01-08 16:01:15.480000', 1, 1, 'en'),
(9, 'Jméno', 'name', 'Jméno', '2024-01-08 16:01:35.354000', '2024-01-08 16:01:52.067000', '2024-01-08 16:01:35.948000', 1, 1, 'cs'),
(10, 'Jméno', 'name', 'Name', '2024-01-08 16:01:45.936000', '2024-01-08 16:01:52.074000', '2024-01-08 16:01:46.411000', 1, 1, 'en'),
(11, 'Společnost', 'company', 'Společnost', '2024-01-08 16:02:03.621000', '2024-01-08 16:02:11.995000', '2024-01-08 16:02:04.041000', 1, 1, 'cs'),
(12, 'Společnost', 'company', 'Company', '2024-01-08 16:02:11.439000', '2024-01-08 16:02:11.988000', '2024-01-08 16:02:11.987000', 1, 1, 'en'),
(13, 'E-mail', 'email', 'E-mail', '2024-01-08 16:02:22.511000', '2024-01-08 16:02:29.000000', '2024-01-08 16:02:22.923000', 1, 1, 'cs'),
(14, 'E-mail', 'email', 'E-mail', '2024-01-08 16:02:28.523000', '2024-01-08 16:02:28.994000', '2024-01-08 16:02:28.991000', 1, 1, 'en'),
(15, 'Mobilní číslo', 'phone_number', 'Mobilní číslo', '2024-01-08 16:02:46.146000', '2024-01-08 16:02:56.388000', '2024-01-08 16:02:46.738000', 1, 1, 'cs'),
(16, 'Mobilní číslo', 'phone_number', 'Phone number', '2024-01-08 16:02:56.038000', '2024-01-08 16:02:56.381000', '2024-01-08 16:02:56.379000', 1, 1, 'en'),
(17, 'Zpráva', 'message', 'Zpráva', '2024-01-08 16:03:08.662000', '2024-01-08 16:03:16.621000', '2024-01-08 16:03:09.163000', 1, 1, 'cs'),
(18, 'Zpráva', 'message', 'Zpráva', '2024-01-08 16:03:16.073000', '2024-01-08 16:03:16.616000', '2024-01-08 16:03:16.615000', 1, 1, 'en'),
(19, 'Odeslat', 'submit', 'Odeslat', '2024-01-08 16:03:30.319000', '2024-01-08 16:03:39.580000', '2024-01-08 16:03:30.742000', 1, 1, 'cs'),
(20, 'Odeslat', 'submit', 'Submit', '2024-01-08 16:03:39.034000', '2024-01-08 16:03:39.573000', '2024-01-08 16:03:39.571000', 1, 1, 'en');

-- --------------------------------------------------------

--
-- Table structure for table `system_resources_localizations_links`
--

CREATE TABLE `system_resources_localizations_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `system_resource_id` int(10) UNSIGNED DEFAULT NULL,
  `inv_system_resource_id` int(10) UNSIGNED DEFAULT NULL,
  `system_resource_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system_resources_localizations_links`
--

INSERT INTO `system_resources_localizations_links` (`id`, `system_resource_id`, `inv_system_resource_id`, `system_resource_order`) VALUES
(1, 2, 1, 1),
(2, 1, 2, 1),
(3, 4, 3, 1),
(4, 3, 4, 1),
(5, 6, 5, 1),
(6, 5, 6, 1),
(7, 8, 7, 1),
(8, 7, 8, 1),
(9, 10, 9, 1),
(10, 9, 10, 1),
(11, 12, 11, 1),
(12, 11, 12, 1),
(13, 14, 13, 1),
(14, 13, 14, 1),
(15, 16, 15, 1),
(16, 15, 16, 1),
(17, 18, 17, 1),
(18, 17, 18, 1),
(19, 20, 19, 1),
(20, 19, 20, 1);

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `templates_components`
--

CREATE TABLE `templates_components` (
  `id` int(10) UNSIGNED NOT NULL,
  `entity_id` int(10) UNSIGNED DEFAULT NULL,
  `component_id` int(10) UNSIGNED DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `templates_localizations_links`
--

CREATE TABLE `templates_localizations_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `template_id` int(10) UNSIGNED DEFAULT NULL,
  `inv_template_id` int(10) UNSIGNED DEFAULT NULL,
  `template_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `upload_folders`
--

CREATE TABLE `upload_folders` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `path_id` int(11) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `upload_folders_parent_links`
--

CREATE TABLE `upload_folders_parent_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `folder_id` int(10) UNSIGNED DEFAULT NULL,
  `inv_folder_id` int(10) UNSIGNED DEFAULT NULL,
  `folder_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `up_permissions`
--

CREATE TABLE `up_permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `up_permissions`
--

INSERT INTO `up_permissions` (`id`, `action`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`) VALUES
(1, 'plugin::users-permissions.user.me', '2023-08-16 10:30:51.892000', '2023-08-16 10:30:51.892000', NULL, NULL),
(2, 'plugin::users-permissions.auth.changePassword', '2023-08-16 10:30:51.892000', '2023-08-16 10:30:51.892000', NULL, NULL),
(3, 'plugin::users-permissions.auth.callback', '2023-08-16 10:30:51.912000', '2023-08-16 10:30:51.912000', NULL, NULL),
(4, 'plugin::users-permissions.auth.connect', '2023-08-16 10:30:51.912000', '2023-08-16 10:30:51.912000', NULL, NULL),
(5, 'plugin::users-permissions.auth.forgotPassword', '2023-08-16 10:30:51.912000', '2023-08-16 10:30:51.912000', NULL, NULL),
(6, 'plugin::users-permissions.auth.resetPassword', '2023-08-16 10:30:51.912000', '2023-08-16 10:30:51.912000', NULL, NULL),
(7, 'plugin::users-permissions.auth.register', '2023-08-16 10:30:51.912000', '2023-08-16 10:30:51.912000', NULL, NULL),
(8, 'plugin::users-permissions.auth.emailConfirmation', '2023-08-16 10:30:51.912000', '2023-08-16 10:30:51.912000', NULL, NULL),
(9, 'plugin::users-permissions.auth.sendEmailConfirmation', '2023-08-16 10:30:51.912000', '2023-08-16 10:30:51.912000', NULL, NULL),
(10, 'api::article.article.find', '2023-08-16 11:55:43.701000', '2023-08-16 11:55:43.701000', NULL, NULL),
(11, 'api::article.article.findOne', '2023-08-16 11:55:43.701000', '2023-08-16 11:55:43.701000', NULL, NULL),
(12, 'api::icon.icon.find', '2023-08-16 11:55:48.646000', '2023-08-16 11:55:48.646000', NULL, NULL),
(13, 'api::icon.icon.findOne', '2023-08-16 11:55:48.646000', '2023-08-16 11:55:48.646000', NULL, NULL),
(14, 'api::menu.menu.find', '2023-08-16 11:55:51.960000', '2023-08-16 11:55:51.960000', NULL, NULL),
(15, 'api::menu.menu.findOne', '2023-08-16 11:55:51.960000', '2023-08-16 11:55:51.960000', NULL, NULL),
(16, 'api::message.message.create', '2023-08-16 11:55:58.450000', '2023-08-16 11:55:58.450000', NULL, NULL),
(17, 'api::newsletter-subscriber.newsletter-subscriber.create', '2023-08-16 11:56:01.549000', '2023-08-16 11:56:01.549000', NULL, NULL),
(18, 'api::page.page.find', '2023-08-16 11:56:04.383000', '2023-08-16 11:56:04.383000', NULL, NULL),
(19, 'api::page.page.findOne', '2023-08-16 11:56:04.383000', '2023-08-16 11:56:04.383000', NULL, NULL),
(20, 'api::redirect.redirect.find', '2023-08-16 11:56:09.426000', '2023-08-16 11:56:09.426000', NULL, NULL),
(21, 'api::redirect.redirect.findOne', '2023-08-16 11:56:09.426000', '2023-08-16 11:56:09.426000', NULL, NULL),
(22, 'api::system-resource.system-resource.find', '2023-08-16 11:56:14.398000', '2023-08-16 11:56:14.398000', NULL, NULL),
(23, 'api::system-resource.system-resource.findOne', '2023-08-16 11:56:14.398000', '2023-08-16 11:56:14.398000', NULL, NULL),
(24, 'api::template.template.find', '2023-08-16 11:56:18.664000', '2023-08-16 11:56:18.664000', NULL, NULL),
(25, 'api::template.template.findOne', '2023-08-16 11:56:18.664000', '2023-08-16 11:56:18.664000', NULL, NULL),
(26, 'api::web-setting.web-setting.find', '2023-08-16 11:56:22.436000', '2023-08-16 11:56:22.436000', NULL, NULL),
(27, 'plugin::content-type-builder.components.getComponents', '2023-08-16 11:56:29.741000', '2023-08-16 11:56:29.741000', NULL, NULL),
(28, 'plugin::content-type-builder.components.getComponent', '2023-08-16 11:56:29.741000', '2023-08-16 11:56:29.741000', NULL, NULL),
(29, 'plugin::content-type-builder.content-types.getContentType', '2023-08-16 11:56:29.741000', '2023-08-16 11:56:29.741000', NULL, NULL),
(30, 'plugin::content-type-builder.content-types.getContentTypes', '2023-08-16 11:56:29.741000', '2023-08-16 11:56:29.741000', NULL, NULL),
(31, 'plugin::slugify.slugController.findSlug', '2023-08-16 11:56:38.262000', '2023-08-16 11:56:38.262000', NULL, NULL),
(32, 'plugin::i18n.locales.listLocales', '2023-08-16 11:56:43.005000', '2023-08-16 11:56:43.005000', NULL, NULL),
(33, 'plugin::upload.content-api.find', '2023-08-16 11:56:51.907000', '2023-08-16 11:56:51.907000', NULL, NULL),
(34, 'plugin::upload.content-api.findOne', '2023-08-16 11:56:51.907000', '2023-08-16 11:56:51.907000', NULL, NULL),
(35, 'plugin::upload.content-api.upload', '2023-08-16 11:56:51.907000', '2023-08-16 11:56:51.907000', NULL, NULL),
(36, 'api::article-category.article-category.find', '2024-01-08 13:13:53.408000', '2024-01-08 13:13:53.408000', NULL, NULL),
(37, 'api::article-category.article-category.findOne', '2024-01-08 13:13:53.408000', '2024-01-08 13:13:53.408000', NULL, NULL),
(38, 'api::contact-form.contact-form.find', '2024-01-08 13:13:57.904000', '2024-01-08 13:13:57.904000', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `up_permissions_role_links`
--

CREATE TABLE `up_permissions_role_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED DEFAULT NULL,
  `role_id` int(10) UNSIGNED DEFAULT NULL,
  `permission_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `up_permissions_role_links`
--

INSERT INTO `up_permissions_role_links` (`id`, `permission_id`, `role_id`, `permission_order`) VALUES
(1, 2, 1, 1),
(2, 1, 1, 2),
(3, 3, 2, 1),
(4, 9, 2, 1),
(5, 5, 2, 1),
(6, 6, 2, 1),
(7, 7, 2, 1),
(8, 8, 2, 1),
(9, 4, 2, 2),
(10, 10, 2, 3),
(11, 11, 2, 3),
(12, 12, 2, 4),
(13, 13, 2, 4),
(14, 14, 2, 5),
(15, 15, 2, 5),
(16, 16, 2, 6),
(17, 17, 2, 7),
(18, 18, 2, 8),
(19, 19, 2, 8),
(20, 20, 2, 9),
(21, 21, 2, 9),
(22, 23, 2, 10),
(23, 22, 2, 10),
(24, 24, 2, 11),
(25, 25, 2, 11),
(26, 26, 2, 12),
(27, 28, 2, 13),
(28, 27, 2, 13),
(29, 30, 2, 14),
(30, 29, 2, 14),
(31, 31, 2, 15),
(32, 32, 2, 16),
(33, 34, 2, 17),
(34, 33, 2, 17),
(35, 35, 2, 17),
(36, 36, 2, 18),
(37, 37, 2, 18),
(38, 38, 2, 19);

-- --------------------------------------------------------

--
-- Table structure for table `up_roles`
--

CREATE TABLE `up_roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `up_roles`
--

INSERT INTO `up_roles` (`id`, `name`, `description`, `type`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`) VALUES
(1, 'Authenticated', 'Default role given to authenticated user.', 'authenticated', '2023-08-16 10:30:51.887000', '2023-08-16 10:30:51.887000', NULL, NULL),
(2, 'Public', 'Default role given to unauthenticated user.', 'public', '2023-08-16 10:30:51.889000', '2024-01-08 13:13:57.900000', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `up_users`
--

CREATE TABLE `up_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `up_users_role_links`
--

CREATE TABLE `up_users_role_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `role_id` int(10) UNSIGNED DEFAULT NULL,
  `user_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `web_settings`
--

CREATE TABLE `web_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `gtm_code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) UNSIGNED DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_settings`
--

INSERT INTO `web_settings` (`id`, `gtm_code`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `locale`) VALUES
(1, NULL, '2023-08-16 12:00:10.728000', '2024-01-08 14:30:07.284000', '2023-08-16 12:03:41.531000', 1, 1, 'cs'),
(2, NULL, '2024-01-08 12:56:24.876000', '2024-01-08 14:30:11.777000', '2024-01-08 12:56:25.500000', 1, 1, 'en');

-- --------------------------------------------------------

--
-- Table structure for table `web_settings_articles_page_links`
--

CREATE TABLE `web_settings_articles_page_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `web_setting_id` int(10) UNSIGNED DEFAULT NULL,
  `page_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_settings_articles_page_links`
--

INSERT INTO `web_settings_articles_page_links` (`id`, `web_setting_id`, `page_id`) VALUES
(1, 1, 13),
(2, 2, 14);

-- --------------------------------------------------------

--
-- Table structure for table `web_settings_article_detail_page_links`
--

CREATE TABLE `web_settings_article_detail_page_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `web_setting_id` int(10) UNSIGNED DEFAULT NULL,
  `page_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_settings_article_detail_page_links`
--

INSERT INTO `web_settings_article_detail_page_links` (`id`, `web_setting_id`, `page_id`) VALUES
(2, 1, 9),
(3, 2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `web_settings_components`
--

CREATE TABLE `web_settings_components` (
  `id` int(10) UNSIGNED NOT NULL,
  `entity_id` int(10) UNSIGNED DEFAULT NULL,
  `component_id` int(10) UNSIGNED DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `web_settings_home_page_links`
--

CREATE TABLE `web_settings_home_page_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `web_setting_id` int(10) UNSIGNED DEFAULT NULL,
  `page_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_settings_home_page_links`
--

INSERT INTO `web_settings_home_page_links` (`id`, `web_setting_id`, `page_id`) VALUES
(2, 1, 7),
(3, 2, 8);

-- --------------------------------------------------------

--
-- Table structure for table `web_settings_localizations_links`
--

CREATE TABLE `web_settings_localizations_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `web_setting_id` int(10) UNSIGNED DEFAULT NULL,
  `inv_web_setting_id` int(10) UNSIGNED DEFAULT NULL,
  `web_setting_order` double UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_settings_localizations_links`
--

INSERT INTO `web_settings_localizations_links` (`id`, `web_setting_id`, `inv_web_setting_id`, `web_setting_order`) VALUES
(1, 2, 1, 1),
(2, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `web_settings_main_menu_links`
--

CREATE TABLE `web_settings_main_menu_links` (
  `id` int(10) UNSIGNED NOT NULL,
  `web_setting_id` int(10) UNSIGNED DEFAULT NULL,
  `menu_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_settings_main_menu_links`
--

INSERT INTO `web_settings_main_menu_links` (`id`, `web_setting_id`, `menu_id`) VALUES
(2, 1, 2),
(3, 2, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_permissions_created_by_id_fk` (`created_by_id`),
  ADD KEY `admin_permissions_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `admin_permissions_role_links`
--
ALTER TABLE `admin_permissions_role_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_permissions_role_links_unique` (`permission_id`,`role_id`),
  ADD KEY `admin_permissions_role_links_fk` (`permission_id`),
  ADD KEY `admin_permissions_role_links_inv_fk` (`role_id`),
  ADD KEY `admin_permissions_role_links_order_inv_fk` (`permission_order`);

--
-- Indexes for table `admin_roles`
--
ALTER TABLE `admin_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_roles_created_by_id_fk` (`created_by_id`),
  ADD KEY `admin_roles_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_users_created_by_id_fk` (`created_by_id`),
  ADD KEY `admin_users_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `admin_users_roles_links`
--
ALTER TABLE `admin_users_roles_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_users_roles_links_unique` (`user_id`,`role_id`),
  ADD KEY `admin_users_roles_links_fk` (`user_id`),
  ADD KEY `admin_users_roles_links_inv_fk` (`role_id`),
  ADD KEY `admin_users_roles_links_order_fk` (`role_order`),
  ADD KEY `admin_users_roles_links_order_inv_fk` (`user_order`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_created_by_id_fk` (`created_by_id`),
  ADD KEY `articles_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `articles_category_links`
--
ALTER TABLE `articles_category_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `articles_category_links_unique` (`article_id`,`article_category_id`),
  ADD KEY `articles_category_links_fk` (`article_id`),
  ADD KEY `articles_category_links_inv_fk` (`article_category_id`),
  ADD KEY `articles_category_links_order_inv_fk` (`article_order`);

--
-- Indexes for table `articles_components`
--
ALTER TABLE `articles_components`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `articles_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  ADD KEY `articles_field_index` (`field`),
  ADD KEY `articles_component_type_index` (`component_type`),
  ADD KEY `articles_entity_fk` (`entity_id`);

--
-- Indexes for table `articles_localizations_links`
--
ALTER TABLE `articles_localizations_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `articles_localizations_links_unique` (`article_id`,`inv_article_id`),
  ADD KEY `articles_localizations_links_fk` (`article_id`),
  ADD KEY `articles_localizations_links_inv_fk` (`inv_article_id`),
  ADD KEY `articles_localizations_links_order_fk` (`article_order`);

--
-- Indexes for table `article_categories`
--
ALTER TABLE `article_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_categories_created_by_id_fk` (`created_by_id`),
  ADD KEY `article_categories_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `article_categories_localizations_links`
--
ALTER TABLE `article_categories_localizations_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `article_categories_localizations_links_unique` (`article_category_id`,`inv_article_category_id`),
  ADD KEY `article_categories_localizations_links_fk` (`article_category_id`),
  ADD KEY `article_categories_localizations_links_inv_fk` (`inv_article_category_id`),
  ADD KEY `article_categories_localizations_links_order_fk` (`article_category_order`);

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blocks_created_by_id_fk` (`created_by_id`),
  ADD KEY `blocks_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `components_block_articles_list_blocks`
--
ALTER TABLE `components_block_articles_list_blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_block_article_detail_blocks`
--
ALTER TABLE `components_block_article_detail_blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_block_contact_form_blocks`
--
ALTER TABLE `components_block_contact_form_blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_block_template_blocks`
--
ALTER TABLE `components_block_template_blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_block_template_blocks_template_links`
--
ALTER TABLE `components_block_template_blocks_template_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `components_block_template_blocks_template_links_unique` (`template_block_id`,`template_id`),
  ADD KEY `components_block_template_blocks_template_links_fk` (`template_block_id`),
  ADD KEY `components_block_template_blocks_template_links_inv_fk` (`template_id`);

--
-- Indexes for table `components_block_video_blocks`
--
ALTER TABLE `components_block_video_blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_block_video_blocks_components`
--
ALTER TABLE `components_block_video_blocks_components`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `components_block_video_blocks_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  ADD KEY `components_block_video_blocks_field_index` (`field`),
  ADD KEY `components_block_video_blocks_component_type_index` (`component_type`),
  ADD KEY `components_block_video_blocks_entity_fk` (`entity_id`);

--
-- Indexes for table `components_complementary_buttons`
--
ALTER TABLE `components_complementary_buttons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_complementary_buttons_page_links`
--
ALTER TABLE `components_complementary_buttons_page_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `components_complementary_buttons_page_links_unique` (`button_id`,`page_id`),
  ADD KEY `components_complementary_buttons_page_links_fk` (`button_id`),
  ADD KEY `components_complementary_buttons_page_links_inv_fk` (`page_id`);

--
-- Indexes for table `components_complementary_ecomails`
--
ALTER TABLE `components_complementary_ecomails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_complementary_mailchimps`
--
ALTER TABLE `components_complementary_mailchimps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_complementary_videos`
--
ALTER TABLE `components_complementary_videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_menu_menu_items`
--
ALTER TABLE `components_menu_menu_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_menu_menu_items_page_links`
--
ALTER TABLE `components_menu_menu_items_page_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `components_menu_menu_items_page_links_unique` (`menu_item_id`,`page_id`),
  ADD KEY `components_menu_menu_items_page_links_fk` (`menu_item_id`),
  ADD KEY `components_menu_menu_items_page_links_inv_fk` (`page_id`);

--
-- Indexes for table `components_shared_global_seos`
--
ALTER TABLE `components_shared_global_seos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_shared_global_seos_components`
--
ALTER TABLE `components_shared_global_seos_components`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `components_shared_global_seos_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  ADD KEY `components_shared_global_seos_field_index` (`field`),
  ADD KEY `components_shared_global_seos_component_type_index` (`component_type`),
  ADD KEY `components_shared_global_seos_entity_fk` (`entity_id`);

--
-- Indexes for table `components_shared_metas`
--
ALTER TABLE `components_shared_metas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_shared_meta_socials`
--
ALTER TABLE `components_shared_meta_socials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_shared_seos`
--
ALTER TABLE `components_shared_seos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_shared_seos_components`
--
ALTER TABLE `components_shared_seos_components`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `components_shared_seos_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  ADD KEY `components_shared_seos_field_index` (`field`),
  ADD KEY `components_shared_seos_component_type_index` (`component_type`),
  ADD KEY `components_shared_seos_entity_fk` (`entity_id`);

--
-- Indexes for table `components_shared_sitemaps`
--
ALTER TABLE `components_shared_sitemaps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_forms`
--
ALTER TABLE `contact_forms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_forms_created_by_id_fk` (`created_by_id`),
  ADD KEY `contact_forms_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `contact_forms_localizations_links`
--
ALTER TABLE `contact_forms_localizations_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `contact_forms_localizations_links_unique` (`contact_form_id`,`inv_contact_form_id`),
  ADD KEY `contact_forms_localizations_links_fk` (`contact_form_id`),
  ADD KEY `contact_forms_localizations_links_inv_fk` (`inv_contact_form_id`),
  ADD KEY `contact_forms_localizations_links_order_fk` (`contact_form_order`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `upload_files_folder_path_index` (`folder_path`),
  ADD KEY `upload_files_created_at_index` (`created_at`),
  ADD KEY `upload_files_updated_at_index` (`updated_at`),
  ADD KEY `upload_files_name_index` (`name`),
  ADD KEY `upload_files_size_index` (`size`),
  ADD KEY `upload_files_ext_index` (`ext`),
  ADD KEY `files_created_by_id_fk` (`created_by_id`),
  ADD KEY `files_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `files_folder_links`
--
ALTER TABLE `files_folder_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `files_folder_links_unique` (`file_id`,`folder_id`),
  ADD KEY `files_folder_links_fk` (`file_id`),
  ADD KEY `files_folder_links_inv_fk` (`folder_id`),
  ADD KEY `files_folder_links_order_inv_fk` (`file_order`);

--
-- Indexes for table `files_related_morphs`
--
ALTER TABLE `files_related_morphs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `files_related_morphs_fk` (`file_id`),
  ADD KEY `files_related_morphs_order_index` (`order`),
  ADD KEY `files_related_morphs_id_column_index` (`related_id`);

--
-- Indexes for table `i18n_locale`
--
ALTER TABLE `i18n_locale`
  ADD PRIMARY KEY (`id`),
  ADD KEY `i18n_locale_created_by_id_fk` (`created_by_id`),
  ADD KEY `i18n_locale_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `icons`
--
ALTER TABLE `icons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `icons_created_by_id_fk` (`created_by_id`),
  ADD KEY `icons_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menus_created_by_id_fk` (`created_by_id`),
  ADD KEY `menus_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `menus_components`
--
ALTER TABLE `menus_components`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menus_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  ADD KEY `menus_field_index` (`field`),
  ADD KEY `menus_component_type_index` (`component_type`),
  ADD KEY `menus_entity_fk` (`entity_id`);

--
-- Indexes for table `menus_localizations_links`
--
ALTER TABLE `menus_localizations_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menus_localizations_links_unique` (`menu_id`,`inv_menu_id`),
  ADD KEY `menus_localizations_links_fk` (`menu_id`),
  ADD KEY `menus_localizations_links_inv_fk` (`inv_menu_id`),
  ADD KEY `menus_localizations_links_order_fk` (`menu_order`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_created_by_id_fk` (`created_by_id`),
  ADD KEY `messages_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `newsletter_subscribers_created_by_id_fk` (`created_by_id`),
  ADD KEY `newsletter_subscribers_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pages_created_by_id_fk` (`created_by_id`),
  ADD KEY `pages_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `pages_components`
--
ALTER TABLE `pages_components`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  ADD KEY `pages_field_index` (`field`),
  ADD KEY `pages_component_type_index` (`component_type`),
  ADD KEY `pages_entity_fk` (`entity_id`);

--
-- Indexes for table `pages_localizations_links`
--
ALTER TABLE `pages_localizations_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_localizations_links_unique` (`page_id`,`inv_page_id`),
  ADD KEY `pages_localizations_links_fk` (`page_id`),
  ADD KEY `pages_localizations_links_inv_fk` (`inv_page_id`),
  ADD KEY `pages_localizations_links_order_fk` (`page_order`);

--
-- Indexes for table `pages_parent_links`
--
ALTER TABLE `pages_parent_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_parent_links_unique` (`page_id`,`inv_page_id`),
  ADD KEY `pages_parent_links_fk` (`page_id`),
  ADD KEY `pages_parent_links_inv_fk` (`inv_page_id`),
  ADD KEY `pages_parent_links_order_inv_fk` (`page_order`);

--
-- Indexes for table `redirects`
--
ALTER TABLE `redirects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `redirects_created_by_id_fk` (`created_by_id`),
  ADD KEY `redirects_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `slugs`
--
ALTER TABLE `slugs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `slugs_created_by_id_fk` (`created_by_id`),
  ADD KEY `slugs_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `strapi_api_tokens`
--
ALTER TABLE `strapi_api_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `strapi_api_tokens_created_by_id_fk` (`created_by_id`),
  ADD KEY `strapi_api_tokens_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `strapi_api_token_permissions`
--
ALTER TABLE `strapi_api_token_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `strapi_api_token_permissions_created_by_id_fk` (`created_by_id`),
  ADD KEY `strapi_api_token_permissions_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `strapi_api_token_permissions_token_links`
--
ALTER TABLE `strapi_api_token_permissions_token_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `strapi_api_token_permissions_token_links_unique` (`api_token_permission_id`,`api_token_id`),
  ADD KEY `strapi_api_token_permissions_token_links_fk` (`api_token_permission_id`),
  ADD KEY `strapi_api_token_permissions_token_links_inv_fk` (`api_token_id`),
  ADD KEY `strapi_api_token_permissions_token_links_order_inv_fk` (`api_token_permission_order`);

--
-- Indexes for table `strapi_core_store_settings`
--
ALTER TABLE `strapi_core_store_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `strapi_database_schema`
--
ALTER TABLE `strapi_database_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `strapi_migrations`
--
ALTER TABLE `strapi_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `strapi_transfer_tokens`
--
ALTER TABLE `strapi_transfer_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `strapi_transfer_tokens_created_by_id_fk` (`created_by_id`),
  ADD KEY `strapi_transfer_tokens_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `strapi_transfer_token_permissions`
--
ALTER TABLE `strapi_transfer_token_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `strapi_transfer_token_permissions_created_by_id_fk` (`created_by_id`),
  ADD KEY `strapi_transfer_token_permissions_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `strapi_transfer_token_permissions_token_links`
--
ALTER TABLE `strapi_transfer_token_permissions_token_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `strapi_transfer_token_permissions_token_links_unique` (`transfer_token_permission_id`,`transfer_token_id`),
  ADD KEY `strapi_transfer_token_permissions_token_links_fk` (`transfer_token_permission_id`),
  ADD KEY `strapi_transfer_token_permissions_token_links_inv_fk` (`transfer_token_id`),
  ADD KEY `strapi_transfer_token_permissions_token_links_order_inv_fk` (`transfer_token_permission_order`);

--
-- Indexes for table `strapi_webhooks`
--
ALTER TABLE `strapi_webhooks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system_resources`
--
ALTER TABLE `system_resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `system_resources_created_by_id_fk` (`created_by_id`),
  ADD KEY `system_resources_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `system_resources_localizations_links`
--
ALTER TABLE `system_resources_localizations_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `system_resources_localizations_links_unique` (`system_resource_id`,`inv_system_resource_id`),
  ADD KEY `system_resources_localizations_links_fk` (`system_resource_id`),
  ADD KEY `system_resources_localizations_links_inv_fk` (`inv_system_resource_id`),
  ADD KEY `system_resources_localizations_links_order_fk` (`system_resource_order`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `templates_created_by_id_fk` (`created_by_id`),
  ADD KEY `templates_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `templates_components`
--
ALTER TABLE `templates_components`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `templates_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  ADD KEY `templates_field_index` (`field`),
  ADD KEY `templates_component_type_index` (`component_type`),
  ADD KEY `templates_entity_fk` (`entity_id`);

--
-- Indexes for table `templates_localizations_links`
--
ALTER TABLE `templates_localizations_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `templates_localizations_links_unique` (`template_id`,`inv_template_id`),
  ADD KEY `templates_localizations_links_fk` (`template_id`),
  ADD KEY `templates_localizations_links_inv_fk` (`inv_template_id`),
  ADD KEY `templates_localizations_links_order_fk` (`template_order`);

--
-- Indexes for table `upload_folders`
--
ALTER TABLE `upload_folders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `upload_folders_path_id_index` (`path_id`),
  ADD UNIQUE KEY `upload_folders_path_index` (`path`),
  ADD KEY `upload_folders_created_by_id_fk` (`created_by_id`),
  ADD KEY `upload_folders_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `upload_folders_parent_links`
--
ALTER TABLE `upload_folders_parent_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `upload_folders_parent_links_unique` (`folder_id`,`inv_folder_id`),
  ADD KEY `upload_folders_parent_links_fk` (`folder_id`),
  ADD KEY `upload_folders_parent_links_inv_fk` (`inv_folder_id`),
  ADD KEY `upload_folders_parent_links_order_inv_fk` (`folder_order`);

--
-- Indexes for table `up_permissions`
--
ALTER TABLE `up_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `up_permissions_created_by_id_fk` (`created_by_id`),
  ADD KEY `up_permissions_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `up_permissions_role_links`
--
ALTER TABLE `up_permissions_role_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `up_permissions_role_links_unique` (`permission_id`,`role_id`),
  ADD KEY `up_permissions_role_links_fk` (`permission_id`),
  ADD KEY `up_permissions_role_links_inv_fk` (`role_id`),
  ADD KEY `up_permissions_role_links_order_inv_fk` (`permission_order`);

--
-- Indexes for table `up_roles`
--
ALTER TABLE `up_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `up_roles_created_by_id_fk` (`created_by_id`),
  ADD KEY `up_roles_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `up_users`
--
ALTER TABLE `up_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `up_users_created_by_id_fk` (`created_by_id`),
  ADD KEY `up_users_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `up_users_role_links`
--
ALTER TABLE `up_users_role_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `up_users_role_links_unique` (`user_id`,`role_id`),
  ADD KEY `up_users_role_links_fk` (`user_id`),
  ADD KEY `up_users_role_links_inv_fk` (`role_id`),
  ADD KEY `up_users_role_links_order_inv_fk` (`user_order`);

--
-- Indexes for table `web_settings`
--
ALTER TABLE `web_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `web_settings_created_by_id_fk` (`created_by_id`),
  ADD KEY `web_settings_updated_by_id_fk` (`updated_by_id`);

--
-- Indexes for table `web_settings_articles_page_links`
--
ALTER TABLE `web_settings_articles_page_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `web_settings_articles_page_links_unique` (`web_setting_id`,`page_id`),
  ADD KEY `web_settings_articles_page_links_fk` (`web_setting_id`),
  ADD KEY `web_settings_articles_page_links_inv_fk` (`page_id`);

--
-- Indexes for table `web_settings_article_detail_page_links`
--
ALTER TABLE `web_settings_article_detail_page_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `web_settings_article_detail_page_links_unique` (`web_setting_id`,`page_id`),
  ADD KEY `web_settings_article_detail_page_links_fk` (`web_setting_id`),
  ADD KEY `web_settings_article_detail_page_links_inv_fk` (`page_id`);

--
-- Indexes for table `web_settings_components`
--
ALTER TABLE `web_settings_components`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `web_settings_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  ADD KEY `web_settings_field_index` (`field`),
  ADD KEY `web_settings_component_type_index` (`component_type`),
  ADD KEY `web_settings_entity_fk` (`entity_id`);

--
-- Indexes for table `web_settings_home_page_links`
--
ALTER TABLE `web_settings_home_page_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `web_settings_home_page_links_unique` (`web_setting_id`,`page_id`),
  ADD KEY `web_settings_home_page_links_fk` (`web_setting_id`),
  ADD KEY `web_settings_home_page_links_inv_fk` (`page_id`);

--
-- Indexes for table `web_settings_localizations_links`
--
ALTER TABLE `web_settings_localizations_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `web_settings_localizations_links_unique` (`web_setting_id`,`inv_web_setting_id`),
  ADD KEY `web_settings_localizations_links_fk` (`web_setting_id`),
  ADD KEY `web_settings_localizations_links_inv_fk` (`inv_web_setting_id`),
  ADD KEY `web_settings_localizations_links_order_fk` (`web_setting_order`);

--
-- Indexes for table `web_settings_main_menu_links`
--
ALTER TABLE `web_settings_main_menu_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `web_settings_main_menu_links_unique` (`web_setting_id`,`menu_id`),
  ADD KEY `web_settings_main_menu_links_fk` (`web_setting_id`),
  ADD KEY `web_settings_main_menu_links_inv_fk` (`menu_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=377;

--
-- AUTO_INCREMENT for table `admin_permissions_role_links`
--
ALTER TABLE `admin_permissions_role_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=477;

--
-- AUTO_INCREMENT for table `admin_roles`
--
ALTER TABLE `admin_roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin_users_roles_links`
--
ALTER TABLE `admin_users_roles_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `articles_category_links`
--
ALTER TABLE `articles_category_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `articles_components`
--
ALTER TABLE `articles_components`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `articles_localizations_links`
--
ALTER TABLE `articles_localizations_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `article_categories`
--
ALTER TABLE `article_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `article_categories_localizations_links`
--
ALTER TABLE `article_categories_localizations_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_block_articles_list_blocks`
--
ALTER TABLE `components_block_articles_list_blocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `components_block_article_detail_blocks`
--
ALTER TABLE `components_block_article_detail_blocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `components_block_contact_form_blocks`
--
ALTER TABLE `components_block_contact_form_blocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `components_block_template_blocks`
--
ALTER TABLE `components_block_template_blocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_block_template_blocks_template_links`
--
ALTER TABLE `components_block_template_blocks_template_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_block_video_blocks`
--
ALTER TABLE `components_block_video_blocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `components_block_video_blocks_components`
--
ALTER TABLE `components_block_video_blocks_components`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `components_complementary_buttons`
--
ALTER TABLE `components_complementary_buttons`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_complementary_buttons_page_links`
--
ALTER TABLE `components_complementary_buttons_page_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_complementary_ecomails`
--
ALTER TABLE `components_complementary_ecomails`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_complementary_mailchimps`
--
ALTER TABLE `components_complementary_mailchimps`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_complementary_videos`
--
ALTER TABLE `components_complementary_videos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `components_menu_menu_items`
--
ALTER TABLE `components_menu_menu_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `components_menu_menu_items_page_links`
--
ALTER TABLE `components_menu_menu_items_page_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `components_shared_global_seos`
--
ALTER TABLE `components_shared_global_seos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_shared_global_seos_components`
--
ALTER TABLE `components_shared_global_seos_components`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_shared_metas`
--
ALTER TABLE `components_shared_metas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_shared_meta_socials`
--
ALTER TABLE `components_shared_meta_socials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_shared_seos`
--
ALTER TABLE `components_shared_seos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_shared_seos_components`
--
ALTER TABLE `components_shared_seos_components`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `components_shared_sitemaps`
--
ALTER TABLE `components_shared_sitemaps`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_forms`
--
ALTER TABLE `contact_forms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `contact_forms_localizations_links`
--
ALTER TABLE `contact_forms_localizations_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `files_folder_links`
--
ALTER TABLE `files_folder_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files_related_morphs`
--
ALTER TABLE `files_related_morphs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `i18n_locale`
--
ALTER TABLE `i18n_locale`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `icons`
--
ALTER TABLE `icons`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menus_components`
--
ALTER TABLE `menus_components`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `menus_localizations_links`
--
ALTER TABLE `menus_localizations_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `pages_components`
--
ALTER TABLE `pages_components`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `pages_localizations_links`
--
ALTER TABLE `pages_localizations_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pages_parent_links`
--
ALTER TABLE `pages_parent_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `redirects`
--
ALTER TABLE `redirects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slugs`
--
ALTER TABLE `slugs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `strapi_api_tokens`
--
ALTER TABLE `strapi_api_tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `strapi_api_token_permissions`
--
ALTER TABLE `strapi_api_token_permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `strapi_api_token_permissions_token_links`
--
ALTER TABLE `strapi_api_token_permissions_token_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `strapi_core_store_settings`
--
ALTER TABLE `strapi_core_store_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `strapi_database_schema`
--
ALTER TABLE `strapi_database_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `strapi_migrations`
--
ALTER TABLE `strapi_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `strapi_transfer_tokens`
--
ALTER TABLE `strapi_transfer_tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `strapi_transfer_token_permissions`
--
ALTER TABLE `strapi_transfer_token_permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `strapi_transfer_token_permissions_token_links`
--
ALTER TABLE `strapi_transfer_token_permissions_token_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `strapi_webhooks`
--
ALTER TABLE `strapi_webhooks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_resources`
--
ALTER TABLE `system_resources`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `system_resources_localizations_links`
--
ALTER TABLE `system_resources_localizations_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `templates_components`
--
ALTER TABLE `templates_components`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `templates_localizations_links`
--
ALTER TABLE `templates_localizations_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `upload_folders`
--
ALTER TABLE `upload_folders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `upload_folders_parent_links`
--
ALTER TABLE `upload_folders_parent_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `up_permissions`
--
ALTER TABLE `up_permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `up_permissions_role_links`
--
ALTER TABLE `up_permissions_role_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `up_roles`
--
ALTER TABLE `up_roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `up_users`
--
ALTER TABLE `up_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `up_users_role_links`
--
ALTER TABLE `up_users_role_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `web_settings`
--
ALTER TABLE `web_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `web_settings_articles_page_links`
--
ALTER TABLE `web_settings_articles_page_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `web_settings_article_detail_page_links`
--
ALTER TABLE `web_settings_article_detail_page_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `web_settings_components`
--
ALTER TABLE `web_settings_components`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `web_settings_home_page_links`
--
ALTER TABLE `web_settings_home_page_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `web_settings_localizations_links`
--
ALTER TABLE `web_settings_localizations_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `web_settings_main_menu_links`
--
ALTER TABLE `web_settings_main_menu_links`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  ADD CONSTRAINT `admin_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `admin_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `admin_permissions_role_links`
--
ALTER TABLE `admin_permissions_role_links`
  ADD CONSTRAINT `admin_permissions_role_links_fk` FOREIGN KEY (`permission_id`) REFERENCES `admin_permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `admin_permissions_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `admin_roles`
--
ALTER TABLE `admin_roles`
  ADD CONSTRAINT `admin_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `admin_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD CONSTRAINT `admin_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `admin_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `admin_users_roles_links`
--
ALTER TABLE `admin_users_roles_links`
  ADD CONSTRAINT `admin_users_roles_links_fk` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `admin_users_roles_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `articles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `articles_category_links`
--
ALTER TABLE `articles_category_links`
  ADD CONSTRAINT `articles_category_links_fk` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `articles_category_links_inv_fk` FOREIGN KEY (`article_category_id`) REFERENCES `article_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `articles_components`
--
ALTER TABLE `articles_components`
  ADD CONSTRAINT `articles_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `articles_localizations_links`
--
ALTER TABLE `articles_localizations_links`
  ADD CONSTRAINT `articles_localizations_links_fk` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `articles_localizations_links_inv_fk` FOREIGN KEY (`inv_article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `article_categories`
--
ALTER TABLE `article_categories`
  ADD CONSTRAINT `article_categories_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `article_categories_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `article_categories_localizations_links`
--
ALTER TABLE `article_categories_localizations_links`
  ADD CONSTRAINT `article_categories_localizations_links_fk` FOREIGN KEY (`article_category_id`) REFERENCES `article_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `article_categories_localizations_links_inv_fk` FOREIGN KEY (`inv_article_category_id`) REFERENCES `article_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blocks`
--
ALTER TABLE `blocks`
  ADD CONSTRAINT `blocks_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `blocks_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `components_block_template_blocks_template_links`
--
ALTER TABLE `components_block_template_blocks_template_links`
  ADD CONSTRAINT `components_block_template_blocks_template_links_fk` FOREIGN KEY (`template_block_id`) REFERENCES `components_block_template_blocks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `components_block_template_blocks_template_links_inv_fk` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `components_block_video_blocks_components`
--
ALTER TABLE `components_block_video_blocks_components`
  ADD CONSTRAINT `components_block_video_blocks_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `components_block_video_blocks` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `components_complementary_buttons_page_links`
--
ALTER TABLE `components_complementary_buttons_page_links`
  ADD CONSTRAINT `components_complementary_buttons_page_links_fk` FOREIGN KEY (`button_id`) REFERENCES `components_complementary_buttons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `components_complementary_buttons_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `components_menu_menu_items_page_links`
--
ALTER TABLE `components_menu_menu_items_page_links`
  ADD CONSTRAINT `components_menu_menu_items_page_links_fk` FOREIGN KEY (`menu_item_id`) REFERENCES `components_menu_menu_items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `components_menu_menu_items_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `components_shared_global_seos_components`
--
ALTER TABLE `components_shared_global_seos_components`
  ADD CONSTRAINT `components_shared_global_seos_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `components_shared_global_seos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `components_shared_seos_components`
--
ALTER TABLE `components_shared_seos_components`
  ADD CONSTRAINT `components_shared_seos_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `components_shared_seos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `contact_forms`
--
ALTER TABLE `contact_forms`
  ADD CONSTRAINT `contact_forms_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `contact_forms_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `contact_forms_localizations_links`
--
ALTER TABLE `contact_forms_localizations_links`
  ADD CONSTRAINT `contact_forms_localizations_links_fk` FOREIGN KEY (`contact_form_id`) REFERENCES `contact_forms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contact_forms_localizations_links_inv_fk` FOREIGN KEY (`inv_contact_form_id`) REFERENCES `contact_forms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `files_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `files_folder_links`
--
ALTER TABLE `files_folder_links`
  ADD CONSTRAINT `files_folder_links_fk` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `files_folder_links_inv_fk` FOREIGN KEY (`folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `files_related_morphs`
--
ALTER TABLE `files_related_morphs`
  ADD CONSTRAINT `files_related_morphs_fk` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `i18n_locale`
--
ALTER TABLE `i18n_locale`
  ADD CONSTRAINT `i18n_locale_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `i18n_locale_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `icons`
--
ALTER TABLE `icons`
  ADD CONSTRAINT `icons_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `icons_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `menus_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `menus_components`
--
ALTER TABLE `menus_components`
  ADD CONSTRAINT `menus_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `menus_localizations_links`
--
ALTER TABLE `menus_localizations_links`
  ADD CONSTRAINT `menus_localizations_links_fk` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `menus_localizations_links_inv_fk` FOREIGN KEY (`inv_menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `messages_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD CONSTRAINT `newsletter_subscribers_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `newsletter_subscribers_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `pages`
--
ALTER TABLE `pages`
  ADD CONSTRAINT `pages_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `pages_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `pages_components`
--
ALTER TABLE `pages_components`
  ADD CONSTRAINT `pages_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pages_localizations_links`
--
ALTER TABLE `pages_localizations_links`
  ADD CONSTRAINT `pages_localizations_links_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pages_localizations_links_inv_fk` FOREIGN KEY (`inv_page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pages_parent_links`
--
ALTER TABLE `pages_parent_links`
  ADD CONSTRAINT `pages_parent_links_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pages_parent_links_inv_fk` FOREIGN KEY (`inv_page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `redirects`
--
ALTER TABLE `redirects`
  ADD CONSTRAINT `redirects_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `redirects_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `slugs`
--
ALTER TABLE `slugs`
  ADD CONSTRAINT `slugs_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `slugs_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `strapi_api_tokens`
--
ALTER TABLE `strapi_api_tokens`
  ADD CONSTRAINT `strapi_api_tokens_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `strapi_api_tokens_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `strapi_api_token_permissions`
--
ALTER TABLE `strapi_api_token_permissions`
  ADD CONSTRAINT `strapi_api_token_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `strapi_api_token_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `strapi_api_token_permissions_token_links`
--
ALTER TABLE `strapi_api_token_permissions_token_links`
  ADD CONSTRAINT `strapi_api_token_permissions_token_links_fk` FOREIGN KEY (`api_token_permission_id`) REFERENCES `strapi_api_token_permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `strapi_api_token_permissions_token_links_inv_fk` FOREIGN KEY (`api_token_id`) REFERENCES `strapi_api_tokens` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `strapi_transfer_tokens`
--
ALTER TABLE `strapi_transfer_tokens`
  ADD CONSTRAINT `strapi_transfer_tokens_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `strapi_transfer_tokens_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `strapi_transfer_token_permissions`
--
ALTER TABLE `strapi_transfer_token_permissions`
  ADD CONSTRAINT `strapi_transfer_token_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `strapi_transfer_token_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `strapi_transfer_token_permissions_token_links`
--
ALTER TABLE `strapi_transfer_token_permissions_token_links`
  ADD CONSTRAINT `strapi_transfer_token_permissions_token_links_fk` FOREIGN KEY (`transfer_token_permission_id`) REFERENCES `strapi_transfer_token_permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `strapi_transfer_token_permissions_token_links_inv_fk` FOREIGN KEY (`transfer_token_id`) REFERENCES `strapi_transfer_tokens` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `system_resources`
--
ALTER TABLE `system_resources`
  ADD CONSTRAINT `system_resources_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `system_resources_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `system_resources_localizations_links`
--
ALTER TABLE `system_resources_localizations_links`
  ADD CONSTRAINT `system_resources_localizations_links_fk` FOREIGN KEY (`system_resource_id`) REFERENCES `system_resources` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `system_resources_localizations_links_inv_fk` FOREIGN KEY (`inv_system_resource_id`) REFERENCES `system_resources` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `templates`
--
ALTER TABLE `templates`
  ADD CONSTRAINT `templates_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `templates_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `templates_components`
--
ALTER TABLE `templates_components`
  ADD CONSTRAINT `templates_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `templates_localizations_links`
--
ALTER TABLE `templates_localizations_links`
  ADD CONSTRAINT `templates_localizations_links_fk` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `templates_localizations_links_inv_fk` FOREIGN KEY (`inv_template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `upload_folders`
--
ALTER TABLE `upload_folders`
  ADD CONSTRAINT `upload_folders_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `upload_folders_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `upload_folders_parent_links`
--
ALTER TABLE `upload_folders_parent_links`
  ADD CONSTRAINT `upload_folders_parent_links_fk` FOREIGN KEY (`folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `upload_folders_parent_links_inv_fk` FOREIGN KEY (`inv_folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `up_permissions`
--
ALTER TABLE `up_permissions`
  ADD CONSTRAINT `up_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `up_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `up_permissions_role_links`
--
ALTER TABLE `up_permissions_role_links`
  ADD CONSTRAINT `up_permissions_role_links_fk` FOREIGN KEY (`permission_id`) REFERENCES `up_permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `up_permissions_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `up_roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `up_roles`
--
ALTER TABLE `up_roles`
  ADD CONSTRAINT `up_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `up_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `up_users`
--
ALTER TABLE `up_users`
  ADD CONSTRAINT `up_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `up_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `up_users_role_links`
--
ALTER TABLE `up_users_role_links`
  ADD CONSTRAINT `up_users_role_links_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `up_users_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `up_roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `web_settings`
--
ALTER TABLE `web_settings`
  ADD CONSTRAINT `web_settings_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `web_settings_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `web_settings_articles_page_links`
--
ALTER TABLE `web_settings_articles_page_links`
  ADD CONSTRAINT `web_settings_articles_page_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `web_settings_articles_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `web_settings_article_detail_page_links`
--
ALTER TABLE `web_settings_article_detail_page_links`
  ADD CONSTRAINT `web_settings_article_detail_page_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `web_settings_article_detail_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `web_settings_components`
--
ALTER TABLE `web_settings_components`
  ADD CONSTRAINT `web_settings_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `web_settings_home_page_links`
--
ALTER TABLE `web_settings_home_page_links`
  ADD CONSTRAINT `web_settings_home_page_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `web_settings_home_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `web_settings_localizations_links`
--
ALTER TABLE `web_settings_localizations_links`
  ADD CONSTRAINT `web_settings_localizations_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `web_settings_localizations_links_inv_fk` FOREIGN KEY (`inv_web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `web_settings_main_menu_links`
--
ALTER TABLE `web_settings_main_menu_links`
  ADD CONSTRAINT `web_settings_main_menu_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `web_settings_main_menu_links_inv_fk` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
