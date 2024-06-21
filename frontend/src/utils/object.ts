export function isObjectEmpty(obj: object) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function convertFormDataToObject(formData: FormData) {
  let formObject: Record<string, FormDataEntryValue | FormDataEntryValue[]> =
    {};

  formData.forEach((value, key) => {
    if (!Reflect.has(formObject, key)) {
      formObject[key] = value;
      return;
    }

    if (!Array.isArray(formObject[key])) {
      formObject[key] = [formObject[key] as FormDataEntryValue];
    }

    (formObject[key] as FormDataEntryValue[]).push(value);
  });

  return formObject;
}
