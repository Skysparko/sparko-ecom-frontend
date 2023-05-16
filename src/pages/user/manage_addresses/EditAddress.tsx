import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useEffect } from "react";
import { instance } from "../../../utils/functions";
import axios from "axios";
import {
  addAddress,
  editAddress,
  getCountriesList,
  getSpecificAddress,
  getStatesList,
  handleCountryChange,
  handleStateChange,
} from "../../../utils/address.functions";
import { Hint } from "react-autocomplete-hint";
import { useSelector } from "react-redux";

interface countryType {
  id: Number;
  name: String;
  iso2: String;
}

export default function AddAddress() {
  //loading state

  const [isLoading, setIsLoading] = useState(false);
  //country api lists

  const [countriesList, setCountriesList] = useState<Array<countryType>>();
  const [statesList, setStatesList] = useState<Array<countryType>>();
  const [citiesList, setCitiesList] = useState([""]);

  //form States
  const [country, setCountry] = useState("India");
  const [countrySymbol, setCountrySymbol] = useState("IN");
  const [stateSymbol, setStateSymbol] = useState("");
  const [state, setState] = useState("");
  const [countryPhoneCode, setCountryPhoneCode] = useState("+91");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("false");
  const [showDefaultAddress, setShowDefaultAddress] = useState(true);
  const [addressID, setAddressID] = useState("");

  const user = useSelector(
    (state: {
      user: {
        email: string;
        isAuthenticated: boolean;
        name: string;
        gender: string;
        role: string;
        id: string;
        pfp: string;
        address: string;
      };
    }) => state.user
  );
  useEffect(() => {
    const addressId = new URLSearchParams(window.location.search).get(
      "address"
    )!;
    //if the url have the address id then using this logic we get all the data and place it in the fields
    if (addressId) {
      setAddressID(addressId);
      if (addressId === user.address) {
        setShowDefaultAddress(false);
      }
      getSpecificAddress(
        addressId,
        setCountry,
        setState,
        setCountryPhoneCode,
        setFullName,
        setMobileNumber,
        setPinCode,
        setAddress1,
        setAddress2,
        setLandmark,
        setCity,
        setDefaultAddress
      );
    }
    // getting all the countries

    getCountriesList(setCountriesList);
    //getting all the states of the given country by default it is set to the india

    getStatesList(setStatesList, countrySymbol);
  }, []);

  return (
    // this section is for adding the new addresses

    <div className="flex flex-col gap-10 py-10 px-5  max-xs:text-sm max-vxs:px-2">
      {/* heading for the form */}

      <h1 className="m-auto text-3xl font-semibold max-xs:text-2xl ">
        Edit address
      </h1>
      {/* a address form  */}

      <form
        className=" m-auto flex flex-col gap-5 max-vs:w-[95%] "
        onSubmit={(e) => {
          e.preventDefault();
          editAddress(
            country,
            state,
            countryPhoneCode,
            fullName,
            mobile,
            pinCode,
            address1,
            address2,
            landmark,
            city,
            setIsLoading,
            defaultAddress,
            addressID
          );
        }}
      >
        {/* this section contain label and select dropdown for countries */}

        <span className=" flex flex-col">
          <label htmlFor="country">Country/Region</label>
          <select
            name="country"
            id="country"
            className="rounded border border-gray-500 
            p-2 shadow-sm"
            onChange={(e) =>
              handleCountryChange(
                e,
                countriesList,
                setCountry,
                setCountrySymbol,
                setStatesList,
                setCountryPhoneCode
              )
            }
            value={country}
          >
            {/* logic for populating the countries as options */}

            {countriesList?.map((item) => (
              <option key={`${item.id}`}>{item.name}</option>
            ))}
          </select>
        </span>
        {/* name section */}

        <span className="flex flex-col ">
          <label htmlFor="full_name">Full name</label>
          <input
            type="text"
            id="full_name"
            className="rounded border border-gray-500 p-2
            shadow-inner"
            defaultValue={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </span>
        {/* mobile number section containing two input one for country phone code and second for mobile number */}
        <span className="flex flex-col ">
          <label htmlFor="mobile_number">Mobile number</label>
          <span className=" flex gap-1">
            {/* country phone code input  */}

            <input
              type="tel"
              name="country_code"
              id="country_code"
              readOnly
              value={countryPhoneCode}
              required
              className="w-16 rounded border border-gray-500 p-2
              shadow-inner max-vs:w-14"
            />
            {/* mobile number input */}

            <input
              type="number"
              id="mobile_number"
              defaultValue={mobile}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="flex-grow rounded border border-gray-500
            p-2 shadow-inner max-vs:w-[90%] max-vs:flex-shrink max-vs:flex-grow-0"
            />
          </span>
        </span>
        {/* pin code section containing label and input field  */}

        <span className="flex flex-col ">
          <label htmlFor="pin_code">Pin code</label>
          <input
            type="number"
            id="pin_code"
            defaultValue={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            required
            className="rounded border border-gray-500 p-2
            shadow-inner"
          />
        </span>
        {/* address1 section containing label and input field  */}

        <span className="flex flex-col ">
          <label htmlFor="address_part_1">
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            type="text"
            id="address_part_1"
            onChange={(e) => setAddress1(e.target.value)}
            required
            defaultValue={address1}
            className="rounded border border-gray-500 p-2
            shadow-inner"
          />
        </span>
        {/* address2 section containing label and input field  */}

        <span className="flex flex-col ">
          <label htmlFor="address_part_2">Area, Street, Sector, Village</label>
          <input
            type="text"
            id="address_part_2"
            onChange={(e) => setAddress2(e.target.value)}
            required
            defaultValue={address2}
            className="rounded border border-gray-500 p-2
            shadow-inner"
          />
        </span>
        {/* landmark section containing label and input field  */}

        <span className="flex flex-col ">
          <label htmlFor="landmark">Landmark</label>
          <input
            type="text"
            id="landmark"
            onChange={(e) => setLandmark(e.target.value)}
            required
            defaultValue={landmark}
            className="rounded border border-gray-500 p-2
            shadow-inner"
          />
        </span>
        {/* town section containing label and input field  */}

        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 max-sm:grid-rows-2 ">
          <span className="flex flex-col">
            <label htmlFor="town">Town/City</label>
            <Hint options={citiesList} allowTabFill>
              <input
                type="text"
                id="town"
                defaultValue={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-[100%] rounded border border-gray-500
              p-2 shadow-inner "
              />
            </Hint>
          </span>
          {/* state section containing label and select field */}

          <span className=" flex flex-col">
            <label htmlFor="state">State</label>
            <select
              id="state"
              className="rounded border border-gray-500 p-[0.610rem]
            shadow-inner"
              value={state}
              onChange={(e) =>
                handleStateChange(
                  e,
                  setState,
                  statesList,
                  setStateSymbol,
                  countrySymbol,
                  setCitiesList
                )
              }
              required
            >
              {/* default option but user cannot select it  */}

              <option value="" disabled>
                --Select state--
              </option>
              {/* logic for populating states options */}

              {statesList?.map((item) => (
                <option key={`${item.id}`}>{item.name}</option>
              ))}
            </select>
          </span>
        </div>
        {/* this section contain a checkbox and label and only show if the address is not default*/}

        {showDefaultAddress && (
          <span className="flex gap-2">
            <input
              type="checkbox"
              id="default_address"
              onChange={(e) => setDefaultAddress(`${e.target.checked}`)}
            />
            <label htmlFor="default_address">
              Make this my default address
            </label>
          </span>
        )}
        {/* edit address button and loading while the req is running */}

        <button className="m-auto flex w-44 justify-center rounded bg-sky-800 p-2 text-base text-white">
          {isLoading ? (
            <TailSpin
              height="24"
              width="24"
              color="#ffffff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <>Save changes</>
          )}
        </button>
      </form>
    </div>
  );
}
