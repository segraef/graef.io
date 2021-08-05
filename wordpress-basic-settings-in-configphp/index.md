# Wordpress Basic Settings in config.php


The main configuration of WordPress is handled by wp-config.php which is responsible for database access, language, API keys, security and more. Anything changed in this file takes direct influence to your site’s settings and appearance.
Settings set in wp-config.php are considered as global and overwrite all parameters in your admin panel.

#### General

```php
define('WP_HOME', 'https://www.graef.io'); // Main URL
define('WP_SITEURL', 'https://www.graef.io'); // Site URL
```

#### Deactivate Automatic Updates

```php
define( 'AUTOMATIC_UPDATER_DISABLED', true );
```

#### Disable Filter for Uploads

```php
define( 'ALLOW_UNFILTERED_UPLOADS', true );
```

#### Automatically Empty Recycle Bin

```php
define ('EMPTY_TRASH_DAYS', 7);
define ('EMPTY_TRASH_DAYS', 0);
```

#### Deactivate Editor for Themes and Plugins

```php
define( 'DISALLOW_FILE_EDIT', true );
```

#### Set Default Theme for WordPress

```phph
define( 'WP_DEFAULT_THEME', 'default-theme-folder-name' );
```
