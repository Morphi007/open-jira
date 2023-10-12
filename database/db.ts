import mongoose from 'mongoose';

/**
 * 0=disconneted
 * 1=connected
 * 2=conecting
 * 3=disconnecting
 */

const mongoConection = {
	isConnected: 0,
};

export const connect = async () => {
	
    if (mongoConection.isConnected) {
		console.log('ya estamos conectado');
		return;
	}
 
     if(mongoose.connections.length > 0) {
        mongoConection.isConnected=mongoose.connections[0].readyState

        if( mongoConection.isConnected===1){
                 console.log("usando conexion anterior")
                 return
        }
         
        await mongoose.disconnect()
     }

	await mongoose.connect(process.env.Mongo_URL || "" );
    mongoConection.isConnected=1;
    console.log("conectado a moongose","...")


};

export  const disconnect = async ()=>{
    if(process.env.NODE_ENV === "development")return;
    if(mongoConection.isConnected ===0)return
    await mongoose.disconnect();
    mongoConection.isConnected=0;
   // console.log("Desconectado de MongoDB")
}
