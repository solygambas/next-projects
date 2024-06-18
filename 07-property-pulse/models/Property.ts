import { ObjectId as BSONObjectId } from "bson";
import { Schema, model, models } from "mongoose";

type Location = {
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
};

type Rates = {
  nightly: number;
  weekly: number;
  monthly: number;
};

type SellerInfo = {
  name?: string;
  email?: string;
  phone?: string;
};

export interface BasePropertyInterface {
  name: string;
  type: string;
  description?: string;
  location: Location;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
}

export interface PropertyFormInterface extends BasePropertyInterface {
  images: File[];
}

export interface PropertyAPIInterface extends BasePropertyInterface {
  owner: BSONObjectId;
  is_featured: boolean;
  images: string[];
}

export interface PropertyInterface extends PropertyAPIInterface {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProperties {
  properties: PropertyInterface[];
  total: number;
}

const PropertySchema = new Schema<PropertyAPIInterface>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    beds: {
      type: Number,
      required: [true, "Beds is required"],
    },
    baths: {
      type: Number,
      required: [true, "Baths is required"],
    },
    square_feet: {
      type: Number,
      required: [true, "Square feet is required"],
    },
    amenities: {
      type: [String],
    },
    rates: {
      nightly: {
        type: Number,
      },
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: {
      type: [String],
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Property =
  models.Property<PropertyAPIInterface> ||
  model<PropertyAPIInterface>("Property", PropertySchema);

export default Property;
