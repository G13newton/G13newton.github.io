function log(...msg) {
  msg = msg.map((v) => {
    if (typeof v != "string")
      return JSON.stringify(v);
    return v;
  });
  document.getElementById("transaction-log")?
    .innerText += msg.join(" ") + "\n";
}


const Pi = window.Pi;

// Empty array for testing purposes:
const scopes = [ ];

//Empty function that will log an incomplete payment if found
//Developer needs to implement this callback function
function onIncompletePaymentFound(payment) {
  log(payment);
};

Pi.authenticate(scopes, onIncompletePaymentFound).then(function(auth){
  log("auth:",auth);
}).catch(function(error) {
  log(error);
});

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

function submitFn() {
  paymentData.memo = this["memo"];
  paymentData.amount = this["amount"];
  Pi.createPayment(paymentData, paymentCallbacks).then(function(payment) {
    log(payment);
  }).catch(function(error) {
    log(error);
  });
}
