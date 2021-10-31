import { withRouter } from "react-router-dom";
import "../styles/merch.css";
import mockup from "../images/mockup.png";
import { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import emailjs, { init } from "emailjs-com";

let Merch = () => {
  const sizes = [
    { name: "Small", value: "S" },
    { name: "Medium", value: "M" },
    { name: "Large", value: "L" },
    { name: "X-Large", value: "XL" },
  ];
  const qty = [1, 2, 3, 4, 5];
  let [currQuantity, setCurrQuantity] = useState(1);
  const price = 45;

  let [size, setSize] = useState("S");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [addressLine1, setAddressLine1] = useState("");
  let [addressLine2, setAddressLine2] = useState("");
  let [city, setCity] = useState("");
  let [st, setSt] = useState("");
  let [zip, setZip] = useState("");
  let [country, setCountry] = useState("");
  let [notes, setNotes] = useState("");

  init("user_vOeHwwuX8f6w0siJEPns0");

  return (
    <div className="merchContainer">
      <div className="formContainer">
        <form id="merchForm">
          <div className="merchHeader">
            <div>
              <h2>LIMITED EDITION MONKEYDRUMMA HOODIE</h2>
              <i>Signed</i>
              <i>Comfy</i>
              <i>Monkey</i>
            </div>
            <img src={mockup} alt="hoodie" className="hoodie" />
          </div>
          <div className="merchDescription">
            <p>
              Are you cold all the time? Do you need a new hoodie to keep you
              warm? Look no further! The MonkeyDrumma hoodie is the hoodie for
              you. I ordered a few samples from different companies to find the
              best hoodie to sell, and it's finally ready. Fill out the form
              below to order yours now!
            </p>
          </div>
          <div className="input quantity">
            <label htmlFor="size" datalabel="Size">
              {" "}
              <select
                id="size"
                name="size"
                onChange={(e) => setSize(e.target.value)}
              >
                {sizes.map((s, i) => (
                  <option value={s.value} key={i}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="quantity" datalabel="Quantity">
              <select
                id="quantity"
                name="quantity"
                onChange={(e) => setCurrQuantity(e.target.value)}
              >
                {qty.map((q, i) => (
                  <option value={q} key={i}>
                    {q}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="total">
            <div>
              <p>{currQuantity} x $45/Hoodie = </p>
              <p>${currQuantity * price}.00</p>
            </div>
          </div>
          <div className="input wide">
            <input
              name="fname"
              id="fname"
              type="text"
              autoComplete="off"
              onInput={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="fname">First Name</label>
          </div>
          <div className="input wide">
            <input
              name="lname"
              id="lname"
              type="text"
              autoComplete="off"
              onInput={(e) => setLastName(e.target.value)}
            ></input>
            <label htmlFor="lname">Last Name</label>
          </div>
          <div className="input wide">
            <input
              name="addressLine1"
              id="addressLine1"
              type="text"
              autoComplete="off"
              onInput={(e) => setAddressLine1(e.target.value)}
            ></input>
            <label htmlFor="addressLine1">Address Line 1</label>
          </div>
          <div className="input wide">
            <input
              name="addressLine2"
              id="addressLine2"
              type="text"
              autoComplete="off"
              onInput={(e) => setAddressLine2(e.target.value)}
            ></input>
            <label htmlFor="addressLine2">Address Line 2</label>
          </div>
          <div className="input side wide">
            <input
              name="city"
              id="city"
              type="text"
              autoComplete="off"
              onInput={(e) => setCity(e.target.value)}
            ></input>
            <label htmlFor="city">City</label>
          </div>
          <div className="input side wide">
            <input
              name="state"
              id="state"
              type="text"
              autoComplete="off"
              onInput={(e) => setSt(e.target.value)}
            ></input>
            <label htmlFor="state">State / Province / Region</label>
          </div>
          <div className="input wide">
            <input
              name="zip"
              id="zip"
              type="text"
              autoComplete="off"
              onInput={(e) => setZip(e.target.value)}
            ></input>
            <label htmlFor="zip">ZIP / Postal Code</label>
          </div>
          <div className="input wide">
            <input
              name="country"
              id="country"
              type="text"
              autoComplete="off"
              onInput={(e) => setCountry(e.target.value)}
            ></input>
            <label htmlFor="country">Country</label>
          </div>
          <div className="input wide">
            <textarea
              name="notes"
              id="notes"
              type="text"
              autoComplete="off"
              onInput={(e) => setNotes(e.target.value)}
            ></textarea>
            <label htmlFor="notes">Notes</label>
          </div>
          <div className="total">
            <p>Total:</p>
            <div>
              <p>{currQuantity} x $45/Hoodie = </p>
              <p>${currQuantity * 45}.00</p>
            </div>
          </div>
          <div className="paypal">
            <PayPalButton
              type="submit"
              amount={price * currQuantity}
              onSuccess={(details, data) => {
                console.log(details);
                details.size = size;
                details.quantity = currQuantity;
                details.firstName = firstName;
                details.lastName = lastName;
                details.addressLine1 = addressLine1;
                details.addressLine2 = addressLine2;
                details.city = city;
                details.st = st;
                details.zip = zip;
                details.country = country;
                details.notes = notes;
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );
                emailjs.send("service_jsfhty8", "template_2furlkl", details);
              }}
              options={{
                clientId:
                  "AXsZ4sWy9KKEPUyGZ4L6t_CVa256SIiVwbuTOI-P21eprbrFTZTxchEwTZkq-Bdv7BCDdbPnSIA7fR4d",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Merch);
