import { instance } from "./functions";

// function to create new address
export const addAddress = (
  country: string,
  state: string,
  countryCode: string,
  fullName: string,
  mobile: string,
  pinCode: string,
  address1: string,
  address2: string,
  landmark: string,
  city: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  defaultAddress: string
) => {
  setIsLoading(true);
  const mobileNumber = `${countryCode}-${mobile}`;

  instance
    .post("/address/add", {
      country,
      state,
      mobileNumber,
      fullName,
      defaultAddress,
      pinCode,
      address1,
      address2,
      landmark,
      city,
    })
    .then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
        location.href = "/user/addresses";
      }
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
};

// function to edit the existing address in the database
export const editAddress = (
  country: string,
  state: string,
  countryCode: string,
  fullName: string,
  mobile: string,
  pinCode: string,
  address1: string,
  address2: string,
  landmark: string,
  city: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  defaultAddress: string,
  id: string
) => {
  setIsLoading(true);
  const mobileNumber = `${countryCode}-${mobile}`;

  instance
    .put(`/address/edit/${id}`, {
      country,
      state,
      mobileNumber,
      fullName,
      defaultAddress,
      pinCode,
      address1,
      address2,
      landmark,
      city,
    })
    .then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
        location.href = "/user/addresses";
      }
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
};
interface countryType {
  id: Number;
  name: String;
  iso2: String;
}
// function to get the countries names
export const getCountriesList = (
  setCountriesList: React.Dispatch<
    React.SetStateAction<countryType[] | undefined>
  >
) => {
  instance
    .get("/address/countries")
    .then((response) => {
      setCountriesList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
// function to get the states names of the specific country

export const getStatesList = (
  setStatesList: React.Dispatch<
    React.SetStateAction<countryType[] | undefined>
  >,
  countrySymbol: string
) => {
  instance
    .get(`/address/states/${countrySymbol}`)
    .then((response) => {
      setStatesList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// function to get the phone code of the specific country
export const getCountryPhoneCode = (
  setCountryPhoneCode: React.Dispatch<React.SetStateAction<string>>,
  countrySymbol: string
) => {
  instance
    .get(`/address/countries/${countrySymbol}`)
    .then((response) => {
      setCountryPhoneCode(`+${response.data.phonecode}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

//function to handle the change in the country input
export const handleCountryChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  countriesList: countryType[] | undefined,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  setCountrySymbol: React.Dispatch<React.SetStateAction<string>>,
  setStatesList: React.Dispatch<
    React.SetStateAction<countryType[] | undefined>
  >,
  setCountryPhoneCode: React.Dispatch<React.SetStateAction<string>>
) => {
  const country = countriesList?.find((item) => {
    if (item.name === e.target.value) {
      return item;
    }
  });
  const countrySymbol = `${country?.iso2}`;
  setCountry(e.target.value);
  setCountrySymbol(countrySymbol);
  getStatesList(setStatesList, countrySymbol);
  getCountryPhoneCode(setCountryPhoneCode, countrySymbol);
};

// function to get the cities names using state and country
export const getCitiesNamesList = (
  stateSymbol: string,
  countrySymbol: string,
  setCitiesList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  let cityArray = [""];
  instance
    .get(`/address/cities/${stateSymbol}/${countrySymbol}`)
    .then((response) => {
      response.data.forEach((element: { name: string }) => {
        cityArray.push(element.name);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  setCitiesList(cityArray);
};

//handles the changes in the state input
export const handleStateChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setState: React.Dispatch<React.SetStateAction<string>>,
  statesList: countryType[] | undefined,
  setStateSymbol: React.Dispatch<React.SetStateAction<string>>,
  countrySymbol: string,
  setCitiesList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setState(e.target.value);
  const StateC = statesList?.find((item) => {
    if (item.name === e.target.value) {
      return item;
    }
  });
  const stateSymbol = `${StateC?.iso2}`;
  setStateSymbol(stateSymbol);
  getCitiesNamesList(stateSymbol, countrySymbol, setCitiesList);
};

// function to delete the address using id
export const deleteAddress = (id: string) => {
  instance
    .delete(`/address/delete/${id}`)
    .then((response) => {
      if (response.status === 200) {
        location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// function to set default  the address using id
export const setAddressDefault = (id: string) => {
  instance
    .get(`/address/default/${id}`)
    .then((response) => {
      if (response.status === 200) {
        location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// function to fetch all the address using UserId
export const fetchUserAddress = async () => {
  try {
    const res = await instance.get("/address/");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// function to fetch the address using Id
export const getSpecificAddress = (
  id: string,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  setState: React.Dispatch<React.SetStateAction<string>>,
  setCountryPhoneCode: React.Dispatch<React.SetStateAction<string>>,
  setFullName: React.Dispatch<React.SetStateAction<string>>,
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>,
  setPinCode: React.Dispatch<React.SetStateAction<string>>,
  setAddress1: React.Dispatch<React.SetStateAction<string>>,
  setAddress2: React.Dispatch<React.SetStateAction<string>>,
  setLandmark: React.Dispatch<React.SetStateAction<string>>,
  setCity: React.Dispatch<React.SetStateAction<string>>,
  setDefaultAddress: React.Dispatch<React.SetStateAction<string>>
) => {
  instance
    .get(`/address/${id}`)
    .then((response) => {
      const mobile = response.data.mobileNumber.split("-");
      setCountry(response.data.country);
      setCity(response.data.city);
      setFullName(response.data.fullName);
      setLandmark(response.data.landmark);
      setAddress1(response.data.address1);
      setAddress2(response.data.address2);
      setCountryPhoneCode(mobile[0]);
      setMobileNumber(mobile[1]);
      setPinCode(response.data.pinCode);
      setState(response.data.state);
    })
    .catch((error) => {
      console.log(error);
    });
};
