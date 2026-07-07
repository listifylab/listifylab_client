# Nykaa Listing Generator — Maintenance Guide

Ye system 4 files me split hai taaki naya category, naya column, ya naya
mapping add karna **isolated aur predictable** rahe — kisi ek category ka
code chhedne se doosri category kabhi break nahi honi chahiye.

## File Structure

```
/Generators
  ├── nykaaFieldResolvers.js     → har global header ki value nikalne ka logic (SHARED, sab categories ke liye)
  ├── categoryTemplateStore.js   → uploaded template CSV se category ke dynamic headers memory me store karta hai
  ├── Nykaa_Dresses_Listing.js   → Dresses category ka filter + generate function
  ├── Nykaa_Tops_Listing.js      → Tops category ka filter + generate function (isi pattern se banaya)
  └── index.js                   → registry (NYKAA_GENERATORS) + downloadNykaaListing() entry point
```

---

## 1. Naya COLUMN (header) add karna hai?

Matlab: koi aisa header jo already `NYAKAA_GLOBAL_HEADERS` list me hai (ya
kisi category ke uploaded template me hai), lekin uski value abhi blank
aa rahi hai kyunki resolver nahi bana.

**Sirf 1 file touch karni hai: `nykaaFieldResolvers.js`**

1. `FIELD_RESOLVERS` object khol kar dekho — header ka naam **hoo-ba-hoo**
   (spacing, capitalization, sab kuch) match karna chahiye jaisa CSV me hai.
2. Ek naya entry add karo:

   ```javascript
   'Naya Header Name': ({ f }) => f.naya_field_name || '',
   ```

   - `f` = `product.fields` (DB document ka nested fields object)
   - Agar value ke liye size-wise grading chahiye (jaise Bust/Waist), to
     `gradeFromXsBase(f.xxx_inches_xs, size, GRADE_STEP.xxx)` pattern use karo
   - Agar value ke liye koi mapping function chahiye (jaise color, fabric),
     to pehle `../Mapping/index.js` me check karo koi existing `mapNykaaXxx`
     function hai ya nahi

3. Bas — koi aur file change nahi karni. Ye resolver automatically har us
   category me kaam karega jiske headers me ye column mojood hai.

**Checklist:**

- [ ] Header ka exact naam CSV/template se match kiya
- [ ] `f.field_name` ko actual DB field se match kiya (Style document ke
      `fields` object me console.log karke verify kar lo agar shak ho)
- [ ] Agar grading chahiye, `GRADE_STEP` me increment value set/verify kiya

---

## 2. Nayi MAPPING add/badalni hai?

Matlab: koi field ki raw value (jaise `"Half"`, `"V Neck"`, `"Solid"`) ko
Nykaa ke expected format me convert karna hai (jaise sleeve type,
neck style, color, fabric, season, pattern, occasion).

Ye mappings `../Mapping/index.js` me rehti hain (`mapNykaaFitting`,
`mapNykaaNeckStyle`, `mapNykaaColor`, `mapNykaaFabric`, `mapNykaaSeason`,
`mapNykaaPattern`, `mapNykaaOccasion`).

**Steps:**

1. `Mapping/index.js` khol kar relevant function dhoondo (e.g. `mapNykaaColor`)
2. Us function ke andar lookup table/object me naya key-value pair add karo
3. Agar bilkul naya mapping type chahiye (jo abhi list me nahi hai — jaise
   `mapNykaaSleeveStyle`), to:
   - `Mapping/index.js` me naya function banao aur export karo
   - `nykaaFieldResolvers.js` ke top par import karo
   - Relevant header ke resolver me use karo:
     ```javascript
     Header: ({ f }) => mapNykaaSleeveStyle(f.sleeve_type) || f.sleeve_type || '',
     ```

**Checklist:**

- [ ] Naya mapping function `Mapping/index.js` se export kiya
- [ ] `nykaaFieldResolvers.js` me import karke resolver me wire kiya
- [ ] Fallback (`|| f.raw_value || ''`) rakha taaki unmapped values silently
      raw value dikha dein, crash na ho

---

## 3. Nayi CATEGORY (jaise Jackets, Pants, Shorts) add karni hai?

**4 steps:**

### Step 1 — `Nykaa_<Category>_Listing.js` banao

`Nykaa_Dresses_Listing.js` ko copy karo, naam badlo, aur sirf `.filter(...)`
ke andar wali condition ko is category ke `style_type` values se match karo:

