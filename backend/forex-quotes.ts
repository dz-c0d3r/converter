const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('backend/db.json');
const middlewares = jsonServer.defaults();
const port = 3000;

const ForgeClient = require('forex-quotes').default;
let client = new ForgeClient('sX0oHsZqd8WnXn8fBscCXNOQu9UyQQ7b');

server.use(middlewares);

server.get('/allCurrenciesPairs', (req, res) => {
  // Get the list of available symbols
  client.getSymbols().then((response) => {
    res.jsonp(response);
  });
});

server.get('/rate', (req, res) => {
  const fromCurrency = req.query.fromCurrency || 'EUR';
  const toCurrency = req.query.toCurrency || 'USD';
  const amount = req.query.amount || 1;
  //let rate = {};
  // Convert from one currency to another:
  client.convert(fromCurrency, toCurrency, amount).then((response) => {
    const rate = response;
    // merge quota to rate response
    client.getQuota().then((response) => {
      res.jsonp({ ...{ amount }, ...rate, ...response });
    });
  });
});

server.get('/isOpen', (req, res) => {
  // Check if the market is open:
  client.getMarketStatus().then((response) => {
    res.jsonp(response);
  });
});

server.get('/quota', (req, res) => {
  // Check your usage / quota limit:
  client.getQuota().then((response) => {
    res.jsonp(response);
  });
});

// Use default router
server.use(router);
server.listen(port, () => {
  console.log('Forex Server is running');
});
