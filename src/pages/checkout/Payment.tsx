import React, { useRef, useState } from "react";

type Props = {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  price: number;
  itemCount: number;
};
function showCardForm() {
  const cardForm: HTMLSpanElement = document.querySelector("#cardForm")!;
  const upiForm: HTMLSpanElement = document.querySelector("#upiForm")!;

  cardForm.classList.remove("hidden");
  !upiForm.classList.contains("hidden") && upiForm.classList.add("hidden");
}

function showUpiForm() {
  const cardForm: HTMLSpanElement = document.querySelector("#cardForm")!;
  const upiForm: HTMLSpanElement = document.querySelector("#upiForm")!;
  upiForm.classList.remove("hidden");
  !cardForm.classList.contains("hidden") && cardForm.classList.add("hidden");
}

function showCod() {
  const cardForm: HTMLSpanElement = document.querySelector("#cardForm")!;
  const upiForm: HTMLSpanElement = document.querySelector("#upiForm")!;
  !cardForm.classList.contains("hidden") && cardForm.classList.add("hidden");
  !upiForm.classList.contains("hidden") && upiForm.classList.add("hidden");
}

export default function Payment(props: Props) {
  const [cardNumber, setCardNumber] = useState(0);
  const [expiry, setExpiry] = useState(0);
  const [cvc, setCvc] = useState(0);

  return (
    <article className="grid grid-cols-[1fr,0.2fr] gap-10 max-xl:-mx-10 max-lg:-mx-14  max-md:grid-cols-1 max-sm:-mx-8 max-vxs:-mx-4">
      <div className="flex flex-col gap-5 ">
        <h1 className="text-2xl font-semibold">Payment Method</h1>
        <article className="flex flex-col gap-5 rounded border border-gray-500 bg-white p-5 shadow">
          <section className="flex cursor-pointer flex-col gap-2   " id="Card">
            <span className="flex gap-2" onClick={showCardForm}>
              <input
                type="radio"
                name="payment"
                className="cursor-pointer"
                id=" Pay with Debit/Credit/ATM Cards"
              />
              <label
                htmlFor=" Pay with Debit/Credit/ATM Cards"
                className="w-full cursor-pointer  "
              >
                Pay with Debit/Credit/ATM Cards
              </label>
            </span>
            <span className="hidden px-5" id="cardForm">
              <form
                action=""
                className="flex w-[16rem] flex-col gap-5 py-5 pl-5"
              >
                <span>
                  <input
                    type="text"
                    name=""
                    id="cardName"
                    className="w-full rounded border-2 border-gray-600 p-1 px-2 shadow-inner outline-blue-600
                max-vs:text-sm max-vxs:text-xs"
                    placeholder="Name on Card"
                  />
                </span>
                <span>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="w-full rounded border-2 border-gray-600 p-1 px-2 shadow-inner outline-blue-600
                max-vs:text-sm max-vxs:text-xs"
                    placeholder="Card Number"
                  />
                </span>
                <span className="flex gap-5">
                  <input
                    type="month"
                    name=""
                    id=""
                    className="w-3/4 rounded border-2 border-gray-600 p-1 px-2 shadow-inner outline-blue-600
                  max-vs:text-sm max-vxs:text-xs"
                  />
                  <input
                    type="number"
                    name=""
                    id=""
                    className="w-1/4 rounded border-2 border-gray-600 p-1 px-2 shadow-inner outline-blue-600
                  max-vs:text-sm max-vxs:text-xs"
                    placeholder="CVC"
                  />
                </span>
              </form>
            </span>
          </section>
          <section className="flex flex-col gap-2" onClick={showUpiForm}>
            <span className="flex gap-2  ">
              <input
                type="radio"
                className="cursor-pointer"
                name="payment"
                id="UPI"
              />
              <label htmlFor="UPI" className="w-full cursor-pointer">
                UPI
              </label>
            </span>
            <span className="hidden px-5" id="upiForm">
              <form action="">
                <input
                  type="text"
                  name=""
                  id=""
                  className=" rounded border-2 border-gray-600 p-1 px-2 shadow-inner outline-blue-600
                max-vs:text-sm max-vxs:text-xs"
                  placeholder="UPI Id"
                />
              </form>
            </span>
          </section>
          <section className="flex gap-2 " onClick={showCod}>
            <input
              type="radio"
              className="cursor-pointer"
              name="payment"
              id="Cash on Delivery/Pay on Delivery"
              defaultChecked
            />
            <label
              htmlFor="Cash on Delivery/Pay on Delivery"
              className="cursor-pointer"
            >
              Cash on Delivery/Pay on Delivery
            </label>
          </section>
        </article>
        <span className="m-auto flex gap-2 px-5 max-xs:flex-col">
          <button
            className="rounded border border-gray-400 bg-white px-5  py-2 shadow "
            onClick={() => {
              props.setActiveStep(1);
            }}
          >
            Change Address
          </button>
          <button
            className="rounded border border-gray-400 bg-sky-700 px-5 py-2   text-white shadow "
            onClick={(e) => {
              props.setActiveStep(3);
              props.setSelectedPaymentMethod(
                `${document.querySelector("input[name='payment']:checked")?.id}`
              );
            }}
          >
            Proceed
          </button>
        </span>
      </div>
      <div className="flex max-h-[21rem] w-72 flex-col rounded border border-gray-400 bg-white p-5 shadow max-md:hidden ">
        <button
          className="rounded border border-gray-400 bg-sky-700 px-5  py-2 text-white shadow "
          onClick={() => {
            props.setActiveStep(3);

            props.setSelectedPaymentMethod(
              `${document.querySelector("input[name='payment']:checked")?.id}`
            );
          }}
        >
          Use This Payment Method
        </button>
        <p className="border-b border-gray-400 p-3 text-xs">
          Choose a payment method to continue checking out. You will still have
          a chance to review and edit your order before it is final.
        </p>
        <h2 className="py-3 text-xl ">
          <b>Order Summary </b>
        </h2>
        <div className="flex flex-col gap-2 border-b border-gray-500 px-2 pb-3 text-sm">
          <span className="flex justify-between ">
            <h3>Price({props.itemCount} Items):</h3>
            <h3>₹ {props.price}</h3>
          </span>
          <span className="flex justify-between ">
            <h3>Delivery</h3>
            <h3>Free</h3>
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-500 py-3 px-2 text-lg font-semibold text-green-700">
          <h3>Order Total:</h3>
          <h3>₹ {props.price}</h3>
        </div>
      </div>
    </article>
  );
}
