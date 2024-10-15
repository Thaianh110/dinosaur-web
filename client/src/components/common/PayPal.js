
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { current } from "@reduxjs/toolkit";
import { apiCreateOrder } from "apis";
import { useEffect } from "react";
import Swal from "sweetalert2";

// This value is from the props in the UI
const style = {"layout":"vertical"};


function onApprove(data) {
  // replace this url with your server
  return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          orderID: data.orderID,
      }),
  })
      .then((response) => response.json())
      .then((orderData) => {
          // Your code here after capture the order
      });
}


// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency,amount,showSpinner,payload,setIsSucess }) => {
  const [{ isPending,options},dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options, currency: currency
      }
    })
  },[currency,showSpinner])

  console.log(payload)
  const handleSaveOrder = async() => {
    const response = await apiCreateOrder({...payload})
    if(response.success) {
      setIsSucess(true)
      setTimeout(() => {
        Swal.fire('Tuyệt vời!','Bạn đã đặt hàng thành công','success').then(() =>{
          window.close()
        })
      },500)
    }
  }
  return (
      <>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[style]}
              fundingSource={undefined}
              createOrder={(data,action) => {
                return action.order.create({
                  purchase_units: [
                    {amount:{currency_code: currency,value: amount}}
                  ]
                }).then(orderId => orderId) 
              }}
              onApprove={(data,actions) => actions.order.capture().then(async(response) => 
              {
                handleSaveOrder(payload)
              })}
          />
      </>
  );
}

export default function PayPal({amount, payload,setIsSucess}) {
  return (
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
          <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
              <ButtonWrapper setIsSucess={setIsSucess} payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
          </PayPalScriptProvider>
      </div>
  );
}