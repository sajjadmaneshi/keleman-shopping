export interface UserAddressViewModel {
  id: number;
  addressText: string;
  postalCode: string;
  receiverName: string;
  receiverPhone: string;
  isDefault: boolean;
  latitude: number;
  longitude: number;
  city: {
    id: number;
    title: string;
    province: {
      id: number;
      title: string;
    };
  };

  iamReceiver: boolean;
}
