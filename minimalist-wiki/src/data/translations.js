import wiki from "./wiki.json";

export function getTranslator(languageId) {
  const defaultLanguage = wiki.generic.defaultLanguage;

  const selectedTranslations = wiki.generic.translations.find(
    (item) => item.languageId === languageId,
  );

  const fallbackTranslations = wiki.generic.translations.find(
    (item) => item.languageId === defaultLanguage,
  );

  const language = selectedTranslations ?? fallbackTranslations;

  function translate(id, variables = {}) {
    const selectedText = language?.staticText.find(
      (item) => item.id === id,
    )?.text;

    const fallbackText = fallbackTranslations?.staticText.find(
      (item) => item.id === id,
    )?.text;

    let text = selectedText ?? fallbackText ?? id;

    Object.entries(variables).forEach(([key, value]) => {
      text = text.replaceAll(`{${key}}`, String(value));
    });

    return text;
  }

  function translateCategory(categoryId) {
    const selectedText = language?.categories.find(
      (item) => item.id === categoryId,
    )?.text;

    const fallbackText = fallbackTranslations?.categories.find(
      (item) => item.id === categoryId,
    )?.text;

    return selectedText ?? fallbackText ?? categoryId;
  }

  return {
    t: translate,
    category: translateCategory,
    languageName: language?.languageName ?? defaultLanguage,
    flag: language?.flag ?? "🌐",
  };
}
