function processPayment(){
  paypal.Button.render({
   env: 'sandbox',
  client: {
    sandbox: 'AWp58RArmeZHXcD890LL_p6i_sooOz115LFlUXoh1nO6e7-NuihlBcJdEh-uxRC9gzEkFQzOeohGDkNI',
    production: 'AWskQ3F2uIrZWdZEQbnyb287id8ZiPQ3Szs1aaFGUAgPnx7NLAJTih1TN7pWPMwMmVhKv0rVBj5SmdLh'
  },
   locale: 'en_US',
  // Set up a payment
  payment: function (data, actions) {
    return actions.payment.create({
      transactions: [{
        amount: {
          total: '.99',
          currency: 'USD'
        }
      }]
    });
  },
  // Execute the payment
  onAuthorize: function (data, actions) {
    return actions.payment.execute()
      .then(function () {
        $("#printBtn").removeClass("d-none");
        document.getElementById('checkoutBtn').style.display='none';

      });
  }
}, '#checkoutBtn');
}