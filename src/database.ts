import mongoose from 'mongoose';

export async function startConnection(){
    await mongoose.connect('mongodb://localhost/angulartest-db', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log('database is connected');
}