```javascript
import { NYKAA_SIZE_MAPPING } from '../Constants/index.js';
import { downloadCsv } from '../../shared/csvUtils.js';
import { resolveField } from './nykaaFieldResolvers.js';

const generateNykaa<Category>Listing = (selectedData, sizeMap, headers, customMaps) => {
  const sizeMapping = sizeMap || NYKAA_SIZE_MAPPING;
  const sizes = Object.keys(sizeMapping);

  const csvData = selectedData
    .filter((product) => {
      const styleType = product.fields?.style_type?.toLowerCase() || '';
      return styleType === 'xxx' || styleType === 'yyy'; // <-- yahan is category ke style_type values daalo
    })
    .flatMap((product) => {
      const f = product.fields || {};
      return sizes.map((size) => {
        const mappedSize = sizeMapping[size];
        const context = { product, f, size, mappedSize, customMaps };
        const row = {};
        headers.forEach((header) => {
          row[header] = resolveField(header, context);
        });
        return row;
      });
    });

  downloadCsv('Nykaa_<Category>_listing.csv', headers, csvData);
};

export default generateNykaa<Category>Listing;
```

### Step 2 — `index.js` (registry) me entry add karo

```javascript
import generateNykaa<Category>Listing from './Nykaa_<Category>_Listing.js';

export const NYKAA_GENERATORS = {
  Dresses: { /* ... existing ... */ },
  '<Category Display Name>': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateNykaa<Category>Listing(data, sizeMap || NYKAA_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: NYAKAA_GLOBAL_HEADERS,
    filename: 'Nykaa_<Category>_listing.csv',
    filter: '<category-key>',
  },
};

export * from './Nykaa_<Category>_Listing.js';
```

> Registry ki **key** (`'<Category Display Name>'`) exactly wahi string
> honi chahiye jo UI ke category-dropdown se `downloadNykaaListing()` ko
> pass hoti hai — spelling/spacing match zaroor karo.

### Step 3 — Naye headers ke resolvers check karo

Is category ke template me agar koi aisa header hai jo abhi
`FIELD_RESOLVERS` me nahi hai, to **Section 1** ke steps follow karke
`nykaaFieldResolvers.js` me add karo. Existing headers (jo dress me bhi
the) automatically reuse ho jayenge — dobara likhne ki zaroorat nahi.

### Step 4 — Category ka template CSV load karo

```javascript
import { loadCategoryHeaderTemplate } from './categoryTemplateStore.js';

await loadCategoryHeaderTemplate('<Category Display Name>', uploadedTemplateFile);
```

Isse is category ke dynamic (aur sirf usi category ke relevant) headers
memory me store ho jayenge, aur download in headers ko use karega
(`getCategoryHeaders(category) || config.defaultHeaders` fallback ke saath).

**Checklist:**

- [ ] `Nykaa_<Category>_Listing.js` bana kar filter condition set kiya
- [ ] `index.js` registry me entry add kiya (naam UI se match karta hai)
- [ ] Naye/missing headers ke resolvers `nykaaFieldResolvers.js` me add kiye
- [ ] Category ka template CSV upload/load karke test kiya
- [ ] `downloadNykaaListing('<Category>', selectedData)` call karke CSV
      download test kiya — sab columns me sahi values aa rahi hain, koi
      blank cell unexpectedly to nahi

---

## Quick Reference — "Mujhe X karna hai, kya touch karu?"

| Kaam                                                | Kaunsi file(s)                                                                     |
| --------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Existing header ki value blank aa rahi hai          | `nykaaFieldResolvers.js` (resolver add/fix karo)                                   |
| Raw value ko Nykaa format me convert karna hai      | `Mapping/index.js` (+ resolver me wire karo)                                       |
| Bilkul naya column chahiye                          | `nykaaFieldResolvers.js` me naya resolver add karo                                 |
| Nayi category add karni hai                         | `Nykaa_<Category>_Listing.js` (naya) + `index.js` (registry entry)                 |
| Category ka size-wise measurement grading galat hai | `nykaaFieldResolvers.js` ke `GRADE_STEP` object                                    |
| Category ke template headers update karne hain      | `categoryTemplateStore.js` ke `loadCategoryHeaderTemplate()` se dobara upload karo |

---

## Golden Rule

**Dresses (ya kisi bhi existing category) ki file ko kabhi seedha edit mat
karo naya category add karte waqt.** Hamesha copy karke naya file banao.
Shared logic (`nykaaFieldResolvers.js`) hi ek jagah hai jaha change
sab categories ko affect karega — isliye wahan change karte waqt zyada
dhyan se check karo ki existing categories ke liye bhi values sahi
aa rahi hain.
