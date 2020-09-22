//encargado de iniciar la app o el servidor
import app from './app';
import {startConnection} from './database';


async function main() {
    startConnection();
    await app.listen(app.get('port'));
    console.log("Server en Puerto", app.get('port'));
}

main();