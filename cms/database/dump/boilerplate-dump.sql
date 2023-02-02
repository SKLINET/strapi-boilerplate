# ************************************************************
# Sequel Ace SQL dump
# Version 20046
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.0.1 (MySQL 5.7.25-log)
# Database: number10bet
# Generation Time: 2023-02-02 13:56:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin_permissions`;

CREATE TABLE `admin_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `properties` json DEFAULT NULL,
  `conditions` json DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_permissions_created_by_id_fk` (`created_by_id`),
  KEY `admin_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `admin_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `admin_permissions` WRITE;
/*!40000 ALTER TABLE `admin_permissions` DISABLE KEYS */;

INSERT INTO `admin_permissions` (`id`, `action`, `subject`, `properties`, `conditions`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`)
VALUES
	(1,'plugin::content-manager.explorer.create','api::article.article','{\"fields\": [\"title\", \"mainImage\", \"publishDate\", \"content\", \"slug\", \"perex\", \"author\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[]','2022-08-10 10:37:14.572000','2022-08-10 10:37:14.572000',NULL,NULL),
	(2,'plugin::content-manager.explorer.create','api::icon.icon','{\"fields\": [\"title\", \"codename\"]}','[]','2022-08-10 10:37:14.577000','2022-08-10 10:37:14.577000',NULL,NULL),
	(3,'plugin::content-manager.explorer.create','api::menu.menu','{\"fields\": [\"title\", \"items.page\", \"items.externalUrl\", \"items.label\"]}','[]','2022-08-10 10:37:14.578000','2023-02-02 13:00:22.297000',NULL,NULL),
	(4,'plugin::content-manager.explorer.create','api::message.message','{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"city\"]}','[]','2022-08-10 10:37:14.580000','2022-08-10 10:37:14.580000',NULL,NULL),
	(5,'plugin::content-manager.explorer.create','api::newsletter-subscriber.newsletter-subscriber','{\"fields\": [\"email\"]}','[]','2022-08-10 10:37:14.581000','2022-08-10 10:37:14.581000',NULL,NULL),
	(6,'plugin::content-manager.explorer.create','api::page.page','{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[]','2022-08-10 10:37:14.582000','2022-08-10 10:37:14.582000',NULL,NULL),
	(7,'plugin::content-manager.explorer.create','api::redirect.redirect','{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}','[]','2022-08-10 10:37:14.584000','2022-08-10 10:37:14.584000',NULL,NULL),
	(8,'plugin::content-manager.explorer.create','api::system-resource.system-resource','{\"fields\": [\"codename\", \"value\", \"name\"]}','[]','2022-08-10 10:37:14.585000','2022-08-10 10:37:14.585000',NULL,NULL),
	(9,'plugin::content-manager.explorer.create','api::web-setting.web-setting','{\"fields\": [\"gtmCode\", \"facebook\", \"twitter\", \"instagram\", \"pinterest\", \"youtube\", \"homePage\", \"articleDetailPage\", \"mailFrom\", \"mailTo\", \"mailSubject\", \"mainMenu\", \"articlesPage\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\"]}','[]','2022-08-10 10:37:14.587000','2022-08-10 10:37:14.587000',NULL,NULL),
	(10,'plugin::content-manager.explorer.read','api::article.article','{\"fields\": [\"title\", \"mainImage\", \"publishDate\", \"content\", \"slug\", \"perex\", \"author\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[]','2022-08-10 10:37:14.588000','2022-08-10 10:37:14.588000',NULL,NULL),
	(11,'plugin::content-manager.explorer.read','api::icon.icon','{\"fields\": [\"title\", \"codename\"]}','[]','2022-08-10 10:37:14.589000','2022-08-10 10:37:14.589000',NULL,NULL),
	(12,'plugin::content-manager.explorer.read','api::menu.menu','{\"fields\": [\"title\", \"items.page\", \"items.externalUrl\", \"items.label\"]}','[]','2022-08-10 10:37:14.591000','2023-02-02 13:00:22.297000',NULL,NULL),
	(13,'plugin::content-manager.explorer.read','api::message.message','{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"city\"]}','[]','2022-08-10 10:37:14.592000','2022-08-10 10:37:14.592000',NULL,NULL),
	(14,'plugin::content-manager.explorer.read','api::newsletter-subscriber.newsletter-subscriber','{\"fields\": [\"email\"]}','[]','2022-08-10 10:37:14.593000','2022-08-10 10:37:14.593000',NULL,NULL),
	(15,'plugin::content-manager.explorer.read','api::page.page','{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[]','2022-08-10 10:37:14.595000','2022-08-10 10:37:14.595000',NULL,NULL),
	(16,'plugin::content-manager.explorer.read','api::redirect.redirect','{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}','[]','2022-08-10 10:37:14.603000','2022-08-10 10:37:14.603000',NULL,NULL),
	(17,'plugin::content-manager.explorer.read','api::system-resource.system-resource','{\"fields\": [\"codename\", \"value\", \"name\"]}','[]','2022-08-10 10:37:14.605000','2022-08-10 10:37:14.605000',NULL,NULL),
	(18,'plugin::content-manager.explorer.read','api::web-setting.web-setting','{\"fields\": [\"gtmCode\", \"facebook\", \"twitter\", \"instagram\", \"pinterest\", \"youtube\", \"homePage\", \"articleDetailPage\", \"mailFrom\", \"mailTo\", \"mailSubject\", \"mainMenu\", \"articlesPage\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\"]}','[]','2022-08-10 10:37:14.607000','2022-08-10 10:37:14.607000',NULL,NULL),
	(19,'plugin::content-manager.explorer.update','api::article.article','{\"fields\": [\"title\", \"mainImage\", \"publishDate\", \"content\", \"slug\", \"perex\", \"author\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[]','2022-08-10 10:37:14.608000','2022-08-10 10:37:14.608000',NULL,NULL),
	(20,'plugin::content-manager.explorer.update','api::icon.icon','{\"fields\": [\"title\", \"codename\"]}','[]','2022-08-10 10:37:14.610000','2022-08-10 10:37:14.610000',NULL,NULL),
	(21,'plugin::content-manager.explorer.update','api::menu.menu','{\"fields\": [\"title\", \"items.page\", \"items.externalUrl\", \"items.label\"]}','[]','2022-08-10 10:37:14.611000','2023-02-02 13:00:22.297000',NULL,NULL),
	(22,'plugin::content-manager.explorer.update','api::message.message','{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"city\"]}','[]','2022-08-10 10:37:14.613000','2022-08-10 10:37:14.613000',NULL,NULL),
	(23,'plugin::content-manager.explorer.update','api::newsletter-subscriber.newsletter-subscriber','{\"fields\": [\"email\"]}','[]','2022-08-10 10:37:14.614000','2022-08-10 10:37:14.614000',NULL,NULL),
	(24,'plugin::content-manager.explorer.update','api::page.page','{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[]','2022-08-10 10:37:14.615000','2022-08-10 10:37:14.615000',NULL,NULL),
	(25,'plugin::content-manager.explorer.update','api::redirect.redirect','{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}','[]','2022-08-10 10:37:14.616000','2022-08-10 10:37:14.616000',NULL,NULL),
	(26,'plugin::content-manager.explorer.update','api::system-resource.system-resource','{\"fields\": [\"codename\", \"value\", \"name\"]}','[]','2022-08-10 10:37:14.617000','2022-08-10 10:37:14.617000',NULL,NULL),
	(27,'plugin::content-manager.explorer.update','api::web-setting.web-setting','{\"fields\": [\"gtmCode\", \"facebook\", \"twitter\", \"instagram\", \"pinterest\", \"youtube\", \"homePage\", \"articleDetailPage\", \"mailFrom\", \"mailTo\", \"mailSubject\", \"mainMenu\", \"articlesPage\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\"]}','[]','2022-08-10 10:37:14.618000','2022-08-10 10:37:14.618000',NULL,NULL),
	(29,'plugin::content-manager.explorer.delete','api::icon.icon','{}','[]','2022-08-10 10:37:14.620000','2022-08-10 10:37:14.620000',NULL,NULL),
	(31,'plugin::content-manager.explorer.delete','api::message.message','{}','[]','2022-08-10 10:37:14.623000','2022-08-10 10:37:14.623000',NULL,NULL),
	(32,'plugin::content-manager.explorer.delete','api::newsletter-subscriber.newsletter-subscriber','{}','[]','2022-08-10 10:37:14.623000','2022-08-10 10:37:14.623000',NULL,NULL),
	(34,'plugin::content-manager.explorer.delete','api::redirect.redirect','{}','[]','2022-08-10 10:37:14.625000','2022-08-10 10:37:14.625000',NULL,NULL),
	(38,'plugin::content-manager.explorer.publish','api::icon.icon','{}','[]','2022-08-10 10:37:14.630000','2022-08-10 10:37:14.630000',NULL,NULL),
	(40,'plugin::content-manager.explorer.publish','api::message.message','{}','[]','2022-08-10 10:37:14.632000','2022-08-10 10:37:14.632000',NULL,NULL),
	(41,'plugin::content-manager.explorer.publish','api::newsletter-subscriber.newsletter-subscriber','{}','[]','2022-08-10 10:37:14.632000','2022-08-10 10:37:14.632000',NULL,NULL),
	(43,'plugin::content-manager.explorer.publish','api::redirect.redirect','{}','[]','2022-08-10 10:37:14.634000','2022-08-10 10:37:14.634000',NULL,NULL),
	(46,'plugin::upload.read',NULL,'{}','[]','2022-08-10 10:37:14.636000','2022-08-10 10:37:14.636000',NULL,NULL),
	(47,'plugin::upload.assets.create',NULL,'{}','[]','2022-08-10 10:37:14.637000','2022-08-10 10:37:14.637000',NULL,NULL),
	(48,'plugin::upload.assets.update',NULL,'{}','[]','2022-08-10 10:37:14.638000','2022-08-10 10:37:14.638000',NULL,NULL),
	(49,'plugin::upload.assets.download',NULL,'{}','[]','2022-08-10 10:37:14.640000','2022-08-10 10:37:14.640000',NULL,NULL),
	(50,'plugin::upload.assets.copy-link',NULL,'{}','[]','2022-08-10 10:37:14.641000','2022-08-10 10:37:14.641000',NULL,NULL),
	(51,'plugin::content-manager.explorer.create','api::article.article','{\"fields\": [\"title\", \"mainImage\", \"publishDate\", \"content\", \"slug\", \"perex\", \"author\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.643000','2022-08-10 10:37:14.643000',NULL,NULL),
	(52,'plugin::content-manager.explorer.create','api::icon.icon','{\"fields\": [\"title\", \"codename\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.645000','2022-08-10 10:37:14.645000',NULL,NULL),
	(53,'plugin::content-manager.explorer.create','api::menu.menu','{\"fields\": [\"title\", \"items.page\", \"items.externalUrl\", \"items.label\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.646000','2023-02-02 13:00:22.297000',NULL,NULL),
	(54,'plugin::content-manager.explorer.create','api::message.message','{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"city\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.647000','2022-08-10 10:37:14.647000',NULL,NULL),
	(55,'plugin::content-manager.explorer.create','api::newsletter-subscriber.newsletter-subscriber','{\"fields\": [\"email\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.648000','2022-08-10 10:37:14.648000',NULL,NULL),
	(56,'plugin::content-manager.explorer.create','api::page.page','{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.650000','2022-08-10 10:37:14.650000',NULL,NULL),
	(57,'plugin::content-manager.explorer.create','api::redirect.redirect','{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.651000','2022-08-10 10:37:14.651000',NULL,NULL),
	(58,'plugin::content-manager.explorer.create','api::system-resource.system-resource','{\"fields\": [\"codename\", \"value\", \"name\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.652000','2022-08-10 10:37:14.652000',NULL,NULL),
	(59,'plugin::content-manager.explorer.create','api::web-setting.web-setting','{\"fields\": [\"gtmCode\", \"facebook\", \"twitter\", \"instagram\", \"pinterest\", \"youtube\", \"homePage\", \"articleDetailPage\", \"mailFrom\", \"mailTo\", \"mailSubject\", \"mainMenu\", \"articlesPage\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.653000','2022-08-10 10:37:14.653000',NULL,NULL),
	(60,'plugin::content-manager.explorer.read','api::article.article','{\"fields\": [\"title\", \"mainImage\", \"publishDate\", \"content\", \"slug\", \"perex\", \"author\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.654000','2022-08-10 10:37:14.654000',NULL,NULL),
	(61,'plugin::content-manager.explorer.read','api::icon.icon','{\"fields\": [\"title\", \"codename\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.656000','2022-08-10 10:37:14.656000',NULL,NULL),
	(62,'plugin::content-manager.explorer.read','api::menu.menu','{\"fields\": [\"title\", \"items.page\", \"items.externalUrl\", \"items.label\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.657000','2023-02-02 13:00:22.297000',NULL,NULL),
	(63,'plugin::content-manager.explorer.read','api::message.message','{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"city\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.658000','2022-08-10 10:37:14.658000',NULL,NULL),
	(64,'plugin::content-manager.explorer.read','api::newsletter-subscriber.newsletter-subscriber','{\"fields\": [\"email\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.659000','2022-08-10 10:37:14.659000',NULL,NULL),
	(65,'plugin::content-manager.explorer.read','api::page.page','{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.660000','2022-08-10 10:37:14.660000',NULL,NULL),
	(66,'plugin::content-manager.explorer.read','api::redirect.redirect','{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.661000','2022-08-10 10:37:14.661000',NULL,NULL),
	(67,'plugin::content-manager.explorer.read','api::system-resource.system-resource','{\"fields\": [\"codename\", \"value\", \"name\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.662000','2022-08-10 10:37:14.662000',NULL,NULL),
	(68,'plugin::content-manager.explorer.read','api::web-setting.web-setting','{\"fields\": [\"gtmCode\", \"facebook\", \"twitter\", \"instagram\", \"pinterest\", \"youtube\", \"homePage\", \"articleDetailPage\", \"mailFrom\", \"mailTo\", \"mailSubject\", \"mainMenu\", \"articlesPage\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.663000','2022-08-10 10:37:14.663000',NULL,NULL),
	(69,'plugin::content-manager.explorer.update','api::article.article','{\"fields\": [\"title\", \"mainImage\", \"publishDate\", \"content\", \"slug\", \"perex\", \"author\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.664000','2022-08-10 10:37:14.664000',NULL,NULL),
	(70,'plugin::content-manager.explorer.update','api::icon.icon','{\"fields\": [\"title\", \"codename\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.665000','2022-08-10 10:37:14.665000',NULL,NULL),
	(71,'plugin::content-manager.explorer.update','api::menu.menu','{\"fields\": [\"title\", \"items.page\", \"items.externalUrl\", \"items.label\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.666000','2023-02-02 13:00:22.297000',NULL,NULL),
	(72,'plugin::content-manager.explorer.update','api::message.message','{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"city\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.666000','2022-08-10 10:37:14.666000',NULL,NULL),
	(73,'plugin::content-manager.explorer.update','api::newsletter-subscriber.newsletter-subscriber','{\"fields\": [\"email\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.667000','2022-08-10 10:37:14.667000',NULL,NULL),
	(74,'plugin::content-manager.explorer.update','api::page.page','{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.668000','2022-08-10 10:37:14.668000',NULL,NULL),
	(75,'plugin::content-manager.explorer.update','api::redirect.redirect','{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.669000','2022-08-10 10:37:14.669000',NULL,NULL),
	(76,'plugin::content-manager.explorer.update','api::system-resource.system-resource','{\"fields\": [\"codename\", \"value\", \"name\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.670000','2022-08-10 10:37:14.670000',NULL,NULL),
	(77,'plugin::content-manager.explorer.update','api::web-setting.web-setting','{\"fields\": [\"gtmCode\", \"facebook\", \"twitter\", \"instagram\", \"pinterest\", \"youtube\", \"homePage\", \"articleDetailPage\", \"mailFrom\", \"mailTo\", \"mailSubject\", \"mainMenu\", \"articlesPage\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\"]}','[\"admin::is-creator\"]','2022-08-10 10:37:14.671000','2022-08-10 10:37:14.671000',NULL,NULL),
	(79,'plugin::content-manager.explorer.delete','api::icon.icon','{}','[\"admin::is-creator\"]','2022-08-10 10:37:14.672000','2022-08-10 10:37:14.672000',NULL,NULL),
	(81,'plugin::content-manager.explorer.delete','api::message.message','{}','[\"admin::is-creator\"]','2022-08-10 10:37:14.674000','2022-08-10 10:37:14.674000',NULL,NULL),
	(82,'plugin::content-manager.explorer.delete','api::newsletter-subscriber.newsletter-subscriber','{}','[\"admin::is-creator\"]','2022-08-10 10:37:14.675000','2022-08-10 10:37:14.675000',NULL,NULL),
	(84,'plugin::content-manager.explorer.delete','api::redirect.redirect','{}','[\"admin::is-creator\"]','2022-08-10 10:37:14.677000','2022-08-10 10:37:14.677000',NULL,NULL),
	(87,'plugin::upload.read',NULL,'{}','[\"admin::is-creator\"]','2022-08-10 10:37:14.679000','2022-08-10 10:37:14.679000',NULL,NULL),
	(88,'plugin::upload.assets.create',NULL,'{}','[]','2022-08-10 10:37:14.680000','2022-08-10 10:37:14.680000',NULL,NULL),
	(89,'plugin::upload.assets.update',NULL,'{}','[\"admin::is-creator\"]','2022-08-10 10:37:14.681000','2022-08-10 10:37:14.681000',NULL,NULL),
	(90,'plugin::upload.assets.download',NULL,'{}','[]','2022-08-10 10:37:14.682000','2022-08-10 10:37:14.682000',NULL,NULL),
	(91,'plugin::upload.assets.copy-link',NULL,'{}','[]','2022-08-10 10:37:14.683000','2022-08-10 10:37:14.683000',NULL,NULL),
	(92,'plugin::content-manager.explorer.create','plugin::users-permissions.user','{\"fields\": [\"username\", \"email\", \"provider\", \"password\", \"resetPasswordToken\", \"confirmationToken\", \"confirmed\", \"blocked\", \"role\"]}','[]','2022-08-10 10:37:14.698000','2022-08-10 10:37:14.698000',NULL,NULL),
	(94,'plugin::content-manager.explorer.create','api::icon.icon','{\"fields\": [\"title\", \"codename\"]}','[]','2022-08-10 10:37:14.700000','2022-08-10 10:37:14.700000',NULL,NULL),
	(96,'plugin::content-manager.explorer.create','api::message.message','{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"city\"]}','[]','2022-08-10 10:37:14.703000','2022-08-10 10:37:14.703000',NULL,NULL),
	(97,'plugin::content-manager.explorer.create','api::newsletter-subscriber.newsletter-subscriber','{\"fields\": [\"email\"]}','[]','2022-08-10 10:37:14.704000','2022-08-10 10:37:14.704000',NULL,NULL),
	(99,'plugin::content-manager.explorer.create','api::redirect.redirect','{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}','[]','2022-08-10 10:37:14.707000','2022-08-10 10:37:14.707000',NULL,NULL),
	(102,'plugin::content-manager.explorer.read','plugin::users-permissions.user','{\"fields\": [\"username\", \"email\", \"provider\", \"password\", \"resetPasswordToken\", \"confirmationToken\", \"confirmed\", \"blocked\", \"role\"]}','[]','2022-08-10 10:37:14.710000','2022-08-10 10:37:14.710000',NULL,NULL),
	(104,'plugin::content-manager.explorer.read','api::icon.icon','{\"fields\": [\"title\", \"codename\"]}','[]','2022-08-10 10:37:14.714000','2022-08-10 10:37:14.714000',NULL,NULL),
	(106,'plugin::content-manager.explorer.read','api::message.message','{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"city\"]}','[]','2022-08-10 10:37:14.717000','2022-08-10 10:37:14.717000',NULL,NULL),
	(107,'plugin::content-manager.explorer.read','api::newsletter-subscriber.newsletter-subscriber','{\"fields\": [\"email\"]}','[]','2022-08-10 10:37:14.718000','2022-08-10 10:37:14.718000',NULL,NULL),
	(109,'plugin::content-manager.explorer.read','api::redirect.redirect','{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}','[]','2022-08-10 10:37:14.720000','2022-08-10 10:37:14.720000',NULL,NULL),
	(112,'plugin::content-manager.explorer.update','plugin::users-permissions.user','{\"fields\": [\"username\", \"email\", \"provider\", \"password\", \"resetPasswordToken\", \"confirmationToken\", \"confirmed\", \"blocked\", \"role\"]}','[]','2022-08-10 10:37:14.723000','2022-08-10 10:37:14.723000',NULL,NULL),
	(114,'plugin::content-manager.explorer.update','api::icon.icon','{\"fields\": [\"title\", \"codename\"]}','[]','2022-08-10 10:37:14.725000','2022-08-10 10:37:14.725000',NULL,NULL),
	(116,'plugin::content-manager.explorer.update','api::message.message','{\"fields\": [\"name\", \"phone\", \"email\", \"message\", \"city\"]}','[]','2022-08-10 10:37:14.727000','2022-08-10 10:37:14.727000',NULL,NULL),
	(117,'plugin::content-manager.explorer.update','api::newsletter-subscriber.newsletter-subscriber','{\"fields\": [\"email\"]}','[]','2022-08-10 10:37:14.728000','2022-08-10 10:37:14.728000',NULL,NULL),
	(119,'plugin::content-manager.explorer.update','api::redirect.redirect','{\"fields\": [\"redirectFrom\", \"redirectTo\", \"statusCode\"]}','[]','2022-08-10 10:37:14.730000','2022-08-10 10:37:14.730000',NULL,NULL),
	(122,'plugin::content-manager.explorer.delete','plugin::users-permissions.user','{}','[]','2022-08-10 10:37:14.733000','2022-08-10 10:37:14.733000',NULL,NULL),
	(123,'plugin::content-manager.explorer.delete','api::article.article','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.486000','2023-02-02 14:09:13.486000',NULL,NULL),
	(124,'plugin::content-manager.explorer.delete','api::icon.icon','{}','[]','2022-08-10 10:37:14.734000','2022-08-10 10:37:14.734000',NULL,NULL),
	(125,'plugin::content-manager.explorer.delete','api::menu.menu','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.492000','2023-02-02 14:09:13.492000',NULL,NULL),
	(126,'plugin::content-manager.explorer.delete','api::message.message','{}','[]','2022-08-10 10:37:14.736000','2022-08-10 10:37:14.736000',NULL,NULL),
	(127,'plugin::content-manager.explorer.delete','api::newsletter-subscriber.newsletter-subscriber','{}','[]','2022-08-10 10:37:14.737000','2022-08-10 10:37:14.737000',NULL,NULL),
	(128,'plugin::content-manager.explorer.delete','api::page.page','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.496000','2023-02-02 14:09:13.496000',NULL,NULL),
	(129,'plugin::content-manager.explorer.delete','api::redirect.redirect','{}','[]','2022-08-10 10:37:14.739000','2022-08-10 10:37:14.739000',NULL,NULL),
	(130,'plugin::content-manager.explorer.delete','api::system-resource.system-resource','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.498000','2023-02-02 14:09:13.498000',NULL,NULL),
	(131,'plugin::content-manager.explorer.delete','api::web-setting.web-setting','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.501000','2023-02-02 14:09:13.501000',NULL,NULL),
	(132,'plugin::content-manager.explorer.publish','api::article.article','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.507000','2023-02-02 14:09:13.507000',NULL,NULL),
	(133,'plugin::content-manager.explorer.publish','api::icon.icon','{}','[]','2022-08-10 10:37:14.743000','2022-08-10 10:37:14.743000',NULL,NULL),
	(134,'plugin::content-manager.explorer.publish','api::menu.menu','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.510000','2023-02-02 14:09:13.510000',NULL,NULL),
	(135,'plugin::content-manager.explorer.publish','api::message.message','{}','[]','2022-08-10 10:37:14.745000','2022-08-10 10:37:14.745000',NULL,NULL),
	(136,'plugin::content-manager.explorer.publish','api::newsletter-subscriber.newsletter-subscriber','{}','[]','2022-08-10 10:37:14.746000','2022-08-10 10:37:14.746000',NULL,NULL),
	(137,'plugin::content-manager.explorer.publish','api::page.page','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.512000','2023-02-02 14:09:13.512000',NULL,NULL),
	(138,'plugin::content-manager.explorer.publish','api::redirect.redirect','{}','[]','2022-08-10 10:37:14.747000','2022-08-10 10:37:14.747000',NULL,NULL),
	(139,'plugin::content-manager.explorer.publish','api::system-resource.system-resource','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.515000','2023-02-02 14:09:13.515000',NULL,NULL),
	(140,'plugin::content-manager.explorer.publish','api::web-setting.web-setting','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.517000','2023-02-02 14:09:13.517000',NULL,NULL),
	(141,'plugin::content-manager.single-types.configure-view',NULL,'{}','[]','2022-08-10 10:37:14.750000','2022-08-10 10:37:14.750000',NULL,NULL),
	(142,'plugin::content-manager.collection-types.configure-view',NULL,'{}','[]','2022-08-10 10:37:14.751000','2022-08-10 10:37:14.751000',NULL,NULL),
	(143,'plugin::content-manager.components.configure-layout',NULL,'{}','[]','2022-08-10 10:37:14.752000','2022-08-10 10:37:14.752000',NULL,NULL),
	(144,'plugin::content-type-builder.read',NULL,'{}','[]','2022-08-10 10:37:14.753000','2022-08-10 10:37:14.753000',NULL,NULL),
	(145,'plugin::email.settings.read',NULL,'{}','[]','2022-08-10 10:37:14.754000','2022-08-10 10:37:14.754000',NULL,NULL),
	(146,'plugin::upload.read',NULL,'{}','[]','2022-08-10 10:37:14.755000','2022-08-10 10:37:14.755000',NULL,NULL),
	(147,'plugin::upload.assets.create',NULL,'{}','[]','2022-08-10 10:37:14.755000','2022-08-10 10:37:14.755000',NULL,NULL),
	(148,'plugin::upload.assets.update',NULL,'{}','[]','2022-08-10 10:37:14.756000','2022-08-10 10:37:14.756000',NULL,NULL),
	(149,'plugin::upload.assets.download',NULL,'{}','[]','2022-08-10 10:37:14.758000','2022-08-10 10:37:14.758000',NULL,NULL),
	(150,'plugin::upload.assets.copy-link',NULL,'{}','[]','2022-08-10 10:37:14.759000','2022-08-10 10:37:14.759000',NULL,NULL),
	(151,'plugin::upload.settings.read',NULL,'{}','[]','2022-08-10 10:37:14.760000','2022-08-10 10:37:14.760000',NULL,NULL),
	(152,'plugin::content-versioning.save',NULL,'{}','[]','2022-08-10 10:37:14.761000','2022-08-10 10:37:14.761000',NULL,NULL),
	(153,'plugin::i18n.locale.create',NULL,'{}','[]','2022-08-10 10:37:14.762000','2022-08-10 10:37:14.762000',NULL,NULL),
	(154,'plugin::i18n.locale.read',NULL,'{}','[]','2022-08-10 10:37:14.763000','2022-08-10 10:37:14.763000',NULL,NULL),
	(155,'plugin::i18n.locale.update',NULL,'{}','[]','2022-08-10 10:37:14.764000','2022-08-10 10:37:14.764000',NULL,NULL),
	(156,'plugin::i18n.locale.delete',NULL,'{}','[]','2022-08-10 10:37:14.764000','2022-08-10 10:37:14.764000',NULL,NULL),
	(161,'plugin::users-permissions.roles.create',NULL,'{}','[]','2022-08-10 10:37:14.769000','2022-08-10 10:37:14.769000',NULL,NULL),
	(162,'plugin::users-permissions.roles.read',NULL,'{}','[]','2022-08-10 10:37:14.770000','2022-08-10 10:37:14.770000',NULL,NULL),
	(163,'plugin::users-permissions.roles.update',NULL,'{}','[]','2022-08-10 10:37:14.771000','2022-08-10 10:37:14.771000',NULL,NULL),
	(164,'plugin::users-permissions.roles.delete',NULL,'{}','[]','2022-08-10 10:37:14.772000','2022-08-10 10:37:14.772000',NULL,NULL),
	(165,'plugin::users-permissions.providers.read',NULL,'{}','[]','2022-08-10 10:37:14.773000','2022-08-10 10:37:14.773000',NULL,NULL),
	(166,'plugin::users-permissions.providers.update',NULL,'{}','[]','2022-08-10 10:37:14.774000','2022-08-10 10:37:14.774000',NULL,NULL),
	(167,'plugin::users-permissions.email-templates.read',NULL,'{}','[]','2022-08-10 10:37:14.774000','2022-08-10 10:37:14.774000',NULL,NULL),
	(168,'plugin::users-permissions.email-templates.update',NULL,'{}','[]','2022-08-10 10:37:14.775000','2022-08-10 10:37:14.775000',NULL,NULL),
	(169,'plugin::users-permissions.advanced-settings.read',NULL,'{}','[]','2022-08-10 10:37:14.776000','2022-08-10 10:37:14.776000',NULL,NULL),
	(170,'plugin::users-permissions.advanced-settings.update',NULL,'{}','[]','2022-08-10 10:37:14.777000','2022-08-10 10:37:14.777000',NULL,NULL),
	(171,'admin::marketplace.read',NULL,'{}','[]','2022-08-10 10:37:14.778000','2022-08-10 10:37:14.778000',NULL,NULL),
	(172,'admin::marketplace.plugins.install',NULL,'{}','[]','2022-08-10 10:37:14.778000','2022-08-10 10:37:14.778000',NULL,NULL),
	(173,'admin::marketplace.plugins.uninstall',NULL,'{}','[]','2022-08-10 10:37:14.779000','2022-08-10 10:37:14.779000',NULL,NULL),
	(174,'admin::webhooks.create',NULL,'{}','[]','2022-08-10 10:37:14.780000','2022-08-10 10:37:14.780000',NULL,NULL),
	(175,'admin::webhooks.read',NULL,'{}','[]','2022-08-10 10:37:14.781000','2022-08-10 10:37:14.781000',NULL,NULL),
	(176,'admin::webhooks.update',NULL,'{}','[]','2022-08-10 10:37:14.781000','2022-08-10 10:37:14.781000',NULL,NULL),
	(177,'admin::webhooks.delete',NULL,'{}','[]','2022-08-10 10:37:14.782000','2022-08-10 10:37:14.782000',NULL,NULL),
	(178,'admin::users.create',NULL,'{}','[]','2022-08-10 10:37:14.783000','2022-08-10 10:37:14.783000',NULL,NULL),
	(179,'admin::users.read',NULL,'{}','[]','2022-08-10 10:37:14.784000','2022-08-10 10:37:14.784000',NULL,NULL),
	(180,'admin::users.update',NULL,'{}','[]','2022-08-10 10:37:14.784000','2022-08-10 10:37:14.784000',NULL,NULL),
	(181,'admin::users.delete',NULL,'{}','[]','2022-08-10 10:37:14.785000','2022-08-10 10:37:14.785000',NULL,NULL),
	(182,'admin::roles.create',NULL,'{}','[]','2022-08-10 10:37:14.786000','2022-08-10 10:37:14.786000',NULL,NULL),
	(183,'admin::roles.read',NULL,'{}','[]','2022-08-10 10:37:14.786000','2022-08-10 10:37:14.786000',NULL,NULL),
	(184,'admin::roles.update',NULL,'{}','[]','2022-08-10 10:37:14.787000','2022-08-10 10:37:14.787000',NULL,NULL),
	(185,'admin::roles.delete',NULL,'{}','[]','2022-08-10 10:37:14.788000','2022-08-10 10:37:14.788000',NULL,NULL),
	(186,'admin::api-tokens.create',NULL,'{}','[]','2022-08-10 10:37:14.788000','2022-08-10 10:37:14.788000',NULL,NULL),
	(187,'admin::api-tokens.read',NULL,'{}','[]','2022-08-10 10:37:14.789000','2022-08-10 10:37:14.789000',NULL,NULL),
	(188,'admin::api-tokens.update',NULL,'{}','[]','2022-08-10 10:37:14.790000','2022-08-10 10:37:14.790000',NULL,NULL),
	(189,'admin::api-tokens.delete',NULL,'{}','[]','2022-08-10 10:37:14.790000','2022-08-10 10:37:14.790000',NULL,NULL),
	(190,'admin::project-settings.update',NULL,'{}','[]','2022-08-10 10:37:14.791000','2022-08-10 10:37:14.791000',NULL,NULL),
	(191,'admin::project-settings.read',NULL,'{}','[]','2022-08-10 10:37:14.792000','2022-08-10 10:37:14.792000',NULL,NULL),
	(195,'plugin::content-manager.explorer.create','plugin::block-gallery.block','{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}','[]','2023-02-02 13:00:22.119000','2023-02-02 13:00:22.119000',NULL,NULL),
	(196,'plugin::content-manager.explorer.create','api::article.article','{\"fields\": [\"title\", \"mainImage\", \"publishDate\", \"content\", \"slug\", \"perex\", \"author\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.521000','2023-02-02 14:09:13.521000',NULL,NULL),
	(197,'plugin::content-manager.explorer.create','api::menu.menu','{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.523000','2023-02-02 14:09:13.523000',NULL,NULL),
	(198,'plugin::content-manager.explorer.create','api::page.page','{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.525000','2023-02-02 14:09:13.525000',NULL,NULL),
	(199,'plugin::content-manager.explorer.create','api::system-resource.system-resource','{\"fields\": [\"name\", \"codename\", \"value\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.527000','2023-02-02 14:09:13.527000',NULL,NULL),
	(200,'plugin::content-manager.explorer.create','api::template.template','{\"fields\": [\"title\", \"content\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.531000','2023-02-02 14:09:13.531000',NULL,NULL),
	(201,'plugin::content-manager.explorer.create','api::web-setting.web-setting','{\"fields\": [\"gtmCode\", \"facebook\", \"twitter\", \"instagram\", \"pinterest\", \"youtube\", \"homePage\", \"articleDetailPage\", \"mailFrom\", \"mailTo\", \"mailSubject\", \"mainMenu\", \"articlesPage\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"footerMenu\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.533000','2023-02-02 14:09:13.533000',NULL,NULL),
	(202,'plugin::content-manager.explorer.read','plugin::block-gallery.block','{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}','[]','2023-02-02 13:00:22.141000','2023-02-02 13:00:22.141000',NULL,NULL),
	(203,'plugin::content-manager.explorer.read','api::article.article','{\"fields\": [\"title\", \"mainImage\", \"publishDate\", \"content\", \"slug\", \"perex\", \"author\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.537000','2023-02-02 14:09:13.537000',NULL,NULL),
	(204,'plugin::content-manager.explorer.read','api::menu.menu','{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.539000','2023-02-02 14:09:13.539000',NULL,NULL),
	(205,'plugin::content-manager.explorer.read','api::page.page','{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.541000','2023-02-02 14:09:13.541000',NULL,NULL),
	(206,'plugin::content-manager.explorer.read','api::system-resource.system-resource','{\"fields\": [\"name\", \"codename\", \"value\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.543000','2023-02-02 14:09:13.543000',NULL,NULL),
	(207,'plugin::content-manager.explorer.read','api::template.template','{\"fields\": [\"title\", \"content\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.545000','2023-02-02 14:09:13.545000',NULL,NULL),
	(208,'plugin::content-manager.explorer.read','api::web-setting.web-setting','{\"fields\": [\"gtmCode\", \"facebook\", \"twitter\", \"instagram\", \"pinterest\", \"youtube\", \"homePage\", \"articleDetailPage\", \"mailFrom\", \"mailTo\", \"mailSubject\", \"mainMenu\", \"articlesPage\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"footerMenu\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.547000','2023-02-02 14:09:13.547000',NULL,NULL),
	(209,'plugin::content-manager.explorer.update','plugin::block-gallery.block','{\"fields\": [\"image\", \"displayName\", \"blockName\", \"externalUrl\"]}','[]','2023-02-02 13:00:22.162000','2023-02-02 13:00:22.162000',NULL,NULL),
	(210,'plugin::content-manager.explorer.update','api::article.article','{\"fields\": [\"title\", \"mainImage\", \"publishDate\", \"content\", \"slug\", \"perex\", \"author\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.552000','2023-02-02 14:09:13.552000',NULL,NULL),
	(211,'plugin::content-manager.explorer.update','api::menu.menu','{\"fields\": [\"title\", \"items.label\", \"items.page\", \"items.externalUrl\", \"items.openInNewTab\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.554000','2023-02-02 14:09:13.554000',NULL,NULL),
	(212,'plugin::content-manager.explorer.update','api::page.page','{\"fields\": [\"title\", \"url\", \"blocks\", \"pages\", \"parent\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"sitemap.enabled\", \"sitemap.changeFrequency\", \"sitemap.priority\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.556000','2023-02-02 14:09:13.556000',NULL,NULL),
	(213,'plugin::content-manager.explorer.update','api::system-resource.system-resource','{\"fields\": [\"name\", \"codename\", \"value\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.558000','2023-02-02 14:09:13.558000',NULL,NULL),
	(214,'plugin::content-manager.explorer.update','api::template.template','{\"fields\": [\"title\", \"content\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.560000','2023-02-02 14:09:13.560000',NULL,NULL),
	(215,'plugin::content-manager.explorer.update','api::web-setting.web-setting','{\"fields\": [\"gtmCode\", \"facebook\", \"twitter\", \"instagram\", \"pinterest\", \"youtube\", \"homePage\", \"articleDetailPage\", \"mailFrom\", \"mailTo\", \"mailSubject\", \"mainMenu\", \"articlesPage\", \"seo.metaTitle\", \"seo.metaDescription\", \"seo.metaSocial.socialNetwork\", \"seo.metaSocial.title\", \"seo.metaSocial.description\", \"seo.metaSocial.image\", \"seo.keywords\", \"seo.metaRobots\", \"seo.structuredData\", \"seo.metaViewport\", \"seo.canonicalURL\", \"seo.preventIndexing\", \"seo.meta.name\", \"seo.meta.content\", \"seo.title\", \"footerMenu\"], \"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.563000','2023-02-02 14:09:13.563000',NULL,NULL),
	(216,'plugin::content-manager.explorer.delete','plugin::block-gallery.block','{}','[]','2023-02-02 13:00:22.178000','2023-02-02 13:00:22.178000',NULL,NULL),
	(217,'plugin::content-manager.explorer.delete','api::template.template','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.568000','2023-02-02 14:09:13.568000',NULL,NULL),
	(218,'plugin::content-manager.explorer.publish','api::template.template','{\"locales\": [\"cs\", \"fr\", \"it\", \"de\", \"pl\", \"ru\", \"sr\", \"zh\"]}','[]','2023-02-02 14:09:13.570000','2023-02-02 14:09:13.570000',NULL,NULL),
	(219,'plugin::upload.configure-view',NULL,'{}','[]','2023-02-02 13:00:22.185000','2023-02-02 13:00:22.185000',NULL,NULL),
	(220,'admin::api-tokens.access',NULL,'{}','[]','2023-02-02 13:00:22.187000','2023-02-02 13:00:22.187000',NULL,NULL),
	(221,'admin::api-tokens.regenerate',NULL,'{}','[]','2023-02-02 13:00:22.193000','2023-02-02 13:00:22.193000',NULL,NULL);

/*!40000 ALTER TABLE `admin_permissions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table admin_permissions_role_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin_permissions_role_links`;

CREATE TABLE `admin_permissions_role_links` (
  `permission_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `permission_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_permissions_role_links_unique` (`permission_id`,`role_id`),
  KEY `admin_permissions_role_links_fk` (`permission_id`),
  KEY `admin_permissions_role_links_inv_fk` (`role_id`),
  KEY `admin_permissions_role_links_order_inv_fk` (`permission_order`),
  CONSTRAINT `admin_permissions_role_links_fk` FOREIGN KEY (`permission_id`) REFERENCES `admin_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_permissions_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `admin_permissions_role_links` WRITE;
/*!40000 ALTER TABLE `admin_permissions_role_links` DISABLE KEYS */;

INSERT INTO `admin_permissions_role_links` (`permission_id`, `role_id`, `id`, `permission_order`)
VALUES
	(1,2,1,NULL),
	(2,2,2,NULL),
	(3,2,3,NULL),
	(4,2,4,NULL),
	(5,2,5,NULL),
	(6,2,6,NULL),
	(7,2,7,NULL),
	(8,2,8,NULL),
	(9,2,9,NULL),
	(10,2,10,NULL),
	(11,2,11,NULL),
	(12,2,12,NULL),
	(13,2,13,NULL),
	(14,2,14,NULL),
	(15,2,15,NULL),
	(16,2,16,NULL),
	(17,2,17,NULL),
	(18,2,18,NULL),
	(19,2,19,NULL),
	(20,2,20,NULL),
	(21,2,21,NULL),
	(22,2,22,NULL),
	(23,2,23,NULL),
	(24,2,24,NULL),
	(25,2,25,NULL),
	(26,2,26,NULL),
	(27,2,27,NULL),
	(29,2,28,NULL),
	(31,2,29,NULL),
	(32,2,30,NULL),
	(34,2,31,NULL),
	(38,2,32,NULL),
	(40,2,33,NULL),
	(41,2,34,NULL),
	(43,2,35,NULL),
	(46,2,36,NULL),
	(47,2,37,NULL),
	(48,2,38,NULL),
	(49,2,39,NULL),
	(50,2,40,NULL),
	(51,3,41,NULL),
	(52,3,42,NULL),
	(53,3,43,NULL),
	(54,3,44,NULL),
	(55,3,45,NULL),
	(56,3,46,NULL),
	(57,3,47,NULL),
	(58,3,48,NULL),
	(59,3,49,NULL),
	(60,3,50,NULL),
	(61,3,51,NULL),
	(62,3,52,NULL),
	(63,3,53,NULL),
	(64,3,54,NULL),
	(65,3,55,NULL),
	(66,3,56,NULL),
	(67,3,57,NULL),
	(68,3,58,NULL),
	(69,3,59,NULL),
	(70,3,60,NULL),
	(71,3,61,NULL),
	(72,3,62,NULL),
	(73,3,63,NULL),
	(74,3,64,NULL),
	(75,3,65,NULL),
	(76,3,66,NULL),
	(77,3,67,NULL),
	(79,3,68,NULL),
	(81,3,69,NULL),
	(82,3,70,NULL),
	(84,3,71,NULL),
	(87,3,72,NULL),
	(88,3,73,NULL),
	(89,3,74,NULL),
	(90,3,75,NULL),
	(91,3,76,NULL),
	(92,1,77,NULL),
	(94,1,78,NULL),
	(96,1,79,NULL),
	(97,1,80,NULL),
	(99,1,81,NULL),
	(102,1,82,NULL),
	(104,1,83,NULL),
	(106,1,84,NULL),
	(107,1,85,NULL),
	(109,1,86,NULL),
	(112,1,87,NULL),
	(114,1,88,NULL),
	(116,1,89,NULL),
	(117,1,90,NULL),
	(119,1,91,NULL),
	(122,1,92,NULL),
	(124,1,93,NULL),
	(126,1,94,NULL),
	(127,1,95,NULL),
	(129,1,96,NULL),
	(133,1,97,NULL),
	(135,1,98,NULL),
	(136,1,99,NULL),
	(138,1,100,NULL),
	(141,1,101,NULL),
	(142,1,102,NULL),
	(143,1,103,NULL),
	(144,1,104,NULL),
	(145,1,105,NULL),
	(146,1,106,NULL),
	(147,1,107,NULL),
	(148,1,108,NULL),
	(149,1,109,NULL),
	(150,1,110,NULL),
	(151,1,111,NULL),
	(152,1,112,NULL),
	(153,1,113,NULL),
	(154,1,114,NULL),
	(155,1,115,NULL),
	(156,1,116,NULL),
	(161,1,121,NULL),
	(162,1,122,NULL),
	(163,1,123,NULL),
	(164,1,124,NULL),
	(165,1,125,NULL),
	(166,1,126,NULL),
	(167,1,127,NULL),
	(168,1,128,NULL),
	(169,1,129,NULL),
	(170,1,130,NULL),
	(171,1,131,NULL),
	(172,1,132,NULL),
	(173,1,133,NULL),
	(174,1,134,NULL),
	(175,1,135,NULL),
	(176,1,136,NULL),
	(177,1,137,NULL),
	(178,1,138,NULL),
	(179,1,139,NULL),
	(180,1,140,NULL),
	(181,1,141,NULL),
	(182,1,142,NULL),
	(183,1,143,NULL),
	(184,1,144,NULL),
	(185,1,145,NULL),
	(186,1,146,NULL),
	(187,1,147,NULL),
	(188,1,148,NULL),
	(189,1,149,NULL),
	(190,1,150,NULL),
	(191,1,151,NULL),
	(195,1,177,1),
	(202,1,184,8),
	(209,1,191,15),
	(216,1,198,22),
	(219,1,201,25),
	(220,1,202,26),
	(221,1,203,27),
	(123,1,414,28),
	(125,1,415,29),
	(128,1,416,30),
	(130,1,417,31),
	(131,1,418,32),
	(132,1,419,33),
	(134,1,420,34),
	(137,1,421,35),
	(139,1,422,36),
	(140,1,423,37),
	(196,1,424,38),
	(197,1,425,39),
	(198,1,426,40),
	(199,1,427,41),
	(200,1,428,42),
	(201,1,429,43),
	(203,1,430,44),
	(204,1,431,45),
	(205,1,432,46),
	(206,1,433,47),
	(207,1,434,48),
	(208,1,435,49),
	(210,1,436,50),
	(211,1,437,51),
	(212,1,438,52),
	(213,1,439,53),
	(214,1,440,54),
	(215,1,441,55),
	(217,1,442,56),
	(218,1,443,57);

/*!40000 ALTER TABLE `admin_permissions_role_links` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table admin_roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin_roles`;

CREATE TABLE `admin_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_roles_created_by_id_fk` (`created_by_id`),
  KEY `admin_roles_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `admin_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `admin_roles` WRITE;
/*!40000 ALTER TABLE `admin_roles` DISABLE KEYS */;

INSERT INTO `admin_roles` (`id`, `name`, `code`, `description`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`)
VALUES
	(1,'Super Admin','strapi-super-admin','Super Admins can access and manage all features and settings.','2022-08-10 10:37:14.559000','2022-08-10 10:37:14.559000',NULL,NULL),
	(2,'Editor','strapi-editor','Editors can manage and publish contents including those of other users.','2022-08-10 10:37:14.562000','2022-08-10 10:37:14.562000',NULL,NULL),
	(3,'Author','strapi-author','Authors can manage the content they have created.','2022-08-10 10:37:14.563000','2022-08-10 10:37:14.563000',NULL,NULL);

/*!40000 ALTER TABLE `admin_roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table admin_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin_users`;

CREATE TABLE `admin_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_users_created_by_id_fk` (`created_by_id`),
  KEY `admin_users_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `admin_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;

INSERT INTO `admin_users` (`id`, `firstname`, `lastname`, `username`, `email`, `password`, `reset_password_token`, `registration_token`, `is_active`, `blocked`, `prefered_language`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`)
VALUES
	(1,'SKLINET','',NULL,'dev@sklinet.com','$2a$10$kg2unSV1Le.du7OO2xfnj.k/Ld.liS6ac67Vxh9r.yTfzF5.AdjZm',NULL,NULL,1,0,NULL,'2022-08-10 10:38:09.395000','2022-08-10 10:38:09.395000',NULL,NULL);

/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table admin_users_roles_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin_users_roles_links`;

CREATE TABLE `admin_users_roles_links` (
  `user_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_order` double unsigned DEFAULT NULL,
  `user_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_users_roles_links_unique` (`user_id`,`role_id`),
  KEY `admin_users_roles_links_fk` (`user_id`),
  KEY `admin_users_roles_links_inv_fk` (`role_id`),
  KEY `admin_users_roles_links_order_fk` (`role_order`),
  KEY `admin_users_roles_links_order_inv_fk` (`user_order`),
  CONSTRAINT `admin_users_roles_links_fk` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_users_roles_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `admin_users_roles_links` WRITE;
/*!40000 ALTER TABLE `admin_users_roles_links` DISABLE KEYS */;

INSERT INTO `admin_users_roles_links` (`user_id`, `role_id`, `id`, `role_order`, `user_order`)
VALUES
	(1,1,1,NULL,NULL);

/*!40000 ALTER TABLE `admin_users_roles_links` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table articles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `publish_date` datetime(6) DEFAULT NULL,
  `content` longtext,
  `slug` varchar(255) DEFAULT NULL,
  `perex` longtext,
  `author` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `vuid` varchar(255) DEFAULT NULL,
  `version_number` int(11) DEFAULT NULL,
  `is_visible_in_list_view` tinyint(1) DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_slug_unique` (`slug`),
  KEY `articles_created_by_id_fk` (`created_by_id`),
  KEY `articles_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `articles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `articles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;

INSERT INTO `articles` (`id`, `title`, `publish_date`, `content`, `slug`, `perex`, `author`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `vuid`, `version_number`, `is_visible_in_list_view`, `locale`)
VALUES
	(8,'TestArticleCs','2022-08-02 00:00:00.000000','TestContent','test-article-cs','TestPerex','SKLINET','2022-08-11 10:36:52.242000','2022-08-11 10:36:53.264000','2022-08-11 10:36:53.261000',1,1,'269ddd9a-1de9-44e2-928c-08a1562ef9df',1,1,'cs'),
	(9,'TestArticle2CS','2022-08-02 00:00:00.000000','TestContent','test-article2-cs','TestPerex','SKLINET','2022-08-11 10:37:17.134000','2022-08-11 10:37:17.999000','2022-08-11 10:37:17.997000',1,1,'1c641eba-b1bd-4836-adb3-c14c67c24325',1,1,'cs'),
	(10,'TestArticle3CS','2022-08-02 00:00:00.000000','TestContent','test-article3-cs','TestPerex','SKLINET','2022-08-11 10:37:31.818000','2022-08-11 10:37:33.047000','2022-08-11 10:37:33.046000',1,1,'316d460b-c092-45b7-b76c-e7874a8a604a',1,1,'cs');

/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table articles_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articles_components`;

CREATE TABLE `articles_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  KEY `articles_field_index` (`field`),
  KEY `articles_component_type_index` (`component_type`),
  KEY `articles_entity_fk` (`entity_id`),
  CONSTRAINT `articles_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `articles_components` WRITE;
/*!40000 ALTER TABLE `articles_components` DISABLE KEYS */;

INSERT INTO `articles_components` (`id`, `entity_id`, `component_id`, `component_type`, `field`, `order`)
VALUES
	(13,8,18,'shared.seo','seo',1),
	(14,8,16,'shared.sitemap','sitemap',1),
	(15,9,19,'shared.seo','seo',1),
	(16,9,17,'shared.sitemap','sitemap',1),
	(17,10,20,'shared.seo','seo',1),
	(18,10,18,'shared.sitemap','sitemap',1);

/*!40000 ALTER TABLE `articles_components` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table articles_localizations_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articles_localizations_links`;

CREATE TABLE `articles_localizations_links` (
  `article_id` int(10) unsigned DEFAULT NULL,
  `inv_article_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `article_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_localizations_links_unique` (`article_id`,`inv_article_id`),
  KEY `articles_localizations_links_fk` (`article_id`),
  KEY `articles_localizations_links_inv_fk` (`inv_article_id`),
  KEY `articles_localizations_links_order_fk` (`article_order`),
  CONSTRAINT `articles_localizations_links_fk` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `articles_localizations_links_inv_fk` FOREIGN KEY (`inv_article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table articles_versions_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articles_versions_links`;

CREATE TABLE `articles_versions_links` (
  `article_id` int(10) unsigned DEFAULT NULL,
  `inv_article_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `article_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_versions_links_unique` (`article_id`,`inv_article_id`),
  KEY `articles_versions_links_fk` (`article_id`),
  KEY `articles_versions_links_inv_fk` (`inv_article_id`),
  KEY `articles_versions_links_order_fk` (`article_order`),
  CONSTRAINT `articles_versions_links_fk` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `articles_versions_links_inv_fk` FOREIGN KEY (`inv_article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blocks`;

CREATE TABLE `blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `display_name` varchar(255) DEFAULT NULL,
  `block_name` varchar(255) DEFAULT NULL,
  `external_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blocks_created_by_id_fk` (`created_by_id`),
  KEY `blocks_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `blocks_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `blocks_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table components_block_article_detail_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_article_detail_blocks`;

CREATE TABLE `components_block_article_detail_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `section_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_block_article_detail_blocks` WRITE;
/*!40000 ALTER TABLE `components_block_article_detail_blocks` DISABLE KEYS */;

INSERT INTO `components_block_article_detail_blocks` (`id`, `section_id`)
VALUES
	(1,NULL),
	(2,NULL);

/*!40000 ALTER TABLE `components_block_article_detail_blocks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_block_articles_list_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_articles_list_blocks`;

CREATE TABLE `components_block_articles_list_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `section_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_block_articles_list_blocks` WRITE;
/*!40000 ALTER TABLE `components_block_articles_list_blocks` DISABLE KEYS */;

INSERT INTO `components_block_articles_list_blocks` (`id`, `section_id`)
VALUES
	(1,NULL),
	(2,NULL);

/*!40000 ALTER TABLE `components_block_articles_list_blocks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_block_button_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_button_blocks`;

CREATE TABLE `components_block_button_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_block_button_blocks_icon_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_button_blocks_icon_links`;

CREATE TABLE `components_block_button_blocks_icon_links` (
  `button_block_id` int(10) unsigned DEFAULT NULL,
  `icon_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_block_button_blocks_icon_links_unique` (`button_block_id`,`icon_id`),
  KEY `components_block_button_blocks_icon_links_fk` (`button_block_id`),
  KEY `components_block_button_blocks_icon_links_inv_fk` (`icon_id`),
  CONSTRAINT `components_block_button_blocks_icon_links_fk` FOREIGN KEY (`button_block_id`) REFERENCES `components_block_button_blocks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `components_block_button_blocks_icon_links_inv_fk` FOREIGN KEY (`icon_id`) REFERENCES `icons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_block_button_blocks_page_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_button_blocks_page_links`;

CREATE TABLE `components_block_button_blocks_page_links` (
  `button_block_id` int(10) unsigned DEFAULT NULL,
  `page_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_block_button_blocks_page_links_unique` (`button_block_id`,`page_id`),
  KEY `components_block_button_blocks_page_links_fk` (`button_block_id`),
  KEY `components_block_button_blocks_page_links_inv_fk` (`page_id`),
  CONSTRAINT `components_block_button_blocks_page_links_fk` FOREIGN KEY (`button_block_id`) REFERENCES `components_block_button_blocks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `components_block_button_blocks_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_block_carousel_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_carousel_blocks`;

CREATE TABLE `components_block_carousel_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text_align` varchar(255) DEFAULT NULL,
  `autoplay` tinyint(1) DEFAULT NULL,
  `interval` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_block_carousel_blocks` WRITE;
/*!40000 ALTER TABLE `components_block_carousel_blocks` DISABLE KEYS */;

INSERT INTO `components_block_carousel_blocks` (`id`, `text_align`, `autoplay`, `interval`)
VALUES
	(1,'center',1,NULL);

/*!40000 ALTER TABLE `components_block_carousel_blocks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_block_carousel_blocks_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_carousel_blocks_components`;

CREATE TABLE `components_block_carousel_blocks_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_block_carousel_blocks_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  KEY `components_block_carousel_blocks_field_index` (`field`),
  KEY `components_block_carousel_blocks_component_type_index` (`component_type`),
  KEY `components_block_carousel_blocks_entity_fk` (`entity_id`),
  CONSTRAINT `components_block_carousel_blocks_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `components_block_carousel_blocks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_block_carousel_blocks_components` WRITE;
/*!40000 ALTER TABLE `components_block_carousel_blocks_components` DISABLE KEYS */;

INSERT INTO `components_block_carousel_blocks_components` (`id`, `entity_id`, `component_id`, `component_type`, `field`, `order`)
VALUES
	(1,1,1,'complementary.carousel-banner','banners',1),
	(2,1,3,'complementary.carousel-banner','banners',2),
	(3,1,2,'complementary.carousel-banner','banners',3);

/*!40000 ALTER TABLE `components_block_carousel_blocks_components` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_block_error_page_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_error_page_blocks`;

CREATE TABLE `components_block_error_page_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `headline` varchar(255) DEFAULT NULL,
  `description` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_block_error_page_blocks` WRITE;
/*!40000 ALTER TABLE `components_block_error_page_blocks` DISABLE KEYS */;

INSERT INTO `components_block_error_page_blocks` (`id`, `headline`, `description`)
VALUES
	(1,'Chyba 404','TestDescriptionErrorPage'),
	(2,'Chyba 404','TestDescriptionErrorPage');

/*!40000 ALTER TABLE `components_block_error_page_blocks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_block_gallery_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_gallery_blocks`;

CREATE TABLE `components_block_gallery_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_block_image_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_image_blocks`;

CREATE TABLE `components_block_image_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_block_image_blocks` WRITE;
/*!40000 ALTER TABLE `components_block_image_blocks` DISABLE KEYS */;

INSERT INTO `components_block_image_blocks` (`id`)
VALUES
	(1),
	(2),
	(3);

/*!40000 ALTER TABLE `components_block_image_blocks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_block_latest_articles_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_latest_articles_blocks`;

CREATE TABLE `components_block_latest_articles_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `heading` varchar(255) DEFAULT NULL,
  `button_label` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_block_latest_articles_blocks` WRITE;
/*!40000 ALTER TABLE `components_block_latest_articles_blocks` DISABLE KEYS */;

INSERT INTO `components_block_latest_articles_blocks` (`id`, `heading`, `button_label`)
VALUES
	(2,'latest articles','testLabel'),
	(5,'Latest articles','See more');

/*!40000 ALTER TABLE `components_block_latest_articles_blocks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_block_map_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_map_blocks`;

CREATE TABLE `components_block_map_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bubble_text` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_block_map_blocks_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_map_blocks_components`;

CREATE TABLE `components_block_map_blocks_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_block_map_blocks_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  KEY `components_block_map_blocks_field_index` (`field`),
  KEY `components_block_map_blocks_component_type_index` (`component_type`),
  KEY `components_block_map_blocks_entity_fk` (`entity_id`),
  CONSTRAINT `components_block_map_blocks_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `components_block_map_blocks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_block_rich_text_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_rich_text_blocks`;

CREATE TABLE `components_block_rich_text_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_block_rich_text_blocks` WRITE;
/*!40000 ALTER TABLE `components_block_rich_text_blocks` DISABLE KEYS */;

INSERT INTO `components_block_rich_text_blocks` (`id`, `content`)
VALUES
	(1,'test');

/*!40000 ALTER TABLE `components_block_rich_text_blocks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_block_template_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_template_blocks`;

CREATE TABLE `components_block_template_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table components_block_template_blocks_template_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_template_blocks_template_links`;

CREATE TABLE `components_block_template_blocks_template_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `template_block_id` int(10) unsigned DEFAULT NULL,
  `template_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_block_template_blocks_template_links_unique` (`template_block_id`,`template_id`),
  KEY `components_block_template_blocks_template_links_fk` (`template_block_id`),
  KEY `components_block_template_blocks_template_links_inv_fk` (`template_id`),
  CONSTRAINT `components_block_template_blocks_template_links_fk` FOREIGN KEY (`template_block_id`) REFERENCES `components_block_template_blocks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `components_block_template_blocks_template_links_inv_fk` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table components_block_test_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_test_blocks`;

CREATE TABLE `components_block_test_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `test_text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_block_test_blocks_article_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_test_blocks_article_links`;

CREATE TABLE `components_block_test_blocks_article_links` (
  `test_block_id` int(10) unsigned DEFAULT NULL,
  `article_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_block_test_blocks_article_links_unique` (`test_block_id`,`article_id`),
  KEY `components_block_test_blocks_article_links_fk` (`test_block_id`),
  KEY `components_block_test_blocks_article_links_inv_fk` (`article_id`),
  CONSTRAINT `components_block_test_blocks_article_links_fk` FOREIGN KEY (`test_block_id`) REFERENCES `components_block_test_blocks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `components_block_test_blocks_article_links_inv_fk` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_block_test_blocks_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_test_blocks_components`;

CREATE TABLE `components_block_test_blocks_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_block_test_blocks_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  KEY `components_block_test_blocks_field_index` (`field`),
  KEY `components_block_test_blocks_component_type_index` (`component_type`),
  KEY `components_block_test_blocks_entity_fk` (`entity_id`),
  CONSTRAINT `components_block_test_blocks_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `components_block_test_blocks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_block_video_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_video_blocks`;

CREATE TABLE `components_block_video_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `autoplay` tinyint(1) DEFAULT NULL,
  `video_id` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_block_youtube_vimeo_blocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_block_youtube_vimeo_blocks`;

CREATE TABLE `components_block_youtube_vimeo_blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_uid` varchar(255) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_complementary_buttons
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_buttons`;

CREATE TABLE `components_complementary_buttons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `link_external` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `open_in_new_tab` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_complementary_buttons_page_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_buttons_page_links`;

CREATE TABLE `components_complementary_buttons_page_links` (
  `button_id` int(10) unsigned DEFAULT NULL,
  `page_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_complementary_buttons_page_links_unique` (`button_id`,`page_id`),
  KEY `components_complementary_buttons_page_links_fk` (`button_id`),
  KEY `components_complementary_buttons_page_links_inv_fk` (`page_id`),
  CONSTRAINT `components_complementary_buttons_page_links_fk` FOREIGN KEY (`button_id`) REFERENCES `components_complementary_buttons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `components_complementary_buttons_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_complementary_carousel_banners
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_carousel_banners`;

CREATE TABLE `components_complementary_carousel_banners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `headline` varchar(255) DEFAULT NULL,
  `description` longtext,
  `text_align` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_complementary_carousel_banners` WRITE;
/*!40000 ALTER TABLE `components_complementary_carousel_banners` DISABLE KEYS */;

INSERT INTO `components_complementary_carousel_banners` (`id`, `headline`, `description`, `text_align`)
VALUES
	(1,'Test','TestDescription','center'),
	(2,'Test3','Test3Description','center'),
	(3,'Test2','Test2Description','center');

/*!40000 ALTER TABLE `components_complementary_carousel_banners` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_complementary_ecomails
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_ecomails`;

CREATE TABLE `components_complementary_ecomails` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `api_key` varchar(255) DEFAULT NULL,
  `list_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_complementary_gallery_items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_gallery_items`;

CREATE TABLE `components_complementary_gallery_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_complementary_gps_coordinates
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_gps_coordinates`;

CREATE TABLE `components_complementary_gps_coordinates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_complementary_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_links`;

CREATE TABLE `components_complementary_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `link_external` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_complementary_links_page_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_links_page_links`;

CREATE TABLE `components_complementary_links_page_links` (
  `link_id` int(10) unsigned DEFAULT NULL,
  `page_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_complementary_links_page_links_unique` (`link_id`,`page_id`),
  KEY `components_complementary_links_page_links_fk` (`link_id`),
  KEY `components_complementary_links_page_links_inv_fk` (`page_id`),
  CONSTRAINT `components_complementary_links_page_links_fk` FOREIGN KEY (`link_id`) REFERENCES `components_complementary_links` (`id`) ON DELETE CASCADE,
  CONSTRAINT `components_complementary_links_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_complementary_mailchimps
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_mailchimps`;

CREATE TABLE `components_complementary_mailchimps` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `server_prefix` varchar(255) DEFAULT NULL,
  `api_key` varchar(255) DEFAULT NULL,
  `list_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_complementary_test_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_test_components`;

CREATE TABLE `components_complementary_test_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_complementary_test_components_icon_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_complementary_test_components_icon_links`;

CREATE TABLE `components_complementary_test_components_icon_links` (
  `test_component_id` int(10) unsigned DEFAULT NULL,
  `icon_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_complementary_test_components_icon_links_unique` (`test_component_id`,`icon_id`),
  KEY `components_complementary_test_components_icon_links_fk` (`test_component_id`),
  KEY `components_complementary_test_components_icon_links_inv_fk` (`icon_id`),
  CONSTRAINT `components_complementary_test_components_icon_links_fk` FOREIGN KEY (`test_component_id`) REFERENCES `components_complementary_test_components` (`id`) ON DELETE CASCADE,
  CONSTRAINT `components_complementary_test_components_icon_links_inv_fk` FOREIGN KEY (`icon_id`) REFERENCES `icons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_menu_menu_items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_menu_menu_items`;

CREATE TABLE `components_menu_menu_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `external_url` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `open_in_new_tab` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_menu_menu_items` WRITE;
/*!40000 ALTER TABLE `components_menu_menu_items` DISABLE KEYS */;

INSERT INTO `components_menu_menu_items` (`id`, `external_url`, `label`, `open_in_new_tab`)
VALUES
	(1,NULL,NULL,NULL),
	(2,NULL,NULL,NULL),
	(3,NULL,NULL,NULL),
	(4,NULL,NULL,NULL),
	(5,NULL,NULL,NULL),
	(6,NULL,NULL,NULL),
	(7,NULL,NULL,NULL),
	(8,NULL,NULL,NULL);

/*!40000 ALTER TABLE `components_menu_menu_items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_menu_menu_items_page_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_menu_menu_items_page_links`;

CREATE TABLE `components_menu_menu_items_page_links` (
  `menu_item_id` int(10) unsigned DEFAULT NULL,
  `page_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_menu_menu_items_page_links_unique` (`menu_item_id`,`page_id`),
  KEY `components_menu_menu_items_page_links_fk` (`menu_item_id`),
  KEY `components_menu_menu_items_page_links_inv_fk` (`page_id`),
  CONSTRAINT `components_menu_menu_items_page_links_fk` FOREIGN KEY (`menu_item_id`) REFERENCES `components_menu_menu_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `components_menu_menu_items_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_menu_menu_items_page_links` WRITE;
/*!40000 ALTER TABLE `components_menu_menu_items_page_links` DISABLE KEYS */;

INSERT INTO `components_menu_menu_items_page_links` (`menu_item_id`, `page_id`, `id`)
VALUES
	(5,10,3),
	(6,10,4),
	(7,10,5),
	(8,8,6);

/*!40000 ALTER TABLE `components_menu_menu_items_page_links` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_shared_fallback_seos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_shared_fallback_seos`;

CREATE TABLE `components_shared_fallback_seos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` longtext,
  `title` varchar(255) DEFAULT NULL,
  `twitter_card` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_shared_favicon_meta_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_shared_favicon_meta_tags`;

CREATE TABLE `components_shared_favicon_meta_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) DEFAULT NULL,
  `attributes` longtext,
  `content` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_shared_global_seos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_shared_global_seos`;

CREATE TABLE `components_shared_global_seos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `site_name` varchar(255) DEFAULT NULL,
  `title_suffix` varchar(255) DEFAULT NULL,
  `facebook_page_url` varchar(255) DEFAULT NULL,
  `twitter_account` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_shared_global_seos_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_shared_global_seos_components`;

CREATE TABLE `components_shared_global_seos_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_shared_global_seos_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  KEY `components_shared_global_seos_field_index` (`field`),
  KEY `components_shared_global_seos_component_type_index` (`component_type`),
  KEY `components_shared_global_seos_entity_fk` (`entity_id`),
  CONSTRAINT `components_shared_global_seos_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `components_shared_global_seos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_shared_meta_socials
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_shared_meta_socials`;

CREATE TABLE `components_shared_meta_socials` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `social_network` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table components_shared_metas
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_shared_metas`;

CREATE TABLE `components_shared_metas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `content` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_shared_metas` WRITE;
/*!40000 ALTER TABLE `components_shared_metas` DISABLE KEYS */;

INSERT INTO `components_shared_metas` (`id`, `name`, `content`)
VALUES
	(1,'test','test1'),
	(2,'test','TestArticleValue'),
	(3,'test2','testArticleValue2\n');

/*!40000 ALTER TABLE `components_shared_metas` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_shared_seos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_shared_seos`;

CREATE TABLE `components_shared_seos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(255) DEFAULT NULL,
  `keywords` longtext,
  `meta_robots` varchar(255) DEFAULT NULL,
  `structured_data` json DEFAULT NULL,
  `meta_viewport` varchar(255) DEFAULT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `prevent_indexing` tinyint(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_shared_seos` WRITE;
/*!40000 ALTER TABLE `components_shared_seos` DISABLE KEYS */;

INSERT INTO `components_shared_seos` (`id`, `meta_title`, `meta_description`, `keywords`, `meta_robots`, `structured_data`, `meta_viewport`, `canonical_url`, `prevent_indexing`, `title`)
VALUES
	(1,'SKLINET boilerplate','Domovská stránka SKLINET boilerplate, description seo meta asasdasdasdasddasasd',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(2,'testTitle','asdasdasdasdasdasdtestDescriptionasdasdadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(3,'testTitle','testDescriptionasdasdadadadadasdasdasdasdasdasdasdaadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(4,'Detail článku Boilerplate','testDescriptionasdasdadadadadaasdfasdassdaasdasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(5,'testTitle','testDescriptionasdasdasdasdasdasadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(6,'testTitle','testDescriptionasdasdasdasdasdasadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(7,'testTitle','testDescriptionasdasdasdasdasdasadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(8,'testTitle','asdasdadadadtestDescriptionasdasdadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(9,'testTitle','testDescriptionasdasdadadadadadasdsadasdsadasdasdasd',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(10,'Novinky','testDescriptionasdasdadadadadaasdfasdassdaasdasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(11,'404 Error','asdasdasdasdasdasdtestDescriptionasdasdadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(12,'testTitle','testDescriptionasdasdadadadadaasdfasdassdaasdasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(13,'NovinkyCs','testDescriptionasdasdadadadadaasdfasdassdaasdasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(14,'testTitleCS','testDescriptionasdasdasdasdasdasadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(15,'testTitleCS','testDescriptionasdasdasdasdasdasadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(16,'testTitleCS','testDescriptionasdasdasdasdasdasadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(17,'testTitle','testDescriptionasdasdasdasdasdasadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(18,'testTitle','testDescriptionasdasdasdasdasdasadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(19,'testTitle','testDescriptionasdasdasdasdasdasadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(20,'testTitle','testDescriptionasdasdasdasdasdasadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(21,'testTitle','asdasdadadadtestDescriptionasdasdadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(22,'Detail článku Boilerplate','testDescriptionasdasdadadadadaasdfasdassdaasdasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(23,'Homepage CS','testDescriptionasdasdadadadadasdasdasdasdasdasdasdaadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(24,'404 Error','asdasdasdasdasdasdtestDescriptionasdasdadadadadadasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL),
	(25,'testTitle','testDescriptionasdasdadadadadaasdfasdassdaasdasdsadasdsad',NULL,NULL,NULL,NULL,NULL,0,NULL);

/*!40000 ALTER TABLE `components_shared_seos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_shared_seos_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_shared_seos_components`;

CREATE TABLE `components_shared_seos_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `components_shared_seos_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  KEY `components_shared_seos_field_index` (`field`),
  KEY `components_shared_seos_component_type_index` (`component_type`),
  KEY `components_shared_seos_entity_fk` (`entity_id`),
  CONSTRAINT `components_shared_seos_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `components_shared_seos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_shared_seos_components` WRITE;
/*!40000 ALTER TABLE `components_shared_seos_components` DISABLE KEYS */;

INSERT INTO `components_shared_seos_components` (`id`, `entity_id`, `component_id`, `component_type`, `field`, `order`)
VALUES
	(2,23,1,'shared.meta','meta',1),
	(8,5,2,'shared.meta','meta',1),
	(9,5,3,'shared.meta','meta',2);

/*!40000 ALTER TABLE `components_shared_seos_components` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table components_shared_sitemaps
# ------------------------------------------------------------

DROP TABLE IF EXISTS `components_shared_sitemaps`;

CREATE TABLE `components_shared_sitemaps` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) DEFAULT NULL,
  `change_frequency` varchar(255) DEFAULT NULL,
  `priority` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `components_shared_sitemaps` WRITE;
/*!40000 ALTER TABLE `components_shared_sitemaps` DISABLE KEYS */;

INSERT INTO `components_shared_sitemaps` (`id`, `enabled`, `change_frequency`, `priority`)
VALUES
	(1,1,'monthly',0.30),
	(2,1,'weekly',0.30),
	(3,1,'monthly',0.30),
	(4,1,'weekly',0.30),
	(5,1,'monthly',0.40),
	(6,1,'monthly',0.30),
	(7,1,'hourly',0.30),
	(8,1,'monthly',0.30),
	(9,1,'monthly',0.30),
	(10,1,'hourly',0.30),
	(11,1,'monthly',0.30),
	(12,1,'monthly',0.30),
	(13,1,'monthly',0.30),
	(14,1,'monthly',0.30),
	(15,1,'monthly',0.30),
	(16,1,'monthly',0.30),
	(17,1,'monthly',0.40),
	(18,1,'monthly',0.30),
	(19,1,'monthly',0.30),
	(20,1,'hourly',0.30),
	(21,1,'monthly',0.30),
	(22,1,'hourly',0.30);

/*!40000 ALTER TABLE `components_shared_sitemaps` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table email_templates
# ------------------------------------------------------------

DROP TABLE IF EXISTS `email_templates`;

CREATE TABLE `email_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `template_reference_id` int(11) DEFAULT NULL,
  `design` json DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body_html` longtext,
  `body_text` longtext,
  `enabled` tinyint(1) DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email_templates_created_by_id_fk` (`created_by_id`),
  KEY `email_templates_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `email_templates_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `email_templates_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table files
# ------------------------------------------------------------

DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `upload_files_folder_path_index` (`folder_path`),
  KEY `files_created_by_id_fk` (`created_by_id`),
  KEY `files_updated_by_id_fk` (`updated_by_id`),
  KEY `upload_files_created_at_index` (`created_at`),
  KEY `upload_files_updated_at_index` (`updated_at`),
  KEY `upload_files_name_index` (`name`),
  KEY `upload_files_size_index` (`size`),
  KEY `upload_files_ext_index` (`ext`),
  CONSTRAINT `files_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `files_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;

INSERT INTO `files` (`id`, `name`, `alternative_text`, `caption`, `width`, `height`, `formats`, `hash`, `ext`, `mime`, `size`, `url`, `preview_url`, `provider`, `provider_metadata`, `folder_path`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`)
VALUES
	(1,'menuLogo.png','menuLogo.png','menuLogo.png',320,320,'{\"thumbnail\": {\"ext\": \".png\", \"url\": \"/uploads/thumbnail_menu_Logo_ee59477bcb.png\", \"hash\": \"thumbnail_menu_Logo_ee59477bcb\", \"mime\": \"image/png\", \"name\": \"thumbnail_menuLogo.png\", \"path\": null, \"size\": 4.13, \"width\": 156, \"height\": 156}}','menu_Logo_ee59477bcb','.png','image/png',9.37,'/uploads/menu_Logo_ee59477bcb.png',NULL,'local',NULL,'/','2022-08-10 10:39:46.438000','2022-08-10 10:39:46.438000',1,1);

/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table files_folder_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `files_folder_links`;

CREATE TABLE `files_folder_links` (
  `file_id` int(10) unsigned DEFAULT NULL,
  `folder_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `file_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `files_folder_links_unique` (`file_id`,`folder_id`),
  KEY `files_folder_links_fk` (`file_id`),
  KEY `files_folder_links_inv_fk` (`folder_id`),
  KEY `files_folder_links_order_inv_fk` (`file_order`),
  CONSTRAINT `files_folder_links_fk` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE,
  CONSTRAINT `files_folder_links_inv_fk` FOREIGN KEY (`folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table files_related_morphs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `files_related_morphs`;

CREATE TABLE `files_related_morphs` (
  `file_id` int(10) unsigned DEFAULT NULL,
  `related_id` int(10) unsigned DEFAULT NULL,
  `related_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `files_related_morphs_fk` (`file_id`),
  CONSTRAINT `files_related_morphs_fk` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `files_related_morphs` WRITE;
/*!40000 ALTER TABLE `files_related_morphs` DISABLE KEYS */;

INSERT INTO `files_related_morphs` (`file_id`, `related_id`, `related_type`, `field`, `order`, `id`)
VALUES
	(1,2,'complementary.carousel-banner','image',1,1),
	(1,1,'complementary.carousel-banner','image',1,2),
	(1,3,'complementary.carousel-banner','image',1,3),
	(1,6,'api::article.article','mainImage',1,4),
	(1,8,'api::article.article','mainImage',1,5),
	(1,9,'api::article.article','mainImage',1,6),
	(1,10,'api::article.article','mainImage',1,7),
	(1,3,'block.image-block','image',1,8),
	(1,1,'block.image-block','image',1,10),
	(1,2,'block.image-block','image',1,11),
	(1,3,'api::article.article','mainImage',1,12),
	(1,2,'api::article.article','mainImage',1,13),
	(1,1,'api::article.article','mainImage',1,14);

/*!40000 ALTER TABLE `files_related_morphs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table i18n_locale
# ------------------------------------------------------------

DROP TABLE IF EXISTS `i18n_locale`;

CREATE TABLE `i18n_locale` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `i18n_locale_created_by_id_fk` (`created_by_id`),
  KEY `i18n_locale_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `i18n_locale_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `i18n_locale_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `i18n_locale` WRITE;
/*!40000 ALTER TABLE `i18n_locale` DISABLE KEYS */;

INSERT INTO `i18n_locale` (`id`, `name`, `code`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`)
VALUES
	(3,'Czech (cs)','cs','2022-08-10 10:42:28.502000','2023-02-02 14:05:56.776000',1,1),
	(4,'French (fr)','fr','2023-02-02 14:05:48.649000','2023-02-02 14:05:48.649000',1,1),
	(5,'Italian (it)','it','2023-02-02 14:06:21.374000','2023-02-02 14:06:21.374000',1,1),
	(6,'German (de)','de','2023-02-02 14:06:31.541000','2023-02-02 14:06:31.541000',1,1),
	(7,'Polish (pl)','pl','2023-02-02 14:06:41.010000','2023-02-02 14:06:41.010000',1,1),
	(8,'Russian (ru)','ru','2023-02-02 14:06:47.417000','2023-02-02 14:06:47.417000',1,1),
	(9,'Serbian (sr)','sr','2023-02-02 14:08:59.734000','2023-02-02 14:08:59.734000',1,1),
	(10,'Chinese (zh)','zh','2023-02-02 14:09:13.362000','2023-02-02 14:09:13.362000',1,1);

/*!40000 ALTER TABLE `i18n_locale` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table icons
# ------------------------------------------------------------

DROP TABLE IF EXISTS `icons`;

CREATE TABLE `icons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `codename` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `icons_created_by_id_fk` (`created_by_id`),
  KEY `icons_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `icons_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `icons_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table menus
# ------------------------------------------------------------

DROP TABLE IF EXISTS `menus`;

CREATE TABLE `menus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menus_created_by_id_fk` (`created_by_id`),
  KEY `menus_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `menus_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `menus_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;

INSERT INTO `menus` (`id`, `title`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `locale`)
VALUES
	(3,'Hlavní menu','2022-08-11 15:31:12.747000','2022-08-11 15:31:58.610000','2022-08-11 15:31:20.742000',1,1,'cs'),
	(4,'Menu pätičky','2022-08-11 15:32:25.919000','2022-08-11 15:32:26.898000','2022-08-11 15:32:26.896000',1,1,'cs');

/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table menus_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `menus_components`;

CREATE TABLE `menus_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `menus_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  KEY `menus_field_index` (`field`),
  KEY `menus_component_type_index` (`component_type`),
  KEY `menus_entity_fk` (`entity_id`),
  CONSTRAINT `menus_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `menus_components` WRITE;
/*!40000 ALTER TABLE `menus_components` DISABLE KEYS */;

INSERT INTO `menus_components` (`id`, `entity_id`, `component_id`, `component_type`, `field`, `order`)
VALUES
	(11,3,5,'menu.menu-item','items',1),
	(12,3,6,'menu.menu-item','items',2),
	(13,4,7,'menu.menu-item','items',1),
	(14,4,8,'menu.menu-item','items',2);

/*!40000 ALTER TABLE `menus_components` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table menus_localizations_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `menus_localizations_links`;

CREATE TABLE `menus_localizations_links` (
  `menu_id` int(10) unsigned DEFAULT NULL,
  `inv_menu_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menu_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `menus_localizations_links_unique` (`menu_id`,`inv_menu_id`),
  KEY `menus_localizations_links_fk` (`menu_id`),
  KEY `menus_localizations_links_inv_fk` (`inv_menu_id`),
  KEY `menus_localizations_links_order_fk` (`menu_order`),
  CONSTRAINT `menus_localizations_links_fk` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menus_localizations_links_inv_fk` FOREIGN KEY (`inv_menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` longtext,
  `city` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_created_by_id_fk` (`created_by_id`),
  KEY `messages_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `messages_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `messages_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table newsletter_subscribers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `newsletter_subscribers`;

CREATE TABLE `newsletter_subscribers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `newsletter_subscribers_created_by_id_fk` (`created_by_id`),
  KEY `newsletter_subscribers_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `newsletter_subscribers_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `newsletter_subscribers_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table notes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notes`;

CREATE TABLE `notes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `entity_id` int(11) DEFAULT NULL,
  `entity_slug` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notes_created_by_id_fk` (`created_by_id`),
  KEY `notes_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `notes_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `notes_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table pages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pages`;

CREATE TABLE `pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `vuid` varchar(255) DEFAULT NULL,
  `version_number` int(11) DEFAULT NULL,
  `is_visible_in_list_view` tinyint(1) DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pages_created_by_id_fk` (`created_by_id`),
  KEY `pages_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `pages_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pages_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;

INSERT INTO `pages` (`id`, `title`, `url`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `vuid`, `version_number`, `is_visible_in_list_view`, `locale`)
VALUES
	(8,'Novinky','novinky','2022-08-11 10:30:49.793000','2022-08-11 10:41:36.351000','2022-08-11 10:30:50.595000',1,1,'c6628977-7315-4bcd-ab32-7b82d9ae2481',1,1,'cs'),
	(9,'Detail článku','novinky/:slug','2022-08-11 10:41:44.621000','2022-08-11 10:41:45.317000','2022-08-11 10:41:45.314000',1,1,'5e40f3cf-7e80-4368-b89e-675eaa6031cb',1,1,'cs'),
	(10,'Domovská stránka CS','homepage','2022-08-11 10:42:03.026000','2023-02-02 14:10:01.200000','2022-08-11 10:42:03.902000',1,1,'e51367a7-c089-466a-bafb-9f2e75687ac6',1,1,'cs'),
	(11,'404 CS','404','2022-08-11 10:42:23.109000','2022-08-11 10:42:23.712000','2022-08-11 10:42:23.710000',1,1,'d2f40954-f4d4-44e2-9c37-2c0b341d2081',1,1,'cs'),
	(12,'TestSitemapCS','test-sitemap','2022-08-11 10:44:23.128000','2022-08-11 10:44:25.132000','2022-08-11 10:44:25.129000',1,1,'cf3f4820-1aab-4353-b6ef-4070e3d1f21e',1,1,'cs');

/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pages_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pages_components`;

CREATE TABLE `pages_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  KEY `pages_field_index` (`field`),
  KEY `pages_component_type_index` (`component_type`),
  KEY `pages_entity_fk` (`entity_id`),
  CONSTRAINT `pages_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `pages_components` WRITE;
/*!40000 ALTER TABLE `pages_components` DISABLE KEYS */;

INSERT INTO `pages_components` (`id`, `entity_id`, `component_id`, `component_type`, `field`, `order`)
VALUES
	(49,8,2,'block.articles-list-block','blocks',1),
	(50,8,13,'shared.seo','seo',1),
	(51,8,11,'shared.sitemap','sitemap',1),
	(52,9,2,'block.article-detail-block','blocks',1),
	(53,9,3,'block.image-block','blocks',2),
	(54,9,22,'shared.seo','seo',1),
	(55,9,19,'shared.sitemap','sitemap',1),
	(60,11,2,'block.error-page-block','blocks',1),
	(61,11,24,'shared.seo','seo',1),
	(62,11,21,'shared.sitemap','sitemap',1),
	(63,12,25,'shared.seo','seo',1),
	(64,12,22,'shared.sitemap','sitemap',1),
	(79,10,23,'shared.seo','seo',1),
	(80,10,20,'shared.sitemap','sitemap',1);

/*!40000 ALTER TABLE `pages_components` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pages_localizations_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pages_localizations_links`;

CREATE TABLE `pages_localizations_links` (
  `page_id` int(10) unsigned DEFAULT NULL,
  `inv_page_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `page_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_localizations_links_unique` (`page_id`,`inv_page_id`),
  KEY `pages_localizations_links_fk` (`page_id`),
  KEY `pages_localizations_links_inv_fk` (`inv_page_id`),
  KEY `pages_localizations_links_order_fk` (`page_order`),
  CONSTRAINT `pages_localizations_links_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pages_localizations_links_inv_fk` FOREIGN KEY (`inv_page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table pages_parent_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pages_parent_links`;

CREATE TABLE `pages_parent_links` (
  `page_id` int(10) unsigned DEFAULT NULL,
  `inv_page_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `page_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_parent_links_unique` (`page_id`,`inv_page_id`),
  KEY `pages_parent_links_fk` (`page_id`),
  KEY `pages_parent_links_inv_fk` (`inv_page_id`),
  KEY `pages_parent_links_order_inv_fk` (`page_order`),
  CONSTRAINT `pages_parent_links_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pages_parent_links_inv_fk` FOREIGN KEY (`inv_page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table pages_versions_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pages_versions_links`;

CREATE TABLE `pages_versions_links` (
  `page_id` int(10) unsigned DEFAULT NULL,
  `inv_page_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `page_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_versions_links_unique` (`page_id`,`inv_page_id`),
  KEY `pages_versions_links_fk` (`page_id`),
  KEY `pages_versions_links_inv_fk` (`inv_page_id`),
  KEY `pages_versions_links_order_fk` (`page_order`),
  CONSTRAINT `pages_versions_links_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pages_versions_links_inv_fk` FOREIGN KEY (`inv_page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table redirects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `redirects`;

CREATE TABLE `redirects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `redirect_from` varchar(255) DEFAULT NULL,
  `redirect_to` varchar(255) DEFAULT NULL,
  `status_code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `redirects_created_by_id_fk` (`created_by_id`),
  KEY `redirects_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `redirects_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `redirects_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table slugs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `slugs`;

CREATE TABLE `slugs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `slug` longtext,
  `count` int(11) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `slugs_created_by_id_fk` (`created_by_id`),
  KEY `slugs_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `slugs_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `slugs_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table strapi_api_token_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `strapi_api_token_permissions`;

CREATE TABLE `strapi_api_token_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `strapi_api_token_permissions_created_by_id_fk` (`created_by_id`),
  KEY `strapi_api_token_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `strapi_api_token_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `strapi_api_token_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `strapi_api_token_permissions` WRITE;
/*!40000 ALTER TABLE `strapi_api_token_permissions` DISABLE KEYS */;

INSERT INTO `strapi_api_token_permissions` (`id`, `action`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`)
VALUES
	(1,'plugin::content-type-builder.components.getComponents','2023-02-02 14:36:01.264000','2023-02-02 14:36:01.264000',NULL,NULL),
	(2,'plugin::content-type-builder.content-types.getContentTypes','2023-02-02 14:36:01.264000','2023-02-02 14:36:01.264000',NULL,NULL),
	(3,'plugin::content-type-builder.content-types.getContentType','2023-02-02 14:36:01.264000','2023-02-02 14:36:01.264000',NULL,NULL),
	(4,'plugin::content-type-builder.components.getComponent','2023-02-02 14:36:01.264000','2023-02-02 14:36:01.264000',NULL,NULL),
	(5,'api::article.article.find','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(6,'api::article.article.findOne','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(7,'api::article.article.create','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(8,'api::article.article.update','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(9,'api::article.article.delete','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(10,'api::article.article.createLocalization','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(11,'api::icon.icon.find','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(12,'api::icon.icon.create','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(13,'api::menu.menu.update','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(14,'api::menu.menu.findOne','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(15,'api::menu.menu.delete','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(16,'api::icon.icon.findOne','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(17,'api::menu.menu.find','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(18,'api::menu.menu.createLocalization','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(19,'api::icon.icon.delete','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(20,'api::message.message.find','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(21,'api::menu.menu.create','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(22,'api::message.message.update','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(23,'api::icon.icon.update','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(24,'api::message.message.create','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(25,'api::message.message.delete','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(26,'api::message.message.findOne','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(27,'api::newsletter-subscriber.newsletter-subscriber.find','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(28,'api::newsletter-subscriber.newsletter-subscriber.findOne','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(29,'api::newsletter-subscriber.newsletter-subscriber.create','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(30,'api::newsletter-subscriber.newsletter-subscriber.update','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(31,'api::newsletter-subscriber.newsletter-subscriber.delete','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(32,'api::page.page.find','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(33,'api::page.page.findOne','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(34,'api::page.page.create','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(35,'api::page.page.update','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(36,'api::page.page.delete','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(37,'api::page.page.createLocalization','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(38,'api::redirect.redirect.find','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(39,'api::redirect.redirect.findOne','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(40,'api::redirect.redirect.create','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(41,'api::redirect.redirect.update','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(42,'api::redirect.redirect.delete','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(43,'api::system-resource.system-resource.find','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(44,'api::system-resource.system-resource.findOne','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(45,'api::system-resource.system-resource.create','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(46,'api::system-resource.system-resource.update','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(47,'api::system-resource.system-resource.delete','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(48,'api::system-resource.system-resource.createLocalization','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(49,'api::template.template.create','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(50,'api::template.template.findOne','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(51,'api::template.template.find','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(52,'api::template.template.update','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(53,'api::template.template.delete','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(54,'api::template.template.createLocalization','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(55,'api::web-setting.web-setting.find','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(56,'api::web-setting.web-setting.update','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(57,'api::web-setting.web-setting.delete','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL),
	(58,'api::web-setting.web-setting.createLocalization','2023-02-02 14:45:18.274000','2023-02-02 14:45:18.274000',NULL,NULL);

/*!40000 ALTER TABLE `strapi_api_token_permissions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table strapi_api_token_permissions_token_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `strapi_api_token_permissions_token_links`;

CREATE TABLE `strapi_api_token_permissions_token_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `api_token_permission_id` int(10) unsigned DEFAULT NULL,
  `api_token_id` int(10) unsigned DEFAULT NULL,
  `api_token_permission_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `strapi_api_token_permissions_token_links_unique` (`api_token_permission_id`,`api_token_id`),
  KEY `strapi_api_token_permissions_token_links_fk` (`api_token_permission_id`),
  KEY `strapi_api_token_permissions_token_links_inv_fk` (`api_token_id`),
  KEY `strapi_api_token_permissions_token_links_order_inv_fk` (`api_token_permission_order`),
  CONSTRAINT `strapi_api_token_permissions_token_links_fk` FOREIGN KEY (`api_token_permission_id`) REFERENCES `strapi_api_token_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `strapi_api_token_permissions_token_links_inv_fk` FOREIGN KEY (`api_token_id`) REFERENCES `strapi_api_tokens` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `strapi_api_token_permissions_token_links` WRITE;
/*!40000 ALTER TABLE `strapi_api_token_permissions_token_links` DISABLE KEYS */;

INSERT INTO `strapi_api_token_permissions_token_links` (`id`, `api_token_permission_id`, `api_token_id`, `api_token_permission_order`)
VALUES
	(1,1,2,1),
	(2,2,2,2),
	(3,3,2,2),
	(4,4,2,3),
	(5,9,2,4),
	(6,5,2,4),
	(7,6,2,4),
	(8,11,2,4),
	(9,10,2,4),
	(10,7,2,4),
	(11,12,2,4),
	(12,8,2,4),
	(13,15,2,4),
	(14,14,2,4),
	(15,16,2,5),
	(16,17,2,5),
	(17,13,2,5),
	(18,18,2,5),
	(19,19,2,5),
	(20,21,2,5),
	(21,22,2,5),
	(22,24,2,5),
	(23,30,2,6),
	(24,31,2,6),
	(25,32,2,6),
	(26,25,2,6),
	(27,20,2,6),
	(28,23,2,6),
	(29,26,2,6),
	(30,29,2,6),
	(31,28,2,6),
	(32,27,2,6),
	(33,35,2,7),
	(34,36,2,7),
	(35,37,2,7),
	(36,38,2,7),
	(37,33,2,7),
	(38,34,2,7),
	(39,39,2,7),
	(40,40,2,8),
	(41,43,2,8),
	(42,44,2,8),
	(43,47,2,8),
	(44,41,2,8),
	(45,46,2,9),
	(46,48,2,9),
	(47,45,2,9),
	(48,42,2,9),
	(49,49,2,9),
	(50,50,2,9),
	(51,51,2,10),
	(52,52,2,10),
	(53,54,2,10),
	(54,55,2,10),
	(55,56,2,10),
	(56,57,2,11),
	(57,58,2,11),
	(58,53,2,11);

/*!40000 ALTER TABLE `strapi_api_token_permissions_token_links` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table strapi_api_tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `strapi_api_tokens`;

CREATE TABLE `strapi_api_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `access_key` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `last_used_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `lifespan` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `strapi_api_tokens_created_by_id_fk` (`created_by_id`),
  KEY `strapi_api_tokens_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `strapi_api_tokens_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `strapi_api_tokens_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `strapi_api_tokens` WRITE;
/*!40000 ALTER TABLE `strapi_api_tokens` DISABLE KEYS */;

INSERT INTO `strapi_api_tokens` (`id`, `name`, `description`, `type`, `access_key`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`, `last_used_at`, `expires_at`, `lifespan`)
VALUES
	(2,'api_token_full','','custom','8712ef2ed6fb6a09c7a62d07abbf2e86d295132a28692f53b3f40d3e4d79a05d5063a2e6ee6bc05f1e1d3ad35cfc60f1b3d28c4d405bdfaddb151f4f8fbcb20e','2023-02-02 14:36:01.259000','2023-02-02 14:54:38.636000',NULL,NULL,'2023-02-02 14:54:38.636000',NULL,NULL);

/*!40000 ALTER TABLE `strapi_api_tokens` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table strapi_core_store_settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `strapi_core_store_settings`;

CREATE TABLE `strapi_core_store_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` longtext,
  `type` varchar(255) DEFAULT NULL,
  `environment` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `strapi_core_store_settings` WRITE;
/*!40000 ALTER TABLE `strapi_core_store_settings` DISABLE KEYS */;

INSERT INTO `strapi_core_store_settings` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
	(1,'strapi_content_types_schema','{\"admin::permission\":{\"collectionName\":\"admin_permissions\",\"info\":{\"name\":\"Permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"subject\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false},\"properties\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"conditions\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":[]},\"role\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::role\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_permissions\",\"info\":{\"name\":\"Permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"subject\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false},\"properties\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"conditions\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":[]},\"role\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::role\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"permission\",\"connection\":\"default\",\"uid\":\"admin::permission\",\"plugin\":\"admin\",\"globalId\":\"AdminPermission\"},\"admin::user\":{\"collectionName\":\"admin_users\",\"info\":{\"name\":\"User\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"firstname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"lastname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"username\":{\"type\":\"string\",\"unique\":false,\"configurable\":false,\"required\":false},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true,\"unique\":true,\"private\":true},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"required\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"registrationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"isActive\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"roles\":{\"configurable\":false,\"private\":true,\"type\":\"relation\",\"relation\":\"manyToMany\",\"inversedBy\":\"users\",\"target\":\"admin::role\",\"collectionName\":\"strapi_users_roles\"},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"preferedLanguage\":{\"type\":\"string\",\"configurable\":false,\"required\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_users\",\"info\":{\"name\":\"User\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"firstname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"lastname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"username\":{\"type\":\"string\",\"unique\":false,\"configurable\":false,\"required\":false},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true,\"unique\":true,\"private\":true},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"required\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"registrationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"isActive\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"roles\":{\"configurable\":false,\"private\":true,\"type\":\"relation\",\"relation\":\"manyToMany\",\"inversedBy\":\"users\",\"target\":\"admin::role\",\"collectionName\":\"strapi_users_roles\"},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"preferedLanguage\":{\"type\":\"string\",\"configurable\":false,\"required\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"user\",\"connection\":\"default\",\"uid\":\"admin::user\",\"plugin\":\"admin\",\"globalId\":\"AdminUser\"},\"admin::role\":{\"collectionName\":\"admin_roles\",\"info\":{\"name\":\"Role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"code\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"configurable\":false},\"users\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"mappedBy\":\"roles\",\"target\":\"admin::user\"},\"permissions\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"mappedBy\":\"role\",\"target\":\"admin::permission\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_roles\",\"info\":{\"name\":\"Role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"code\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"configurable\":false},\"users\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"mappedBy\":\"roles\",\"target\":\"admin::user\"},\"permissions\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"mappedBy\":\"role\",\"target\":\"admin::permission\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"role\",\"connection\":\"default\",\"uid\":\"admin::role\",\"plugin\":\"admin\",\"globalId\":\"AdminRole\"},\"admin::api-token\":{\"collectionName\":\"strapi_api_tokens\",\"info\":{\"name\":\"Api Token\",\"singularName\":\"api-token\",\"pluralName\":\"api-tokens\",\"displayName\":\"Api Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"unique\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"type\":{\"type\":\"enumeration\",\"enum\":[\"read-only\",\"full-access\",\"custom\"],\"configurable\":false,\"required\":true,\"default\":\"read-only\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"lastUsedAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"permissions\":{\"type\":\"relation\",\"target\":\"admin::api-token-permission\",\"relation\":\"oneToMany\",\"mappedBy\":\"token\",\"configurable\":false,\"required\":false},\"expiresAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"lifespan\":{\"type\":\"biginteger\",\"configurable\":false,\"required\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_api_tokens\",\"info\":{\"name\":\"Api Token\",\"singularName\":\"api-token\",\"pluralName\":\"api-tokens\",\"displayName\":\"Api Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"unique\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"type\":{\"type\":\"enumeration\",\"enum\":[\"read-only\",\"full-access\",\"custom\"],\"configurable\":false,\"required\":true,\"default\":\"read-only\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"lastUsedAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"permissions\":{\"type\":\"relation\",\"target\":\"admin::api-token-permission\",\"relation\":\"oneToMany\",\"mappedBy\":\"token\",\"configurable\":false,\"required\":false},\"expiresAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"lifespan\":{\"type\":\"biginteger\",\"configurable\":false,\"required\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"api-token\",\"connection\":\"default\",\"uid\":\"admin::api-token\",\"plugin\":\"admin\",\"globalId\":\"AdminApiToken\"},\"admin::api-token-permission\":{\"collectionName\":\"strapi_api_token_permissions\",\"info\":{\"name\":\"API Token Permission\",\"description\":\"\",\"singularName\":\"api-token-permission\",\"pluralName\":\"api-token-permissions\",\"displayName\":\"API Token Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"token\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::api-token\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_api_token_permissions\",\"info\":{\"name\":\"API Token Permission\",\"description\":\"\",\"singularName\":\"api-token-permission\",\"pluralName\":\"api-token-permissions\",\"displayName\":\"API Token Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"token\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::api-token\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"api-token-permission\",\"connection\":\"default\",\"uid\":\"admin::api-token-permission\",\"plugin\":\"admin\",\"globalId\":\"AdminApiTokenPermission\"},\"plugin::upload.file\":{\"collectionName\":\"files\",\"info\":{\"singularName\":\"file\",\"pluralName\":\"files\",\"displayName\":\"File\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"alternativeText\":{\"type\":\"string\",\"configurable\":false},\"caption\":{\"type\":\"string\",\"configurable\":false},\"width\":{\"type\":\"integer\",\"configurable\":false},\"height\":{\"type\":\"integer\",\"configurable\":false},\"formats\":{\"type\":\"json\",\"configurable\":false},\"hash\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"ext\":{\"type\":\"string\",\"configurable\":false},\"mime\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"size\":{\"type\":\"decimal\",\"configurable\":false,\"required\":true},\"url\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"previewUrl\":{\"type\":\"string\",\"configurable\":false},\"provider\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider_metadata\":{\"type\":\"json\",\"configurable\":false},\"related\":{\"type\":\"relation\",\"relation\":\"morphToMany\",\"configurable\":false},\"folder\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"files\",\"private\":true},\"folderPath\":{\"type\":\"string\",\"min\":1,\"required\":true,\"private\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"indexes\":[{\"name\":\"upload_files_folder_path_index\",\"columns\":[\"folder_path\"],\"type\":null},{\"name\":\"upload_files_created_at_index\",\"columns\":[\"created_at\"],\"type\":null},{\"name\":\"upload_files_updated_at_index\",\"columns\":[\"updated_at\"],\"type\":null},{\"name\":\"upload_files_name_index\",\"columns\":[\"name\"],\"type\":null},{\"name\":\"upload_files_size_index\",\"columns\":[\"size\"],\"type\":null},{\"name\":\"upload_files_ext_index\",\"columns\":[\"ext\"],\"type\":null}],\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"files\",\"info\":{\"singularName\":\"file\",\"pluralName\":\"files\",\"displayName\":\"File\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"alternativeText\":{\"type\":\"string\",\"configurable\":false},\"caption\":{\"type\":\"string\",\"configurable\":false},\"width\":{\"type\":\"integer\",\"configurable\":false},\"height\":{\"type\":\"integer\",\"configurable\":false},\"formats\":{\"type\":\"json\",\"configurable\":false},\"hash\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"ext\":{\"type\":\"string\",\"configurable\":false},\"mime\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"size\":{\"type\":\"decimal\",\"configurable\":false,\"required\":true},\"url\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"previewUrl\":{\"type\":\"string\",\"configurable\":false},\"provider\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider_metadata\":{\"type\":\"json\",\"configurable\":false},\"related\":{\"type\":\"relation\",\"relation\":\"morphToMany\",\"configurable\":false},\"folder\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"files\",\"private\":true},\"folderPath\":{\"type\":\"string\",\"min\":1,\"required\":true,\"private\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"file\",\"connection\":\"default\",\"uid\":\"plugin::upload.file\",\"plugin\":\"upload\",\"globalId\":\"UploadFile\"},\"plugin::upload.folder\":{\"collectionName\":\"upload_folders\",\"info\":{\"singularName\":\"folder\",\"pluralName\":\"folders\",\"displayName\":\"Folder\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"required\":true},\"pathId\":{\"type\":\"integer\",\"unique\":true,\"required\":true},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"children\"},\"children\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.folder\",\"mappedBy\":\"parent\"},\"files\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.file\",\"mappedBy\":\"folder\"},\"path\":{\"type\":\"string\",\"min\":1,\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"indexes\":[{\"name\":\"upload_folders_path_id_index\",\"columns\":[\"path_id\"],\"type\":\"unique\"},{\"name\":\"upload_folders_path_index\",\"columns\":[\"path\"],\"type\":\"unique\"}],\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"upload_folders\",\"info\":{\"singularName\":\"folder\",\"pluralName\":\"folders\",\"displayName\":\"Folder\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"required\":true},\"pathId\":{\"type\":\"integer\",\"unique\":true,\"required\":true},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"children\"},\"children\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.folder\",\"mappedBy\":\"parent\"},\"files\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.file\",\"mappedBy\":\"folder\"},\"path\":{\"type\":\"string\",\"min\":1,\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"folder\",\"connection\":\"default\",\"uid\":\"plugin::upload.folder\",\"plugin\":\"upload\",\"globalId\":\"UploadFolder\"},\"plugin::slugify.slug\":{\"kind\":\"collectionType\",\"collectionName\":\"slugs\",\"info\":{\"singularName\":\"slug\",\"pluralName\":\"slugs\",\"displayName\":\"slug\"},\"options\":{\"draftAndPublish\":false,\"comment\":\"\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"slug\":{\"type\":\"text\"},\"count\":{\"type\":\"integer\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"slugs\",\"info\":{\"singularName\":\"slug\",\"pluralName\":\"slugs\",\"displayName\":\"slug\"},\"options\":{\"draftAndPublish\":false,\"comment\":\"\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"slug\":{\"type\":\"text\"},\"count\":{\"type\":\"integer\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"slug\",\"connection\":\"default\",\"uid\":\"plugin::slugify.slug\",\"plugin\":\"slugify\",\"globalId\":\"SlugifySlug\"},\"plugin::email-designer.email-template\":{\"kind\":\"collectionType\",\"collectionName\":\"email_templates\",\"info\":{\"singularName\":\"email-template\",\"pluralName\":\"email-templates\",\"displayName\":\"Email-template\",\"name\":\"email-template\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"options\":{\"draftAndPublish\":false,\"timestamps\":true,\"increments\":true,\"comment\":\"\"},\"attributes\":{\"templateReferenceId\":{\"type\":\"integer\",\"required\":false,\"unique\":true},\"design\":{\"type\":\"json\"},\"name\":{\"type\":\"string\"},\"subject\":{\"type\":\"string\"},\"bodyHtml\":{\"type\":\"text\"},\"bodyText\":{\"type\":\"text\"},\"enabled\":{\"type\":\"boolean\",\"default\":true},\"tags\":{\"type\":\"json\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"email_templates\",\"info\":{\"singularName\":\"email-template\",\"pluralName\":\"email-templates\",\"displayName\":\"Email-template\",\"name\":\"email-template\"},\"options\":{\"draftAndPublish\":false,\"timestamps\":true,\"increments\":true,\"comment\":\"\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"templateReferenceId\":{\"type\":\"integer\",\"required\":false,\"unique\":true},\"design\":{\"type\":\"json\"},\"name\":{\"type\":\"string\"},\"subject\":{\"type\":\"string\"},\"bodyHtml\":{\"type\":\"text\"},\"bodyText\":{\"type\":\"text\"},\"enabled\":{\"type\":\"boolean\",\"default\":true},\"tags\":{\"type\":\"json\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"email-template\",\"connection\":\"default\",\"uid\":\"plugin::email-designer.email-template\",\"plugin\":\"email-designer\",\"globalId\":\"EmailDesignerEmailTemplate\"},\"plugin::i18n.locale\":{\"info\":{\"singularName\":\"locale\",\"pluralName\":\"locales\",\"collectionName\":\"locales\",\"displayName\":\"Locale\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"max\":50,\"configurable\":false},\"code\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"info\":{\"singularName\":\"locale\",\"pluralName\":\"locales\",\"collectionName\":\"locales\",\"displayName\":\"Locale\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"max\":50,\"configurable\":false},\"code\":{\"type\":\"string\",\"unique\":true,\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"locale\",\"connection\":\"default\",\"uid\":\"plugin::i18n.locale\",\"plugin\":\"i18n\",\"collectionName\":\"i18n_locale\",\"globalId\":\"I18NLocale\"},\"plugin::block-gallery.block\":{\"kind\":\"collectionType\",\"collectionName\":\"blocks\",\"info\":{\"singularName\":\"block\",\"pluralName\":\"blocks\",\"displayName\":\"Blocks\"},\"options\":{\"draftAndPublish\":false,\"comment\":\"\"},\"attributes\":{\"image\":{\"type\":\"media\",\"allowedTypes\":[\"images\"],\"multiple\":false},\"displayName\":{\"type\":\"string\"},\"blockName\":{\"type\":\"string\"},\"externalUrl\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"blocks\",\"info\":{\"singularName\":\"block\",\"pluralName\":\"blocks\",\"displayName\":\"Blocks\"},\"options\":{\"draftAndPublish\":false,\"comment\":\"\"},\"attributes\":{\"image\":{\"type\":\"media\",\"allowedTypes\":[\"images\"],\"multiple\":false},\"displayName\":{\"type\":\"string\"},\"blockName\":{\"type\":\"string\"},\"externalUrl\":{\"type\":\"string\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"block\",\"connection\":\"default\",\"uid\":\"plugin::block-gallery.block\",\"plugin\":\"block-gallery\",\"globalId\":\"BlockGalleryBlock\"},\"plugin::users-permissions.permission\":{\"collectionName\":\"up_permissions\",\"info\":{\"name\":\"permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"permissions\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"up_permissions\",\"info\":{\"name\":\"permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"permissions\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"permission\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.permission\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsPermission\"},\"plugin::users-permissions.role\":{\"collectionName\":\"up_roles\",\"info\":{\"name\":\"role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":3,\"required\":true,\"configurable\":false},\"description\":{\"type\":\"string\",\"configurable\":false},\"type\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"permissions\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.permission\",\"mappedBy\":\"role\",\"configurable\":false},\"users\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.user\",\"mappedBy\":\"role\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"up_roles\",\"info\":{\"name\":\"role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":3,\"required\":true,\"configurable\":false},\"description\":{\"type\":\"string\",\"configurable\":false},\"type\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"permissions\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.permission\",\"mappedBy\":\"role\",\"configurable\":false},\"users\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.user\",\"mappedBy\":\"role\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"role\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.role\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsRole\"},\"plugin::users-permissions.user\":{\"collectionName\":\"up_users\",\"info\":{\"name\":\"user\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"options\":{\"draftAndPublish\":false,\"timestamps\":true},\"attributes\":{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmed\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"users\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"config\":{\"attributes\":{\"resetPasswordToken\":{\"hidden\":true},\"confirmationToken\":{\"hidden\":true},\"provider\":{\"hidden\":true}}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"up_users\",\"info\":{\"name\":\"user\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"options\":{\"draftAndPublish\":false,\"timestamps\":true},\"attributes\":{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmed\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"users\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"user\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.user\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsUser\"},\"plugin::entity-notes.note\":{\"kind\":\"collectionType\",\"collectionName\":\"notes\",\"info\":{\"singularName\":\"note\",\"pluralName\":\"notes\",\"displayName\":\"notes\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"options\":{\"draftAndPublish\":false,\"comment\":\"\"},\"attributes\":{\"title\":{\"type\":\"string\"},\"content\":{\"type\":\"text\"},\"entityId\":{\"type\":\"integer\"},\"entitySlug\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"notes\",\"info\":{\"singularName\":\"note\",\"pluralName\":\"notes\",\"displayName\":\"notes\"},\"options\":{\"draftAndPublish\":false,\"comment\":\"\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"title\":{\"type\":\"string\"},\"content\":{\"type\":\"text\"},\"entityId\":{\"type\":\"integer\"},\"entitySlug\":{\"type\":\"string\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"note\",\"connection\":\"default\",\"uid\":\"plugin::entity-notes.note\",\"plugin\":\"entity-notes\",\"globalId\":\"EntityNotesNote\"},\"api::article.article\":{\"kind\":\"collectionType\",\"collectionName\":\"articles\",\"info\":{\"singularName\":\"article\",\"pluralName\":\"articles\",\"displayName\":\"Články\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"mainImage\":{\"type\":\"media\",\"multiple\":false,\"required\":false,\"allowedTypes\":[\"images\"],\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"publishDate\":{\"type\":\"datetime\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"content\":{\"type\":\"richtext\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"slug\":{\"type\":\"uid\",\"targetField\":\"title\"},\"perex\":{\"type\":\"text\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"author\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"seo\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"component\":\"shared.seo\"},\"sitemap\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"component\":\"shared.sitemap\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"versions\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"target\":\"api::article.article\"},\"vuid\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"},\"versionNumber\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"integer\",\"default\":1},\"isVisibleInListView\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"boolean\",\"default\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::article.article\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"articles\",\"info\":{\"singularName\":\"article\",\"pluralName\":\"articles\",\"displayName\":\"Články\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"mainImage\":{\"type\":\"media\",\"multiple\":false,\"required\":false,\"allowedTypes\":[\"images\"],\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"publishDate\":{\"type\":\"datetime\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"content\":{\"type\":\"richtext\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"slug\":{\"type\":\"uid\",\"targetField\":\"title\"},\"perex\":{\"type\":\"text\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"author\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"seo\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"component\":\"shared.seo\"},\"sitemap\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"component\":\"shared.sitemap\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"article\",\"connection\":\"default\",\"uid\":\"api::article.article\",\"apiName\":\"article\",\"globalId\":\"Article\",\"actions\":{},\"lifecycles\":{}},\"api::icon.icon\":{\"kind\":\"collectionType\",\"collectionName\":\"icons\",\"info\":{\"singularName\":\"icon\",\"pluralName\":\"icons\",\"displayName\":\"Ikony\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"title\":{\"type\":\"string\",\"required\":true},\"codename\":{\"type\":\"string\",\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"icons\",\"info\":{\"singularName\":\"icon\",\"pluralName\":\"icons\",\"displayName\":\"Ikony\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"title\":{\"type\":\"string\",\"required\":true},\"codename\":{\"type\":\"string\",\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"icon\",\"connection\":\"default\",\"uid\":\"api::icon.icon\",\"apiName\":\"icon\",\"globalId\":\"Icon\",\"actions\":{},\"lifecycles\":{}},\"api::menu.menu\":{\"kind\":\"collectionType\",\"collectionName\":\"menus\",\"info\":{\"singularName\":\"menu\",\"pluralName\":\"menus\",\"displayName\":\"Menu\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"items\":{\"displayName\":\"MenuItem\",\"type\":\"component\",\"repeatable\":true,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"menu.menu-item\",\"min\":1,\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::menu.menu\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"menus\",\"info\":{\"singularName\":\"menu\",\"pluralName\":\"menus\",\"displayName\":\"Menu\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"items\":{\"displayName\":\"MenuItem\",\"type\":\"component\",\"repeatable\":true,\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"component\":\"menu.menu-item\",\"min\":1,\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"menu\",\"connection\":\"default\",\"uid\":\"api::menu.menu\",\"apiName\":\"menu\",\"globalId\":\"Menu\",\"actions\":{},\"lifecycles\":{}},\"api::message.message\":{\"kind\":\"collectionType\",\"collectionName\":\"messages\",\"info\":{\"singularName\":\"message\",\"pluralName\":\"messages\",\"displayName\":\"Odeslané zprávy\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"name\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"message\":{\"type\":\"text\"},\"city\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"messages\",\"info\":{\"singularName\":\"message\",\"pluralName\":\"messages\",\"displayName\":\"Odeslané zprávy\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"name\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"message\":{\"type\":\"text\"},\"city\":{\"type\":\"string\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"message\",\"connection\":\"default\",\"uid\":\"api::message.message\",\"apiName\":\"message\",\"globalId\":\"Message\",\"actions\":{},\"lifecycles\":{}},\"api::newsletter-subscriber.newsletter-subscriber\":{\"kind\":\"collectionType\",\"collectionName\":\"newsletter_subscribers\",\"info\":{\"singularName\":\"newsletter-subscriber\",\"pluralName\":\"newsletter-subscribers\",\"displayName\":\"Prihlášky k NL\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"email\":{\"type\":\"email\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"newsletter_subscribers\",\"info\":{\"singularName\":\"newsletter-subscriber\",\"pluralName\":\"newsletter-subscribers\",\"displayName\":\"Prihlášky k NL\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"email\":{\"type\":\"email\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"newsletter-subscriber\",\"connection\":\"default\",\"uid\":\"api::newsletter-subscriber.newsletter-subscriber\",\"apiName\":\"newsletter-subscriber\",\"globalId\":\"NewsletterSubscriber\",\"actions\":{},\"lifecycles\":{}},\"api::page.page\":{\"kind\":\"collectionType\",\"collectionName\":\"pages\",\"info\":{\"singularName\":\"page\",\"pluralName\":\"pages\",\"displayName\":\"Stránky\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"url\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"blocks\":{\"type\":\"dynamiczone\",\"components\":[\"block.error-page-block\",\"block.rich-text-block\",\"block.button-block\",\"block.carousel-block\",\"block.gallery-block\",\"block.image-block\",\"block.map-block\",\"block.article-detail-block\",\"block.articles-list-block\",\"block.latest-articles-block\",\"block.video-block\",\"block.youtube-vimeo-block\",\"block.test-block\",\"block.template-block\"],\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"pages\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::page.page\",\"mappedBy\":\"parent\"},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::page.page\",\"inversedBy\":\"pages\"},\"seo\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"component\":\"shared.seo\"},\"sitemap\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"component\":\"shared.sitemap\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"versions\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"target\":\"api::page.page\"},\"vuid\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"},\"versionNumber\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"integer\",\"default\":1},\"isVisibleInListView\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"boolean\",\"default\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::page.page\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"pages\",\"info\":{\"singularName\":\"page\",\"pluralName\":\"pages\",\"displayName\":\"Stránky\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"url\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"blocks\":{\"type\":\"dynamiczone\",\"components\":[\"block.error-page-block\",\"block.rich-text-block\",\"block.button-block\",\"block.carousel-block\",\"block.gallery-block\",\"block.image-block\",\"block.map-block\",\"block.article-detail-block\",\"block.articles-list-block\",\"block.latest-articles-block\",\"block.video-block\",\"block.youtube-vimeo-block\",\"block.test-block\",\"block.template-block\"],\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"pages\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::page.page\",\"mappedBy\":\"parent\"},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::page.page\",\"inversedBy\":\"pages\"},\"seo\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"component\":\"shared.seo\"},\"sitemap\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"component\":\"shared.sitemap\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"page\",\"connection\":\"default\",\"uid\":\"api::page.page\",\"apiName\":\"page\",\"globalId\":\"Page\",\"actions\":{},\"lifecycles\":{}},\"api::redirect.redirect\":{\"kind\":\"collectionType\",\"collectionName\":\"redirects\",\"info\":{\"singularName\":\"redirect\",\"pluralName\":\"redirects\",\"displayName\":\"Presmerovania\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"redirectFrom\":{\"type\":\"string\"},\"redirectTo\":{\"type\":\"string\"},\"statusCode\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"redirects\",\"info\":{\"singularName\":\"redirect\",\"pluralName\":\"redirects\",\"displayName\":\"Presmerovania\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"redirectFrom\":{\"type\":\"string\"},\"redirectTo\":{\"type\":\"string\"},\"statusCode\":{\"type\":\"string\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"redirect\",\"connection\":\"default\",\"uid\":\"api::redirect.redirect\",\"apiName\":\"redirect\",\"globalId\":\"Redirect\",\"actions\":{},\"lifecycles\":{}},\"api::system-resource.system-resource\":{\"kind\":\"collectionType\",\"collectionName\":\"system_resources\",\"info\":{\"singularName\":\"system-resource\",\"pluralName\":\"system-resources\",\"displayName\":\"Všeobecné texty\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true},\"versions\":{\"versioned\":true}},\"attributes\":{\"name\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":false}},\"type\":\"string\",\"required\":true},\"codename\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":false}},\"type\":\"string\",\"required\":true},\"value\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"type\":\"text\",\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"versions\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"target\":\"api::system-resource.system-resource\"},\"vuid\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"},\"versionNumber\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"integer\",\"default\":1},\"isVisibleInListView\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"boolean\",\"default\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::system-resource.system-resource\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"system_resources\",\"info\":{\"singularName\":\"system-resource\",\"pluralName\":\"system-resources\",\"displayName\":\"Všeobecné texty\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true},\"versions\":{\"versioned\":true}},\"attributes\":{\"name\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":false}},\"type\":\"string\",\"required\":true},\"codename\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":false}},\"type\":\"string\",\"required\":true},\"value\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"type\":\"text\",\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"system-resource\",\"connection\":\"default\",\"uid\":\"api::system-resource.system-resource\",\"apiName\":\"system-resource\",\"globalId\":\"SystemResource\",\"actions\":{},\"lifecycles\":{}},\"api::template.template\":{\"kind\":\"collectionType\",\"collectionName\":\"templates\",\"info\":{\"singularName\":\"template\",\"pluralName\":\"templates\",\"displayName\":\"Znovupoužitelný obsah\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"content\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"dynamiczone\",\"components\":[\"block.button-block\"],\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::template.template\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"templates\",\"info\":{\"singularName\":\"template\",\"pluralName\":\"templates\",\"displayName\":\"Znovupoužitelný obsah\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"attributes\":{\"title\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"string\",\"required\":true},\"content\":{\"pluginOptions\":{\"i18n\":{\"localized\":true}},\"type\":\"dynamiczone\",\"components\":[\"block.button-block\"],\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"template\",\"connection\":\"default\",\"uid\":\"api::template.template\",\"apiName\":\"template\",\"globalId\":\"Template\",\"actions\":{},\"lifecycles\":{}},\"api::web-setting.web-setting\":{\"kind\":\"singleType\",\"collectionName\":\"web_settings\",\"info\":{\"singularName\":\"web-setting\",\"pluralName\":\"web-settings\",\"displayName\":\"Nastavenia webu\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true},\"versions\":{\"versioned\":true}},\"attributes\":{\"gtmCode\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"facebook\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"twitter\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"instagram\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"pinterest\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"youtube\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"homePage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"articleDetailPage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"mailFrom\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"mailTo\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"mailSubject\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"mainMenu\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::menu.menu\"},\"articlesPage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"seo\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"component\":\"shared.seo\"},\"footerMenu\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::menu.menu\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"versions\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"target\":\"api::web-setting.web-setting\"},\"vuid\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"},\"versionNumber\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"integer\",\"default\":1},\"isVisibleInListView\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"boolean\",\"default\":true},\"localizations\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::web-setting.web-setting\"},\"locale\":{\"writable\":true,\"private\":false,\"configurable\":false,\"visible\":false,\"type\":\"string\"}},\"__schema__\":{\"collectionName\":\"web_settings\",\"info\":{\"singularName\":\"web-setting\",\"pluralName\":\"web-settings\",\"displayName\":\"Nastavenia webu\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{\"i18n\":{\"localized\":true},\"versions\":{\"versioned\":true}},\"attributes\":{\"gtmCode\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"facebook\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"twitter\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"instagram\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"pinterest\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"youtube\":{\"type\":\"string\",\"pluginOptions\":{\"i18n\":{\"localized\":true}}},\"homePage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"articleDetailPage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"mailFrom\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"mailTo\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"mailSubject\":{\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"type\":\"string\"},\"mainMenu\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::menu.menu\"},\"articlesPage\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::page.page\"},\"seo\":{\"type\":\"component\",\"repeatable\":false,\"pluginOptions\":{\"versions\":{\"versioned\":true},\"i18n\":{\"localized\":true}},\"component\":\"shared.seo\"},\"footerMenu\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::menu.menu\"}},\"kind\":\"singleType\"},\"modelType\":\"contentType\",\"modelName\":\"web-setting\",\"connection\":\"default\",\"uid\":\"api::web-setting.web-setting\",\"apiName\":\"web-setting\",\"globalId\":\"WebSetting\",\"actions\":{},\"lifecycles\":{}}}','object',NULL,NULL),
	(2,'plugin_content_manager_configuration_components::block.article-detail-block','{\"uid\":\"block.article-detail-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"sectionId\",\"defaultSortBy\":\"sectionId\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"sectionId\":{\"edit\":{\"label\":\"sectionId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"sectionId\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"sectionId\"],\"edit\":[[{\"name\":\"sectionId\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(3,'plugin_content_manager_configuration_components::block.articles-list-block','{\"uid\":\"block.articles-list-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"sectionId\",\"defaultSortBy\":\"sectionId\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"sectionId\":{\"edit\":{\"label\":\"sectionId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"sectionId\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"sectionId\"],\"edit\":[[{\"name\":\"sectionId\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(4,'plugin_content_manager_configuration_components::block.button-block','{\"uid\":\"block.button-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"label\",\"defaultSortBy\":\"label\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"label\":{\"edit\":{\"label\":\"label\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"label\",\"searchable\":true,\"sortable\":true}},\"icon\":{\"edit\":{\"label\":\"icon\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"icon\",\"searchable\":true,\"sortable\":true}},\"page\":{\"edit\":{\"label\":\"page\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"page\",\"searchable\":true,\"sortable\":true}},\"file\":{\"edit\":{\"label\":\"file\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"file\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"label\",\"icon\",\"page\"],\"edit\":[[{\"name\":\"label\",\"size\":6},{\"name\":\"icon\",\"size\":6}],[{\"name\":\"page\",\"size\":6},{\"name\":\"file\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(5,'plugin_content_manager_configuration_components::block.error-page-block','{\"uid\":\"block.error-page-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"headline\",\"defaultSortBy\":\"headline\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"headline\":{\"edit\":{\"label\":\"headline\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"headline\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"headline\",\"description\"],\"edit\":[[{\"name\":\"headline\",\"size\":6},{\"name\":\"description\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(6,'plugin_content_manager_configuration_components::block.carousel-block','{\"uid\":\"block.carousel-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"textAlign\",\"defaultSortBy\":\"textAlign\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"textAlign\":{\"edit\":{\"label\":\"textAlign\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"textAlign\",\"searchable\":true,\"sortable\":true}},\"autoplay\":{\"edit\":{\"label\":\"autoplay\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"autoplay\",\"searchable\":true,\"sortable\":true}},\"interval\":{\"edit\":{\"label\":\"interval\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"interval\",\"searchable\":true,\"sortable\":true}},\"banners\":{\"edit\":{\"label\":\"banners\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"banners\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"textAlign\",\"autoplay\",\"interval\"],\"edit\":[[{\"name\":\"textAlign\",\"size\":6},{\"name\":\"autoplay\",\"size\":4}],[{\"name\":\"interval\",\"size\":4}],[{\"name\":\"banners\",\"size\":12}]]},\"isComponent\":true}','object',NULL,NULL),
	(7,'plugin_content_manager_configuration_components::block.gallery-block','{\"uid\":\"block.gallery-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"assets\":{\"edit\":{\"label\":\"assets\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"assets\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"assets\"],\"edit\":[[{\"name\":\"assets\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(8,'plugin_content_manager_configuration_components::block.latest-articles-block','{\"uid\":\"block.latest-articles-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"heading\",\"defaultSortBy\":\"heading\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"heading\":{\"edit\":{\"label\":\"heading\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"heading\",\"searchable\":true,\"sortable\":true}},\"buttonLabel\":{\"edit\":{\"label\":\"buttonLabel\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"buttonLabel\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"heading\",\"buttonLabel\"],\"edit\":[[{\"name\":\"heading\",\"size\":6},{\"name\":\"buttonLabel\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(9,'plugin_content_manager_configuration_components::block.map-block','{\"uid\":\"block.map-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"bubbleText\":{\"edit\":{\"label\":\"bubbleText\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"bubbleText\",\"searchable\":true,\"sortable\":true}},\"gps\":{\"edit\":{\"label\":\"gps\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"gps\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"bubbleText\",\"gps\"],\"edit\":[[{\"name\":\"bubbleText\",\"size\":6}],[{\"name\":\"gps\",\"size\":12}]]},\"isComponent\":true}','object',NULL,NULL),
	(10,'plugin_content_manager_configuration_components::block.rich-text-block','{\"uid\":\"block.rich-text-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"content\":{\"edit\":{\"label\":\"content\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"content\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\"],\"edit\":[[{\"name\":\"content\",\"size\":12}]]},\"isComponent\":true}','object',NULL,NULL),
	(11,'plugin_content_manager_configuration_components::block.test-block','{\"uid\":\"block.test-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"testText\",\"defaultSortBy\":\"testText\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"testText\":{\"edit\":{\"label\":\"testText\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"testText\",\"searchable\":true,\"sortable\":true}},\"testComponent\":{\"edit\":{\"label\":\"testComponent\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"testComponent\",\"searchable\":false,\"sortable\":false}},\"image\":{\"edit\":{\"label\":\"image\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"image\",\"searchable\":false,\"sortable\":false}},\"article\":{\"edit\":{\"label\":\"article\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"article\",\"searchable\":true,\"sortable\":true}},\"button\":{\"edit\":{\"label\":\"button\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"button\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"testText\",\"testComponent\",\"image\"],\"edit\":[[{\"name\":\"testText\",\"size\":6}],[{\"name\":\"testComponent\",\"size\":12}],[{\"name\":\"image\",\"size\":6},{\"name\":\"article\",\"size\":6}],[{\"name\":\"button\",\"size\":12}]]},\"isComponent\":true}','object',NULL,NULL),
	(12,'plugin_content_manager_configuration_components::block.video-block','{\"uid\":\"block.video-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"videoId\",\"defaultSortBy\":\"videoId\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"autoplay\":{\"edit\":{\"label\":\"autoplay\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"autoplay\",\"searchable\":true,\"sortable\":true}},\"video\":{\"edit\":{\"label\":\"video\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"video\",\"searchable\":false,\"sortable\":false}},\"videoId\":{\"edit\":{\"label\":\"videoId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"videoId\",\"searchable\":true,\"sortable\":true}},\"url\":{\"edit\":{\"label\":\"url\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"url\",\"searchable\":true,\"sortable\":true}},\"thumbnailUrl\":{\"edit\":{\"label\":\"thumbnailUrl\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"thumbnailUrl\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"autoplay\",\"video\",\"videoId\"],\"edit\":[[{\"name\":\"autoplay\",\"size\":4},{\"name\":\"video\",\"size\":6}],[{\"name\":\"videoId\",\"size\":6},{\"name\":\"url\",\"size\":6}],[{\"name\":\"thumbnailUrl\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(13,'plugin_content_manager_configuration_components::block.youtube-vimeo-block','{\"uid\":\"block.youtube-vimeo-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"url\",\"defaultSortBy\":\"url\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"url\":{\"edit\":{\"label\":\"url\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"url\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"provider\",\"searchable\":true,\"sortable\":true}},\"providerUid\":{\"edit\":{\"label\":\"providerUid\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"providerUid\",\"searchable\":true,\"sortable\":true}},\"width\":{\"edit\":{\"label\":\"width\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"width\",\"searchable\":true,\"sortable\":true}},\"height\":{\"edit\":{\"label\":\"height\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"height\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"thumbnailUrl\":{\"edit\":{\"label\":\"thumbnailUrl\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"thumbnailUrl\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"url\",\"provider\",\"providerUid\"],\"edit\":[[{\"name\":\"url\",\"size\":6},{\"name\":\"provider\",\"size\":6}],[{\"name\":\"providerUid\",\"size\":6},{\"name\":\"width\",\"size\":4}],[{\"name\":\"height\",\"size\":4},{\"name\":\"title\",\"size\":6}],[{\"name\":\"thumbnailUrl\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(14,'plugin_content_manager_configuration_components::complementary.button','{\"uid\":\"complementary.button\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"label\",\"defaultSortBy\":\"label\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"label\":{\"edit\":{\"label\":\"label\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"label\",\"searchable\":true,\"sortable\":true}},\"page\":{\"edit\":{\"label\":\"page\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"page\",\"searchable\":true,\"sortable\":true}},\"linkExternal\":{\"edit\":{\"label\":\"linkExternal\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"linkExternal\",\"searchable\":true,\"sortable\":true}},\"openInNewTab\":{\"edit\":{\"label\":\"openInNewTab\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"openInNewTab\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"page\",\"linkExternal\",\"label\"],\"edit\":[[{\"name\":\"page\",\"size\":6}],[{\"name\":\"linkExternal\",\"size\":6},{\"name\":\"label\",\"size\":6}],[{\"name\":\"openInNewTab\",\"size\":4}]]},\"isComponent\":true}','object',NULL,NULL),
	(15,'plugin_content_manager_configuration_components::complementary.carousel-banner','{\"uid\":\"complementary.carousel-banner\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"headline\",\"defaultSortBy\":\"headline\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"image\":{\"edit\":{\"label\":\"image\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"image\",\"searchable\":false,\"sortable\":false}},\"video\":{\"edit\":{\"label\":\"video\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"video\",\"searchable\":false,\"sortable\":false}},\"headline\":{\"edit\":{\"label\":\"headline\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"headline\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"textAlign\":{\"edit\":{\"label\":\"textAlign\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"textAlign\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"image\",\"video\",\"headline\"],\"edit\":[[{\"name\":\"image\",\"size\":6},{\"name\":\"video\",\"size\":6}],[{\"name\":\"headline\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"textAlign\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(16,'plugin_content_manager_configuration_components::complementary.ecomail','{\"uid\":\"complementary.ecomail\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"apiKey\",\"defaultSortBy\":\"apiKey\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"apiKey\":{\"edit\":{\"label\":\"apiKey\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"apiKey\",\"searchable\":true,\"sortable\":true}},\"listId\":{\"edit\":{\"label\":\"listId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"listId\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"apiKey\",\"listId\"],\"edit\":[[{\"name\":\"apiKey\",\"size\":6},{\"name\":\"listId\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(17,'plugin_content_manager_configuration_components::block.image-block','{\"uid\":\"block.image-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"image\":{\"edit\":{\"label\":\"image\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"image\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"image\"],\"edit\":[[{\"name\":\"image\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(18,'plugin_content_manager_configuration_components::complementary.gallery-item','{\"uid\":\"complementary.gallery-item\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"image\":{\"edit\":{\"label\":\"image\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"image\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"image\"],\"edit\":[[{\"name\":\"image\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(19,'plugin_content_manager_configuration_components::complementary.link','{\"uid\":\"complementary.link\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"text\",\"defaultSortBy\":\"text\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"text\":{\"edit\":{\"label\":\"text\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"text\",\"searchable\":true,\"sortable\":true}},\"linkExternal\":{\"edit\":{\"label\":\"linkExternal\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"linkExternal\",\"searchable\":true,\"sortable\":true}},\"page\":{\"edit\":{\"label\":\"page\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"page\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"text\",\"linkExternal\",\"page\"],\"edit\":[[{\"name\":\"text\",\"size\":6},{\"name\":\"linkExternal\",\"size\":6}],[{\"name\":\"page\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(20,'plugin_content_manager_configuration_components::complementary.mailchimp','{\"uid\":\"complementary.mailchimp\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"serverPrefix\",\"defaultSortBy\":\"serverPrefix\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"serverPrefix\":{\"edit\":{\"label\":\"serverPrefix\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"serverPrefix\",\"searchable\":true,\"sortable\":true}},\"apiKey\":{\"edit\":{\"label\":\"apiKey\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"apiKey\",\"searchable\":true,\"sortable\":true}},\"listId\":{\"edit\":{\"label\":\"listId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"listId\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"serverPrefix\",\"apiKey\",\"listId\"],\"edit\":[[{\"name\":\"serverPrefix\",\"size\":6},{\"name\":\"apiKey\",\"size\":6}],[{\"name\":\"listId\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(21,'plugin_content_manager_configuration_components::complementary.test-component','{\"uid\":\"complementary.test-component\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"text\",\"defaultSortBy\":\"text\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"text\":{\"edit\":{\"label\":\"text\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"text\",\"searchable\":true,\"sortable\":true}},\"icon\":{\"edit\":{\"label\":\"icon\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"icon\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"text\",\"icon\"],\"edit\":[[{\"name\":\"text\",\"size\":6},{\"name\":\"icon\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(22,'plugin_content_manager_configuration_components::menu.menu-item','{\"uid\":\"menu.menu-item\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"label\",\"defaultSortBy\":\"label\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"label\":{\"edit\":{\"label\":\"label\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"label\",\"searchable\":true,\"sortable\":true}},\"page\":{\"edit\":{\"label\":\"page\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"page\",\"searchable\":true,\"sortable\":true}},\"externalUrl\":{\"edit\":{\"label\":\"externalUrl\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"externalUrl\",\"searchable\":true,\"sortable\":true}},\"openInNewTab\":{\"edit\":{\"label\":\"openInNewTab\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"openInNewTab\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"page\",\"label\",\"openInNewTab\"],\"edit\":[[{\"name\":\"page\",\"size\":6}],[{\"name\":\"externalUrl\",\"size\":6},{\"name\":\"label\",\"size\":6}],[{\"name\":\"openInNewTab\",\"size\":4}]]},\"isComponent\":true}','object',NULL,NULL),
	(23,'plugin_content_manager_configuration_components::shared.fallback-seo','{\"uid\":\"shared.fallback-seo\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"image\":{\"edit\":{\"label\":\"image\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"image\",\"searchable\":false,\"sortable\":false}},\"twitterCard\":{\"edit\":{\"label\":\"twitterCard\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"twitterCard\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"description\",\"title\",\"image\"],\"edit\":[[{\"name\":\"description\",\"size\":6},{\"name\":\"title\",\"size\":6}],[{\"name\":\"image\",\"size\":6},{\"name\":\"twitterCard\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(24,'plugin_content_manager_configuration_components::shared.favicon-meta-tag','{\"uid\":\"shared.favicon-meta-tag\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"tag\",\"defaultSortBy\":\"tag\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"tag\":{\"edit\":{\"label\":\"tag\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"tag\",\"searchable\":true,\"sortable\":true}},\"attributes\":{\"edit\":{\"label\":\"attributes\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"attributes\",\"searchable\":true,\"sortable\":true}},\"content\":{\"edit\":{\"label\":\"content\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"content\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"tag\",\"attributes\",\"content\"],\"edit\":[[{\"name\":\"tag\",\"size\":6},{\"name\":\"attributes\",\"size\":6}],[{\"name\":\"content\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(25,'plugin_content_manager_configuration_components::shared.global-seo','{\"uid\":\"shared.global-seo\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"siteName\",\"defaultSortBy\":\"siteName\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"siteName\":{\"edit\":{\"label\":\"siteName\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"siteName\",\"searchable\":true,\"sortable\":true}},\"titleSuffix\":{\"edit\":{\"label\":\"titleSuffix\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"titleSuffix\",\"searchable\":true,\"sortable\":true}},\"facebookPageUrl\":{\"edit\":{\"label\":\"facebookPageUrl\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"facebookPageUrl\",\"searchable\":true,\"sortable\":true}},\"twitterAccount\":{\"edit\":{\"label\":\"twitterAccount\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"twitterAccount\",\"searchable\":true,\"sortable\":true}},\"fallbackSeo\":{\"edit\":{\"label\":\"fallbackSeo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"fallbackSeo\",\"searchable\":false,\"sortable\":false}},\"favicon\":{\"edit\":{\"label\":\"favicon\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"favicon\",\"searchable\":false,\"sortable\":false}},\"faviconMetaTags\":{\"edit\":{\"label\":\"faviconMetaTags\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"faviconMetaTags\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"siteName\",\"titleSuffix\",\"facebookPageUrl\"],\"edit\":[[{\"name\":\"siteName\",\"size\":6},{\"name\":\"titleSuffix\",\"size\":6}],[{\"name\":\"facebookPageUrl\",\"size\":6},{\"name\":\"twitterAccount\",\"size\":6}],[{\"name\":\"fallbackSeo\",\"size\":12}],[{\"name\":\"favicon\",\"size\":6}],[{\"name\":\"faviconMetaTags\",\"size\":12}]]},\"isComponent\":true}','object',NULL,NULL),
	(26,'plugin_content_manager_configuration_components::shared.meta-social','{\"uid\":\"shared.meta-social\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"socialNetwork\":{\"edit\":{\"label\":\"socialNetwork\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"socialNetwork\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"image\":{\"edit\":{\"label\":\"image\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"image\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"socialNetwork\",\"title\",\"description\"],\"edit\":[[{\"name\":\"socialNetwork\",\"size\":6},{\"name\":\"title\",\"size\":6}],[{\"name\":\"description\",\"size\":6},{\"name\":\"image\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(27,'plugin_content_manager_configuration_components::complementary.gps-coordinates','{\"uid\":\"complementary.gps-coordinates\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"latitude\",\"defaultSortBy\":\"latitude\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"latitude\":{\"edit\":{\"label\":\"latitude\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"latitude\",\"searchable\":true,\"sortable\":true}},\"longitude\":{\"edit\":{\"label\":\"longitude\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"longitude\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"latitude\",\"longitude\"],\"edit\":[[{\"name\":\"latitude\",\"size\":6},{\"name\":\"longitude\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(28,'plugin_content_manager_configuration_components::shared.seo','{\"uid\":\"shared.seo\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"metaTitle\",\"defaultSortBy\":\"metaTitle\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"metaTitle\":{\"edit\":{\"label\":\"metaTitle\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaTitle\",\"searchable\":true,\"sortable\":true}},\"metaDescription\":{\"edit\":{\"label\":\"metaDescription\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaDescription\",\"searchable\":true,\"sortable\":true}},\"metaSocial\":{\"edit\":{\"label\":\"metaSocial\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaSocial\",\"searchable\":false,\"sortable\":false}},\"keywords\":{\"edit\":{\"label\":\"keywords\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"keywords\",\"searchable\":true,\"sortable\":true}},\"metaRobots\":{\"edit\":{\"label\":\"metaRobots\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaRobots\",\"searchable\":true,\"sortable\":true}},\"structuredData\":{\"edit\":{\"label\":\"structuredData\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"structuredData\",\"searchable\":false,\"sortable\":false}},\"metaViewport\":{\"edit\":{\"label\":\"metaViewport\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"metaViewport\",\"searchable\":true,\"sortable\":true}},\"canonicalURL\":{\"edit\":{\"label\":\"canonicalURL\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"canonicalURL\",\"searchable\":true,\"sortable\":true}},\"preventIndexing\":{\"edit\":{\"label\":\"preventIndexing\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"preventIndexing\",\"searchable\":true,\"sortable\":true}},\"meta\":{\"edit\":{\"label\":\"meta\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"meta\",\"searchable\":false,\"sortable\":false}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"metaTitle\",\"metaDescription\",\"metaSocial\"],\"edit\":[[{\"name\":\"metaTitle\",\"size\":6},{\"name\":\"metaDescription\",\"size\":6}],[{\"name\":\"metaSocial\",\"size\":12}],[{\"name\":\"keywords\",\"size\":6},{\"name\":\"metaRobots\",\"size\":6}],[{\"name\":\"structuredData\",\"size\":12}],[{\"name\":\"metaViewport\",\"size\":6},{\"name\":\"canonicalURL\",\"size\":6}],[{\"name\":\"preventIndexing\",\"size\":4}],[{\"name\":\"meta\",\"size\":12}],[{\"name\":\"title\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(29,'plugin_content_manager_configuration_components::shared.sitemap','{\"uid\":\"shared.sitemap\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"enabled\":{\"edit\":{\"label\":\"enabled\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"enabled\",\"searchable\":true,\"sortable\":true}},\"changeFrequency\":{\"edit\":{\"label\":\"changeFrequency\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"changeFrequency\",\"searchable\":true,\"sortable\":true}},\"priority\":{\"edit\":{\"label\":\"priority\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"priority\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"enabled\",\"changeFrequency\",\"priority\"],\"edit\":[[{\"name\":\"enabled\",\"size\":4},{\"name\":\"changeFrequency\",\"size\":6}],[{\"name\":\"priority\",\"size\":4}]]},\"isComponent\":true}','object',NULL,NULL),
	(30,'plugin_content_manager_configuration_components::shared.meta','{\"uid\":\"shared.meta\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"content\":{\"edit\":{\"label\":\"content\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"content\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"content\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"content\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(31,'plugin_content_manager_configuration_content_types::admin::permission','{\"uid\":\"admin::permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"subject\":{\"edit\":{\"label\":\"subject\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"subject\",\"searchable\":true,\"sortable\":true}},\"properties\":{\"edit\":{\"label\":\"properties\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"properties\",\"searchable\":false,\"sortable\":false}},\"conditions\":{\"edit\":{\"label\":\"conditions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"conditions\",\"searchable\":false,\"sortable\":false}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"subject\",\"role\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"subject\",\"size\":6}],[{\"name\":\"properties\",\"size\":12}],[{\"name\":\"conditions\",\"size\":12}],[{\"name\":\"role\",\"size\":6}]]}}','object',NULL,NULL),
	(32,'plugin_content_manager_configuration_content_types::admin::user','{\"uid\":\"admin::user\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"firstname\",\"defaultSortBy\":\"firstname\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"firstname\":{\"edit\":{\"label\":\"firstname\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"firstname\",\"searchable\":true,\"sortable\":true}},\"lastname\":{\"edit\":{\"label\":\"lastname\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lastname\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"resetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"resetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"registrationToken\":{\"edit\":{\"label\":\"registrationToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"registrationToken\",\"searchable\":true,\"sortable\":true}},\"isActive\":{\"edit\":{\"label\":\"isActive\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"isActive\",\"searchable\":true,\"sortable\":true}},\"roles\":{\"edit\":{\"label\":\"roles\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"roles\",\"searchable\":false,\"sortable\":false}},\"blocked\":{\"edit\":{\"label\":\"blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blocked\",\"searchable\":true,\"sortable\":true}},\"preferedLanguage\":{\"edit\":{\"label\":\"preferedLanguage\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"preferedLanguage\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"firstname\",\"lastname\",\"username\"],\"edit\":[[{\"name\":\"firstname\",\"size\":6},{\"name\":\"lastname\",\"size\":6}],[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"password\",\"size\":6},{\"name\":\"resetPasswordToken\",\"size\":6}],[{\"name\":\"registrationToken\",\"size\":6},{\"name\":\"isActive\",\"size\":4}],[{\"name\":\"blocked\",\"size\":4},{\"name\":\"preferedLanguage\",\"size\":6}],[{\"name\":\"roles\",\"size\":6}]]}}','object',NULL,NULL),
	(33,'plugin_content_manager_configuration_content_types::admin::api-token','{\"uid\":\"admin::api-token\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"type\",\"searchable\":true,\"sortable\":true}},\"accessKey\":{\"edit\":{\"label\":\"accessKey\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"accessKey\",\"searchable\":true,\"sortable\":true}},\"lastUsedAt\":{\"edit\":{\"label\":\"lastUsedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lastUsedAt\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"expiresAt\":{\"edit\":{\"label\":\"expiresAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"expiresAt\",\"searchable\":true,\"sortable\":true}},\"lifespan\":{\"edit\":{\"label\":\"lifespan\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lifespan\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"type\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"type\",\"size\":6},{\"name\":\"accessKey\",\"size\":6}],[{\"name\":\"lastUsedAt\",\"size\":6},{\"name\":\"permissions\",\"size\":6}],[{\"name\":\"expiresAt\",\"size\":6},{\"name\":\"lifespan\",\"size\":4}]]}}','object',NULL,NULL),
	(34,'plugin_content_manager_configuration_content_types::plugin::entity-notes.note','{\"uid\":\"plugin::entity-notes.note\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"content\":{\"edit\":{\"label\":\"content\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"content\",\"searchable\":true,\"sortable\":true}},\"entityId\":{\"edit\":{\"label\":\"entityId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"entityId\",\"searchable\":true,\"sortable\":true}},\"entitySlug\":{\"edit\":{\"label\":\"entitySlug\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"entitySlug\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"title\",\"content\",\"entityId\"],\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"content\",\"size\":6}],[{\"name\":\"entityId\",\"size\":4},{\"name\":\"entitySlug\",\"size\":6}]]}}','object',NULL,NULL),
	(35,'plugin_content_manager_configuration_content_types::api::article.article','{\"uid\":\"api::article.article\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"mainImage\":{\"edit\":{\"label\":\"mainImage\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mainImage\",\"searchable\":false,\"sortable\":false}},\"publishDate\":{\"edit\":{\"label\":\"publishDate\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"publishDate\",\"searchable\":true,\"sortable\":true}},\"content\":{\"edit\":{\"label\":\"content\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"content\",\"searchable\":false,\"sortable\":false}},\"slug\":{\"edit\":{\"label\":\"slug\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"slug\",\"searchable\":true,\"sortable\":true}},\"perex\":{\"edit\":{\"label\":\"perex\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"perex\",\"searchable\":true,\"sortable\":true}},\"author\":{\"edit\":{\"label\":\"author\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"author\",\"searchable\":true,\"sortable\":true}},\"seo\":{\"edit\":{\"label\":\"seo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"seo\",\"searchable\":false,\"sortable\":false}},\"sitemap\":{\"edit\":{\"label\":\"sitemap\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"sitemap\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"title\",\"mainImage\",\"publishDate\"],\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"mainImage\",\"size\":6}],[{\"name\":\"publishDate\",\"size\":6}],[{\"name\":\"content\",\"size\":12}],[{\"name\":\"slug\",\"size\":6},{\"name\":\"perex\",\"size\":6}],[{\"name\":\"author\",\"size\":6}],[{\"name\":\"seo\",\"size\":12}],[{\"name\":\"sitemap\",\"size\":12}]]}}','object',NULL,NULL),
	(36,'plugin_content_manager_configuration_content_types::api::icon.icon','{\"uid\":\"api::icon.icon\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"codename\":{\"edit\":{\"label\":\"codename\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"codename\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"title\",\"codename\",\"createdAt\"],\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"codename\",\"size\":6}]]}}','object',NULL,NULL),
	(37,'plugin_content_manager_configuration_content_types::plugin::upload.folder','{\"uid\":\"plugin::upload.folder\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"pathId\":{\"edit\":{\"label\":\"pathId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"pathId\",\"searchable\":true,\"sortable\":true}},\"parent\":{\"edit\":{\"label\":\"parent\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"parent\",\"searchable\":true,\"sortable\":true}},\"children\":{\"edit\":{\"label\":\"children\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"children\",\"searchable\":false,\"sortable\":false}},\"files\":{\"edit\":{\"label\":\"files\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"files\",\"searchable\":false,\"sortable\":false}},\"path\":{\"edit\":{\"label\":\"path\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"path\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"pathId\",\"parent\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"pathId\",\"size\":4}],[{\"name\":\"path\",\"size\":6},{\"name\":\"parent\",\"size\":6}],[{\"name\":\"children\",\"size\":6},{\"name\":\"files\",\"size\":6}]]}}','object',NULL,NULL),
	(38,'plugin_content_manager_configuration_content_types::plugin::upload.file','{\"uid\":\"plugin::upload.file\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"alternativeText\":{\"edit\":{\"label\":\"alternativeText\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"alternativeText\",\"searchable\":true,\"sortable\":true}},\"caption\":{\"edit\":{\"label\":\"caption\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"caption\",\"searchable\":true,\"sortable\":true}},\"width\":{\"edit\":{\"label\":\"width\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"width\",\"searchable\":true,\"sortable\":true}},\"height\":{\"edit\":{\"label\":\"height\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"height\",\"searchable\":true,\"sortable\":true}},\"formats\":{\"edit\":{\"label\":\"formats\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"formats\",\"searchable\":false,\"sortable\":false}},\"hash\":{\"edit\":{\"label\":\"hash\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"hash\",\"searchable\":true,\"sortable\":true}},\"ext\":{\"edit\":{\"label\":\"ext\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"ext\",\"searchable\":true,\"sortable\":true}},\"mime\":{\"edit\":{\"label\":\"mime\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mime\",\"searchable\":true,\"sortable\":true}},\"size\":{\"edit\":{\"label\":\"size\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"size\",\"searchable\":true,\"sortable\":true}},\"url\":{\"edit\":{\"label\":\"url\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"url\",\"searchable\":true,\"sortable\":true}},\"previewUrl\":{\"edit\":{\"label\":\"previewUrl\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"previewUrl\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"provider\",\"searchable\":true,\"sortable\":true}},\"provider_metadata\":{\"edit\":{\"label\":\"provider_metadata\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"provider_metadata\",\"searchable\":false,\"sortable\":false}},\"folder\":{\"edit\":{\"label\":\"folder\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"folder\",\"searchable\":true,\"sortable\":true}},\"folderPath\":{\"edit\":{\"label\":\"folderPath\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"folderPath\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"alternativeText\",\"caption\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"alternativeText\",\"size\":6}],[{\"name\":\"caption\",\"size\":6},{\"name\":\"width\",\"size\":4}],[{\"name\":\"height\",\"size\":4}],[{\"name\":\"formats\",\"size\":12}],[{\"name\":\"hash\",\"size\":6},{\"name\":\"ext\",\"size\":6}],[{\"name\":\"mime\",\"size\":6},{\"name\":\"size\",\"size\":4}],[{\"name\":\"url\",\"size\":6},{\"name\":\"previewUrl\",\"size\":6}],[{\"name\":\"provider\",\"size\":6}],[{\"name\":\"provider_metadata\",\"size\":12}],[{\"name\":\"folderPath\",\"size\":6},{\"name\":\"folder\",\"size\":6}]]}}','object',NULL,NULL),
	(39,'plugin_content_manager_configuration_content_types::plugin::i18n.locale','{\"uid\":\"plugin::i18n.locale\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"code\":{\"edit\":{\"label\":\"code\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"code\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"code\",\"createdAt\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"code\",\"size\":6}]]}}','object',NULL,NULL),
	(40,'plugin_content_manager_configuration_content_types::plugin::users-permissions.permission','{\"uid\":\"plugin::users-permissions.permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"role\",\"createdAt\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"role\",\"size\":6}]]}}','object',NULL,NULL),
	(41,'plugin_content_manager_configuration_content_types::admin::role','{\"uid\":\"admin::role\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"code\":{\"edit\":{\"label\":\"code\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"code\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"users\":{\"edit\":{\"label\":\"users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"users\",\"searchable\":false,\"sortable\":false}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"code\",\"description\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"code\",\"size\":6}],[{\"name\":\"description\",\"size\":6},{\"name\":\"users\",\"size\":6}],[{\"name\":\"permissions\",\"size\":6}]]}}','object',NULL,NULL),
	(42,'plugin_content_manager_configuration_content_types::plugin::users-permissions.user','{\"uid\":\"plugin::users-permissions.user\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"username\",\"defaultSortBy\":\"username\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"provider\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"resetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"resetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"confirmationToken\":{\"edit\":{\"label\":\"confirmationToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"confirmationToken\",\"searchable\":true,\"sortable\":true}},\"confirmed\":{\"edit\":{\"label\":\"confirmed\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"confirmed\",\"searchable\":true,\"sortable\":true}},\"blocked\":{\"edit\":{\"label\":\"blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blocked\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"username\",\"email\",\"confirmed\"],\"edit\":[[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"password\",\"size\":6},{\"name\":\"confirmed\",\"size\":4}],[{\"name\":\"blocked\",\"size\":4},{\"name\":\"role\",\"size\":6}]]}}','object',NULL,NULL),
	(43,'plugin_content_manager_configuration_content_types::api::message.message','{\"uid\":\"api::message.message\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"phone\":{\"edit\":{\"label\":\"phone\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"phone\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"message\":{\"edit\":{\"label\":\"message\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"message\",\"searchable\":true,\"sortable\":true}},\"city\":{\"edit\":{\"label\":\"city\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"city\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"phone\",\"email\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"phone\",\"size\":6}],[{\"name\":\"email\",\"size\":6},{\"name\":\"message\",\"size\":6}],[{\"name\":\"city\",\"size\":6}]]}}','object',NULL,NULL),
	(44,'plugin_content_manager_configuration_content_types::api::newsletter-subscriber.newsletter-subscriber','{\"uid\":\"api::newsletter-subscriber.newsletter-subscriber\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"email\",\"createdAt\",\"updatedAt\"],\"edit\":[[{\"name\":\"email\",\"size\":6}]]}}','object',NULL,NULL),
	(45,'plugin_content_manager_configuration_content_types::api::page.page','{\"uid\":\"api::page.page\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"url\":{\"edit\":{\"label\":\"url\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"url\",\"searchable\":true,\"sortable\":true}},\"blocks\":{\"edit\":{\"label\":\"blocks\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blocks\",\"searchable\":false,\"sortable\":false}},\"pages\":{\"edit\":{\"label\":\"pages\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"pages\",\"searchable\":false,\"sortable\":false}},\"parent\":{\"edit\":{\"label\":\"parent\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"parent\",\"searchable\":true,\"sortable\":true}},\"seo\":{\"edit\":{\"label\":\"seo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"seo\",\"searchable\":false,\"sortable\":false}},\"sitemap\":{\"edit\":{\"label\":\"sitemap\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"sitemap\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"title\",\"url\",\"pages\"],\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"url\",\"size\":6}],[{\"name\":\"blocks\",\"size\":12}],[{\"name\":\"seo\",\"size\":12}],[{\"name\":\"sitemap\",\"size\":12}],[{\"name\":\"pages\",\"size\":6},{\"name\":\"parent\",\"size\":6}]]}}','object',NULL,NULL),
	(46,'plugin_content_manager_configuration_content_types::api::redirect.redirect','{\"uid\":\"api::redirect.redirect\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"redirectFrom\",\"defaultSortBy\":\"redirectFrom\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"redirectFrom\":{\"edit\":{\"label\":\"redirectFrom\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"redirectFrom\",\"searchable\":true,\"sortable\":true}},\"redirectTo\":{\"edit\":{\"label\":\"redirectTo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"redirectTo\",\"searchable\":true,\"sortable\":true}},\"statusCode\":{\"edit\":{\"label\":\"statusCode\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"statusCode\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"redirectFrom\",\"redirectTo\",\"statusCode\"],\"edit\":[[{\"name\":\"redirectFrom\",\"size\":6},{\"name\":\"redirectTo\",\"size\":6}],[{\"name\":\"statusCode\",\"size\":6}]]}}','object',NULL,NULL),
	(47,'plugin_content_manager_configuration_content_types::api::system-resource.system-resource','{\"uid\":\"api::system-resource.system-resource\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"codename\",\"defaultSortBy\":\"codename\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"codename\":{\"edit\":{\"label\":\"codename\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"codename\",\"searchable\":true,\"sortable\":true}},\"value\":{\"edit\":{\"label\":\"value\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"value\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"codename\",\"name\",\"createdAt\"],\"edit\":[[{\"name\":\"codename\",\"size\":6}],[{\"name\":\"value\",\"size\":12}],[{\"name\":\"name\",\"size\":6}]]}}','object',NULL,NULL),
	(48,'plugin_content_manager_configuration_content_types::plugin::users-permissions.role','{\"uid\":\"plugin::users-permissions.role\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"type\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"users\":{\"edit\":{\"label\":\"users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"users\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"type\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"type\",\"size\":6},{\"name\":\"permissions\",\"size\":6}],[{\"name\":\"users\",\"size\":6}]]}}','object',NULL,NULL),
	(49,'plugin_content_manager_configuration_content_types::api::web-setting.web-setting','{\"uid\":\"api::web-setting.web-setting\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"gtmCode\",\"defaultSortBy\":\"gtmCode\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"gtmCode\":{\"edit\":{\"label\":\"gtmCode\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"gtmCode\",\"searchable\":true,\"sortable\":true}},\"facebook\":{\"edit\":{\"label\":\"facebook\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"facebook\",\"searchable\":true,\"sortable\":true}},\"twitter\":{\"edit\":{\"label\":\"twitter\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"twitter\",\"searchable\":true,\"sortable\":true}},\"instagram\":{\"edit\":{\"label\":\"instagram\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"instagram\",\"searchable\":true,\"sortable\":true}},\"pinterest\":{\"edit\":{\"label\":\"pinterest\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"pinterest\",\"searchable\":true,\"sortable\":true}},\"youtube\":{\"edit\":{\"label\":\"youtube\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"youtube\",\"searchable\":true,\"sortable\":true}},\"homePage\":{\"edit\":{\"label\":\"homePage\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"homePage\",\"searchable\":true,\"sortable\":true}},\"articleDetailPage\":{\"edit\":{\"label\":\"articleDetailPage\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"articleDetailPage\",\"searchable\":true,\"sortable\":true}},\"mailFrom\":{\"edit\":{\"label\":\"mailFrom\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mailFrom\",\"searchable\":true,\"sortable\":true}},\"mailTo\":{\"edit\":{\"label\":\"mailTo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mailTo\",\"searchable\":true,\"sortable\":true}},\"mailSubject\":{\"edit\":{\"label\":\"mailSubject\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mailSubject\",\"searchable\":true,\"sortable\":true}},\"mainMenu\":{\"edit\":{\"label\":\"mainMenu\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"mainMenu\",\"searchable\":true,\"sortable\":true}},\"articlesPage\":{\"edit\":{\"label\":\"articlesPage\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"articlesPage\",\"searchable\":true,\"sortable\":true}},\"seo\":{\"edit\":{\"label\":\"seo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"seo\",\"searchable\":false,\"sortable\":false}},\"footerMenu\":{\"edit\":{\"label\":\"footerMenu\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"footerMenu\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"gtmCode\",\"facebook\",\"twitter\"],\"edit\":[[{\"name\":\"gtmCode\",\"size\":6},{\"name\":\"facebook\",\"size\":6}],[{\"name\":\"twitter\",\"size\":6},{\"name\":\"instagram\",\"size\":6}],[{\"name\":\"pinterest\",\"size\":6},{\"name\":\"youtube\",\"size\":6}],[{\"name\":\"mailFrom\",\"size\":6},{\"name\":\"mailTo\",\"size\":6}],[{\"name\":\"mailSubject\",\"size\":6}],[{\"name\":\"seo\",\"size\":12}],[{\"name\":\"homePage\",\"size\":6},{\"name\":\"articleDetailPage\",\"size\":6}],[{\"name\":\"mainMenu\",\"size\":6},{\"name\":\"articlesPage\",\"size\":6}],[{\"name\":\"footerMenu\",\"size\":6}]]}}','object',NULL,NULL),
	(50,'plugin_content_manager_configuration_content_types::api::menu.menu','{\"uid\":\"api::menu.menu\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"items\":{\"edit\":{\"label\":\"items\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"items\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"title\",\"items\",\"createdAt\"],\"edit\":[[{\"name\":\"title\",\"size\":6}],[{\"name\":\"items\",\"size\":12}]]}}','object',NULL,NULL),
	(51,'plugin_upload_settings','{\"sizeOptimization\":true,\"responsiveDimensions\":true,\"autoOrientation\":false}','object',NULL,NULL),
	(52,'plugin_upload_metrics','{\"weeklySchedule\":\"21 5 13 * * 4\",\"lastWeeklyUpdate\":1675339521055}','object',NULL,NULL),
	(53,'plugin_i18n_default_locale','\"cs\"','string',NULL,NULL),
	(54,'plugin_documentation_config','{\"restrictedAccess\":false}','object',NULL,NULL),
	(55,'plugin_users-permissions_grant','{\"email\":{\"enabled\":true,\"icon\":\"envelope\"},\"discord\":{\"enabled\":false,\"icon\":\"discord\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/discord/callback\",\"scope\":[\"identify\",\"email\"]},\"facebook\":{\"enabled\":false,\"icon\":\"facebook-square\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/facebook/callback\",\"scope\":[\"email\"]},\"google\":{\"enabled\":false,\"icon\":\"google\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/google/callback\",\"scope\":[\"email\"]},\"github\":{\"enabled\":false,\"icon\":\"github\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/github/callback\",\"scope\":[\"user\",\"user:email\"]},\"microsoft\":{\"enabled\":false,\"icon\":\"windows\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/microsoft/callback\",\"scope\":[\"user.read\"]},\"twitter\":{\"enabled\":false,\"icon\":\"twitter\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/twitter/callback\"},\"instagram\":{\"enabled\":false,\"icon\":\"instagram\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/instagram/callback\",\"scope\":[\"user_profile\"]},\"vk\":{\"enabled\":false,\"icon\":\"vk\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/vk/callback\",\"scope\":[\"email\"]},\"twitch\":{\"enabled\":false,\"icon\":\"twitch\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/twitch/callback\",\"scope\":[\"user:read:email\"]},\"linkedin\":{\"enabled\":false,\"icon\":\"linkedin\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/linkedin/callback\",\"scope\":[\"r_liteprofile\",\"r_emailaddress\"]},\"cognito\":{\"enabled\":false,\"icon\":\"aws\",\"key\":\"\",\"secret\":\"\",\"subdomain\":\"my.subdomain.com\",\"callback\":\"api/auth/cognito/callback\",\"scope\":[\"email\",\"openid\",\"profile\"]},\"reddit\":{\"enabled\":false,\"icon\":\"reddit\",\"key\":\"\",\"secret\":\"\",\"state\":true,\"callback\":\"api/auth/reddit/callback\",\"scope\":[\"identity\"]},\"auth0\":{\"enabled\":false,\"icon\":\"\",\"key\":\"\",\"secret\":\"\",\"subdomain\":\"my-tenant.eu\",\"callback\":\"api/auth/auth0/callback\",\"scope\":[\"openid\",\"email\",\"profile\"]},\"cas\":{\"enabled\":false,\"icon\":\"book\",\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/cas/callback\",\"scope\":[\"openid email\"],\"subdomain\":\"my.subdomain.com/cas\"}}','object',NULL,NULL),
	(56,'plugin_users-permissions_email','{\"reset_password\":{\"display\":\"Email.template.reset_password\",\"icon\":\"sync\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Reset password\",\"message\":\"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>\"}},\"email_confirmation\":{\"display\":\"Email.template.email_confirmation\",\"icon\":\"check-square\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Account confirmation\",\"message\":\"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>\"}}}','object',NULL,NULL),
	(57,'plugin_users-permissions_advanced','{\"unique_email\":true,\"allow_register\":true,\"email_confirmation\":false,\"email_reset_password\":null,\"email_confirmation_redirection\":null,\"default_role\":\"authenticated\"}','object',NULL,NULL),
	(58,'core_admin_auth','{\"providers\":{\"autoRegister\":false,\"defaultRole\":null}}','object',NULL,NULL),
	(59,'plugin_content_manager_configuration_components::block.template-block','{\"uid\":\"block.template-block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":false,\"sortable\":false}},\"template\":{\"edit\":{\"label\":\"template\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"title\"},\"list\":{\"label\":\"template\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"template\"],\"edit\":[[{\"name\":\"template\",\"size\":6}]]},\"isComponent\":true}','object',NULL,NULL),
	(60,'plugin_content_manager_configuration_content_types::admin::api-token-permission','{\"uid\":\"admin::api-token-permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"token\":{\"edit\":{\"label\":\"token\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"token\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"token\",\"createdAt\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"token\",\"size\":6}]]}}','object',NULL,NULL),
	(61,'plugin_content_manager_configuration_content_types::plugin::slugify.slug','{\"uid\":\"plugin::slugify.slug\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"slug\":{\"edit\":{\"label\":\"slug\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"slug\",\"searchable\":true,\"sortable\":true}},\"count\":{\"edit\":{\"label\":\"count\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"count\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"slug\",\"count\",\"createdAt\"],\"edit\":[[{\"name\":\"slug\",\"size\":6},{\"name\":\"count\",\"size\":4}]]}}','object',NULL,NULL),
	(62,'plugin_content_manager_configuration_content_types::plugin::email-designer.email-template','{\"uid\":\"plugin::email-designer.email-template\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"templateReferenceId\":{\"edit\":{\"label\":\"templateReferenceId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"templateReferenceId\",\"searchable\":true,\"sortable\":true}},\"design\":{\"edit\":{\"label\":\"design\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"design\",\"searchable\":false,\"sortable\":false}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"subject\":{\"edit\":{\"label\":\"subject\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"subject\",\"searchable\":true,\"sortable\":true}},\"bodyHtml\":{\"edit\":{\"label\":\"bodyHtml\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"bodyHtml\",\"searchable\":true,\"sortable\":true}},\"bodyText\":{\"edit\":{\"label\":\"bodyText\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"bodyText\",\"searchable\":true,\"sortable\":true}},\"enabled\":{\"edit\":{\"label\":\"enabled\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"enabled\",\"searchable\":true,\"sortable\":true}},\"tags\":{\"edit\":{\"label\":\"tags\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"tags\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"templateReferenceId\",\"name\",\"subject\"],\"edit\":[[{\"name\":\"templateReferenceId\",\"size\":4}],[{\"name\":\"design\",\"size\":12}],[{\"name\":\"name\",\"size\":6},{\"name\":\"subject\",\"size\":6}],[{\"name\":\"bodyHtml\",\"size\":6},{\"name\":\"bodyText\",\"size\":6}],[{\"name\":\"enabled\",\"size\":4}],[{\"name\":\"tags\",\"size\":12}]]}}','object',NULL,NULL),
	(63,'plugin_content_manager_configuration_content_types::plugin::block-gallery.block','{\"uid\":\"plugin::block-gallery.block\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"displayName\",\"defaultSortBy\":\"displayName\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"image\":{\"edit\":{\"label\":\"image\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"image\",\"searchable\":false,\"sortable\":false}},\"displayName\":{\"edit\":{\"label\":\"displayName\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"displayName\",\"searchable\":true,\"sortable\":true}},\"blockName\":{\"edit\":{\"label\":\"blockName\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blockName\",\"searchable\":true,\"sortable\":true}},\"externalUrl\":{\"edit\":{\"label\":\"externalUrl\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"externalUrl\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"image\",\"displayName\",\"blockName\"],\"edit\":[[{\"name\":\"image\",\"size\":6},{\"name\":\"displayName\",\"size\":6}],[{\"name\":\"blockName\",\"size\":6},{\"name\":\"externalUrl\",\"size\":6}]]}}','object',NULL,NULL),
	(64,'plugin_content_manager_configuration_content_types::api::template.template','{\"uid\":\"api::template.template\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"title\":{\"edit\":{\"label\":\"title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"title\",\"searchable\":true,\"sortable\":true}},\"content\":{\"edit\":{\"label\":\"content\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"content\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"title\",\"createdAt\",\"updatedAt\"],\"edit\":[[{\"name\":\"title\",\"size\":6}],[{\"name\":\"content\",\"size\":12}]]}}','object',NULL,NULL),
	(65,'plugin_upload_view_configuration','{\"pageSize\":10,\"sort\":\"createdAt:DESC\"}','object',NULL,NULL),
	(66,'plugin_tinymce_settings','{\"apiKey\":\"\"}','object',NULL,NULL);

/*!40000 ALTER TABLE `strapi_core_store_settings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table strapi_database_schema
# ------------------------------------------------------------

DROP TABLE IF EXISTS `strapi_database_schema`;

CREATE TABLE `strapi_database_schema` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `schema` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `time` datetime DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `strapi_database_schema` WRITE;
/*!40000 ALTER TABLE `strapi_database_schema` DISABLE KEYS */;

INSERT INTO `strapi_database_schema` (`id`, `schema`, `time`, `hash`)
VALUES
	(3,X'7B227461626C6573223A5B7B226E616D65223A227374726170695F636F72655F73746F72655F73657474696E6773222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226B6579222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2276616C7565222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2274797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E7669726F6E6D656E74222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22746167222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A227374726170695F776562686F6F6B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2275726C222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2268656164657273222C2274797065223A226A736F6E62222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226576656E7473222C2274797065223A226A736F6E62222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E61626C6564222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A227374726170695F65655F73746F72655F73657474696E6773222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226B6579222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2276616C7565222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A2261646D696E5F7065726D697373696F6E73222C22696E6465786573223A5B7B226E616D65223A2261646D696E5F7065726D697373696F6E735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2261646D696E5F7065726D697373696F6E735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2261646D696E5F7065726D697373696F6E735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2261646D696E5F7065726D697373696F6E735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22616374696F6E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227375626A656374222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270726F70657274696573222C2274797065223A226A736F6E62222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F6E646974696F6E73222C2274797065223A226A736F6E62222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2261646D696E5F7573657273222C22696E6465786573223A5B7B226E616D65223A2261646D696E5F75736572735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2261646D696E5F75736572735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2261646D696E5F75736572735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2261646D696E5F75736572735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2266697273746E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6173746E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757365726E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656D61696C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270617373776F7264222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2272657365745F70617373776F72645F746F6B656E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22726567697374726174696F6E5F746F6B656E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2269735F616374697665222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22626C6F636B6564222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270726566657265645F6C616E6775616765222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2261646D696E5F726F6C6573222C22696E6465786573223A5B7B226E616D65223A2261646D696E5F726F6C65735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2261646D696E5F726F6C65735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2261646D696E5F726F6C65735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2261646D696E5F726F6C65735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F6465222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226465736372697074696F6E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227374726170695F6170695F746F6B656E73222C22696E6465786573223A5B7B226E616D65223A227374726170695F6170695F746F6B656E735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A227374726170695F6170695F746F6B656E735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227374726170695F6170695F746F6B656E735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A227374726170695F6170695F746F6B656E735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226465736372697074696F6E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2274797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226163636573735F6B6579222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6173745F757365645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22657870697265735F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6966657370616E222C2274797065223A22626967496E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E73222C22696E6465786573223A5B7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22616374696F6E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2266696C6573222C22696E6465786573223A5B7B226E616D65223A2275706C6F61645F66696C65735F666F6C6465725F706174685F696E646578222C22636F6C756D6E73223A5B22666F6C6465725F70617468225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2275706C6F61645F66696C65735F637265617465645F61745F696E646578222C22636F6C756D6E73223A5B22637265617465645F6174225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2275706C6F61645F66696C65735F757064617465645F61745F696E646578222C22636F6C756D6E73223A5B22757064617465645F6174225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2275706C6F61645F66696C65735F6E616D655F696E646578222C22636F6C756D6E73223A5B226E616D65225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2275706C6F61645F66696C65735F73697A655F696E646578222C22636F6C756D6E73223A5B2273697A65225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2275706C6F61645F66696C65735F6578745F696E646578222C22636F6C756D6E73223A5B22657874225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2266696C65735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2266696C65735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2266696C65735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2266696C65735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22616C7465726E61746976655F74657874222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2263617074696F6E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227769647468222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22686569676874222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22666F726D617473222C2274797065223A226A736F6E62222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2268617368222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22657874222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D696D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2273697A65222C2274797065223A22646563696D616C222C2261726773223A5B31302C325D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2275726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22707265766965775F75726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270726F7669646572222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270726F76696465725F6D65746164617461222C2274797065223A226A736F6E62222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22666F6C6465725F70617468222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2275706C6F61645F666F6C64657273222C22696E6465786573223A5B7B226E616D65223A2275706C6F61645F666F6C646572735F706174685F69645F696E646578222C22636F6C756D6E73223A5B22706174685F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2275706C6F61645F666F6C646572735F706174685F696E646578222C22636F6C756D6E73223A5B2270617468225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2275706C6F61645F666F6C646572735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2275706C6F61645F666F6C646572735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2275706C6F61645F666F6C646572735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2275706C6F61645F666F6C646572735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22706174685F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270617468222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22736C756773222C22696E6465786573223A5B7B226E616D65223A22736C7567735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A22736C7567735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22736C7567735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A22736C7567735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22736C7567222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F756E74222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22656D61696C5F74656D706C61746573222C22696E6465786573223A5B7B226E616D65223A22656D61696C5F74656D706C617465735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A22656D61696C5F74656D706C617465735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22656D61696C5F74656D706C617465735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A22656D61696C5F74656D706C617465735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2274656D706C6174655F7265666572656E63655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2264657369676E222C2274797065223A226A736F6E62222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227375626A656374222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22626F64795F68746D6C222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22626F64795F74657874222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E61626C6564222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2274616773222C2274797065223A226A736F6E62222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A226931386E5F6C6F63616C65222C22696E6465786573223A5B7B226E616D65223A226931386E5F6C6F63616C655F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A226931386E5F6C6F63616C655F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A226931386E5F6C6F63616C655F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A226931386E5F6C6F63616C655F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F6465222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22626C6F636B73222C22696E6465786573223A5B7B226E616D65223A22626C6F636B735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A22626C6F636B735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22626C6F636B735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A22626C6F636B735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22646973706C61795F6E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22626C6F636B5F6E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2265787465726E616C5F75726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2275705F7065726D697373696F6E73222C22696E6465786573223A5B7B226E616D65223A2275705F7065726D697373696F6E735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2275705F7065726D697373696F6E735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2275705F7065726D697373696F6E735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2275705F7065726D697373696F6E735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22616374696F6E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2275705F726F6C6573222C22696E6465786573223A5B7B226E616D65223A2275705F726F6C65735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2275705F726F6C65735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2275705F726F6C65735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2275705F726F6C65735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226465736372697074696F6E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2274797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2275705F7573657273222C22696E6465786573223A5B7B226E616D65223A2275705F75736572735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2275705F75736572735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2275705F75736572735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2275705F75736572735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757365726E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656D61696C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270726F7669646572222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270617373776F7264222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2272657365745F70617373776F72645F746F6B656E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F6E6669726D6174696F6E5F746F6B656E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F6E6669726D6564222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22626C6F636B6564222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A226E6F746573222C22696E6465786573223A5B7B226E616D65223A226E6F7465735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A226E6F7465735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A226E6F7465735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A226E6F7465735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F6E74656E74222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F736C7567222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2261727469636C6573222C22696E6465786573223A5B7B2274797065223A22756E69717565222C226E616D65223A2261727469636C65735F736C75675F756E69717565222C22636F6C756D6E73223A5B22736C7567225D7D2C7B226E616D65223A2261727469636C65735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2261727469636C65735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2261727469636C65735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2261727469636C65735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C6973685F64617465222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F6E74656E74222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22736C7567222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73652C22756E69717565223A747275657D2C7B226E616D65223A227065726578222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22617574686F72222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C69736865645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2276756964222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2276657273696F6E5F6E756D626572222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2269735F76697369626C655F696E5F6C6973745F76696577222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6F63616C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A2269636F6E73222C22696E6465786573223A5B7B226E616D65223A2269636F6E735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2269636F6E735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2269636F6E735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2269636F6E735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F64656E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C69736865645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A226D656E7573222C22696E6465786573223A5B7B226E616D65223A226D656E75735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A226D656E75735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A226D656E75735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A226D656E75735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C69736865645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A226C6F63616C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A226D65737361676573222C22696E6465786573223A5B7B226E616D65223A226D657373616765735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A226D657373616765735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A226D657373616765735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A226D657373616765735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270686F6E65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656D61696C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D657373616765222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2263697479222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C69736865645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A226E6577736C65747465725F7375627363726962657273222C22696E6465786573223A5B7B226E616D65223A226E6577736C65747465725F73756273637269626572735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A226E6577736C65747465725F73756273637269626572735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A226E6577736C65747465725F73756273637269626572735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A226E6577736C65747465725F73756273637269626572735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656D61696C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C69736865645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227061676573222C22696E6465786573223A5B7B226E616D65223A2270616765735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2270616765735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2270616765735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2270616765735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2275726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C69736865645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2276756964222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2276657273696F6E5F6E756D626572222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2269735F76697369626C655F696E5F6C6973745F76696577222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6F63616C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22726564697265637473222C22696E6465786573223A5B7B226E616D65223A227265646972656374735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A227265646972656374735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227265646972656374735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A227265646972656374735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2272656469726563745F66726F6D222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2272656469726563745F746F222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227374617475735F636F6465222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C69736865645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2273797374656D5F7265736F7572636573222C22696E6465786573223A5B7B226E616D65223A2273797374656D5F7265736F75726365735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2273797374656D5F7265736F75726365735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2273797374656D5F7265736F75726365735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2273797374656D5F7265736F75726365735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F64656E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2276616C7565222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C69736865645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2276756964222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2276657273696F6E5F6E756D626572222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2269735F76697369626C655F696E5F6C6973745F76696577222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6F63616C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A2274656D706C61746573222C22696E6465786573223A5B7B226E616D65223A2274656D706C617465735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A2274656D706C617465735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2274656D706C617465735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A2274656D706C617465735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C69736865645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A226C6F63616C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A227765625F73657474696E6773222C22696E6465786573223A5B7B226E616D65223A227765625F73657474696E67735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227765625F73657474696E67735F637265617465645F62795F69645F666B222C22636F6C756D6E73223A5B22637265617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D2C7B226E616D65223A227765625F73657474696E67735F757064617465645F62795F69645F666B222C22636F6C756D6E73223A5B22757064617465645F62795F6964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C227265666572656E636564436F6C756D6E73223A5B226964225D2C226F6E44656C657465223A22534554204E554C4C227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2267746D5F636F6465222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2266616365626F6F6B222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2274776974746572222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22696E7374616772616D222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270696E746572657374222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22796F7574756265222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D61696C5F66726F6D222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D61696C5F746F222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D61696C5F7375626A656374222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757064617465645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227075626C69736865645F6174222C2274797065223A226461746574696D65222C2261726773223A5B7B22757365547A223A66616C73652C22707265636973696F6E223A367D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22637265617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757064617465645F62795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2276756964222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2276657273696F6E5F6E756D626572222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2269735F76697369626C655F696E5F6C6973745F76696577222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6F63616C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F61727469636C655F64657461696C5F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2273656374696F6E5F6964222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F61727469636C65735F6C6973745F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2273656374696F6E5F6964222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6162656C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6361726F7573656C5F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22746578745F616C69676E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226175746F706C6179222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22696E74657276616C222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6572726F725F706167655F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22686561646C696E65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226465736372697074696F6E222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F67616C6C6572795F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F696D6167655F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6C61746573745F61727469636C65735F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2268656164696E67222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22627574746F6E5F6C6162656C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6D61705F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22627562626C655F74657874222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F726963685F746578745F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F6E74656E74222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F74656D706C6174655F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22746573745F74657874222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F766964656F5F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226175746F706C6179222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22766964656F5F6964222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2275726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227468756D626E61696C5F75726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F796F75747562655F76696D656F5F626C6F636B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2275726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270726F7669646572222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270726F76696465725F756964222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227769647468222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22686569676874222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227468756D626E61696C5F75726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F627574746F6E73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6162656C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C696E6B5F65787465726E616C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F70656E5F696E5F6E65775F746162222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6361726F7573656C5F62616E6E657273222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22686561646C696E65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226465736372697074696F6E222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22746578745F616C69676E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F65636F6D61696C73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226170695F6B6579222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6973745F6964222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F67616C6C6572795F6974656D73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6770735F636F6F7264696E61746573222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C61746974756465222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6F6E676974756465222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6C696E6B73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2274657874222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C696E6B5F65787465726E616C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6D61696C6368696D7073222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227365727665725F707265666978222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226170695F6B6579222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6973745F6964222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F746573745F636F6D706F6E656E7473222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2274657874222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F6D656E755F6D656E755F6974656D73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C6162656C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2265787465726E616C5F75726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F70656E5F696E5F6E65775F746162222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F66616C6C6261636B5F73656F73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226465736372697074696F6E222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22747769747465725F63617264222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F66617669636F6E5F6D6574615F74616773222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22746167222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2261747472696275746573222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F6E74656E74222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F676C6F62616C5F73656F73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22736974655F6E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C655F737566666978222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2266616365626F6F6B5F706167655F75726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22747769747465725F6163636F756E74222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F6D6574615F736F6369616C73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22736F6369616C5F6E6574776F726B222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226465736372697074696F6E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F6D65746173222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226E616D65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22636F6E74656E74222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F73656F73222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D6574615F7469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D6574615F6465736372697074696F6E222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226B6579776F726473222C2274797065223A2274657874222C2261726773223A5B226C6F6E6774657874225D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D6574615F726F626F7473222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22737472756374757265645F64617461222C2274797065223A226A736F6E62222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D6574615F76696577706F7274222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2263616E6F6E6963616C5F75726C222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2270726576656E745F696E646578696E67222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227469746C65222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F736974656D617073222C22696E6465786573223A5B5D2C22666F726569676E4B657973223A5B5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E61626C6564222C2274797065223A22626F6F6C65616E222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226368616E67655F6672657175656E6379222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227072696F72697479222C2274797065223A22646563696D616C222C2261726773223A5B31302C325D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D5D7D2C7B226E616D65223A2261646D696E5F7065726D697373696F6E735F726F6C655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2261646D696E5F7065726D697373696F6E735F726F6C655F6C696E6B735F666B222C22636F6C756D6E73223A5B227065726D697373696F6E5F6964225D7D2C7B226E616D65223A2261646D696E5F7065726D697373696F6E735F726F6C655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22726F6C655F6964225D7D2C7B226E616D65223A2261646D696E5F7065726D697373696F6E735F726F6C655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B227065726D697373696F6E5F6964222C22726F6C655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2261646D696E5F7065726D697373696F6E735F726F6C655F6C696E6B735F6F726465725F696E765F666B222C22636F6C756D6E73223A5B227065726D697373696F6E5F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2261646D696E5F7065726D697373696F6E735F726F6C655F6C696E6B735F666B222C22636F6C756D6E73223A5B227065726D697373696F6E5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2261646D696E5F7065726D697373696F6E73222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2261646D696E5F7065726D697373696F6E735F726F6C655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22726F6C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2261646D696E5F726F6C6573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227065726D697373696F6E5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22726F6C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A227065726D697373696F6E5F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2261646D696E5F75736572735F726F6C65735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2261646D696E5F75736572735F726F6C65735F6C696E6B735F666B222C22636F6C756D6E73223A5B22757365725F6964225D7D2C7B226E616D65223A2261646D696E5F75736572735F726F6C65735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22726F6C655F6964225D7D2C7B226E616D65223A2261646D696E5F75736572735F726F6C65735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22757365725F6964222C22726F6C655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2261646D696E5F75736572735F726F6C65735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B22726F6C655F6F72646572225D7D2C7B226E616D65223A2261646D696E5F75736572735F726F6C65735F6C696E6B735F6F726465725F696E765F666B222C22636F6C756D6E73223A5B22757365725F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2261646D696E5F75736572735F726F6C65735F6C696E6B735F666B222C22636F6C756D6E73223A5B22757365725F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2261646D696E5F7573657273222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2261646D696E5F75736572735F726F6C65735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22726F6C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2261646D696E5F726F6C6573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757365725F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22726F6C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22726F6C655F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757365725F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F746F6B656E5F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F746F6B656E5F6C696E6B735F666B222C22636F6C756D6E73223A5B226170695F746F6B656E5F7065726D697373696F6E5F6964225D7D2C7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F746F6B656E5F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B226170695F746F6B656E5F6964225D7D2C7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F746F6B656E5F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B226170695F746F6B656E5F7065726D697373696F6E5F6964222C226170695F746F6B656E5F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F746F6B656E5F6C696E6B735F6F726465725F696E765F666B222C22636F6C756D6E73223A5B226170695F746F6B656E5F7065726D697373696F6E5F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F746F6B656E5F6C696E6B735F666B222C22636F6C756D6E73223A5B226170695F746F6B656E5F7065726D697373696F6E5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E73222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A227374726170695F6170695F746F6B656E5F7065726D697373696F6E735F746F6B656E5F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B226170695F746F6B656E5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227374726170695F6170695F746F6B656E73222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226170695F746F6B656E5F7065726D697373696F6E5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A226170695F746F6B656E5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A226170695F746F6B656E5F7065726D697373696F6E5F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2266696C65735F72656C617465645F6D6F72706873222C22696E6465786573223A5B7B226E616D65223A2266696C65735F72656C617465645F6D6F727068735F666B222C22636F6C756D6E73223A5B2266696C655F6964225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2266696C65735F72656C617465645F6D6F727068735F666B222C22636F6C756D6E73223A5B2266696C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2266696C6573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2266696C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2272656C617465645F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2272656C617465645F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2266696C65735F666F6C6465725F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2266696C65735F666F6C6465725F6C696E6B735F666B222C22636F6C756D6E73223A5B2266696C655F6964225D7D2C7B226E616D65223A2266696C65735F666F6C6465725F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22666F6C6465725F6964225D7D2C7B226E616D65223A2266696C65735F666F6C6465725F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B2266696C655F6964222C22666F6C6465725F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2266696C65735F666F6C6465725F6C696E6B735F6F726465725F696E765F666B222C22636F6C756D6E73223A5B2266696C655F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2266696C65735F666F6C6465725F6C696E6B735F666B222C22636F6C756D6E73223A5B2266696C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2266696C6573222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2266696C65735F666F6C6465725F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22666F6C6465725F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2275706C6F61645F666F6C64657273222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2266696C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22666F6C6465725F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2266696C655F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2275706C6F61645F666F6C646572735F706172656E745F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2275706C6F61645F666F6C646572735F706172656E745F6C696E6B735F666B222C22636F6C756D6E73223A5B22666F6C6465725F6964225D7D2C7B226E616D65223A2275706C6F61645F666F6C646572735F706172656E745F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F666F6C6465725F6964225D7D2C7B226E616D65223A2275706C6F61645F666F6C646572735F706172656E745F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22666F6C6465725F6964222C22696E765F666F6C6465725F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2275706C6F61645F666F6C646572735F706172656E745F6C696E6B735F6F726465725F696E765F666B222C22636F6C756D6E73223A5B22666F6C6465725F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2275706C6F61645F666F6C646572735F706172656E745F6C696E6B735F666B222C22636F6C756D6E73223A5B22666F6C6465725F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2275706C6F61645F666F6C64657273222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2275706C6F61645F666F6C646572735F706172656E745F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F666F6C6465725F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2275706C6F61645F666F6C64657273222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22666F6C6465725F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F666F6C6465725F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22666F6C6465725F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2275705F7065726D697373696F6E735F726F6C655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2275705F7065726D697373696F6E735F726F6C655F6C696E6B735F666B222C22636F6C756D6E73223A5B227065726D697373696F6E5F6964225D7D2C7B226E616D65223A2275705F7065726D697373696F6E735F726F6C655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22726F6C655F6964225D7D2C7B226E616D65223A2275705F7065726D697373696F6E735F726F6C655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B227065726D697373696F6E5F6964222C22726F6C655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2275705F7065726D697373696F6E735F726F6C655F6C696E6B735F6F726465725F696E765F666B222C22636F6C756D6E73223A5B227065726D697373696F6E5F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2275705F7065726D697373696F6E735F726F6C655F6C696E6B735F666B222C22636F6C756D6E73223A5B227065726D697373696F6E5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2275705F7065726D697373696F6E73222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2275705F7065726D697373696F6E735F726F6C655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22726F6C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2275705F726F6C6573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227065726D697373696F6E5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22726F6C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A227065726D697373696F6E5F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2275705F75736572735F726F6C655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2275705F75736572735F726F6C655F6C696E6B735F666B222C22636F6C756D6E73223A5B22757365725F6964225D7D2C7B226E616D65223A2275705F75736572735F726F6C655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22726F6C655F6964225D7D2C7B226E616D65223A2275705F75736572735F726F6C655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22757365725F6964222C22726F6C655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2275705F75736572735F726F6C655F6C696E6B735F6F726465725F696E765F666B222C22636F6C756D6E73223A5B22757365725F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2275705F75736572735F726F6C655F6C696E6B735F666B222C22636F6C756D6E73223A5B22757365725F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2275705F7573657273222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2275705F75736572735F726F6C655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22726F6C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2275705F726F6C6573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22757365725F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22726F6C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22757365725F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2261727469636C65735F636F6D706F6E656E7473222C22696E6465786573223A5B7B226E616D65223A2261727469636C65735F6669656C645F696E646578222C22636F6C756D6E73223A5B226669656C64225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2261727469636C65735F636F6D706F6E656E745F747970655F696E646578222C22636F6C756D6E73223A5B22636F6D706F6E656E745F74797065225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2261727469636C65735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D7D2C7B226E616D65223A2261727469636C65735F756E69717565222C22636F6C756D6E73223A5B22656E746974795F6964222C22636F6D706F6E656E745F6964222C226669656C64222C22636F6D706F6E656E745F74797065225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2261727469636C65735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2261727469636C6573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2261727469636C65735F76657273696F6E735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2261727469636C65735F76657273696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B2261727469636C655F6964225D7D2C7B226E616D65223A2261727469636C65735F76657273696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F61727469636C655F6964225D7D2C7B226E616D65223A2261727469636C65735F76657273696F6E735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B2261727469636C655F6964222C22696E765F61727469636C655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2261727469636C65735F76657273696F6E735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B2261727469636C655F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2261727469636C65735F76657273696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B2261727469636C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2261727469636C6573222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2261727469636C65735F76657273696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F61727469636C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2261727469636C6573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2261727469636C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F61727469636C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2261727469636C655F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2261727469636C65735F6C6F63616C697A6174696F6E735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2261727469636C65735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B2261727469636C655F6964225D7D2C7B226E616D65223A2261727469636C65735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F61727469636C655F6964225D7D2C7B226E616D65223A2261727469636C65735F6C6F63616C697A6174696F6E735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B2261727469636C655F6964222C22696E765F61727469636C655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2261727469636C65735F6C6F63616C697A6174696F6E735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B2261727469636C655F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2261727469636C65735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B2261727469636C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2261727469636C6573222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2261727469636C65735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F61727469636C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2261727469636C6573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2261727469636C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F61727469636C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2261727469636C655F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A226D656E75735F636F6D706F6E656E7473222C22696E6465786573223A5B7B226E616D65223A226D656E75735F6669656C645F696E646578222C22636F6C756D6E73223A5B226669656C64225D2C2274797065223A6E756C6C7D2C7B226E616D65223A226D656E75735F636F6D706F6E656E745F747970655F696E646578222C22636F6C756D6E73223A5B22636F6D706F6E656E745F74797065225D2C2274797065223A6E756C6C7D2C7B226E616D65223A226D656E75735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D7D2C7B226E616D65223A226D656E75735F756E69717565222C22636F6C756D6E73223A5B22656E746974795F6964222C22636F6D706F6E656E745F6964222C226669656C64222C22636F6D706F6E656E745F74797065225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A226D656E75735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A226D656E7573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A226D656E75735F6C6F63616C697A6174696F6E735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A226D656E75735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B226D656E755F6964225D7D2C7B226E616D65223A226D656E75735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F6D656E755F6964225D7D2C7B226E616D65223A226D656E75735F6C6F63616C697A6174696F6E735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B226D656E755F6964222C22696E765F6D656E755F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A226D656E75735F6C6F63616C697A6174696F6E735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B226D656E755F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A226D656E75735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B226D656E755F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A226D656E7573222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A226D656E75735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F6D656E755F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A226D656E7573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D656E755F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F6D656E755F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A226D656E755F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2270616765735F636F6D706F6E656E7473222C22696E6465786573223A5B7B226E616D65223A2270616765735F6669656C645F696E646578222C22636F6C756D6E73223A5B226669656C64225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2270616765735F636F6D706F6E656E745F747970655F696E646578222C22636F6C756D6E73223A5B22636F6D706F6E656E745F74797065225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2270616765735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D7D2C7B226E616D65223A2270616765735F756E69717565222C22636F6C756D6E73223A5B22656E746974795F6964222C22636F6D706F6E656E745F6964222C226669656C64222C22636F6D706F6E656E745F74797065225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2270616765735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2270616765735F706172656E745F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2270616765735F706172656E745F6C696E6B735F666B222C22636F6C756D6E73223A5B22706167655F6964225D7D2C7B226E616D65223A2270616765735F706172656E745F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F706167655F6964225D7D2C7B226E616D65223A2270616765735F706172656E745F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22706167655F6964222C22696E765F706167655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2270616765735F706172656E745F6C696E6B735F6F726465725F696E765F666B222C22636F6C756D6E73223A5B22706167655F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2270616765735F706172656E745F6C696E6B735F666B222C22636F6C756D6E73223A5B22706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2270616765735F706172656E745F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22706167655F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2270616765735F76657273696F6E735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2270616765735F76657273696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B22706167655F6964225D7D2C7B226E616D65223A2270616765735F76657273696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F706167655F6964225D7D2C7B226E616D65223A2270616765735F76657273696F6E735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22706167655F6964222C22696E765F706167655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2270616765735F76657273696F6E735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B22706167655F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2270616765735F76657273696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B22706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2270616765735F76657273696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22706167655F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2270616765735F6C6F63616C697A6174696F6E735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2270616765735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B22706167655F6964225D7D2C7B226E616D65223A2270616765735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F706167655F6964225D7D2C7B226E616D65223A2270616765735F6C6F63616C697A6174696F6E735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22706167655F6964222C22696E765F706167655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2270616765735F6C6F63616C697A6174696F6E735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B22706167655F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2270616765735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B22706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2270616765735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22706167655F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2273797374656D5F7265736F75726365735F76657273696F6E735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2273797374656D5F7265736F75726365735F76657273696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B2273797374656D5F7265736F757263655F6964225D7D2C7B226E616D65223A2273797374656D5F7265736F75726365735F76657273696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F73797374656D5F7265736F757263655F6964225D7D2C7B226E616D65223A2273797374656D5F7265736F75726365735F76657273696F6E735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B2273797374656D5F7265736F757263655F6964222C22696E765F73797374656D5F7265736F757263655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2273797374656D5F7265736F75726365735F76657273696F6E735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B2273797374656D5F7265736F757263655F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2273797374656D5F7265736F75726365735F76657273696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B2273797374656D5F7265736F757263655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2273797374656D5F7265736F7572636573222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2273797374656D5F7265736F75726365735F76657273696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F73797374656D5F7265736F757263655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2273797374656D5F7265736F7572636573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2273797374656D5F7265736F757263655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F73797374656D5F7265736F757263655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2273797374656D5F7265736F757263655F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2273797374656D5F7265736F75726365735F6C6F63616C697A6174696F6E735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2273797374656D5F7265736F75726365735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B2273797374656D5F7265736F757263655F6964225D7D2C7B226E616D65223A2273797374656D5F7265736F75726365735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F73797374656D5F7265736F757263655F6964225D7D2C7B226E616D65223A2273797374656D5F7265736F75726365735F6C6F63616C697A6174696F6E735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B2273797374656D5F7265736F757263655F6964222C22696E765F73797374656D5F7265736F757263655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2273797374656D5F7265736F75726365735F6C6F63616C697A6174696F6E735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B2273797374656D5F7265736F757263655F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2273797374656D5F7265736F75726365735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B2273797374656D5F7265736F757263655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2273797374656D5F7265736F7572636573222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2273797374656D5F7265736F75726365735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F73797374656D5F7265736F757263655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2273797374656D5F7265736F7572636573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2273797374656D5F7265736F757263655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F73797374656D5F7265736F757263655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2273797374656D5F7265736F757263655F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2274656D706C617465735F636F6D706F6E656E7473222C22696E6465786573223A5B7B226E616D65223A2274656D706C617465735F6669656C645F696E646578222C22636F6C756D6E73223A5B226669656C64225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2274656D706C617465735F636F6D706F6E656E745F747970655F696E646578222C22636F6C756D6E73223A5B22636F6D706F6E656E745F74797065225D2C2274797065223A6E756C6C7D2C7B226E616D65223A2274656D706C617465735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D7D2C7B226E616D65223A2274656D706C617465735F756E69717565222C22636F6C756D6E73223A5B22656E746974795F6964222C22636F6D706F6E656E745F6964222C226669656C64222C22636F6D706F6E656E745F74797065225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2274656D706C617465735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2274656D706C61746573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A2274656D706C617465735F6C6F63616C697A6174696F6E735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A2274656D706C617465735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B2274656D706C6174655F6964225D7D2C7B226E616D65223A2274656D706C617465735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F74656D706C6174655F6964225D7D2C7B226E616D65223A2274656D706C617465735F6C6F63616C697A6174696F6E735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B2274656D706C6174655F6964222C22696E765F74656D706C6174655F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A2274656D706C617465735F6C6F63616C697A6174696F6E735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B2274656D706C6174655F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A2274656D706C617465735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B2274656D706C6174655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2274656D706C61746573222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A2274656D706C617465735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F74656D706C6174655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2274656D706C61746573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2274656D706C6174655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F74656D706C6174655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2274656D706C6174655F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227765625F73657474696E67735F636F6D706F6E656E7473222C22696E6465786573223A5B7B226E616D65223A227765625F73657474696E67735F6669656C645F696E646578222C22636F6C756D6E73223A5B226669656C64225D2C2274797065223A6E756C6C7D2C7B226E616D65223A227765625F73657474696E67735F636F6D706F6E656E745F747970655F696E646578222C22636F6C756D6E73223A5B22636F6D706F6E656E745F74797065225D2C2274797065223A6E756C6C7D2C7B226E616D65223A227765625F73657474696E67735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F756E69717565222C22636F6C756D6E73223A5B22656E746974795F6964222C22636F6D706F6E656E745F6964222C226669656C64222C22636F6D706F6E656E745F74797065225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227765625F73657474696E67735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227765625F73657474696E6773222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227765625F73657474696E67735F686F6D655F706167655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A227765625F73657474696E67735F686F6D655F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F686F6D655F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F686F6D655F706167655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B227765625F73657474696E675F6964222C22706167655F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227765625F73657474696E67735F686F6D655F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227765625F73657474696E6773222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A227765625F73657474696E67735F686F6D655F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227765625F73657474696E675F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227765625F73657474696E67735F61727469636C655F64657461696C5F706167655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A227765625F73657474696E67735F61727469636C655F64657461696C5F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F61727469636C655F64657461696C5F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F61727469636C655F64657461696C5F706167655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B227765625F73657474696E675F6964222C22706167655F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227765625F73657474696E67735F61727469636C655F64657461696C5F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227765625F73657474696E6773222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A227765625F73657474696E67735F61727469636C655F64657461696C5F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227765625F73657474696E675F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227765625F73657474696E67735F6D61696E5F6D656E755F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A227765625F73657474696E67735F6D61696E5F6D656E755F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F6D61696E5F6D656E755F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B226D656E755F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F6D61696E5F6D656E755F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B227765625F73657474696E675F6964222C226D656E755F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227765625F73657474696E67735F6D61696E5F6D656E755F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227765625F73657474696E6773222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A227765625F73657474696E67735F6D61696E5F6D656E755F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B226D656E755F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A226D656E7573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227765625F73657474696E675F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A226D656E755F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227765625F73657474696E67735F61727469636C65735F706167655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A227765625F73657474696E67735F61727469636C65735F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F61727469636C65735F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F61727469636C65735F706167655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B227765625F73657474696E675F6964222C22706167655F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227765625F73657474696E67735F61727469636C65735F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227765625F73657474696E6773222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A227765625F73657474696E67735F61727469636C65735F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227765625F73657474696E675F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227765625F73657474696E67735F666F6F7465725F6D656E755F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A227765625F73657474696E67735F666F6F7465725F6D656E755F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F666F6F7465725F6D656E755F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B226D656E755F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F666F6F7465725F6D656E755F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B227765625F73657474696E675F6964222C226D656E755F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227765625F73657474696E67735F666F6F7465725F6D656E755F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227765625F73657474696E6773222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A227765625F73657474696E67735F666F6F7465725F6D656E755F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B226D656E755F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A226D656E7573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227765625F73657474696E675F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A226D656E755F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227765625F73657474696E67735F76657273696F6E735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A227765625F73657474696E67735F76657273696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F76657273696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F7765625F73657474696E675F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F76657273696F6E735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B227765625F73657474696E675F6964222C22696E765F7765625F73657474696E675F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A227765625F73657474696E67735F76657273696F6E735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227765625F73657474696E67735F76657273696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227765625F73657474696E6773222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A227765625F73657474696E67735F76657273696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F7765625F73657474696E675F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227765625F73657474696E6773222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227765625F73657474696E675F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F7765625F73657474696E675F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A227765625F73657474696E675F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A227765625F73657474696E67735F6C6F63616C697A6174696F6E735F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A227765625F73657474696E67735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F7765625F73657474696E675F6964225D7D2C7B226E616D65223A227765625F73657474696E67735F6C6F63616C697A6174696F6E735F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B227765625F73657474696E675F6964222C22696E765F7765625F73657474696E675F6964225D2C2274797065223A22756E69717565227D2C7B226E616D65223A227765625F73657474696E67735F6C6F63616C697A6174696F6E735F6C696E6B735F6F726465725F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6F72646572225D7D5D2C22666F726569676E4B657973223A5B7B226E616D65223A227765625F73657474696E67735F6C6F63616C697A6174696F6E735F6C696E6B735F666B222C22636F6C756D6E73223A5B227765625F73657474696E675F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227765625F73657474696E6773222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A227765625F73657474696E67735F6C6F63616C697A6174696F6E735F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22696E765F7765625F73657474696E675F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227765625F73657474696E6773222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A227765625F73657474696E675F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22696E765F7765625F73657474696E675F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A227765625F73657474696E675F6F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F69636F6E5F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F69636F6E5F6C696E6B735F666B222C22636F6C756D6E73223A5B22627574746F6E5F626C6F636B5F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F69636F6E5F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B2269636F6E5F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F69636F6E5F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22627574746F6E5F626C6F636B5F6964222C2269636F6E5F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F69636F6E5F6C696E6B735F666B222C22636F6C756D6E73223A5B22627574746F6E5F626C6F636B5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B73222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F69636F6E5F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B2269636F6E5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2269636F6E73222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22627574746F6E5F626C6F636B5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2269636F6E5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F706167655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B22627574746F6E5F626C6F636B5F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F706167655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22627574746F6E5F626C6F636B5F6964222C22706167655F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B22627574746F6E5F626C6F636B5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B73222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F627574746F6E5F626C6F636B735F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22627574746F6E5F626C6F636B5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6361726F7573656C5F626C6F636B735F636F6D706F6E656E7473222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6361726F7573656C5F626C6F636B735F6669656C645F696E646578222C22636F6C756D6E73223A5B226669656C64225D2C2274797065223A6E756C6C7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6361726F7573656C5F626C6F636B735F636F6D706F6E656E745F747970655F696E646578222C22636F6C756D6E73223A5B22636F6D706F6E656E745F74797065225D2C2274797065223A6E756C6C7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6361726F7573656C5F626C6F636B735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6361726F7573656C5F626C6F636B735F756E69717565222C22636F6C756D6E73223A5B22656E746974795F6964222C22636F6D706F6E656E745F6964222C226669656C64222C22636F6D706F6E656E745F74797065225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6361726F7573656C5F626C6F636B735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F626C6F636B5F6361726F7573656C5F626C6F636B73222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6D61705F626C6F636B735F636F6D706F6E656E7473222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6D61705F626C6F636B735F6669656C645F696E646578222C22636F6C756D6E73223A5B226669656C64225D2C2274797065223A6E756C6C7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6D61705F626C6F636B735F636F6D706F6E656E745F747970655F696E646578222C22636F6C756D6E73223A5B22636F6D706F6E656E745F74797065225D2C2274797065223A6E756C6C7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6D61705F626C6F636B735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6D61705F626C6F636B735F756E69717565222C22636F6C756D6E73223A5B22656E746974795F6964222C22636F6D706F6E656E745F6964222C226669656C64222C22636F6D706F6E656E745F74797065225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F6D61705F626C6F636B735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F626C6F636B5F6D61705F626C6F636B73222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F74656D706C6174655F626C6F636B735F74656D706C6174655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F74656D706C6174655F626C6F636B735F74656D706C6174655F6C696E6B735F666B222C22636F6C756D6E73223A5B2274656D706C6174655F626C6F636B5F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F74656D706C6174655F626C6F636B735F74656D706C6174655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B2274656D706C6174655F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F74656D706C6174655F626C6F636B735F74656D706C6174655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B2274656D706C6174655F626C6F636B5F6964222C2274656D706C6174655F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F74656D706C6174655F626C6F636B735F74656D706C6174655F6C696E6B735F666B222C22636F6C756D6E73223A5B2274656D706C6174655F626C6F636B5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F626C6F636B5F74656D706C6174655F626C6F636B73222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F74656D706C6174655F626C6F636B735F74656D706C6174655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B2274656D706C6174655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2274656D706C61746573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A2274656D706C6174655F626C6F636B5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2274656D706C6174655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F636F6D706F6E656E7473222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F6669656C645F696E646578222C22636F6C756D6E73223A5B226669656C64225D2C2274797065223A6E756C6C7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F636F6D706F6E656E745F747970655F696E646578222C22636F6C756D6E73223A5B22636F6D706F6E656E745F74797065225D2C2274797065223A6E756C6C7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F756E69717565222C22636F6C756D6E73223A5B22656E746974795F6964222C22636F6D706F6E656E745F6964222C226669656C64222C22636F6D706F6E656E745F74797065225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B73222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F61727469636C655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F61727469636C655F6C696E6B735F666B222C22636F6C756D6E73223A5B22746573745F626C6F636B5F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F61727469636C655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B2261727469636C655F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F61727469636C655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22746573745F626C6F636B5F6964222C2261727469636C655F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F61727469636C655F6C696E6B735F666B222C22636F6C756D6E73223A5B22746573745F626C6F636B5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B73222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A22636F6D706F6E656E74735F626C6F636B5F746573745F626C6F636B735F61727469636C655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B2261727469636C655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2261727469636C6573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22746573745F626C6F636B5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2261727469636C655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F627574746F6E735F706167655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F627574746F6E735F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B22627574746F6E5F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F627574746F6E735F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F627574746F6E735F706167655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22627574746F6E5F6964222C22706167655F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F627574746F6E735F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B22627574746F6E5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F627574746F6E73222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F627574746F6E735F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22627574746F6E5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6C696E6B735F706167655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6C696E6B735F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B226C696E6B5F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6C696E6B735F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6C696E6B735F706167655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B226C696E6B5F6964222C22706167655F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6C696E6B735F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B226C696E6B5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6C696E6B73222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F6C696E6B735F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226C696E6B5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F746573745F636F6D706F6E656E74735F69636F6E5F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F746573745F636F6D706F6E656E74735F69636F6E5F6C696E6B735F666B222C22636F6C756D6E73223A5B22746573745F636F6D706F6E656E745F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F746573745F636F6D706F6E656E74735F69636F6E5F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B2269636F6E5F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F746573745F636F6D706F6E656E74735F69636F6E5F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B22746573745F636F6D706F6E656E745F6964222C2269636F6E5F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F746573745F636F6D706F6E656E74735F69636F6E5F6C696E6B735F666B222C22636F6C756D6E73223A5B22746573745F636F6D706F6E656E745F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F746573745F636F6D706F6E656E7473222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A22636F6D706F6E656E74735F636F6D706C656D656E746172795F746573745F636F6D706F6E656E74735F69636F6E5F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B2269636F6E5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A2269636F6E73222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22746573745F636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A2269636F6E5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F6D656E755F6D656E755F6974656D735F706167655F6C696E6B73222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F6D656E755F6D656E755F6974656D735F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B226D656E755F6974656D5F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F6D656E755F6D656E755F6974656D735F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F6D656E755F6D656E755F6974656D735F706167655F6C696E6B735F756E69717565222C22636F6C756D6E73223A5B226D656E755F6974656D5F6964222C22706167655F6964225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F6D656E755F6D656E755F6974656D735F706167655F6C696E6B735F666B222C22636F6C756D6E73223A5B226D656E755F6974656D5F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F6D656E755F6D656E755F6974656D73222C226F6E44656C657465223A2243415343414445227D2C7B226E616D65223A22636F6D706F6E656E74735F6D656E755F6D656E755F6974656D735F706167655F6C696E6B735F696E765F666B222C22636F6C756D6E73223A5B22706167655F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A227061676573222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226D656E755F6974656D5F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22706167655F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F676C6F62616C5F73656F735F636F6D706F6E656E7473222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F7368617265645F676C6F62616C5F73656F735F6669656C645F696E646578222C22636F6C756D6E73223A5B226669656C64225D2C2274797065223A6E756C6C7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F676C6F62616C5F73656F735F636F6D706F6E656E745F747970655F696E646578222C22636F6C756D6E73223A5B22636F6D706F6E656E745F74797065225D2C2274797065223A6E756C6C7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F676C6F62616C5F73656F735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F676C6F62616C5F73656F735F756E69717565222C22636F6C756D6E73223A5B22656E746974795F6964222C22636F6D706F6E656E745F6964222C226669656C64222C22636F6D706F6E656E745F74797065225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F7368617265645F676C6F62616C5F73656F735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F7368617265645F676C6F62616C5F73656F73222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F73656F735F636F6D706F6E656E7473222C22696E6465786573223A5B7B226E616D65223A22636F6D706F6E656E74735F7368617265645F73656F735F6669656C645F696E646578222C22636F6C756D6E73223A5B226669656C64225D2C2274797065223A6E756C6C7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F73656F735F636F6D706F6E656E745F747970655F696E646578222C22636F6C756D6E73223A5B22636F6D706F6E656E745F74797065225D2C2274797065223A6E756C6C7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F73656F735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D7D2C7B226E616D65223A22636F6D706F6E656E74735F7368617265645F73656F735F756E69717565222C22636F6C756D6E73223A5B22656E746974795F6964222C22636F6D706F6E656E745F6964222C226669656C64222C22636F6D706F6E656E745F74797065225D2C2274797065223A22756E69717565227D5D2C22666F726569676E4B657973223A5B7B226E616D65223A22636F6D706F6E656E74735F7368617265645F73656F735F656E746974795F666B222C22636F6C756D6E73223A5B22656E746974795F6964225D2C227265666572656E636564436F6C756D6E73223A5B226964225D2C227265666572656E6365645461626C65223A22636F6D706F6E656E74735F7368617265645F73656F73222C226F6E44656C657465223A2243415343414445227D5D2C22636F6C756D6E73223A5B7B226E616D65223A226964222C2274797065223A22696E6372656D656E7473222C2261726773223A5B7B227072696D617279223A747275652C227072696D6172794B6579223A747275657D5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A747275652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A22656E746974795F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F6964222C2274797065223A22696E7465676572222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D2C7B226E616D65223A22636F6D706F6E656E745F74797065222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226669656C64222C2274797065223A22737472696E67222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A66616C73657D2C7B226E616D65223A226F72646572222C2274797065223A22646F75626C65222C2261726773223A5B5D2C2264656661756C74546F223A6E756C6C2C226E6F744E756C6C61626C65223A66616C73652C22756E7369676E6564223A747275657D5D7D5D7D','2023-02-02 13:00:21','44fa16a19fad35186c3f9500081d4038');

/*!40000 ALTER TABLE `strapi_database_schema` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table strapi_ee_store_settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `strapi_ee_store_settings`;

CREATE TABLE `strapi_ee_store_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table strapi_migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `strapi_migrations`;

CREATE TABLE `strapi_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table strapi_webhooks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `strapi_webhooks`;

CREATE TABLE `strapi_webhooks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` longtext,
  `headers` json DEFAULT NULL,
  `events` json DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table system_resources
# ------------------------------------------------------------

DROP TABLE IF EXISTS `system_resources`;

CREATE TABLE `system_resources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `codename` varchar(255) DEFAULT NULL,
  `value` longtext,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `vuid` varchar(255) DEFAULT NULL,
  `version_number` int(11) DEFAULT NULL,
  `is_visible_in_list_view` tinyint(1) DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `system_resources_created_by_id_fk` (`created_by_id`),
  KEY `system_resources_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `system_resources_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `system_resources_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table system_resources_localizations_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `system_resources_localizations_links`;

CREATE TABLE `system_resources_localizations_links` (
  `system_resource_id` int(10) unsigned DEFAULT NULL,
  `inv_system_resource_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `system_resource_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `system_resources_localizations_links_unique` (`system_resource_id`,`inv_system_resource_id`),
  KEY `system_resources_localizations_links_fk` (`system_resource_id`),
  KEY `system_resources_localizations_links_inv_fk` (`inv_system_resource_id`),
  KEY `system_resources_localizations_links_order_fk` (`system_resource_order`),
  CONSTRAINT `system_resources_localizations_links_fk` FOREIGN KEY (`system_resource_id`) REFERENCES `system_resources` (`id`) ON DELETE CASCADE,
  CONSTRAINT `system_resources_localizations_links_inv_fk` FOREIGN KEY (`inv_system_resource_id`) REFERENCES `system_resources` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table system_resources_versions_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `system_resources_versions_links`;

CREATE TABLE `system_resources_versions_links` (
  `system_resource_id` int(10) unsigned DEFAULT NULL,
  `inv_system_resource_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `system_resource_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `system_resources_versions_links_unique` (`system_resource_id`,`inv_system_resource_id`),
  KEY `system_resources_versions_links_fk` (`system_resource_id`),
  KEY `system_resources_versions_links_inv_fk` (`inv_system_resource_id`),
  KEY `system_resources_versions_links_order_fk` (`system_resource_order`),
  CONSTRAINT `system_resources_versions_links_fk` FOREIGN KEY (`system_resource_id`) REFERENCES `system_resources` (`id`) ON DELETE CASCADE,
  CONSTRAINT `system_resources_versions_links_inv_fk` FOREIGN KEY (`inv_system_resource_id`) REFERENCES `system_resources` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table templates
# ------------------------------------------------------------

DROP TABLE IF EXISTS `templates`;

CREATE TABLE `templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `templates_created_by_id_fk` (`created_by_id`),
  KEY `templates_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `templates_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `templates_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table templates_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `templates_components`;

CREATE TABLE `templates_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `templates_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  KEY `templates_field_index` (`field`),
  KEY `templates_component_type_index` (`component_type`),
  KEY `templates_entity_fk` (`entity_id`),
  CONSTRAINT `templates_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table templates_localizations_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `templates_localizations_links`;

CREATE TABLE `templates_localizations_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `template_id` int(10) unsigned DEFAULT NULL,
  `inv_template_id` int(10) unsigned DEFAULT NULL,
  `template_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `templates_localizations_links_unique` (`template_id`,`inv_template_id`),
  KEY `templates_localizations_links_fk` (`template_id`),
  KEY `templates_localizations_links_inv_fk` (`inv_template_id`),
  KEY `templates_localizations_links_order_fk` (`template_order`),
  CONSTRAINT `templates_localizations_links_fk` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `templates_localizations_links_inv_fk` FOREIGN KEY (`inv_template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table up_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `up_permissions`;

CREATE TABLE `up_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_permissions_created_by_id_fk` (`created_by_id`),
  KEY `up_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `up_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `up_permissions` WRITE;
/*!40000 ALTER TABLE `up_permissions` DISABLE KEYS */;

INSERT INTO `up_permissions` (`id`, `action`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`)
VALUES
	(1,'plugin::users-permissions.user.me','2022-08-10 10:37:14.535000','2022-08-10 10:37:14.535000',NULL,NULL),
	(2,'plugin::users-permissions.auth.callback','2022-08-10 10:37:14.537000','2022-08-10 10:37:14.537000',NULL,NULL),
	(3,'plugin::users-permissions.auth.connect','2022-08-10 10:37:14.537000','2022-08-10 10:37:14.537000',NULL,NULL),
	(4,'plugin::users-permissions.auth.forgotPassword','2022-08-10 10:37:14.537000','2022-08-10 10:37:14.537000',NULL,NULL),
	(5,'plugin::users-permissions.auth.resetPassword','2022-08-10 10:37:14.537000','2022-08-10 10:37:14.537000',NULL,NULL),
	(6,'plugin::users-permissions.auth.register','2022-08-10 10:37:14.537000','2022-08-10 10:37:14.537000',NULL,NULL),
	(7,'plugin::users-permissions.auth.emailConfirmation','2022-08-10 10:37:14.537000','2022-08-10 10:37:14.537000',NULL,NULL),
	(8,'plugin::users-permissions.auth.sendEmailConfirmation','2022-08-10 10:37:14.537000','2022-08-10 10:37:14.537000',NULL,NULL),
	(9,'api::article.article.find','2022-08-10 11:09:25.159000','2022-08-10 11:09:25.159000',NULL,NULL),
	(10,'api::article.article.findOne','2022-08-10 11:09:25.159000','2022-08-10 11:09:25.159000',NULL,NULL),
	(11,'api::page.page.find','2022-08-10 11:09:25.159000','2022-08-10 11:09:25.159000',NULL,NULL),
	(12,'api::page.page.findOne','2022-08-10 11:09:25.159000','2022-08-10 11:09:25.159000',NULL,NULL),
	(13,'api::system-resource.system-resource.find','2022-08-10 11:09:25.159000','2022-08-10 11:09:25.159000',NULL,NULL),
	(14,'api::web-setting.web-setting.find','2022-08-10 11:09:25.159000','2022-08-10 11:09:25.159000',NULL,NULL),
	(15,'api::system-resource.system-resource.findOne','2022-08-10 11:09:25.159000','2022-08-10 11:09:25.159000',NULL,NULL),
	(16,'plugin::slugify.slugController.findSlug','2022-08-10 11:09:25.159000','2022-08-10 11:09:25.159000',NULL,NULL),
	(17,'api::menu.menu.find','2022-08-11 15:10:37.989000','2022-08-11 15:10:37.989000',NULL,NULL),
	(18,'api::menu.menu.findOne','2022-08-11 15:10:37.989000','2022-08-11 15:10:37.989000',NULL,NULL),
	(19,'api::redirect.redirect.find','2022-08-11 15:27:40.223000','2022-08-11 15:27:40.223000',NULL,NULL),
	(20,'api::redirect.redirect.findOne','2022-08-11 15:27:40.223000','2022-08-11 15:27:40.223000',NULL,NULL);

/*!40000 ALTER TABLE `up_permissions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table up_permissions_role_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `up_permissions_role_links`;

CREATE TABLE `up_permissions_role_links` (
  `permission_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `permission_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `up_permissions_role_links_unique` (`permission_id`,`role_id`),
  KEY `up_permissions_role_links_fk` (`permission_id`),
  KEY `up_permissions_role_links_inv_fk` (`role_id`),
  KEY `up_permissions_role_links_order_inv_fk` (`permission_order`),
  CONSTRAINT `up_permissions_role_links_fk` FOREIGN KEY (`permission_id`) REFERENCES `up_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `up_permissions_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `up_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `up_permissions_role_links` WRITE;
/*!40000 ALTER TABLE `up_permissions_role_links` DISABLE KEYS */;

INSERT INTO `up_permissions_role_links` (`permission_id`, `role_id`, `id`, `permission_order`)
VALUES
	(1,1,1,NULL),
	(2,2,2,NULL),
	(3,2,3,NULL),
	(4,2,4,NULL),
	(5,2,5,NULL),
	(7,2,6,NULL),
	(6,2,7,NULL),
	(8,2,8,NULL),
	(10,2,9,NULL),
	(11,2,10,NULL),
	(9,2,11,NULL),
	(12,2,12,NULL),
	(13,2,13,NULL),
	(14,2,14,NULL),
	(16,2,15,NULL),
	(15,2,16,NULL),
	(17,2,17,NULL),
	(18,2,18,NULL),
	(19,2,19,NULL),
	(20,2,20,NULL);

/*!40000 ALTER TABLE `up_permissions_role_links` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table up_roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `up_roles`;

CREATE TABLE `up_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_roles_created_by_id_fk` (`created_by_id`),
  KEY `up_roles_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `up_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `up_roles` WRITE;
/*!40000 ALTER TABLE `up_roles` DISABLE KEYS */;

INSERT INTO `up_roles` (`id`, `name`, `description`, `type`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`)
VALUES
	(1,'Authenticated','Default role given to authenticated user.','authenticated','2022-08-10 10:37:14.530000','2022-08-10 10:37:14.530000',NULL,NULL),
	(2,'Public','Default role given to unauthenticated user.','public','2022-08-10 10:37:14.531000','2023-02-02 14:36:51.407000',NULL,NULL);

/*!40000 ALTER TABLE `up_roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table up_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `up_users`;

CREATE TABLE `up_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_users_created_by_id_fk` (`created_by_id`),
  KEY `up_users_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `up_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table up_users_role_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `up_users_role_links`;

CREATE TABLE `up_users_role_links` (
  `user_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `up_users_role_links_unique` (`user_id`,`role_id`),
  KEY `up_users_role_links_fk` (`user_id`),
  KEY `up_users_role_links_inv_fk` (`role_id`),
  KEY `up_users_role_links_order_inv_fk` (`user_order`),
  CONSTRAINT `up_users_role_links_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `up_users_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `up_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table upload_folders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `upload_folders`;

CREATE TABLE `upload_folders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `path_id` int(11) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `upload_folders_path_id_index` (`path_id`),
  UNIQUE KEY `upload_folders_path_index` (`path`),
  KEY `upload_folders_created_by_id_fk` (`created_by_id`),
  KEY `upload_folders_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `upload_folders_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `upload_folders_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `upload_folders` WRITE;
/*!40000 ALTER TABLE `upload_folders` DISABLE KEYS */;

INSERT INTO `upload_folders` (`id`, `name`, `path_id`, `path`, `created_at`, `updated_at`, `created_by_id`, `updated_by_id`)
VALUES
	(2,'Pozadia',1,'/1','2022-08-11 17:07:57.254000','2022-08-11 17:08:41.945000',1,1),
	(3,'Články',2,'/2','2022-08-11 17:08:21.033000','2022-08-11 17:08:31.879000',1,1);

/*!40000 ALTER TABLE `upload_folders` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table upload_folders_parent_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `upload_folders_parent_links`;

CREATE TABLE `upload_folders_parent_links` (
  `folder_id` int(10) unsigned DEFAULT NULL,
  `inv_folder_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `folder_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `upload_folders_parent_links_unique` (`folder_id`,`inv_folder_id`),
  KEY `upload_folders_parent_links_fk` (`folder_id`),
  KEY `upload_folders_parent_links_inv_fk` (`inv_folder_id`),
  KEY `upload_folders_parent_links_order_inv_fk` (`folder_order`),
  CONSTRAINT `upload_folders_parent_links_fk` FOREIGN KEY (`folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `upload_folders_parent_links_inv_fk` FOREIGN KEY (`inv_folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table web_settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `web_settings`;

CREATE TABLE `web_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gtm_code` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `pinterest` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `mail_from` varchar(255) DEFAULT NULL,
  `mail_to` varchar(255) DEFAULT NULL,
  `mail_subject` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `vuid` varchar(255) DEFAULT NULL,
  `version_number` int(11) DEFAULT NULL,
  `is_visible_in_list_view` tinyint(1) DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `web_settings_created_by_id_fk` (`created_by_id`),
  KEY `web_settings_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `web_settings_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `web_settings_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `web_settings` WRITE;
/*!40000 ALTER TABLE `web_settings` DISABLE KEYS */;

INSERT INTO `web_settings` (`id`, `gtm_code`, `facebook`, `twitter`, `instagram`, `pinterest`, `youtube`, `mail_from`, `mail_to`, `mail_subject`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `vuid`, `version_number`, `is_visible_in_list_view`, `locale`)
VALUES
	(3,'test','https://www.facebook.com','https://www.twitter.com','https://www.instagram.com','https://www.pinterest.com','https://www.youtube.com','test@test.com','test@test.sk','Test emailov','2022-08-11 10:39:31.156000','2022-08-11 15:33:13.388000',NULL,1,1,'a308a805-2bef-499b-9545-1dc74a1627bd',1,0,'cs');

/*!40000 ALTER TABLE `web_settings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table web_settings_article_detail_page_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `web_settings_article_detail_page_links`;

CREATE TABLE `web_settings_article_detail_page_links` (
  `web_setting_id` int(10) unsigned DEFAULT NULL,
  `page_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `web_settings_article_detail_page_links_unique` (`web_setting_id`,`page_id`),
  KEY `web_settings_article_detail_page_links_fk` (`web_setting_id`),
  KEY `web_settings_article_detail_page_links_inv_fk` (`page_id`),
  CONSTRAINT `web_settings_article_detail_page_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `web_settings_article_detail_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `web_settings_article_detail_page_links` WRITE;
/*!40000 ALTER TABLE `web_settings_article_detail_page_links` DISABLE KEYS */;

INSERT INTO `web_settings_article_detail_page_links` (`web_setting_id`, `page_id`, `id`)
VALUES
	(3,9,2);

/*!40000 ALTER TABLE `web_settings_article_detail_page_links` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table web_settings_articles_page_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `web_settings_articles_page_links`;

CREATE TABLE `web_settings_articles_page_links` (
  `web_setting_id` int(10) unsigned DEFAULT NULL,
  `page_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `web_settings_articles_page_links_unique` (`web_setting_id`,`page_id`),
  KEY `web_settings_articles_page_links_fk` (`web_setting_id`),
  KEY `web_settings_articles_page_links_inv_fk` (`page_id`),
  CONSTRAINT `web_settings_articles_page_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `web_settings_articles_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `web_settings_articles_page_links` WRITE;
/*!40000 ALTER TABLE `web_settings_articles_page_links` DISABLE KEYS */;

INSERT INTO `web_settings_articles_page_links` (`web_setting_id`, `page_id`, `id`)
VALUES
	(3,8,2);

/*!40000 ALTER TABLE `web_settings_articles_page_links` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table web_settings_components
# ------------------------------------------------------------

DROP TABLE IF EXISTS `web_settings_components`;

CREATE TABLE `web_settings_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` int(10) unsigned DEFAULT NULL,
  `component_id` int(10) unsigned DEFAULT NULL,
  `component_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `web_settings_unique` (`entity_id`,`component_id`,`field`,`component_type`),
  KEY `web_settings_field_index` (`field`),
  KEY `web_settings_component_type_index` (`component_type`),
  KEY `web_settings_entity_fk` (`entity_id`),
  CONSTRAINT `web_settings_entity_fk` FOREIGN KEY (`entity_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `web_settings_components` WRITE;
/*!40000 ALTER TABLE `web_settings_components` DISABLE KEYS */;

INSERT INTO `web_settings_components` (`id`, `entity_id`, `component_id`, `component_type`, `field`, `order`)
VALUES
	(10,3,21,'shared.seo','seo',1);

/*!40000 ALTER TABLE `web_settings_components` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table web_settings_footer_menu_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `web_settings_footer_menu_links`;

CREATE TABLE `web_settings_footer_menu_links` (
  `web_setting_id` int(10) unsigned DEFAULT NULL,
  `menu_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `web_settings_footer_menu_links_unique` (`web_setting_id`,`menu_id`),
  KEY `web_settings_footer_menu_links_fk` (`web_setting_id`),
  KEY `web_settings_footer_menu_links_inv_fk` (`menu_id`),
  CONSTRAINT `web_settings_footer_menu_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `web_settings_footer_menu_links_inv_fk` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `web_settings_footer_menu_links` WRITE;
/*!40000 ALTER TABLE `web_settings_footer_menu_links` DISABLE KEYS */;

INSERT INTO `web_settings_footer_menu_links` (`web_setting_id`, `menu_id`, `id`)
VALUES
	(3,4,2);

/*!40000 ALTER TABLE `web_settings_footer_menu_links` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table web_settings_home_page_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `web_settings_home_page_links`;

CREATE TABLE `web_settings_home_page_links` (
  `web_setting_id` int(10) unsigned DEFAULT NULL,
  `page_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `web_settings_home_page_links_unique` (`web_setting_id`,`page_id`),
  KEY `web_settings_home_page_links_fk` (`web_setting_id`),
  KEY `web_settings_home_page_links_inv_fk` (`page_id`),
  CONSTRAINT `web_settings_home_page_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `web_settings_home_page_links_inv_fk` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `web_settings_home_page_links` WRITE;
/*!40000 ALTER TABLE `web_settings_home_page_links` DISABLE KEYS */;

INSERT INTO `web_settings_home_page_links` (`web_setting_id`, `page_id`, `id`)
VALUES
	(3,10,2);

/*!40000 ALTER TABLE `web_settings_home_page_links` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table web_settings_localizations_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `web_settings_localizations_links`;

CREATE TABLE `web_settings_localizations_links` (
  `web_setting_id` int(10) unsigned DEFAULT NULL,
  `inv_web_setting_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `web_setting_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `web_settings_localizations_links_unique` (`web_setting_id`,`inv_web_setting_id`),
  KEY `web_settings_localizations_links_fk` (`web_setting_id`),
  KEY `web_settings_localizations_links_inv_fk` (`inv_web_setting_id`),
  KEY `web_settings_localizations_links_order_fk` (`web_setting_order`),
  CONSTRAINT `web_settings_localizations_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `web_settings_localizations_links_inv_fk` FOREIGN KEY (`inv_web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table web_settings_main_menu_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `web_settings_main_menu_links`;

CREATE TABLE `web_settings_main_menu_links` (
  `web_setting_id` int(10) unsigned DEFAULT NULL,
  `menu_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `web_settings_main_menu_links_unique` (`web_setting_id`,`menu_id`),
  KEY `web_settings_main_menu_links_fk` (`web_setting_id`),
  KEY `web_settings_main_menu_links_inv_fk` (`menu_id`),
  CONSTRAINT `web_settings_main_menu_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `web_settings_main_menu_links_inv_fk` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `web_settings_main_menu_links` WRITE;
/*!40000 ALTER TABLE `web_settings_main_menu_links` DISABLE KEYS */;

INSERT INTO `web_settings_main_menu_links` (`web_setting_id`, `menu_id`, `id`)
VALUES
	(3,3,2);

/*!40000 ALTER TABLE `web_settings_main_menu_links` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table web_settings_versions_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `web_settings_versions_links`;

CREATE TABLE `web_settings_versions_links` (
  `web_setting_id` int(10) unsigned DEFAULT NULL,
  `inv_web_setting_id` int(10) unsigned DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `web_setting_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `web_settings_versions_links_unique` (`web_setting_id`,`inv_web_setting_id`),
  KEY `web_settings_versions_links_fk` (`web_setting_id`),
  KEY `web_settings_versions_links_inv_fk` (`inv_web_setting_id`),
  KEY `web_settings_versions_links_order_fk` (`web_setting_order`),
  CONSTRAINT `web_settings_versions_links_fk` FOREIGN KEY (`web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `web_settings_versions_links_inv_fk` FOREIGN KEY (`inv_web_setting_id`) REFERENCES `web_settings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
