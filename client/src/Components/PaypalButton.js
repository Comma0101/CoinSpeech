import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
// const Product = ({ product }) => {
//   const [paidFor, setPaidFor] = useState(false);
//   const [error, setError] = useState(null);
//   const [loaded, setLoaded] = useState(false);
//   const paypalRef = useRef();
//   // const coins = this.props.coins;
//   //   console.log("im the coins", coins);
//   useEffect(() => {
//     // if (loaded) {
//     window.paypal
//       .Buttons({
//         createOrder: (data, actions) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 description: product.description,
//                 amount: {
//                   currency_code: "USD",
//                   value: product.price
//                 }
//               }
//             ]
//           });
//         },
//         onApprove: async (data, actions) => {
//           const order = await actions.order.capture();
//           //   setPaidFor(true);
//           //   console.log(order);
//           const config = {
//             headers: {
//               "x-auth-token": localStorage.token,
//               "Content-Type": "application/json"
//             }
//           };
//           const obj = { coins: product.price };
//           const body = JSON.stringify(obj);

//           try {
//             const res = await axios.post("/api/payment", body, config);
//             setPaidFor(true);
//             //console.log(res.data);
//           } catch (err) {
//             const errors = err.response.data.errors;
//           }
//         },
//         onError: err => {
//           setError(err);
//           console.error(err);
//         }
//       })
//       .render(paypalRef.current);
//     // }
//   }, [product.description, product.price]);
//   if (paidFor) {
//     return (
//       <div>
//         <h1>Congrats, you just bought {product.price} Coins!</h1>
//       </div>
//     );
//   }
//   return (
//     <div>
//       {error && <div>Uh oh, an error occurred! {error.message}</div>}

//       <div ref={paypalRef} />
//     </div>
//   );
// };
// class PaypalButton extends React.Component {
const PaypalButton = props => {
  //   render() {
  const { coins } = props;
  console.log(coins);
  const product = {
    price: coins,
    name: "Coin",
    description: "One Coin Per Speech"
  };

  //   return (
  //     <div style={{ display: coins ? null : none }}>
  //       <Product product={product} />;
  //     </div>
  //   );
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const paypalRef = useRef();
  // const coins = this.props.coins;
  //   console.log("im the coins", coins);
  useEffect(() => {
    // if (loaded) {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: "USD",
                  value: product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          //   setPaidFor(true);
          //   console.log(order);
          const config = {
            headers: {
              "x-auth-token": localStorage.token,
              "Content-Type": "application/json"
            }
          };
          const obj = { coins: product.price };
          const body = JSON.stringify(obj);

          try {
            const res = await axios.post("/api/payment", body, config);
            setPaidFor(true);
            //console.log(res.data);
          } catch (err) {
            const errors = err.response.data.errors;
          }
        },
        onError: err => {
          setError(err);
          console.error(err);
        }
      })
      .render(paypalRef.current);
    // }
  }, [product.description, product.price]);
  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought {product.price} Coins!</h1>
      </div>
    );
  }
  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}

      <div ref={paypalRef} />
    </div>
  );
};
// }
export default PaypalButton;
