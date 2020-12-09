const { app } = require('./app/app')

const server = app.listen(4000, function () {
  console.log('Listening on port ' + server.address().port)
})
