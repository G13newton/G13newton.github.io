(function(fn) {
  setTimeout(fn, 1000);
})(function() {
"use strict";

function log(...msg) {
  console.log(...msg);
  document.getElementById("transaction-log")
    .innerText += msg.join(" ") + "\n";
}


const Pi = window.Pi;

// Empty array for testing purposes:
const scopes = [ "payments" ];

//Empty function that will log an incomplete payment if found
//Developer needs to implement this callback function
function onIncompletePaymentFound(payment) {
  log("onIncompletePaymentFound:",payment);
};

try {
  Pi.authenticate(scopes, onIncompletePaymentFound).then(function(auth){
    log("auth:",auth);
  }).catch(function(error) {
    log("auth err:",error);
  });
} catch (e) {
  log(e);
}

const paymentData = {
    amount: 0,  /* Pi Amount being Transacted */
    memo: "Test", /* "Any information that you want to add to payment" */
    metadata: {}, /* { Special Information: 1234, ... } */
};

const paymentCallbacks = {
  onReadyForServerApproval: function(paymentId) {
    log("onReadyForServerApproval:",paymentId)
  },
  onReadyForServerCompletion: function(paymentId, txid) {
    log("onReadyForServerCompletion:",paymentId,txid);
  },
  onCancel: function(paymentId) {
    log("onCancel:", paymentId);
  },
  onError: function(error, payment) {
    log("onError:", error, payment);
  }
};

function submitFn(ev) {
  ev.preventDefault();
  const f = ev.target;
  paymentData.memo = f["memo"].value;
  paymentData.amount = f["amount"].value;
  alert("processing test purchase");
  try {
    Pi.createPayment(paymentData, paymentCallbacks)
    .then(function(payment) {
      log("createPayment:",payment);
    }).catch(function(error) {
      log("createPayment error:",error);
    });
  }
  catch (e) {
    log("submitFn error:",e);
  }
}

document.getElementById('myForm').addEventListener('submit', submitFn);

alert("script loaded");

window.pData = paymentData;
window.pCall = paymentCallbacks;

});
