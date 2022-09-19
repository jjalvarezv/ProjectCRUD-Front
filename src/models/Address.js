export const Address = (
    addressLine1,
    addressLine2,
    city,
    stateProvince,
    country,
    postalCode
) => {
   return {
        "addressLine1": addressLine1,
        "addressLine2": addressLine2,
        "city": city,
        "stateProvince": stateProvince,
        "countryRegion": country,
        "postalCode": postalCode
   }
}