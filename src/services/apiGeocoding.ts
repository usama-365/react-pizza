type GetAddressPropsType = {
  latitude: number | string;
  longitude: number | string;
};

export type GeocodingAPIType = {
  locality: string;
  city: string;
  postcode: number;
  countryName: string;
};

export async function getAddress({ latitude, longitude }: GetAddressPropsType) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = (await res.json()) as GeocodingAPIType;
  return data;
}
