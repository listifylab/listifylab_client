import Papa from 'papaparse';

// category (lowercase) -> ordered header list, as uploaded in that
// category's template CSV (single "Headers" column, one per row --
// same shape as STYLES_SAMPLE_TEMPLATE.csv).
const categoryHeaderStore = new Map();

export const setCategoryHeaders = (category, headers) => {
  categoryHeaderStore.set(category.toLowerCase().trim(), headers);
};

export const getCategoryHeaders = (category) =>
  categoryHeaderStore.get(category.toLowerCase().trim()) || null;

export const hasCategoryHeaders = (category) =>
  categoryHeaderStore.has(category.toLowerCase().trim());

export const listLoadedCategories = () => [...categoryHeaderStore.keys()];

// Call this once when the user uploads a category's template file
// (e.g. dress template, tops template, jacket template...).
// Example: loadCategoryHeaderTemplate('tops', uploadedFile)
export const loadCategoryHeaderTemplate = (category, file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.data.map((row) => row['Headers']?.trim()).filter(Boolean);

        if (headers.length === 0) {
          reject(new Error(`No headers found in template for "${category}".`));
          return;
        }

        setCategoryHeaders(category, headers);
        resolve(headers);
      },
      error: reject,
    });
  });
};
