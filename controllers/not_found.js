/* ----- controllers/not_found.js ----- */


class NotFoundController {
    redirect(request, response) {
        response.statusCode = 404;
        response.write('Not found.');
        response.end();
    }
}

const instance = new NotFoundController();

module.exports = instance;