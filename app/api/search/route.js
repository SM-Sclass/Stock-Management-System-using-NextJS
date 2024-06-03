import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server';

export async function GET(request) {
    const query = request.nextUrl.searchParams.get("query")
    const uri = "mongodb+srv://Asus:$UM!T376@cluster0.vvhlsc0.mongodb.net/";

    const client = new MongoClient(uri);

    try {
        const database = client.db('StockMS');
        const inventor = database.collection('inventory');
        
        const allproduct = await inventor.aggregate([
        {
            $match: {
                name: {
                    $regex: query,
                    $options: "i"
                }
            }
        },
        ]).toArray();

        console.log(allproduct);
        return NextResponse.json({ allproduct })
    } finally {

        await client.close();
    }
}