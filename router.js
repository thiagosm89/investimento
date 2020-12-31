/* ----- router.js ----- */

const url = require('url');

const CargaController = require('./controllers/carga');
const NotFoundController = require('./controllers/not_found');

const routes = {
  '/carga': {
    'GET': CargaController.load
  }
};

function router(request, response) {
  const parsedUrl = url.parse(request.url);

  const routeHandler = routes[parsedUrl.pathname] &&
                       routes[parsedUrl.pathname][request.method];

  if (!routeHandler) {
    return NotFoundController.redirect(request, response);
  }

  return routeHandler(request, response);
}

module.exports = router;