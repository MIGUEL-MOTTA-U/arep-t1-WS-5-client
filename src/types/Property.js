export const PropertyType = {
  HOUSE: 'HOUSE',
  APARTMENT: 'APARTMENT',
  CONDO: 'CONDO',
  VILLA: 'VILLA',
  TOWNHOUSE: 'TOWNHOUSE'
};

export class PropertyFilters {
  constructor({
    minPrice = null,
    maxPrice = null,
    city = null,
    name = null,
    address = null,
    minAreaSquareMeters = null,
    maxAreaSquareMeters = null,
    type = null
  } = {}) {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.city = city;
    this.name = name;
    this.address = address;
    this.minAreaSquareMeters = minAreaSquareMeters;
    this.maxAreaSquareMeters = maxAreaSquareMeters;
    this.type = type;
  }
}

export class PropertyInDTO {
  constructor({
    address = '',
    city = '',
    active = true,
    price = 0,
    description = '',
    name = '',
    rooms = 0,
    bathrooms = 0,
    parkingLots = 0,
    areaSquareMeters = 0,
    type = PropertyType.HOUSE,
    owner = ''
  } = {}) {
    this.address = address;
    this.city = city;
    this.active = active;
    this.price = price;
    this.description = description;
    this.name = name;
    this.rooms = rooms;
    this.bathrooms = bathrooms;
    this.parkingLots = parkingLots;
    this.areaSquareMeters = areaSquareMeters;
    this.type = type;
    this.owner = owner;
  }
}