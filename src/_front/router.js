import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"15ee1760-0aa6-4538-bf60-e135314b4ba9","homePageId":"a08e0039-7c10-4123-a559-19dda912bf30","authPluginId":null,"baseTag":{},"defaultTheme":"dark","langs":[{"lang":"en","default":true}],"background":{},"workflows":[],"pages":[{"id":"1d726752-54dc-469f-b7fc-bd6a862c1d10","linkId":"1d726752-54dc-469f-b7fc-bd6a862c1d10","name":"loopfox","folder":"project/","paths":{"en":"project/loopfox","default":"project/loopfox"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"5406d702-f5ea-4df1-9c14-53dc4ad9be41","sectionTitle":"header","linkId":"0b8024a7-cf02-433d-81f5-4a7e1fb455ba"},{"uid":"25a75c35-e9b3-4e7b-a538-9fb08d9a9b29","sectionTitle":"Section","linkId":"3bab56f2-3f3f-4ecb-8699-c2cbc7854907"},{"uid":"de86838c-4e91-40c8-8749-d19c269f344e","sectionTitle":"footer","linkId":"099a0739-3c69-451a-ad00-d8afb0a36a56"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"a08e0039-7c10-4123-a559-19dda912bf30","linkId":"a08e0039-7c10-4123-a559-19dda912bf30","name":"Home","folder":null,"paths":{"en":"home","default":"home"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"5406d702-f5ea-4df1-9c14-53dc4ad9be41","sectionTitle":"header","linkId":"0b8024a7-cf02-433d-81f5-4a7e1fb455ba"},{"uid":"77b10a97-a9b8-4b8a-800d-17c2e53f9021","sectionTitle":"body","linkId":"49bc946c-e67d-478e-a7f8-0614db5a6c88"},{"uid":"de86838c-4e91-40c8-8749-d19c269f344e","sectionTitle":"footer","linkId":"099a0739-3c69-451a-ad00-d8afb0a36a56"}],"pageUserGroups":[],"title":{"en":"Karl Myrvang – Product Developer","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{"en":"Designing and developing apps using design, low-code tools and plenty of boxes and arrows. I enjoy tinkering and building applications to satisfy my own creative hunger. Currently working as a Lead Product Experience Engineer at Heimstaden. "},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"public/images/opengraph.png?_wwcv=1"},{"id":"d7b761f2-fd7e-4e9a-ac67-4493838091c9","linkId":"d7b761f2-fd7e-4e9a-ac67-4493838091c9","name":"bitbee","folder":"project/","paths":{"en":"project/bitbee","default":"project/bitbee"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"5406d702-f5ea-4df1-9c14-53dc4ad9be41","sectionTitle":"header","linkId":"0b8024a7-cf02-433d-81f5-4a7e1fb455ba"},{"uid":"ada59d03-917f-4ee2-881f-a7799018ec16","sectionTitle":"Section","linkId":"5aa92e41-703d-44b4-8ff2-3a0595bb7a90"},{"uid":"de86838c-4e91-40c8-8749-d19c269f344e","sectionTitle":"footer","linkId":"099a0739-3c69-451a-ad00-d8afb0a36a56"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"d5fa2faa-88b1-4ea0-9962-73b0afe3e8b2","linkId":"d5fa2faa-88b1-4ea0-9962-73b0afe3e8b2","name":"ency","folder":"project/","paths":{"en":"project/ency","default":"project/ency"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"5406d702-f5ea-4df1-9c14-53dc4ad9be41","sectionTitle":"header","linkId":"0b8024a7-cf02-433d-81f5-4a7e1fb455ba"},{"uid":"807dffd2-3cf9-4552-89a8-8564522b7cc8","sectionTitle":"Section","linkId":"74504ee8-ab7d-4f32-8839-b267746bd7d9"},{"uid":"de86838c-4e91-40c8-8749-d19c269f344e","sectionTitle":"footer","linkId":"099a0739-3c69-451a-ad00-d8afb0a36a56"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 1;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        '-staging.' + (process.env.WW_ENV === 'staging' ? process.env.VUE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(process.env.VUE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
