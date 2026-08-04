import { settingsDefault } from 'app/default/settings';

// settingsDefault.config.native_app_images_url = '{{ proto }}://{{ host }}';

settingsDefault.config.sockets.host = '{{ host }}';
settingsDefault.config.sockets.key = 'main';

settingsDefault.config.api_keys.google_maps = '';
settingsDefault.config.api_keys.open_ai = '';
settingsDefault.config.api_keys.onesignal = '';
settingsDefault.config.api_keys.mapbox = '';

settingsDefault.layout.use_splash_page = true

settingsDefault.auth = {
    enabled: false,
    google: false,
    github: false,
    linkedin: false,
    x: false,
    passkey: false,
    saml: false,
};

settingsDefault.menu_items.menu_navbar = [
    { name: 'home', title: 'Home', link: '/', icon: 'House' },
    { name: 'about', title: 'About', link: '/about', icon: 'Info'},

];

export const settings = settingsDefault;