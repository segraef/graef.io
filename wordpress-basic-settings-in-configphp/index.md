# Wordpress Basic Settings in config.php


The main configuration of WordPress is handled by wp-config.php which is responsible for database access, language, API keys, security and more. Anything changed in this file takes direct influence to your site’s settings and appearance.
Settings set in wp-config.php are considered as global and overwrite all parameters in your admin panel.

#### General

```
define('WP_HOME', 'https://www.graef.io'); // Main URL
define('WP_SITEURL', 'https://www.graef.io'); // Site URL
```

#### Deactivate Automatic Updates

```
define( 'AUTOMATIC_UPDATER_DISABLED', true );
```

#### Disable Filter for Uploads

```
define( 'ALLOW_UNFILTERED_UPLOADS', true );
```

#### Automatically Empty Recycle Bin<

```
define ('EMPTY_TRASH_DAYS', 7);
define ('EMPTY_TRASH_DAYS', 0);
```

#### Deactivate Editor for Themes and Plugins

```
define( 'DISALLOW_FILE_EDIT', true );
```

#### Set Default Theme for WordPress

```
define( 'WP_DEFAULT_THEME', 'default-theme-folder-name' );
```
