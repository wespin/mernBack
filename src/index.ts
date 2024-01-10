import app from './app'
import './database'


app.listen(app.get('puerto'),() => {
    console.log('servidor en el puerto ', app.get('puerto'))
})