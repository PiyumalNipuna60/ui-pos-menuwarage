import { createI18n } from "vue-i18n";

const localeModules = {
  en: import.meta.glob("./locales/en/*.json"),
  si: import.meta.glob("./locales/si/*.json"),
  ta: import.meta.glob("./locales/ta/*.json"),
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: localeModules,
});

export async function loadLocaleMessages(locale) {
  const modules = localeModules[locale];
  const messages = {};

  for (const path in modules) {
    const key = path.match(/\/([\w-]+)\.json$/)[1];
    messages[key] = (await modules[path]()).default;
  }

  i18n.global.setLocaleMessage(locale, messages);
}

export default i18n;
