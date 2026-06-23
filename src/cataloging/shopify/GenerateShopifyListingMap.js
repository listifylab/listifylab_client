import Papa from "papaparse";
import { SHOPIFY_HEADERS } from "../../constants/shopify/shopifyConstants";
import { SIZE_MAPPING } from "../../constants";

const generateShopifyListing = (selectedData) => {
  
  const sizes = Object.keys(SIZE_MAPPING); // ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL", "XXXXXL"]

  const csvData = selectedData.flatMap((product) =>
    sizes.map((size) => {
        const mappedSize = SIZE_MAPPING[size]; // Convert size to 2XL, 3XL, etc.
        // console.clear("product.fieldss",selectedData)
        

      return {
        Handle: product.fields.style_name?.trim().toLowerCase().replace(/\s+/g, "-"),
        Command: "MERGE",
        Title: product.fields.style_name || "",
        "Body HTML": product.fields.description || "",
        Vendor: "Qurvii",
        Type: product.fields.style_type,
        Tags: `Qurvii Women, ${product.fields.color}, ${product.fields.pattern}, women's fashion, casual wear, women's clothing, ${product.fields.style_type}, New Arrivals , New Arrival`,

        "Tags Command": "",
        Status: "active",
        Published: true,
        "Published At": "",
        "Published Scope": "",
        "Template Suffix": "",
        "Gift Card": "",
        "Category: ID": "",
        "Category: Name": "",
        Category: "",
        "Custom Collections": "",
        "Image Attachment": "",
        "Image Src": "",
        "Image Command": "",
        "Image Position": "",
        "Title 1": product.fields.style_name || "",
        "Variant ID": "",
        "Variant Command": "",
        "Option1 Name": "SIZE",
        "Option1 Value": mappedSize || "",
        "Option2 Name": "",
        "Option2 Value": "",
        "Option3 Name": "",
        "Option3 Value": "",
        "Variant Generate From Options": "",
        "Variant Position": "",
        "Variant SKU": `${product.styleNumber}-${product.fields.style_primary_color}-${mappedSize}`,
        "Variant Weight": 0,
        "Variant Weight Unit": "g",
        "Variant HS Code": "",
        "Variant Country of Origin": "India",
        "Variant Province of Origin": "",
        "Variant Price": product.fields.mrp,
        "Variant Compare At Price": product.fields.mrp,
        "Variant Cost": "",
        "Variant Requires Shipping": true,
        "Variant Taxable": true,
        "Variant Tax Code": "",
        "Variant Barcode": "",
        "Variant Image": "",
        "Variant Inventory Tracker": "shopify",
        "Variant Inventory Policy": "deny",
        "Variant Fulfillment Service": "manual",
        "Variant Inventory Qty": 6,
        "Variant Inventory Adjust": 0,
        "Metafield:custom.fabric [string]": product.fields.fabric,
        "Metafield:custom.pattern [string]": product.fields.pattern,
        "Metafield:custom.fit [string]": product.fields.fit,
        "Metafield:custom.sleeve [string]": product.fields.sleeve_length_type,
        "Metafield:custom.lining [string]": product.fields?.lining || "",
        "Metafield:custom.wash_care [string]": product.fields.care_instruction,
        "Metafield:custom.transparency [string]": product.fields?.transparency || "",
        "Metafield:custom.closure [string]": product.fields?.closure || "",
      };
    })
  );

  const csv = Papa.unparse({
    fields: SHOPIFY_HEADERS,
    data: csvData,
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Shopify_Listing.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export { generateShopifyListing };