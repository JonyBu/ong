const app = require('./app')

app.listen(process.env.SERVER_PORT, () => {
	console.log(`App listening at http://localhost:${process.env.SERVER_PORT}`)
})
